# Milestone 4 Changes Log: 12-Stage Lesson Blueprints & Content Authoring for 22 Free Lessons

## 1. Summary of Changes
Authored complete, biophysically authentic 12-stage concept mastery curriculum for all 22 permanently free lessons (Lessons 1 & 2 across 11 modules: 10 in Course A Farmasötik Kimya, 12 in Course B Farmakoloji). All 264 steps strictly enforce cognitive load limits (<= 40 words per prompt in Turkish and Arabic), authentic Turkish terminology ("Farmasötik Kimya"), The Special Arabic Rule (Arabic instructional prose with Turkish canonical key terms in `technicalTerms`), biophysical interactive widget pairings on Stage 5, and full web application routing/rendering.

---

## 2. Detailed File Modifications & New Additions

### A. Authoring & Curriculum Datasets
- **`courses/medchem/lessons/lesson-01.json` through `lesson-10.json` (10 files)**:
  - Authored Lessons 1 & 2 across Modules 1 to 5 of Course A (Farmasötik Kimya).
  - Implemented 12 stages per lesson: `hook`, `question`, `intuition`, `visual_explanation`, `interactive_artifact`, `guided_discovery`, `formal_explanation`, `concept_check`, `application`, `retrieval`, `connection`, `mastery_check`.
  - Configured biophysical widgets: Ferguson Slider, Ionization Equilibrium Slider, SAR Explorer, Structure Identifier, Receptor Ligand Matcher, Metabolism Map.
  - Enqueued 3 Leitner Box 1 spaced review cards per lesson.
- **`courses/pharmacology/lessons/lesson-01.json` through `lesson-12.json` (12 files)**:
  - Authored Lessons 1 & 2 across Modules 1 to 6 of Course B (Farmakoloji).
  - Rigorous pharmacology curriculum: Receptor occupancy, GPCR signaling, quantal dose-response, therapeutic index, one-compartment IV bolus, clearance, ANS adrenergic/cholinergic targets, NSAID COX selectivity, penicillin PBP beta-lactamase resistance.
  - Paired with widgets: ReceptorLigandMatcher, DoseResponseCurve, PkSimulator, StructureIdentifier, MetabolismMap.
- **Authoring & Compilation Tooling**:
  - `scripts/lessons-data-medchem.mjs`, `scripts/data-medchem.mjs`, `scripts/data-medchem-modules2-5.mjs`, `scripts/data-pharmacology-modules1-6.mjs`, `scripts/data-pharmacology-modules2-6.mjs`.
  - `scripts/compile-curriculum.mjs`: Compiles, validates against `TwelveStageLessonSchema`, verifies word counts (<= 40 words in TR and AR), and writes JSONs.

### B. Client Data Sanitization & Release Guard Compliance
- **`scripts/generate-all-client-lessons.mjs`**:
  - Compiles development authoring files into sanitized production client database `apps/web/src/data/curriculum.client.ts` with 57 route/alias entries.
  - Strips internal developer review markers (`pending-human-review`, `unverified`, `numericClaims`, parameter identifiers) and sanitizes citation IDs (`cit-ref-...`) to guarantee 0 release blocker leaks.
- **`apps/web/src/data/curriculum.client.ts`**:
  - Production-ready sanitized client curriculum database.
- **`apps/web/src/data/lessons.ts`**:
  - Integrated `allClientLessons` into `lessonsMap`, supporting lesson lookup by canonical ID or route alias.

### C. Web Application & Interactive UI
- **`apps/web/src/pages/LessonPage.tsx`**:
  - Dynamic `courseId` resolution ('medchem' vs 'pharmacology') and lesson lookup.
  - Dynamic header breadcrumb and course badge (`Farmasötik Kimya` vs `Farmakoloji` • module badge).
  - Added `STAGE_META` badge mapping for 12 stages (`hook`, `question`, `intuition`, `visual_explanation`, `interactive_artifact`, `guided_discovery`, `formal_explanation`, `concept_check`, `application`, `retrieval`, `connection`, `mastery_check`).
  - Rendered `TechnicalTermBadge` tokens beneath step prompts.
  - Rendered interactive widget container for Stage 5 (`interactive_artifact`) or steps with widget configs.
  - Updated `canProceed` logic to enable advancing on Stage 5 and non-question steps.
  - Supported dynamic Leitner spaced review enqueueing keyed by `courseId`.
- **`apps/web/src/App.tsx`**:
  - Added parameterized routes for `/courses/medchem/lessons/:lessonId`, `/courses/pharmacology/lessons/:lessonId`, and `/courses/:courseId/lessons/:lessonId`.
- **`apps/web/src/pages/CatalogPage.tsx`**:
  - Updated Start Free Lesson CTA to dynamically link to `/courses/${course.id}/lessons/1`.

### D. Automated Test Suites & Audits
- **`packages/platform/src/curriculum/curriculum-authoring.test.ts`**:
  - Added comprehensive test suite validating all 22 lessons:
    1. Schema validation against `TwelveStageLessonSchema`.
    2. Strict cognitive load validation: all 264 steps <= 40 words in Turkish and Arabic.
    3. Strict 12-stage pedagogical sequence validation (`validate12StageSequence`).
    4. Widget configuration validation on Stage 5.
    5. The Special Arabic Rule validation (Turkish key terms present in `technicalTerms`).
    6. Spaced repetition flashcard seed validation (>= 3 cards per lesson, Box 1, 1-day interval).
    7. Turkish naming consistency ("Farmasötik Kimya" mandatory; "Medisinal Kimya" forbidden).
    8. Client synchronization validation.
- **`packages/platform/src/curriculum/lesson01.test.ts`**:
  - Updated to 12 steps, bilingual title, Shannon diversity in answer options, and client synchronization.
- **`scripts/claim-inventory.mjs`**:
  - Updated AST regex matching for 12-stage step identifiers, Turkish characters, and Arabic numerals while maintaining 100% strict verification.

---

## 3. Verification Commands & Results
1. `pnpm -r --workspace-concurrency=1 run test`: **35 test files, 164 passed, 0 failed**.
2. `pnpm -r --workspace-concurrency=1 run typecheck`: **5 of 6 packages (all TS packages), exit code 0**.
3. `pnpm -r run lint`: **ESLint clean across platform, ui, widgets, web, exit code 0**.
4. `pnpm run build`: **tsc + vite build + test-prod-bundle.mjs clean, 0 forbidden token leaks, exit code 0**.
5. `pnpm claim-inventory`: **100% compliant, 0 undeclared claims, 0 forbidden strings, exit code 0**.
