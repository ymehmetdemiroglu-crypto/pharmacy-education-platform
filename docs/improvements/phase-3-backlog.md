# Phase 3 Improvement Backlog & Architectural Proposals

This document outlines prioritized, high-leverage architectural and product improvements identified during the Phase 3 (Vertical Slice A) implementation and audit cycle. Each proposal adheres to the strict evaluation schema: **Problem**, **Evidence**, **Fix**, **Impact**, **Effort**, **Risk**, and **Needs User Decision**.

---

## Executive Summary & Core Architectural Question

### Is Paid Lesson Content Bundled in the Client?
**YES, in the current Phase 3 client build architecture, lesson JSON files are bundled statically into the client SPA.**

- **Current Architecture**: The Vite Single-Page Application bundles `lesson-01.json` directly into client JavaScript chunks. While client-side routing guards (`hasCourseAccess`, `isFreePreviewLesson`) prevent unauthorized UI components from rendering on `/courses/medchem/lessons/3`, any tech-savvy user opening Browser DevTools (Network tab, Application storage, or Source inspect) can inspect the bundled JSON files, revealing all step prompts, options, answers, diagnostic misconception explanations, and review cards for paid lessons without purchasing a pass or activating a trial.
- **Strategic Recommendation**: Migrate paid lesson content (Lessons 3 through 54) to **Rules-Gated Cloud Firestore Documents** served via authenticated Firestore security rules or a Cloud Functions API (`/api/lessons/:lessonId`). Free preview lessons (Lessons 1 & 2 of every module) remain publicly accessible and statically cached for instant, zero-friction initial student onboarding.

---

## Top 5 Prioritized Improvement Recommendations

### 1. `IMP-01`: Serve Paid Lessons (Lessons 3+) via Rules-Gated Firestore / Cloud Functions
- **Rank**: 1 (Critical Commercial IP Security)
- **Problem**: Client-side bundling of paid lesson curricula compromises commercial IP gating and allows straightforward bypass via browser devtools.
- **Evidence**:
  - [`apps/web/src/pages/LessonPage.tsx`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/pages/LessonPage.tsx) statically imports lesson data.
  - Bundled JS chunks contain raw lesson step objects, correct answer IDs, and full pedagogical explanations.
  - Client-side checks (`hasCourseAccess`) are display-level controls only, not cryptographic or backend security barriers.
- **Fix**:
  1. Store Lesson 1 & 2 in Firestore under `/courses/{courseId}/publicLessons/{lessonId}` with public read rules:
     ```javascript
     match /courses/{courseId}/publicLessons/{lessonId} {
       allow read: if true;
     }
     ```
  2. Store Lessons 3+ in Firestore under `/courses/{courseId}/paidLessons/{lessonId}` protected by strict entitlement checks:
     ```javascript
     match /courses/{courseId}/paidLessons/{lessonId} {
       allow read: if request.auth != null && (
         exists(/databases/$(database)/documents/users/$(request.auth.uid)/entitlements/$(courseId)) ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.plan in ['trial', 'premium']
       );
     }
     ```
  3. `LessonPage.tsx` fetches lesson content asynchronously using the Firestore Web SDK with offline persistence enabled, failing gracefully to `PaywallModal` when a 403 Permission Denied is returned.
- **Impact**: Guarantees 100% server-enforced gating for proprietary educational IP across all 54 lessons. Eliminates curriculum scraping and piracy.
- **Effort**: Medium (2 developer days: Firestore migration script + SDK data fetcher in `@pharmacy/platform`).
- **Risk**: Low (Free preview Lessons 1 & 2 remain statically cached for instant load speeds).
- **Needs User Decision**: Confirm whether paid lessons should be retrieved via direct Firestore SDK listeners or an authenticated Cloud Functions endpoint with edge caching.

---

### 2. `IMP-02`: Multi-Layered Trial Farming & Sybil Account Prevention
- **Rank**: 2 (Commercial Revenue Protection)
- **Problem**: 7-Day Free Trial requires 1-click activation without credit card requirements. Malicious users can exploit this by clearing local storage or registering disposable email addresses to obtain unlimited free trial cycles ("trial farming").
- **Evidence**:
  - [`packages/platform/src/auth/AuthContext.tsx`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/platform/src/auth/AuthContext.tsx) generates client-side guest identifiers (`guest-${random}`).
  - While `users/{uid}.trialUsed` is enforced in Firestore, creating a new user document resets the trial state.
