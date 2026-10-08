# Phase 10 Validation Strategy: Pillar 2 Fotokopiden Etkileşime (Dynamic Slide Re-Animator)

## 1. Automated Unit & Service Tests (`slideReAnimatorService.test.ts`)
- [ ] Correctly extracts numerical constants (pKa, pH, Kd, EC50, Emax) from sample slide texts.
- [ ] Correctly identifies chemical scaffolds (ester, amide, carbamate, organophosphate, aromatic amine).
- [ ] Accurately maps extracted concepts to registered `CANONICAL_MISCONCEPTIONS` (`TRAP-01` through `TRAP-10`).
- [ ] Deterministically resolves the appropriate interactive widget configuration based on extracted entities:
  - Acid-Base / Ionization $\to$ `IonizationChamber` / `IonizationEquilibriumSlider`
  - Dose-Response / Schild $\to$ `DoseResponseCurve` / `ReceptorOperationalModel`
  - SAR / Local Anesthetic $\to$ `SarExplorer` / `DualModeMoleculeViewer`
- [ ] Formats Anki TSV export with valid Anki headers (`#separator:tab`, `#html:true`, `#tags column:4`) and escaped content.

## 2. Zustand Store Tests (`useSlideReAnimatorStore.test.ts`)
- [ ] Handles slide upload and storage URL generation.
- [ ] Loads pre-loaded authentic exemplar slides without disk interaction.
- [ ] Updates active tab (`simulator` | `quiz` | `anki`).
- [ ] Records student hypothesis in predict-then-reveal stage before unlocking options.
- [ ] Updates FSRS retention metrics upon successful completion of the re-animated challenge.

## 3. UI Component Tests (`SlideReAnimatorView.test.tsx`)
- [ ] Renders dropzone with support for drag-and-drop and file input.
- [ ] Displays 4 pre-loaded authentic Marmara & Hacettepe slide buttons.
- [ ] Clicking an exemplar re-animates the slide, rendering entity chips and the dynamic biophysical widget.
- [ ] Predict-then-reveal guard locks quiz options until user registers a hypothesis.
- [ ] Clicking "Anki (.txt) İndir" triggers browser download with valid TSV content.

## 4. Integration & Shell Tests
- [ ] Integrates into `PharmLearnShell.tsx` navigation tab ("Slayt Canlandır 🔬").
- [ ] Accessible from `MinimalCourseDashboard.tsx` hero quick actions ("Fotokopiden Canlandır ⚡").
- [ ] Monorepo typecheck (`pnpm -r run typecheck`) passes with 0 errors.
- [ ] Production build (`pnpm --filter @pharmacy/web build`) passes with release blocker audit.
- [ ] Playwright visual capture in Brave Browser verifying responsive layout and widget interaction.
