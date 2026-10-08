# Plan: Phase 10 — Pillar 2 Fotokopiden Etkileşime (Dynamic Slide Re-Animator)

## Goal
Implement and verify **Pillar 2: Fotokopiden Etkileşime (Dynamic Slide Re-Animator)**, empowering Turkish pharmacy students to drop lecture slides, photocopy notes, and GoodNotes PDFs into PharmLearn and immediately transform them into interactive biophysical widgets, Socratic misconception challenges, and 1-click downloadable Anki flashcards with persistent cloud and local storage.

---

## Tasks

### Task 1: Type Contracts & Chemoinformatics Entity Lexer
- **Files**:
  - `apps/web/src/types/slideReAnimator.types.ts`
  - `apps/web/src/services/slideReAnimatorService.ts`
  - `apps/web/src/services/slideReAnimatorService.test.ts`
  - `apps/web/src/data/reanimatedSlides.data.ts`
- **Action**:
  - Define Zod schemas and TypeScript models for `ReanimatedSlide`, `ExtractedSlideEntities`, `DetectedWidgetConfig`, and `AnkiCardPayload`.
  - Implement `extractSlideEntities(text)` parsing pKa, pH, logP, Kd, EC50, Emax, functional groups (ester, amide, carbamate, etc.), and mapping to canonical traps (`TRAP-01` to `TRAP-10`).
  - Implement `resolveSlideWidget(entities)` deterministically routing to the correct widget configuration (`IonizationChamber`, `DoseResponseCurve`, `SarExplorer`, `ReceptorOperationalModel`, `DualModeMoleculeViewer`).
  - Implement `generateAnkiTsvExport(cards, slideMeta)` formatting valid Anki import TSV with `#separator:tab`, `#html:true`, `#tags column:4`.
  - Provide 4 pre-loaded authentic exemplars from Marmara and Hacettepe curricula.
  - Write comprehensive unit tests asserting extraction accuracy, widget routing, and Anki format correctness.

### Task 2: Persistent Storage & Cloud Upload Service
- **Files**:
  - `apps/web/src/services/slideStorageService.ts`
  - `apps/web/src/services/slideStorageService.test.ts`
- **Action**:
  - Implement `uploadSlideFile(file, userId)` uploading slide images/PDFs to Supabase Storage (`documents` / `slides` bucket) with public/signed URL generation.
  - Provide offline fallback using in-memory `Blob` and IndexedDB/localStorage when Supabase credentials are unavailable or offline.
  - Support list, retrieve, and delete operations for saved re-animated slides.
  - Write unit tests verifying upload behavior, fallback handling, and URL generation.

### Task 3: Zustand Slide Re-Animator State Machine
- **Files**:
  - `apps/web/src/stores/useSlideReAnimatorStore.ts`
  - `apps/web/src/stores/useSlideReAnimatorStore.test.ts`
- **Action**:
  - Implement `useSlideReAnimatorStore` managing:
    - Active slide (uploaded or selected exemplar)
    - Re-animation status (`idle` | `processing` | `ready` | `error`)
    - Active view tab (`simulator` | `quiz` | `anki`)
    - Predict-then-reveal hypothesis lock
    - Quiz answer submission & diagnostic misconception feedback
    - Anki export generation
  - Write unit tests validating all state transitions.

### Task 4: UI Components & Interactive Workspace
- **Files**:
  - `apps/web/src/components/reanimator/SlideReAnimatorView.tsx`
  - `apps/web/src/components/reanimator/SlideReAnimatorView.test.tsx`
  - `apps/web/src/components/reanimator/SlideReAnimatorModal.tsx`
  - `apps/web/src/components/reanimator/SlideReAnimatorModal.test.tsx`
- **Action**:
  - Build `SlideReAnimatorView.tsx` with ChatGPT obsidian squircle layout:
    - Left column: Drag-and-drop upload zone, pre-loaded exemplar quick switcher, slide image preview with interactive entity bounding chips (`pKa 8.9`, `Amit Köprüsü`, `EC50 12 nM`).
    - Right column: Tab 1 (Dynamic Widget Re-Animator), Tab 2 (Vize Sokratik Meydan Okuma with predict-then-reveal guard & 3-tier hints), Tab 3 (Anki Export with 1-click download button).
  - Build `SlideReAnimatorModal.tsx` for quick-launch modal overlay.
  - Write complete Vitest component tests testing rendering, exemplar selection, widget mounting, and Anki download trigger.

### Task 5: Integration, Monorepo Verification & Brave Browser Visual Capture
- **Files**:
  - `apps/web/src/components/layout/PharmLearnShell.tsx`
  - `apps/web/src/components/dashboard/MinimalCourseDashboard.tsx`
  - `scripts/capture-slide-reanimator-visual.mjs`
- **Action**:
  - Wire `SlideReAnimatorView` into `PharmLearnShell` navigation tabs ("Slayt Canlandır 🔬").
  - Add "Fotokopiden Canlandır ⚡" action button to `MinimalCourseDashboard.tsx`.
  - Run full monorepo tests (`pnpm -r run test`) and strict typecheck (`pnpm -r run typecheck`).
  - Run production bundle build (`pnpm --filter @pharmacy/web build`).
  - Execute Playwright visual capture script in Brave Browser, capturing high-resolution screenshots of the re-animated widgets, entity chips, quiz, and Anki cards.
