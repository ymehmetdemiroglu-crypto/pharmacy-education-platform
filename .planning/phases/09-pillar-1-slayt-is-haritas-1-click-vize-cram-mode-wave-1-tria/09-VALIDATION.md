# Phase 09 Validation Strategy: Pillar 1 Slayt Isı Haritası & 1-Click Vize Cram Mode

## 1. Automated Test Specifications

### 1.1 Mathematical & Service Unit Tests (`vizeTriageService.test.ts`)
- [ ] `calculateHYS` computes baseline scores in exact $[0, 100]$ range for both zero and maximal parameter vectors.
- [ ] Calendar decay $\gamma_{\text{cal}}(t)$ symmetrically decays as $|T_{\text{exam}} - t|$ increases in both pre-exam and post-exam directions (zero stuck-at-1.25 defect).
- [ ] Safeguards against division by zero when cohort attempts count $N_{\text{attempts}} = 0$, defaulting to neutral prior 0.50.
- [ ] Successfully loads and ranks all 20 verified lecture slides across MedChem and Pharmacology by $HYS$ descending.
- [ ] Filters slides accurately by thermal bands: Thermal Red ($HYS \ge 75$), Amber ($45 \le HYS < 75$), and Cool Gray ($HYS < 45$).

### 1.2 State Store Tests (`vizeTriageStore.test.ts`)
- [ ] Initializes cram session for selected course and filter tier.
- [ ] Tracks current slide index, step phase, and answers submitted.
- [ ] Integrates with FSRS spaced repetition engine: updates card stability and retrievability on cram completion.
- [ ] Persists progress to IndexedDB with zero state loss on browser refresh.

### 1.3 UI Component Tests (`SlideHeatmapView.test.tsx` & `VizeCramCarouselModal.test.tsx`)
- [ ] `SlideHeatmapView` displays course selector, thermal badge counts, and slide cards.
- [ ] Clicking "1-Tıkla Vize Kampına Başla ⚡" opens `VizeCramCarouselModal`.
- [ ] `VizeCramCarouselModal` enforces Predict-then-Reveal: question options remain hidden until user clicks "Tahminimi Yaptım, Soruyu Göster".
- [ ] Hint button reveals 3-tier scaffolding ladder (Tier 1: Nudge $\to$ Tier 2: Clue $\to$ Tier 3: Solution) without skipping.
- [ ] Selecting an option displays diagnostic misconception feedback with exact slide citations.
- [ ] Full keyboard navigation functions correctly (`[1-4]`, `[Space]`, `[ArrowRight]`, `[Escape]`).

### 1.4 Security & Memory Sandbox Tests (`ClientMemorySandbox.test.ts`)
- [ ] `ClientMemorySandbox` creates Blob URLs and explicitly executes `URL.revokeObjectURL` on teardown.
- [ ] Playwright network assertions verify 0 outbound multipart/binary requests during slide preview operations.
