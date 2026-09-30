# Handoff Report: Pedagogical & Curriculum Architecture

**Agent:** explorer_pedagogy_1  
**Working Directory:** `C:\Users\hp\.gemini\antigravity\worktrees\valiant-raman\pharmacy_education_platform_setup\.agents\teamwork\explorer_pedagogy_1\`  
**Target File Reference:** `analysis.md`  
**Date:** 2026-09-30  

---

## 1. Observation

1. **Course Configuration Gaps & Academic Naming Violations**:
   - In `courses/medchem/course.config.json` (line 4):
     `"title": "Medicinal Chemistry / Farmasötik ve Medisinal Kimya"`
     Violates Requirement R1 which explicitly mandates: *"specifically canonical 'Farmasötik Kimya', never 'Medisinal Kimya'"*.
   - In `courses/medchem/course.config.json` (line 9) and `courses/pharmacology/course.config.json` (line 9):
     `"supportedLocales": ["tr", "en"]`
     Lacks `"ar"` (Arabic) locale entirely.
   - In `courses/pharmacology/course.config.json` (lines 11–28):
     Only 2 modules are defined (`ph-mod-01`, `ph-mod-02`), whereas `docs/pharmacology/curriculum-plan.md` (lines 22–30) and platform requirements mandate 6 modules (`pharm-mod-1` to `pharm-mod-6`) to reach 11 total platform modules (supporting 22 permanently free lessons).

2. **Currency Violation in Pricing Configs**:
   - In `courses/medchem/pricing.json` (line 6, lines 41–58):
     `"currencyDefault": "USD"` with multi-currency tables (USD, TRY, SAR, EUR), violating Requirement R7 which states: *"Pricing Architecture: Exclusively Turkish Lira (TRY / ₺) (₺250 monthly, ₺850 semester, ₺1,450 annual)... Pricing interface renders strictly in TRY with zero references to foreign currencies."*

3. **Curriculum Schema & Lesson Progression Anatomy Gaps**:
   - In `packages/platform/src/curriculum/schema.ts` (line 93):
     `steps: z.array(LessonStepSchema).min(8).max(15)`
     Does not enforce the 12-stage concept mastery sequence.
   - In `packages/platform/src/curriculum/schema.ts` (lines 36–50):
     `StepTypeSchema` includes 13 arbitrary step types without direct mapping to the mandatory 12-stage anatomy: `(1) Hook, (2) Question, (3) Intuition, (4) Visual Explanation, (5) Interactive Artifact, (6) Guided Discovery, (7) Formal Explanation, (8) Concept Check, (9) Application, (10) Retrieval, (11) Connection, (12) Mastery Check`.
   - In `courses/medchem/lessons/lesson-01.json`:
     Contains only 10 steps. Step 1 is clinical vignette, Step 2 jumps straight to mathematical formula $a = P_t/P_0$, missing Stage 3 (Intuition), Stage 4 (Visual Explanation), Stage 5 (Interactive Artifact), Stage 6 (Guided Discovery), Stage 10 (Retrieval), Stage 11 (Connection), and Stage 12 (Mastery Check).
   - In `courses/pharmacology/lessons/`:
     No directory or lesson JSON files exist whatsoever.

4. **Interactive Widget Simulation Gaps**:
   - In `packages/widgets/src/index.ts` (lines 1–39):
     Widgets exist for `DoseResponseCurve`, `HintLadder`, `MetabolismMap`, `MultipleChoice`, `PkSimulator`, `PredictThenReveal`, `ReceptorLigandMatcher`, `SarExplorer`, `StructureIdentifier`.
     Crucial biophysical simulations required by R5 and the curriculum are absent:
     - `IonizationEquilibriumSlider` (pH/pKa Henderson-Hasselbalch simulation).
     - `MembranePartitionSimulator` (logP/logD octanol-water partition simulation).
     - `ThermodynamicActivityFergusonSlider` (Ferguson vapor/saturation biophysical simulation).

5. **Spaced Retrieval Engine Limitations**:
   - In `packages/platform/src/spaced_repetition/LeitnerEngine.ts` (lines 3–9):
     ```ts
     export const LEITNER_INTERVALS: Record<1 | 2 | 3 | 4 | 5, number> = {
       1: 1, 2: 3, 3: 7, 4: 14, 5: 30,
     };
     ```
     Uses 14 days instead of 21 days as mandated by R6 (*"e.g., 1 day, 3 days, 7 days, 21 days"*).
   - The engine lacks retrievability decay modeling ($R(t) = \exp(-\Delta t / S)$) and has no formative remediation routing for persistent misconceptions.

---

## 2. Logic Chain

1. From Observation 1, `courses/medchem/course.config.json` uses *"Medisinal Kimya"* and lacks Arabic support, directly contradicting Requirement R1 and R2. Therefore, updating course metadata to canonical *"Farmasötik Kimya"* and registering `"ar"` is a mandatory immediate fix.
2. From Observation 1 & 2, the platform promises 22 permanently free lessons (Lessons 1 & 2 across 11 modules). Because MedChem has 5 modules and Pharmacology currently configures only 2, Pharmacology must be expanded to 6 modules (`pharm-mod-1` to `pharm-mod-6`) to achieve 11 total modules ($11 \times 2 = 22$ free lessons).
3. From Observation 3, `courses/medchem/lessons/lesson-01.json` omits 6 of the 12 pedagogical stages (Intuition, Visual Diagram, Interactive Simulation, Guided Discovery, Connection, Mastery Check) and presents abstract equations before physical intuition. This directly violates Cognitive Load Theory and the Productive Failure framework mandated by R4.
4. From Observation 4, Requirement R5 explicitly states that every interactive widget must represent a real biophysical model. Without `IonizationEquilibriumSlider`, `MembranePartitionSimulator`, and `ThermodynamicActivityFergusonSlider`, MedChem Lessons 1, 2, 3 and Pharmacology Lessons 1, 5 cannot achieve authentic discovery-driven learning.
5. From Observation 5, Leitner intervals of 14 days and binary right/wrong card transitions without memory decay or formative remediation fall short of Requirement R6. Implementing the 21-day spacing and adaptive micro-remediation nodes is necessary to ensure long-term clinical licensure retention.

---

## 3. Caveats

- **No Code Implementation Executed**: In accordance with the Explorer archetype instructions, no source files were modified during this investigation. All findings and designs are documented in `analysis.md` for execution by the Implementation Agent.
- **Course B Textual Anchors**: Course B (Pharmacology) relies on standard textbook compendia (Katzung 15e/16e and Goodman & Gilman 14e) in addition to the slide decks in `materials/pharmacology`. The lesson structures drafted in `analysis.md` synthesize these compendia without infringing on proprietary third-party text.

---

## 4. Conclusion

The curriculum and pedagogical architecture must undergo four coordinated enhancements:
1. **Curricular Expansion & Localization**: Rebrand Course A to *"Farmasötik Kimya"*, expand Course B to 6 modules (11 modules total, 22 free lessons), configure `["tr", "ar"]` locales, and enforce strictly TRY (₺) pricing.
2. **Schema & 12-Stage Lesson Refactoring**: Refactor `LessonStepSchema` and `lesson-01.json` to enforce the 12-stage concept mastery anatomy, eliminating passive text walls and pairing predictions with dynamic visual states.
3. **Interactive Simulation Engine**: Implement the three missing biophysical simulations (`IonizationEquilibriumSlider`, `MembranePartitionSimulator`, `ThermodynamicActivityFergusonSlider`) and integrate them into lesson stages 5 and 6.
4. **Adaptive Progression & Spaced Retrieval**: Update `LeitnerEngine.ts` to use intervals `[1, 3, 7, 21, 60]`, model memory decay via $R(t) = \exp(-\Delta t / S)$, and route recurring errors to targeted micro-remediation cards.

---

## 5. Verification Method

To independently verify these findings and the subsequent implementation:

1. **Schema & Word Count Verification**:
   Run Vitest on curriculum unit tests:
   ```pwsh
   pnpm --filter @pharmacy/platform test packages/platform/src/curriculum/lesson01.test.ts
   ```
2. **Interactive Widget Unit & Rendering Tests**:
   Run Vitest on widgets package:
   ```pwsh
   pnpm --filter @pharmacy/widgets test
   ```
3. **Leitner Engine Intervals & Decay Tests**:
   Run Vitest on spaced repetition engine:
   ```pwsh
   pnpm --filter @pharmacy/platform test packages/platform/src/spaced_repetition/LeitnerEngine.test.ts
   ```
4. **Inspect Analysis Report**:
   Review detailed architectural blueprints and mathematical derivations in:
   `file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/.agents/teamwork/explorer_pedagogy_1/analysis.md`
