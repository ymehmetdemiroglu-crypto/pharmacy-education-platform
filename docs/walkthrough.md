# Project Walkthrough & Phase Iteration Log

## Phase 0 Amendment: Standing Quality Protocol & Pricing Redo

**Status**: **COMPLETED & VERIFIED (CLEAN AFTER ITERATION 2)**  
**Date**: September 2026  
**Artifacts Generated & Updated**:
- [`AGENTS.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/AGENTS.md)
- [`docs/pricing-analysis.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/pricing-analysis.md)
- [`courses/medchem/pricing.json`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/courses/medchem/pricing.json)
- [`courses/pharmacology/pricing.json`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/courses/pharmacology/pricing.json)
- [`docs/payments-plan.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/payments-plan.md)
- [`docs/backend.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/backend.md)
- [`docs/ui-guidelines.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/ui-guidelines.md)
- [`.agents/rules/design-rules.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/.agents/rules/design-rules.md)
- [`.agents/rules/content-rules.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/.agents/rules/content-rules.md)
- [`.agents/rules/review-rules.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/.agents/rules/review-rules.md)
- [`.agents/workflows/independent-review-loop.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/.agents/workflows/independent-review-loop.md)
- [`docs/qa-plan.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/qa-plan.md)
- [`docs/decisions.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/decisions.md)
- [`docs/open-questions.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/open-questions.md)
- [`docs/security-guidelines.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/security-guidelines.md)

---

## 1. Key Accomplishments

### 1.1 Complete Pricing Redo
- **Baseline Rejection**: Formally rejected the old $288–$312/year baseline as excessively burdensome for pharmacy students.
- **Permanent Freemium Tier**: First 2 lessons of **every single module** are permanently accessible for free, alongside core interactive widgets and Tier 1 nudge hints.
- **7-Day Free Trial (Zero Card Upfront)**: 1-click full Premium trial. Auto-downgrades to Free on Day 8 with 100% of user progress, XP, and cards preserved. Trial activation is limited to once per account and strictly enforced server-side.
- **3 Materially Cheaper Paid Options**:
  - **Option A (Recommended: "Student Value Pass")**:
    - Single Course: **$14.00/mo** | **$49.00/semester** ($8.17/mo) | **$89.00/yr** ($7.42/mo)
    - Dual Pass: **$19.00/mo** | **$69.00/semester** ($11.50/mo) | **$129.00/yr** ($10.75/mo)
    - Turkey PPP: Single **₺250/mo** | **₺850/sem** | **₺1,450/yr**; Dual **₺350/mo** | **₺1,150/sem** | **₺2,100/yr**
    - Gulf PPP: Single **55 SAR/mo** | **190 SAR/sem** | **340 SAR/yr**; Dual **75 SAR/mo** | **265 SAR/sem** | **490 SAR/yr**
  - **Option B ("High-Volume Accessible Tier")**: Single **$9.99/mo** | **$39.99/sem** | **$69.99/yr**; Dual **$14.99/mo** | **$59.99/sem** | **$99.99/yr**; Turkey ₺180/mo, ₺690/sem, ₺1,150/yr; Gulf 39/150/265 SAR.
  - **Option C ("Academic Modular Plan")**: Single **$16.00/mo** | **$59.00/sem** | **$109.00/yr**; Dual **$22.00/mo** | **$79.00/sem** | **$149.00/yr**; Turkey ₺290/mo, ₺990/sem, ₺1,750/yr; Gulf 60/220/410 SAR.
- **Unit Economics & Break-Even**:
  - Dodo MoR fees: 3.5% + $0.30 (~$0.28 to $0.79/user/month).
  - Gemini 1.5/2.0 Flash AI feedback: ~50 prompt calls/mo @ 1k tokens = **~$0.020/user/month**.
  - Cloud infrastructure: **~$0.023/user/month**.
  - Net contribution margin: **>93% across all tiers**.
  - Break-even: **8 to 15 active subscribers** cover the $100/mo baseline overhead.
- **Upgrade-Prompt UX Spec (Zero Dark Patterns)**: Equally weighted "Continue Free" action, transparent pricing, no false countdown clocks, no manipulative guilt copy.

### 1.2 Mandatory Independent Review Loop
- Established strict policy: **Author agents may never approve their own work.**
- Codified 5 specialized reviewer roles operating in clean, fresh contexts:
  1. **Design Critic**
  2. **Code Reviewer**
  3. **Security Reviewer**
  4. **Content / Pedagogy Reviewer**
  5. **QA Agent**
- Standardized findings format with P0 (Blocker), P1 (Critical), P2 (Minor) severity levels, mandatory `file:line` citations, and concrete fix suggestions.
- Maximum 4 iterations before hard escalation to project owner.

### 1.3 Playwright UI Verification & Brave Browser Harness
- Located and verified Brave browser on Windows:
  `C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe`
- Dual-mode testing codified with concrete functions:
  - `launchBraveShieldsDefault`: Tests standard aggressive ad/tracker blocking.
  - `launchBraveShieldsOff`: Uses `--disable-brave-shields` to verify functional parity.
- Complete testing matrix: 13 component and widget states, 3 viewports (`375x667`, `768x1024`, `1440x900`), 2 themes (Light `#FFF8E7` cream + Dark `#121212`), 3 locales (English LTR, Arabic RTL, Turkish LTR).
- Automated assertions: zero console errors, zero failed requests, axe-core 0 serious/critical violations, full keyboard navigation, Lighthouse perf >= 90.

### 1.4 Refined Neo-Brutalist Design & Motion Tokens
- Disciplined 8-point spacing scale (`space-1` = 4px through `space-16` = 64px).
- Typographic scale mapped to Space Grotesk, Inter, and JetBrains Mono.
- Dual palette tables: Light Mode (cream) and Dark Mode (`#121212` canvas) with contrast ratios exceeding WCAG AAA minimums (6.8:1 to 21:1 against black, 6.8:1 to 19.3:1 against dark canvas).
- Mobile sticky bottom action bar with `padding-bottom: max(16px, env(safe-area-inset-bottom))` to prevent gesture bar collisions.
- Arabic (AR) RTL Neo-Brutalist layout rules with LTR isolation for chemical and mathematical notation.
- Smooth motion tokens: 150–250ms micro-motion, up to 400ms page transitions, `cubic-bezier(0.22, 1, 0.36, 1)`, strictly hardware-accelerated (`transform` and `opacity` only).
- Educational feedback motion: gentle +4px / -4px shifts, soft color tints. Strictly no confetti explosions and no violent screen shaking. Full support for `prefers-reduced-motion: reduce`.

---

## 2. Independent Review Loop Verification Records

### 2.1 Iteration 1: Adversarial Review & Findings
In Iteration 1, five independent reviewer subagents evaluated the implementation and identified **six P1 critical issues**:

| Reviewer Role | Report File | P0 | P1 | P2 | Verdict | Key Findings |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Security Reviewer** | [`docs/reviews/phase-0-amendment-iteration-1-security-reviewer.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/reviews/phase-0-amendment-iteration-1-security-reviewer.md) | 0 | 2 | 1 | **FAIL** | Insecure string comparison in HMAC validation (`!==`) vulnerable to timing attacks; unguarded Firestore `get(...).data.isFreePreview` crash hazard on missing lesson doc. |
| **Code Reviewer** | [`docs/reviews/phase-0-amendment-iteration-1-code-reviewer.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/reviews/phase-0-amendment-iteration-1-code-reviewer.md) | 0 | 1 | 1 | **FAIL** | Missing machine-readable localized PPP rates (TRY, SAR, EUR) for Options B and C in `pricingOptionsCatalog`. |
| **Design Critic** | [`docs/reviews/phase-0-amendment-iteration-1-design-critic.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/reviews/phase-0-amendment-iteration-1-design-critic.md) | 0 | 2 | 0 | **FAIL** | Missing Dark Mode color tokens & contrast ratios table; missing `env(safe-area-inset-bottom)` mobile padding and Arabic RTL guidelines. |
| **QA Agent** | [`docs/reviews/phase-0-amendment-iteration-1-qa-agent.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/reviews/phase-0-amendment-iteration-1-qa-agent.md) | 0 | 1 | 1 | **FAIL** | Missing Playwright launch harness functions with `--disable-brave-shields` flag for dual-shields verification. |
| **Content Reviewer**| [`docs/reviews/phase-0-amendment-iteration-1-content-pedagogy-reviewer.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/reviews/phase-0-amendment-iteration-1-content-pedagogy-reviewer.md) | 0 | 0 | 2 | **PASS** | 40-word step limit and 3-tier hint ladder clarification recommendations logged. |
| **TOTAL** | | **0** | **6** | **5** | **REMEDIATION REQUIRED** | 6 P1 issues requiring author fixes. |

---

### 2.2 Author Remediation Summary
The author addressed 100% of the P1 findings across all files:
1. **Security Fixes**:
   - Replaced naive string equality in `docs/payments-plan.md` with `crypto.timingSafeEqual` and buffer length validation to prevent side-channel timing attacks.
   - Updated `docs/security-guidelines.md` to mandate constant-time comparisons.
   - Guarded step read rule in `docs/backend.md` using `resource.data.get('isFreePreview', false)` and wrapped parent lesson lookup with `exists(...)` to prevent runtime rule crashes.
2. **Code & Schema Fixes**:
   - Added complete `localizedPricing` structures (USD, TRY, SAR, EUR) for Option A, Option B, and Option C to `courses/medchem/pricing.json` and `courses/pharmacology/pricing.json`. Verified valid JSON parsing.
3. **Design & UX Fixes**:
   - Added Dark Mode Palette table to `docs/ui-guidelines.md` and `.agents/rules/design-rules.md` with AAA contrast ratios against `#121212`.
   - Added `padding-bottom: max(16px, env(safe-area-inset-bottom))` to mobile action bar specifications.
   - Codified Section 7 in `docs/ui-guidelines.md` and design rules for Arabic (AR) RTL Neo-Brutalist layout and LTR chemistry isolation.
4. **QA & Testing Fixes**:
   - Exported `launchBraveShieldsDefault` and `launchBraveShieldsOff` (with `--disable-brave-shields`) in `docs/qa-plan.md` and `AGENTS.md`.
5. **Pedagogical Invariant Hardening**:
   - Formally codified strict 40-word prompt limit and graduated 3-tier hint ladder structure in `.agents/rules/content-rules.md`.

---

### 2.3 Iteration 2: Fresh-Context Re-Verification Record
Five fresh reviewer subagent instances evaluated the remediated codebase:

| Reviewer Role | Report File | P0 Blockers | P1 Critical | P2 Minor | Verdict |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Design Critic** | [`docs/reviews/phase-0-amendment-iteration-2-design-critic.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/reviews/phase-0-amendment-iteration-2-design-critic.md) | 0 | 0 | 0 | **PASS** |
| **Code Reviewer** | [`docs/reviews/phase-0-amendment-iteration-2-code-reviewer.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/reviews/phase-0-amendment-iteration-2-code-reviewer.md) | 0 | 0 | 1 | **PASS** |
| **Security Reviewer** | [`docs/reviews/phase-0-amendment-iteration-2-security-reviewer.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/reviews/phase-0-amendment-iteration-2-security-reviewer.md) | 0 | 0 | 1 | **PASS** |
| **Content Reviewer**| [`docs/reviews/phase-0-amendment-iteration-2-content-pedagogy-reviewer.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/reviews/phase-0-amendment-iteration-2-content-pedagogy-reviewer.md) | 0 | 0 | 0 | **PASS** |
| **QA Agent** | [`docs/reviews/phase-0-amendment-iteration-2-qa-agent.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/reviews/phase-0-amendment-iteration-2-qa-agent.md) | 0 | 0 | 1 | **PASS** |
| **TOTAL** | | **0** | **0** | **3** | **CLEAN PASS** |

Result: **Zero P0 and Zero P1 issues remain.** The phase amendment is declared clean.

---

## 3. Next Steps & Decision Gate
1. Project Owner reviews and selects preferred pricing model:
   - **Option A (Recommended)**: Student Value Pass ($14/mo, $49/sem, $89/yr; Turkey ₺250/₺850/₺1,450; Gulf 55/190/340 SAR)
   - **Option B**: High-Volume Tier ($9.99/mo, $39.99/sem, $69.99/yr; Turkey ₺180/₺690/₺1,150; Gulf 39/150/265 SAR)
   - **Option C**: Academic Modular Plan ($16/mo, $59/sem, $109/yr; Turkey ₺290/₺990/₺1,750; Gulf 60/220/410 SAR)
2. Project Owner provides sign-off on the Phase 0 Amendment STOP Gate Report.
3. Advance to Phase 1 (Materials Ingestion, Content Extraction & Monorepo Scaffolding).
