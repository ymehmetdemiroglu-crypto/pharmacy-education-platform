# Architectural Evaluation & Migration Plan: Firebase to Supabase + Cloudflare Pages

## 1. Executive Summary & Recommendation

| Component | Current Stack | Proposed Stack | Verdict & Rationale |
| :--- | :--- | :--- | :--- |
| **Backend / DB** | Firebase (Firestore NoSQL) | **Supabase (PostgreSQL + RLS)** | **STRONG WINNER**. Postgres relational model, native SQL RLS policies, atomic stored procedures, and `pg_cron` eliminate Firestore rule complexity, denormalization overhead, and subquery costs. |
| **Authentication** | Firebase Auth | **Supabase Auth (GoTrue)** | **WINNER**. Direct integration with Postgres `auth.uid()`, native support for Magic Links, OAuth, and custom claims without external tokens. |
| **Backend Logic** | Firebase Cloud Functions v2 | **Supabase Edge Functions + Postgres RPC** | **WINNER**. Deno-based V8 edge isolates (<10ms cold starts vs 500ms+ Node.js) and Postgres RPC functions for zero-latency database transactions (`start_free_trial`). |
| **Frontend Hosting** | Firebase Hosting | **Cloudflare Pages** | **STRONG WINNER**. Vite + React 18 SPA requires fast static edge delivery. Cloudflare Pages offers **unlimited egress bandwidth**, 300+ edge locations (optimal for Turkey/MENA/Europe latency), free preview deployments, and zero billing surprise risk on free tier (unlike Vercel's 100GB soft cap). |

---

## 2. Deep Dive: Firebase vs. Supabase for Pharmacy Education Platform

### 2.1 Access Control & Gating (Firestore Rules vs. Supabase RLS)

In our active learning platform, **Lessons 1 & 2 of every module are free forever**, while subsequent steps require an active subscription or 7-day free trial entitlement.

- **Firebase Firestore Limitations**:
  - Gating steps requires nested `exists()` and `get()` calls in security rules.
  - Document read costs scale with rule evaluation (e.g. checking user entitlement document on every step fetch).
  - No native SQL join capability; requires denormalizing `isFreePreview` onto step documents.

- **Supabase PostgreSQL RLS Solution**:
  - Declarative, indexed, server-authoritative Row Level Security (RLS) directly in SQL:
  ```sql
  CREATE POLICY "Gated Step Access"
  ON steps FOR SELECT
  USING (
    is_free_preview = true
    OR EXISTS (
      SELECT 1 FROM entitlements
      WHERE entitlements.user_id = auth.uid()
        AND (entitlements.course_id = steps.course_id OR entitlements.course_id = 'dual_bundle')
        AND entitlements.status = 'active'
        AND entitlements.expires_at > now()
    )
  );
  ```

### 2.2 Data Integrity & Complex Logic

- **Spaced Repetition (Leitner 5-Box Algorithm)**:
  - *Firestore*: Client fetches cards, filters client-side, updates individually.
  - *Supabase*: Single atomic SQL query returns prioritized cards due for review:
  ```sql
  CREATE OR REPLACE FUNCTION get_due_spaced_review(p_limit INT DEFAULT 20)
  RETURNS SETOF spaced_repetition AS $$
    SELECT * FROM spaced_repetition
    WHERE user_id = auth.uid()
      AND next_review_due <= now()
    ORDER BY box ASC, next_review_due ASC
    LIMIT p_limit;
  $$ LANGUAGE sql SECURITY DEFINER;
  ```

- **Freemium 7-Day Trial Activation**:
  - *Firestore*: Cloud Function with transaction writing across multiple document paths.
  - *Supabase*: Atomic Postgres RPC function execution guaranteeing single-use enforcement:
  ```sql
  CREATE OR REPLACE FUNCTION start_free_trial()
  RETURNS JSONB AS $$
  DECLARE
    v_user_id UUID := auth.uid();
    v_trial_used BOOLEAN;
    v_now TIMESTAMPTZ := now();
    v_ends_at TIMESTAMPTZ := now() + INTERVAL '7 days';
  BEGIN
    SELECT trial_used INTO v_trial_used FROM profiles WHERE id = v_user_id;
    IF v_trial_used THEN
      RAISE EXCEPTION 'Trial already claimed.';
    END IF;

    UPDATE profiles SET plan = 'trial', trial_used = true, trial_started_at = v_now, trial_ends_at = v_ends_at WHERE id = v_user_id;

    INSERT INTO entitlements (user_id, course_id, entitlement_id, plan, status, plan_id, entitlements, billing_cycle, currency, amount_paid, payment_gateway, started_at, expires_at, auto_renew)
    VALUES (v_user_id, 'dual_bundle', gen_random_uuid()::text, 'trial', 'active', 'trial_7day', ARRAY['all_lessons', 'ai_feedback', 'tier2_3_hints'], 'trial', 'USD', 0, 'system', v_now, v_ends_at, false)
    ON CONFLICT (user_id, course_id) DO UPDATE SET status = 'active', started_at = v_now, expires_at = v_ends_at;

    RETURN jsonb_build_object('success', true, 'expiresAt', v_ends_at);
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;
  ```

- **Automated Expired Trial Downgrade (Day 8)**:
  - Native Postgres extension `pg_cron` runs daily cleanup directly inside the DB:
  ```sql
  SELECT cron.schedule('cleanup-expired-trials', '0 0 * * *', $$
    UPDATE entitlements SET status = 'expired' WHERE status = 'active' AND plan = 'trial' AND expires_at <= now();
    UPDATE profiles SET plan = 'free' WHERE plan = 'trial' AND trial_ends_at <= now();
  $$);
  ```

---

## 3. Frontend Hosting Provider Comparison Matrix

For hosting our **Vite + React 18 + Tailwind CSS Single Page Application (SPA)**:

| Metric / Feature | Cloudflare Pages | Vercel (Hobby / Free) | Netlify (Free) |
| :--- | :--- | :--- | :--- |
| **Bandwidth / Transfer** | **UNLIMITED** (No caps) | 100 GB / month | 100 GB / month |
| **Build Minutes** | 500 builds / month | 6,000 mins / month | 300 mins / month |
| **Global Edge Network** | 300+ locations (Anycast) | ~100 locations | ~100 locations |
| **Commercial Usage Policy** | Allowed on Free Tier | Commercial restriction on Hobby | Allowed with limits |
| **DDoS & Web Protection** | Native Enterprise Cloudflare Shield | Basic | Basic |
| **Custom Domains & SSL** | Free Unlimited | Free Unlimited | Free Unlimited |
| **Cost Predictability** | **Zero Risk ($0)** | Risk of overage / forced upgrade | Risk of overage charges |

### **Winner: Cloudflare Pages**
- Because `apps/web` is a static Vite SPA (all interactive widgets, chemical SMILES renderers, and simulations run client-side), **Cloudflare Pages** is superior.
- **Key advantage**: Zero egress cost caps prevent surprise bills if interactive lesson assets scale, while Anycast edge nodes ensure fast load times in Turkey, MENA, and Europe.

---

## 4. Full Supabase Database Schema (DDL)

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'trial', 'premium')),
  trial_started_at TIMESTAMPTZ,
  trial_ends_at TIMESTAMPTZ,
  trial_used BOOLEAN NOT NULL DEFAULT false,
  preferred_language TEXT NOT NULL DEFAULT 'tr' CHECK (preferred_language IN ('tr', 'en', 'ar')),
  country TEXT DEFAULT 'TR',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_active_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile on signup trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', new.email));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Courses Table
