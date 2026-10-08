# Phase 11 Plan: Pillar 3 — Tactile "Çizerek Öğren" (Mechanism Arrow Pushing & Substituent Snapping)

## Execution Tasks

### Task 1: Type Definitions & Data Contracts
- File: `apps/web/src/types/tactileMechanism.types.ts`
- Implement Zod schemas & TypeScript types:
  - `ChemicalPointSchema` (atoms & pi-bond midpoints)
  - `CurvedArrowSchema` (Bézier control points, donor, acceptor, arrowType)
  - `ValenceValidationRequestSchema` & `ValenceValidationResponseSchema`
  - `MechanismChallengeSchema` (title, prompt, 4-stage fading state, steps, canonical trap codes)
  - `SubstituentTypeSchema` & `SubstituentSnapEventSchema`
  - `ScaffoldDefinitionSchema` (scaffolds: Procaine/Lidocaine, Propranolol, Nifedipine)

### Task 2: Chemoinformatics Valence & Octet Engine
- File: `apps/web/src/services/valenceOctetEngine.ts`
- Methods:
  - `validateElectronPush(arrows, challenge)`:
    - Checks strict octet for C, N, O, F (Texas Carbon detection)
    - Validates simultaneous pi-bond opening
    - Validates hypervalent Phosphorus $P(V)$ and Sulfur $S(VI)$
    - Calculates resulting formal charges and intermediate SMILES
  - `calculateHammettPkaShift(substituent, rho)`
  - `calculateWildmanCrippenDeltaLogP(substituent)`
  - `calculateSarProperties(scaffoldId, position, substituent)`
- Unit tests: `apps/web/src/services/valenceOctetEngine.test.ts`

### Task 3: Mechanism Challenges & Scaffolds Ground Truth Data
- File: `apps/web/src/data/tactileMechanisms.data.ts`
- 4 Curated Authentic Challenges:
  1. *AChE Serin-203 Asetilasyonu*: Nucleophilic attack on carbonyl with tetrahedral intermediate.
  2. *Organofosfat Kovalent Zehirlenmesi & P(V) Geçiş Hali*: Attack on pentacoordinate phosphorus (TRAP-08).
  3. *Lokal Anestezik Ester Hidrolizi (Prokain) vs Amit Stabilitesi (Lidokain)*: Hydrolysis mechanism (TRAP-03).
  4. *Beta-Laktam Halka Gerginliği ve Serin Açilasyonu*: Penicillin four-membered ring opening.
- 3 Authentic SAR Scaffolds:
  1. *Prokain / Lidokain*: Ortho/Para substituent effects on duration & basicity.
  2. *Propranolol (Ariloksipropanolamin)*: Ring & amine substituent variations.
  3. *Nifedipin (Dihidropiridin)*: C3/C5 ester alkyl chain modifications.

### Task 4: Tactile Arrow Canvas Component
- File: `apps/web/src/components/tactile/TactileArrowCanvas.tsx`
- Features:
  - Responsive SVG/HTML5 canvas with high-DPI scaling.
  - PointerEvents API with Apple Pencil / touch support.
  - 56px standard bond length baseline and Voronoi snapping.
  - Automatic perpendicular Bézier control point offset ($h = 0.25 d$).
  - Pi-bond electron donor centers.
  - 4-Stage Worked-Example Fading UI (`DEMO`, `FADED_1`, `FADED_2`, `INDEPENDENT`).
  - Haptic feedback on mobile (`navigator.vibrate`).
- Unit tests: `apps/web/src/components/tactile/TactileArrowCanvas.test.tsx`

### Task 5: Substituent Snapping Palette & Real-Time Gauges
- File: `apps/web/src/components/tactile/SubstituentSnapPalette.tsx`
- Features:
  - Drag-and-drop functional group chips.
  - Target attachment hotspots on 2D chemical structure.
  - Live metric gauges: $\Delta \log P$, $\Delta pK_a$, receptor affinity score, predicted half-life.
- Unit tests: `apps/web/src/components/tactile/SubstituentSnapPalette.test.tsx`

### Task 6: Tactile Mechanism Full Workspace View
- File: `apps/web/src/components/tactile/TactileMechanismView.tsx`
- Features:
  - Dark Obsidian / Emerald aesthetic matching PharmLearn 2.0 design tokens.
  - Tabs: "Elektron Oku Çizimi (Arrow Pushing)" & "Sübstitüent Tak-Çıkar (SAR Snapping)".
  - Socratic misconception feedback drawer with 3-tier hint ladder.
  - Challenge switcher and progress tracking.
- Unit tests: `apps/web/src/components/tactile/TactileMechanismView.test.tsx`

### Task 7: Shell & Dashboard Integration
- File: `apps/web/src/components/layout/PharmLearnShell.tsx`
  - Add `'tactile'` tab (`Çizerek Öğren ✍️`) to top navigation.
  - Route `'tactile'` view.
- File: `apps/web/src/components/dashboard/MinimalCourseDashboard.tsx`
  - Add `"Çizerek Öğren (Mekanizma & SAR) ✍️"` quick action button.

### Task 8: Verification & Brave Browser Visual Walkthrough
- Automated Playwright script: `scripts/capture-tactile-visual.mjs`
- Capture visual screenshots in `brain/screenshots/`.
- Full monorepo typecheck & production bundle dev-notes audit.
- Update `ROADMAP.md`, `STATE.md`, and `docs/walkthrough.md`.
- Fast-forward synchronize `master` branch.
