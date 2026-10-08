# Plan: Phase 09 — Pillar 1 Slayt Isı Haritası & 1-Click Vize Cram Mode (Wave 1 Triage)

## Goal
Implement and verify **Pillar 1: Slayt Isı Haritası & Vize Triage** and the **1-Click Vize Cram Carousel**, empowering 3rd-year Turkish pharmacy students facing hundreds of lecture slides in *Farmasötik Kimya* and *Farmakoloji* to algorithmically prioritize the top 20% high-yield exam slides ($HYS \ge 75$), predict questions, and master canonical exam traps with 3-tier hint ladders and zero-server privacy.

---

## Tasks

### Task 1: Algorithmic HYS Scorer & Slide-to-Trap Ontology (Tracer Core)
- **Files**:
  - `apps/web/src/services/vizeTriageService.ts`
  - `apps/web/src/services/vizeTriageService.test.ts`
  - `apps/web/src/data/highYieldSlides.data.ts`
- **Action**:
  - Implement `calculateHYS(slide, examDate, now)` with normalized weights ($w_1 = 0.35, w_2 = 0.25, w_3 = 0.20, w_4 = 0.20$) and bidirectional calendar decay $\gamma_{\text{cal}}(t) = 1.0 + 0.25 \cdot \exp(-|T_{\text{exam}} - t| / 7)$ bounded to $[0, 100]$.
  - Add zero-division safety for cohort attempts ($N_{\text{attempts}} < 5 \implies 0.50$ prior).
  - Seed initial verified ontology of 20 high-yield slides across MedChem (Organophosphates, Ionic bond dielectric, Salicylic acid H-bonding, Hydrophobic entropy, Dibucaine SAR) and Pharmacology (Schild regression slope 1.0, Partial agonist intrinsic activity, Furchgott spare receptors, Quantal TI, GPCR Gs/Gi/Gq second messengers).
  - Write comprehensive unit tests in `vizeTriageService.test.ts` asserting exact bounds, calendar symmetry, and tier categorization.

### Task 2: Zero-Server Client Memory Sandbox
- **Files**:
  - `apps/web/src/lib/security/ClientMemorySandbox.ts`
  - `apps/web/src/lib/security/ClientMemorySandbox.test.ts`
- **Action**:
  - Implement `ClientMemorySandbox` managing safe `Blob` URL allocation with `registerBlobUrl(blob)` and explicit lifecycle cleanup via `revokeAll()`.
  - Add volatile RAM auto-purge timeout (24h TTL) and IndexedDB blob cleaner.
  - Write unit tests verifying URL revocation on session teardown and asserting zero network requests.

### Task 3: Zustand Vize Triage State Machine
- **Files**:
  - `apps/web/src/stores/vizeTriageStore.ts`
  - `apps/web/src/stores/vizeTriageStore.test.ts`
- **Action**:
  - Implement `useVizeTriageStore` managing active course selection (`medchem` | `pharmacology`), thermal tier filters (`all` | `red` | `amber`), current slide index, step progression (1: Spotlight $\to$ 2: Predict $\to$ 3: Challenge $\to$ 4: Verdict $\to$ 5: Mastery), and score tally.
  - Wire integration with `misconceptionService` (recording diagnosed traps) and `FsrsEngine` (updating card retrievability).
  - Write unit tests validating state transitions and session persistence.

### Task 4: Slide Heatmap View & 1-Click Vize Cram Carousel Components
- **Files**:
  - `apps/web/src/components/triage/SlideHeatmapView.tsx`
  - `apps/web/src/components/triage/SlideHeatmapView.test.tsx`
  - `apps/web/src/components/triage/VizeCramCarouselModal.tsx`
  - `apps/web/src/components/triage/VizeCramCarouselModal.test.tsx`
- **Action**:
  - Build `SlideHeatmapView.tsx` with ChatGPT squircle theme (`#171717`, `#212121`, `#2F2F2F`, `#10A37F`), thermal badges (Thermal Red $\ge 75$, Amber $45\text{--}74$, Cool Gray $<45$), course switcher, and "1-Tıkla Vize Kampına Başla ⚡" hero button.
  - Build `VizeCramCarouselModal.tsx` with:
    - Slide mechanism spotlight with zoom and bounding-box highlight.
    - Step 2 Predict-then-Reveal guard ("Bu Slayttan Ne Sorulur?" hypothesis input before options unlock).
    - Step 3 Active recall challenge with 3-tier scaffolding hint ladder (Nudge $\to$ Clue $\to$ Solution).
    - Step 4 Diagnostic rationale with authentic slide citation.
    - Keyboard navigation support (`[1-4]` for options, `[Space]` for hints, `[ArrowRight]` for next, `[Escape]` to exit).
  - Write full Vitest component tests in jsdom testing all interaction states.

### Task 5: Integration, Shell Wiring, Monorepo Verification & Visual Capture
- **Files**:
  - `apps/web/src/components/layout/PharmLearnShell.tsx`
  - `apps/web/src/components/dashboard/MinimalCourseDashboard.tsx`
  - `scripts/capture-vize-triage-visual.mjs`
- **Action**:
  - Wire `SlideHeatmapView` into `PharmLearnShell` as a first-class navigation view tab ("Vize Triage / Isı Haritası").
  - Add "Vize Kampı (Top %20 Slayt)" quick-launch button to `MinimalCourseDashboard.tsx`.
  - Run full monorepo test suite (`pnpm -r run test`) and strict typecheck (`pnpm -r run typecheck`) ensuring 100% green coverage.
  - Run Playwright visual capture script in Brave Browser, saving high-resolution screenshots to `brain/screenshots/` and updating showcase artifacts.