- **Fix**:
  1. **Disposable Email Shield**: Integrate an open-source disposable email blocklist in the `startTrial` Cloud Function, rejecting registrations from known temporary mail services (e.g., GuerrillaMail, Mailinator).
  2. **Device Fingerprint Ledger**: Generate a client-side cryptographic device fingerprint (canvas hash, WebGL renderer, audio context, screen depth) submitted with `startTrial`. Store hashed fingerprints in `/trialDevices/{deviceHash}`. If a device has already consumed a trial within 180 days, reject subsequent trial requests with `HTTP 409 Conflict`.
  3. **Subnet Rate Limiting**: Limit trial provisioning to a maximum of 3 active trials per `/24` IPv4 subnet per 30-day window.
- **Impact**: Stops automated and casual trial abuse while preserving 100% frictionless, credit-card-free activation for legitimate pharmacy students.
- **Effort**: Medium (1.5 developer days: Cloud Function extension + fingerprint generator).
- **Risk**: Low (Institutional campus networks sharing public IPs can be safeguarded via university `.edu` domain whitelisting).
- **Needs User Decision**: Should university `.edu` and institutional pharmacy school email domains automatically bypass IP subnet rate limits?

---

### 3. `IMP-03`: Automated 54-Lesson Curriculum Production & Asset Pipeline
- **Rank**: 3 (Production Scaling & Reliability)
- **Problem**: Scaling from 1 vertical slice lesson to 54 complete lessons (Course A: 26 MedChem lessons; Course B: 28 Pharmacology lessons) requires generating and verifying 540 bite-sized steps and 162 spaced review cards. Manual JSON authoring is error-prone and risks word-count creep, schema violations, and citation drift.
- **Evidence**:
  - Phase 3 authoring required multiple remediation loops to sanitize unverified chapter references and numeric saturation thresholds.
  - Manual verification of <=40 words per step across 540 steps would require dozens of manual review hours.
- **Fix**:
  1. Build an automated curriculum CLI tool (`pnpm curriculum:lint`):
     - Automatically asserts strict `<= 40 words` per step across instructional text.
     - Validates presence of 3-tier hint ladders (Nudge, Clue, Solution Step) on all assessment steps.
     - Verifies predict-then-reveal mechanics on concept steps and validates exemptions (hook, checkpoint, recap).
     - Cross-references citations against `docs/needs-human-review.md`, failing CI if any unverified chapter or page number is committed as an established fact.
  2. MDX-to-JSON Compiler: Author lessons in a clean Markdown/MDX format with embedded custom tags (`<Widget id="ferguson" />`, `<Hint tier={1}>`) that compiles into validated `lesson-*.json` files.
- **Impact**: Reduces curriculum authoring time from 6-8 hours to 1.5 hours per lesson while enforcing 100% automated quality and compliance standards.
- **Effort**: Medium (3 developer days).
- **Risk**: None (purely developer productivity and validation infrastructure).
- **Needs User Decision**: Approve adopting the MDX authoring syntax for subsequent curriculum development in Phase 4.

---

### 4. `IMP-04`: Ethical Student Paywall & Transparent Conversion Architecture
- **Rank**: 4 (Trust & Student Experience)
- **Problem**: Commercial subscription models often rely on dark patterns, hidden renewals, and aggressive locking that alienate pharmacy students and increase refund chargebacks.
- **Evidence**:
  - [`packages/ui/src/components/PaywallModal/PaywallModal.tsx`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/ui/src/components/PaywallModal/PaywallModal.tsx) provides clear pricing tiers, but lacks proactive notification when a trial is nearing expiration.
