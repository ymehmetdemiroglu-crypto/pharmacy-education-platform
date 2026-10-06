# Project State

## Current Phase: 06-multi-course-rag-exam-bank-and-audio
- **Status**: COMPLETED & VERIFIED (100% Pass Rate Across All Suites)
- **Scope**:
  - 10 atomic, reviewed Markdown knowledge nodes for Course B (Pharmacology) in `courses/pharmacology/knowledge_nodes/`
  - Multi-course RAG expansion in `lectureRagService.ts` with course filtering and Supabase pgvector RPC fallback
  - Curated 10-question past exam bank (`CURATED_EXAM_BANK`) across MedChem and Pharmacology with 3-tier Socratic ladders
  - Two-tab modal in `PastExamPracticeModal.tsx` (Curated Bank Browser + Upload/Scrub)
  - Synchronized audio-karaoke summary with dynamic lecture switching in `AudioSummaryBar.tsx` and `audioService.ts`
  - 20 high-resolution screenshots captured with Brave Browser and compiled into `pharmlearn_showcase.html`
  - 14/14 web test files passed (64/64 tests), TypeScript 0 errors

## Completed Phases
### Phase 6: Multi-Course RAG, Exam Bank & Audio Pipeline [COMPLETED]
- 10 atomic Pharmacology nodes created covering Prof. Dr. Feyza Arıcıoğlu slide decks.
- Multi-course RAG service tested with course filtering (6/6 tests pass).
- 10 authentic curated isomorphic past-exam questions with 3-tier Socratic hint ladders (4/4 tests pass).
- Audio player with karaoke highlighting and "Tutor'a Sor" action (3/3 tests pass).
- 20 high-res Brave Browser screenshots in `pharmlearn_showcase.html`.

### Phase 5: ChatGPT Aesthetic, Minimalist Dashboard & Study Pulse [COMPLETED]
- Obsidian `#212121` and `#171717` dark palette with `#10A37F` emerald accents and squircle borders.
- Minimalist course dashboard with Bahar Vizesi 28-day countdown, streak, and readiness metrics.
- Study Pulse & Co-Presence lounge with 39-42 active peer counter, faculty tags, and Pomodoro timer.
- Initial 10 MedChem Markdown nodes and FSEK Safe Harbor past-exam sanitizer.

### Phase 4: Commercialization & Dual-Brave Verification [COMPLETED]
- 97/97 Playwright tests passed in both Brave Shields Default and Shields Down modes.
- Axe-core accessibility: 0 serious or critical violations across all tested surfaces.
- GPU-composited motion: CLS = 0.00, 0 long frames > 50ms.
- 154 gallery screenshots captured across all components, viewports, locales, and dark/RTL modes.
- Academic pricing, Turkey PPP ₺, and Gulf SAR tiers integrated.
- 65/65 unit test files passed (257/257 tests passing).
- Clean production bundle verification: 0 dev notes leaked.
- Dual-workspace synchronization to `pharmacy_education_platform_setup` complete.
### Phase 1: Golden Path & Critical Audit Remediation [COMPLETED]
- Rectified clinical errors and biophysical inaccuracies in `docs/research/council-learning-experience-report.md`.
- Implemented `IonizationChamber` with closed-form Henderson-Hasselbalch math, Fick's flux, and WCAG 2.2 stepper accessibility.
- Implemented 1-tap `ConfidenceGauge` and wired hypercorrection engine in `PredictThenReveal`.
- Solidified Lesson 2 (`mc-mod1-les2`), eradicated 200 m² surface area myth, validated 12 stages, $\le 40$-word prompts across `tr`, `en`, `ar`.
- Indexed all 267 physical slides across 8 lecture PDFs in `docs/materials-text-index.json`.

### Phase 2: Core Curriculum Expansion (Authentic 8-Deck Scope) [COMPLETED]
- Populated step-level `sources` across all 264 steps of the 22-lesson curriculum.
- Eradicated out-of-bounds `page: 34` references in `courses/pharmacology/lessons/lesson-02.json`, `courses/medchem/lessons/lesson-03.json`, and `courses/pharmacology/lessons/lesson-05.json`.
- Confirmed (S)-propranolol eutomer / (R)-propranolol distomer ground truth.
- Validated all 264 steps with 0 word-count violations ($\le 40$ words), 0 missing hints, and 0 missing dual configs.
- Rebuilt client curriculum cache (`apps/web/src/data/curriculum.client.ts`).
- Fully synchronized worktree `pharmacy_education_platform_setup`.

### Phase 3: Advanced Simulation Widgets & Leitner Spaced Review [COMPLETED]
- **03-01 (`EassonStedmanStage`)**: Pure CSS 3D GPU-accelerated chiral alignment widget. Demonstrates 3-point binding of (S)-propranolol (eutomer, $\Delta G = -11.5\text{ kcal/mol}$) vs 2-point binding and steric clash of (R)-propranolol (distomer, $\Delta G = -8.5\text{ kcal/mol}$). WCAG 2.2 accessible steppers, `ModelIllustrationNotice`. (5/5 unit tests pass).
- **03-02 (`ReceptorOperationalModel`)**: Black-Leff (1983) operational model of agonism with closed-form math for $EC_{50}$, $E_{\max,\text{obs}}$, and receptor occupancy $\rho_{50} = \frac{EC_{50}}{K_A + EC_{50}}$ ($8.3\%$ occupancy, $91.7\%$ spare receptor reserve when $\tau=10$). Real-time SVG plot, accessible steppers, `ModelIllustrationNotice`. (4/4 unit tests pass).
- **03-03 (`PkCockpit`)**: Multi-dose pharmacokinetic cockpit simulator with closed-form superposition across $N=5$ doses for Oral and IV bolus. Live accumulation factor $R_{\text{acc}}$, steady-state peaks/troughs ($C_{\text{ss},\max}, C_{\text{ss},\min}$), target window $[MEC, MTC]$ overlays and reactive alert badges. (5/5 unit tests pass).
- **03-04 (`Calibrated Leitner Engine` & `ClinicalOrderVerification`)**: Calibrated default retrievability due threshold to $R \ge 0.85$ (preventing decay to $37\%$). Implemented backward exam scheduling ($S_{\text{required}} = \Delta t / -\ln(R_{\text{target}})$) with urgency levels and backward milestones. Built `ClinicalOrderVerificationStation` covering the 3 audited clinical interactions (Ciprofloxacin + CaCO3 chelation, Simvastatin + Clarithromycin CYP3A4 MBI, Warfarin + Heparin bridging Factor VII vs II/X latency). (17/17 engine tests, 5/5 station tests pass).

## Test Suite Health (All Packages 100% Passing)
- `@pharmacy/ui`: 16/16 test files passed, 41/41 tests
- `@pharmacy/widgets`: 38/38 test files passed, 100/100 tests
- `@pharmacy/web`: 1/1 test file passed, 6/6 tests
- `@pharmacy/platform`: 10/10 test files passed, 109/109 tests
- **Workspace Grand Total**: 65/65 test files passed, 256/256 tests passed (100% pass rate)
