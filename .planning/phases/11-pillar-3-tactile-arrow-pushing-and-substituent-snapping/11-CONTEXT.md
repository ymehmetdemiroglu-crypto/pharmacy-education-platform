# Phase 11 Context: Pillar 3 — Tactile "Çizerek Öğren" (Mechanism Arrow Pushing & Substituent Snapping)

## 1. Domain Problem & Turkish Pharmacy Student Anxiety
Third-year pharmacy students (*"Eczacılık 3. Sınıf"*) in Turkey face an insurmountable hurdle in *Farmasötik Kimya I & II* exams:
- Classical written exams (*klasik sınavlar*) mandate drawing exact reaction mechanisms with curved electron-pushing arrows (e.g. *AChE Ser-203 nükleofilik atağı*, *organofosfat yaşlanması*, *beta-laktam açilasyonu*, *lokal anestezik ester hidrolizi*).
- Multiple-choice questions or static textbook figures fail to train the physical motor-spatial coordination needed to recognize nucleophile $\to$ electrophile trajectories and octet limits.
- The two most lethal exam traps:
  1. **Texas Carbon (5-Valence Carbon)**: Students attack a carbonyl carbon ($C=O$) without simultaneously drawing the secondary resonance arrow pushing the $\pi$-bond electrons onto the oxygen.
  2. **Hypervalent Heteroatom Confusion**: Students incorrectly assume Phosphorus and Sulfur must follow strict 8-electron octet rules, failing when asked to draw pentacoordinate organophosphate transition states ($P(V)$) or hexavalent sulfonamide bonds ($S(VI)$).

## 2. Core Pillars & Pedagogical Invariants
1. **Low-Latency Tactile Canvas**:
   - Built on `PointerEvents` (`pointerdown`, `pointermove`, `pointerup`, `pointercancel`) supporting touch screens and Apple Pencil stylus input.
   - Calibrated 56px standard bond target baseline.
   - Voronoi nearest-neighbor snapping eliminating touch target oscillation.
   - Quadratic/Cubic Bézier curved arrows with automatic perpendicular control point offset ($P_{\text{ctrl}} = (P_0 + P_1)/2 + 0.25 \|P_1 - P_0\| \hat{n}$).
   - $\pi$-Bond donor support: arrows can originate from covalent bond midpoints (e.g., $C=C$ $\pi$-system or $C=O$ bond opening).
2. **Chemoinformatics Valence & Octet Engine**:
   - Strict Period 2 octet guard for C, N, O, F. Rejects Texas Carbon ($>4$ bonds) with immediate haptic pulse (`navigator.vibrate([30, 20, 30])`) and plain Turkish explanation.
   - Hypervalent expansion: explicitly allows $P(V)$ (up to 10 valence electrons) for organophosphates / AChE aging and $S(VI)$ (up to 12 electrons) for sulfonamides.
   - Formal charge calculation and intermediate structure morphing upon correct mechanism completion.
3. **4-Stage Worked-Example Fading**:
   - `STAGE_DEMO`: Animated expert demonstration showing electron movement and energetic driving force.
   - `STAGE_FADED_1`: Primary attack arrow is pre-drawn; student completes secondary octet-preserving arrow.
   - `STAGE_FADED_2`: Reactive donor and acceptor centers highlighted with pulsating amber targets; student draws both arrows.
   - `STAGE_INDEPENDENT`: Freeform challenge with zero visual aids.
4. **Dynamic Substituent Snapping Palette (SAR Exploration)**:
   - Modular functional group palette ($-H, -CH_3, -Cl, -OCH_3, -NO_2, -CF_3, -N(CH_3)_2, -SO_2NH_2$).
   - Drag & drop onto lead drug scaffolds (Procaine vs Lidocaine, Propranolol, Nifedipine).
   - Real-time quantitative calculations:
     - Hammett $pK_a$ shift: $\Delta pK_a = -\rho \cdot \sigma_x$
     - Wildman-Crippen lipophilicity change: $\Delta \log P = \sum n_i a_i$
     - Analog gauges for receptor affinity and metabolic half-life ($t_{1/2}$).
5. **Authentic Faculty Curriculum Provenance**:
   - Linked to verified Marmara and Hacettepe lecture decks in `/materials/`.
   - Distractors and misconception feedbacks mapped to canonical trap codes (`TRAP-03-ESTER-AMIDE`, `TRAP-08-AChE-AGING`, `TRAP-06-CIP-INVERSION`).