CREATE TABLE public.courses (
  id TEXT PRIMARY KEY, -- 'medchem' | 'pharmacology'
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  modules_count INT NOT NULL DEFAULT 0,
  total_lessons INT NOT NULL DEFAULT 0,
  estimated_hours INT NOT NULL DEFAULT 0,
  free_lessons_per_module INT NOT NULL DEFAULT 2,
  banner_asset TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Modules Table
CREATE TABLE public.modules (
  id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INT NOT NULL,
  summary TEXT,
  learning_objectives TEXT[],
  prerequisites TEXT[]
);

-- 4. Lessons Table
CREATE TABLE public.lessons (
  id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  order_index_in_module INT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  is_free_preview BOOLEAN NOT NULL DEFAULT false,
  step_count INT NOT NULL DEFAULT 0,
  estimated_minutes INT NOT NULL DEFAULT 10,
  sources JSONB NOT NULL DEFAULT '[]'::jsonb,
  published BOOLEAN NOT NULL DEFAULT true
);

-- 5. Steps Table
CREATE TABLE public.steps (
  id TEXT PRIMARY KEY,
  lesson_id TEXT NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  order_index INT NOT NULL,
  is_free_preview BOOLEAN NOT NULL DEFAULT false,
  pedagogical_type TEXT NOT NULL,
  interaction_type TEXT NOT NULL,
  prompt TEXT NOT NULL,
  widget_config JSONB NOT NULL DEFAULT '{}'::jsonb,
  correct_answer JSONB NOT NULL,
  misconception_feedback JSONB NOT NULL DEFAULT '{}'::jsonb,
  hints JSONB NOT NULL DEFAULT '[]'::jsonb,
  explanation TEXT NOT NULL,
  sources JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- 6. Entitlements Table
CREATE TABLE public.entitlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL, -- 'medchem', 'pharmacology', or 'dual_bundle'
  entitlement_id TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('trial', 'premium')),
  status TEXT NOT NULL CHECK (status IN ('active', 'expired', 'canceled', 'revoked', 'past_due')),
  plan_id TEXT NOT NULL,
  entitlements TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  billing_cycle TEXT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  amount_paid NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  payment_gateway TEXT NOT NULL DEFAULT 'dodo_payments',
  gateway_subscription_id TEXT,
  gateway_order_id TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  auto_renew BOOLEAN NOT NULL DEFAULT false,
  revoked_at TIMESTAMPTZ,
  UNIQUE(user_id, course_id)
);