- **Fix**:
  1. **48-Hour Trial Expiration Warning**: On Day 5 of the 7-day trial, render an ethical, non-intrusive reminder banner: *"Your free trial concludes in 2 days. If you do not subscribe, your account will automatically downgrade to the Free plan with 100% of your progress and review cards permanently preserved."*
  2. **Academic Calendar Pause**: Allow students on Semester and Annual passes to pause their subscription for up to 60 days during university breaks (summer/winter recess) without losing billing credits.
  3. **Local Purchasing Power Parity (PPP) Transparency**: In Turkish (`tr`) and Arabic (`ar`) locales, display an explanatory tooltip: *"Academic pricing calibrated for regional purchasing power parity (PPP) to keep medical education accessible to all students worldwide."*
- **Impact**: Builds industry-leading student trust, drives viral campus word-of-mouth adoption, and reduces dispute rates to <0.05%.
- **Effort**: Low (1 developer day).
- **Risk**: Low (minimal engineering overhead; high customer satisfaction return).
- **Needs User Decision**: Should trial reminder notifications be surfaced exclusively in-app via the notification banner, or also via transactional email?

---

### 5. `IMP-05`: Dynamic Equation Derivation & Misconception-Targeted Feedback Widgets
- **Rank**: 5 (Pedagogical Engagement & Learning Science)
- **Problem**: In physical chemistry and pharmacology, understanding mathematical relationships (such as $a = p / p_0$ or logP partition equations) requires active manipulation of variables. Currently, numeric calculations are presented as fixed radio choices, testing passive arithmetic rather than conceptual intuition.
- **Evidence**:
  - Step 9 in `courses/medchem/lessons/lesson-01.json` asks students to calculate $a = 0.05 / 0.20 = 0.25$ via radio options. If a student chooses an incorrect option, the text feedback explains the calculation, but the mathematical structure is not visually linked.
- **Fix**:
  1. Develop `packages/widgets/src/widgets/EquationDerivationWidget/`:
     - Interactive sliders for numerator ($p$ or $c$) and denominator ($p_0$ or $c_0$) with a live visualizer illustrating vapor pressure equilibrium and membrane saturation.
     - Dynamic misconception targeting: If a student divides $p_0 / p$ instead of $p / p_0$, the widget visually highlights the inverted fraction and provides contextual guidance: *"Notice that your value exceeds 1.0 — thermodynamic activity in standard equilibrium cannot exceed saturation."*
     - Faded scaffolding: Steps progress from fully visual interactive sliders to partial variable selection, to independent calculation.
- **Impact**: Upgrades passive reading to true Brilliant-style learn-by-doing interactivity, dramatically improving concept retention and student satisfaction.
- **Effort**: Medium (2 developer days).
- **Risk**: Low (isolated widget package component).
- **Needs User Decision**: Confirm whether the EquationDerivationWidget should be prioritized for Course A Module 1 Lesson 2 (Partition Coefficients & Ionization).

---

## 6. Comprehensive Backlog Summary Table

| ID | Title | Domain | Priority | Effort | Risk | Needs Owner Decision |
|---|---|---|---|---|---|---|
| `IMP-01` | Rules-Gated Firestore Paid Lessons | Security / Commercial | P0 | 2d | Low | Firestore SDK vs Cloud Functions API |
| `IMP-02` | Multi-Factor Trial Farming Prevention | Anti-Abuse / Revenue | P1 | 1.5d | Low | Campus .edu whitelist approval |
| `IMP-03` | Automated 54-Lesson Pipeline & CLI | Production / DX | P1 | 3d | None | MDX syntax sign-off |
| `IMP-04` | Ethical Paywall & Trial Reminders | Product / UX | P2 | 1d | Low | In-app vs email reminder policy |
| `IMP-05` | Dynamic Equation Derivation Widget | Pedagogy / Widgets | P2 | 2d | Low | Lesson 2 deployment priority |
| `IMP-06` | Native Offline Service Worker Sync | Reliability / PWA | P2 | 2d | Low | PWA installation scope |
| `IMP-07` | BiDi Mirrored KaTeX Formula Rendering | Accessibility / I18n | P3 | 1d | Low | KaTeX RTL layout preferences |
| `IMP-08` | Automated CI Visual Regression Diffing | Quality Assurance | P3 | 1.5d | Low | Playwright snapshot storage bucket |
