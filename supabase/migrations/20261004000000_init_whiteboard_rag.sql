-- AI Whiteboard Tutor: knowledge base, mastery ledger, usage log.
-- NOT applied to any remote project automatically. Review, then run with `supabase db push`
-- (or paste into the SQL editor) once the project owner approves remote changes.

-- 1. pgvector (kept in the `extensions` schema, matching Supabase's linter guidance)
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

-- 2. Reviewed lecture concepts, ingested from courses/*/teaching/*.teaching.md
CREATE TABLE IF NOT EXISTS public.lecture_concepts (
    id                  TEXT PRIMARY KEY,                 -- e.g. 'rr:iyonik_bag'
    course_id           TEXT NOT NULL,                    -- 'medchem'
    lecture_slug        TEXT NOT NULL,                    -- 'ilac-reseptor-etkilesimi'
    sort_order          INT  NOT NULL DEFAULT 0,
    source_deck         TEXT NOT NULL,                    -- deck file name shown in citations
    slide_numbers       INT[] NOT NULL,
    concept_title       TEXT NOT NULL,
    scientific_summary  TEXT NOT NULL,                    -- slide-derived facts ONLY
    recommended_widget  TEXT NOT NULL,
    initial_widget_state JSONB,                           -- NULL until the widget config is human-verified
    student_task        TEXT NOT NULL,
    scaffolding_ladder  JSONB NOT NULL,                   -- [nudge, clue, remediation] (exactly 3)
    misconception_map   JSONB NOT NULL DEFAULT '{}'::jsonb,
    status              TEXT NOT NULL DEFAULT 'draft'
                        CHECK (status IN ('draft', 'verified')),
    embedding           extensions.vector(1536),          -- optional; v1 retrieves by id, not similarity
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT lecture_concepts_ladder_len CHECK (jsonb_array_length(scaffolding_ladder) = 3)
);

CREATE INDEX IF NOT EXISTS lecture_concepts_lecture_idx
    ON public.lecture_concepts (course_id, lecture_slug, sort_order);

-- 3. Optional similarity retrieval (only rows that have an embedding AND are verified)
CREATE OR REPLACE FUNCTION public.match_lecture_concepts(
    query_embedding extensions.vector(1536),
    p_course_id TEXT,
    p_lecture_slug TEXT DEFAULT NULL,
    match_threshold FLOAT DEFAULT 0.5,
    match_count INT DEFAULT 3
)
RETURNS TABLE (
    id TEXT,
    concept_title TEXT,
    slide_numbers INT[],
    scientific_summary TEXT,
    recommended_widget TEXT,
    initial_widget_state JSONB,
    student_task TEXT,
    scaffolding_ladder JSONB,
    misconception_map JSONB,
    similarity FLOAT
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public, extensions
AS $$
    SELECT
        lc.id, lc.concept_title, lc.slide_numbers, lc.scientific_summary,
        lc.recommended_widget, lc.initial_widget_state, lc.student_task,
        lc.scaffolding_ladder, lc.misconception_map,
        1 - (lc.embedding <=> query_embedding) AS similarity
    FROM public.lecture_concepts lc
    WHERE lc.course_id = p_course_id
      AND lc.status = 'verified'
      AND lc.embedding IS NOT NULL
      AND (p_lecture_slug IS NULL OR lc.lecture_slug = p_lecture_slug)
      AND (1 - (lc.embedding <=> query_embedding)) > match_threshold
    ORDER BY lc.embedding <=> query_embedding
    LIMIT match_count;
$$;

-- 4. Student concept mastery (written ONLY by the Edge Function with the service role)
CREATE TABLE IF NOT EXISTS public.student_concept_mastery (
    user_id                  UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    concept_id               TEXT NOT NULL REFERENCES public.lecture_concepts(id) ON DELETE CASCADE,
    course_id                TEXT NOT NULL,
    mastery_score            DOUBLE PRECISION NOT NULL DEFAULT 0.0
                             CHECK (mastery_score >= 0.0 AND mastery_score <= 1.0),
    total_attempts           INT NOT NULL DEFAULT 0,
    successful_attempts      INT NOT NULL DEFAULT 0,
    hesitation_avg_ms        INT NOT NULL DEFAULT 0,
    diagnosed_misconceptions TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    last_attempted_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, concept_id)
);

-- 5. Tutor call log: powers the per-user daily limit and cost/latency tracking
CREATE TABLE IF NOT EXISTS public.tutor_events (
    id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    concept_id     TEXT,
    model          TEXT,
    scaffold_level TEXT,
    llm_used       BOOLEAN NOT NULL DEFAULT false,
    latency_ms     INT,
    prompt_tokens  INT,
    completion_tokens INT,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS tutor_events_user_day_idx ON public.tutor_events (user_id, created_at DESC);

-- 6. Row Level Security. Clients may READ; all writes go through the Edge Function.
ALTER TABLE public.lecture_concepts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated read verified concepts" ON public.lecture_concepts
    FOR SELECT TO authenticated USING (status = 'verified');

ALTER TABLE public.student_concept_mastery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own mastery" ON public.student_concept_mastery
    FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id);

ALTER TABLE public.tutor_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own tutor events" ON public.tutor_events
    FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id);
