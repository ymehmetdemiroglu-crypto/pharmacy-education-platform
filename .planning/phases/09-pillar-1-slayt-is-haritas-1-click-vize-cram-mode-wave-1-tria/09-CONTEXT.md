# Phase 09 Context: Pillar 1 Slayt Isı Haritası & 1-Click Vize Cram Mode (Wave 1 Triage)

## User Intent & Product Goal
Transform the exam triage experience for 3rd-year Turkish pharmacy students by deploying **Pillar 1: Slayt Isı Haritası & Vize Triage** and the **1-Click Vize Cram Carousel**, enabling students facing 300+ slides in *Farmasötik Kimya* and *Farmakoloji* to immediately identify, filter, and master the top 20% high-yield slides containing 80% of faculty exam questions.

## Locked Specifications & Architecture Contracts
- **Source Specification**: `docs/pharmlearn-2.0-pillars-spec.md` (Section 1)
- **Data Contracts**: `docs/pharmlearn-2.0-data-contracts.md` (Section 1: `HighYieldSlideSchema`, `VizeCramStepSchema`, `CanonicalTrapCodeSchema`)
- **Legal Safe Harbor**: `docs/pharmlearn-2.0-compliance-legal.md` (Zero server storage of proprietary slides, volatile client memory execution)

### 1. High-Yield Score ($HYS_s$) Algorithm
$$HYS_{\text{base}}(s) = \min(100, \text{round}(100 \cdot z(s)))$$
$$z(s) = w_1 \cdot C_{\text{past}} + w_2 \cdot E_{\text{prof}} + w_3 \cdot S_{\text{eq}} + w_4 \cdot M_{\text{cohort}}$$
- Weights: $w_1 = 0.35$ (past exam relevance), $w_2 = 0.25$ (professor typographic/syllabus emphasis), $w_3 = 0.20$ (chemical equation/structure density), $w_4 = 0.20$ (cohort error vulnerability).
- Bidirectional Calendar Amplifier:
  $$\gamma_{\text{cal}}(t) = 1.0 + 0.25 \cdot \exp\left(-\frac{|T_{\text{exam}} - t|}{7}\right)$$
- Final Active Score:
  $$HYS(s, t) = \min(100, \text{round}(HYS_{\text{base}}(s) \cdot \gamma_{\text{cal}}(t)))$$

### 2. Thermal Banding Visuals
- **Thermal Red ($HYS \ge 75$)**: Critical lethal trap / classical written question (e.g. Schild plot slope 1.0, ester vs amide hydrolysis, organophosphate vs carbamate serin covalent bonding).
- **Amber ($45 \le HYS < 75$)**: Core mechanistic supporting concept.
- **Cool Gray ($HYS < 45$)**: Background/introductory slide.

### 3. 1-Click Vize Cram Carousel UX
5-Step Rapid Mastery Progression:
1. `[Slide Spotlight]`: High-resolution slide image with bounding-box focus on the core mechanism.
2. `[Bu Slayttan Ne Sorulur?]`: Predict-then-reveal prompt forcing active hypothesis before question options appear.
3. `[Active Recall Challenge]`: Decontaminated multiple-choice question with 3-tier scaffolded hint ladder (Nudge $\to$ Clue $\to$ Faded Solution).
4. `[Diagnostic Rationale]`: Instant misconception-targeted feedback diagnosing the exact 3rd-year error trap.
5. `[FSRS Mastery Commit]`: Calibrated FSRS-4.5 interval update committed to IndexedDB.

### 4. Technical Deliverables
1. `apps/web/src/services/vizeTriageService.ts`: $HYS$ calculation engine, slide-to-trap ontology linker, and deck ranking.
2. `apps/web/src/stores/vizeTriageStore.ts`: Zustand store managing active cram sessions, filters, and offline progress.
3. `apps/web/src/components/triage/SlideHeatmapView.tsx`: Thermal badge grid, slide thumbnail viewer, and tier filtering.
4. `apps/web/src/components/triage/VizeCramCarouselModal.tsx`: Keyboard-navigable (Arrow keys, 1-4 option keys, Space for hint) full-screen cramming drawer/modal.
5. `apps/web/src/lib/security/ClientMemorySandbox.ts`: Safe `Blob` URL allocator and auto-revocation wrapper preventing memory leaks.