-- 7. User Progress Table
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  completed_lesson_ids TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  current_module_id TEXT,
  current_lesson_id TEXT,
  current_step_index INT NOT NULL DEFAULT 0,
  streak_days INT NOT NULL DEFAULT 0,
  last_streak_date DATE,
  total_xp INT NOT NULL DEFAULT 0,
  accuracy_rate NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- 8. Spaced Repetition Table
CREATE TABLE public.spaced_repetition (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL,
  course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  drug_or_concept TEXT NOT NULL,
  box INT NOT NULL DEFAULT 1 CHECK (box BETWEEN 1 AND 5),
  interval_days INT NOT NULL DEFAULT 1,
  last_reviewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  next_review_due TIMESTAMPTZ NOT NULL DEFAULT now(),
  review_count INT NOT NULL DEFAULT 0,
  lapse_count INT NOT NULL DEFAULT 0,
  history JSONB NOT NULL DEFAULT '[]'::jsonb,
  UNIQUE(user_id, card_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spaced_repetition ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public catalog view courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Public catalog view modules" ON public.modules FOR SELECT USING (true);
CREATE POLICY "Public catalog view lessons" ON public.lessons FOR SELECT USING (true);

CREATE POLICY "Gated Step Access Policy" ON public.steps FOR SELECT USING (
  is_free_preview = true OR EXISTS (
    SELECT 1 FROM public.entitlements
    WHERE entitlements.user_id = auth.uid()
      AND (entitlements.course_id = steps.course_id OR entitlements.course_id = 'dual_bundle')
      AND entitlements.status = 'active'
      AND entitlements.expires_at > now()
  )
);

CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users view own entitlements" ON public.entitlements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read/write own progress" ON public.user_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users read/write own review queue" ON public.spaced_repetition FOR ALL USING (auth.uid() = user_id);
```

---

## 5. Migration Execution Strategy

1. **Phase 1: Dual SDK Abstraction in `@pharmacy/platform`**
   - Refactor `@pharmacy/platform` to use an interface layer (`AuthProvider`, `DatabaseProvider`, `AccessProvider`).
   - Create `@pharmacy/platform/supabase` implementation alongside Firebase.

2. **Phase 2: Local Emulator & Local Supabase Setup**
   - Add `supabase` CLI to project dev dependencies (`supabase init`, `supabase start`).
   - Run local Supabase Docker stack for zero-cost offline testing (paralleling Firebase Local Emulators).

3. **Phase 3: Webhook Migration (Dodo Payments)**
   - Port `functions/src/handleDodoWebhook.ts` to a Supabase Edge Function (`supabase/functions/dodo-webhook/index.ts`).
   - Standard Deno `serve` function verifying HMAC signature and executing privileged Postgres service role updates.

4. **Phase 4: Frontend Build & Deployment Pipeline**
   - Connect repository to **Cloudflare Pages**.
   - Set build command: `pnpm run build` with output directory `apps/web/dist`.
   - Configure environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

---

## 6. Summary of Target Stack

- **Backend Platform**: **Supabase** (Managed Postgres + Supabase Auth + Supabase Edge Functions + `pg_cron`)
- **Frontend Hosting**: **Cloudflare Pages** (Unlimited bandwidth SPA deployment)
- **Payment Gateway**: **Dodo Payments** (MoR via Supabase Edge Function Webhooks)
- **Local Dev Stack**: `supabase CLI` (Docker) + Vitest + Playwright UI verification in Brave Browser
