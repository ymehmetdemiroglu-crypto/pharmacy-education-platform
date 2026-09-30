# Milestone 3 Changes Summary

**Engineer:** challenger_m3_1 (Curriculum & Adaptive Engine Engineer)  
**Date:** 2026-09-30  
**Status:** Completed and Verified  

---

## 1. Upgrade `LessonStepSchema` & `LessonSchema` (`packages/platform/src/curriculum/schema.ts`)
- **12-Stage Mastery Sequence**: Enforced `LESSON_STAGES`: `(1) hook`, `(2) question`, `(3) intuition`, `(4) visual_explanation`, `(5) interactive_artifact`, `(6) guided_discovery`, `(7) formal_explanation`, `(8) concept_check`, `(9) application`, `(10) retrieval`, `(11) connection`, `(12) mastery_check`.
- **Cognitive Load Constraints**: Implemented `wordCount(text) <= 40` validation across string and bilingual `{ tr, ar }` prompt schemas. Prompts exceeding 40 words in either Turkish or Arabic are rejected with descriptive error messages.
- **Bilingual Structure**: Support for `{ tr: string; ar: string }` across `title`, `prompt`, `objective`, `options`, `misconceptionFeedback`, and `technicalTerms`.
- **Validation Functions**: Added `validate12StageSequence` and `TwelveStageLessonSchema`. `LessonSchema` maintains backward compatibility for legacy 8–15 step lessons while enforcing strict 12-stage ordering whenever a lesson specifies 12 steps or stage descriptors.

## 2. Prerequisite Knowledge Graph DAG (`packages/platform/src/curriculum/knowledgeGraph.ts` & `knowledgeGraph.test.ts`)
- **Directed Acyclic Graph Topology**: Built `KnowledgeGraphDAG` containing 28 canonical nodes:
  - 6 Foundational science competencies (Level 0: `GENCHEM-01`, `GENCHEM-02`, `CELLBIO-01`, `ORGCHEM-01`, `ORGCHEM-02`, `PHYS-01`).
  - 10 Farmasötik Kimya competencies (Course A, Modules 1–5).
  - 12 Farmakoloji competencies (Course B, Modules 1–6).
- **Cross-Course Bridges**: Integrated 5 formal inter-course bridges:
  - `mc-mod1-les1` $\to$ `pharm-mod1-les1` (Thermodynamic activity $\to$ Mass action)
  - `mc-mod2-les1` $\to$ `pharm-mod1-les2` (Intermolecular bonding $\to$ Non-covalent forces)
  - `mc-mod2-les2` $\to$ `pharm-mod2-les1` (3-point chiral attachment $\to$ Graded dose-response & intrinsic efficacy)
  - `mc-mod5-les1` $\to$ `pharm-mod3-les2` (Phase I CYP450 $\to$ First-pass bioavailability)
  - `mc-mod3-les2` $\to$ `pharm-mod5-les1` (Tetrazole bioisosterism $\to$ ARB RAAS inhibition)
- **Graph Algorithms**:
  - `detectCycles()` & `hasCycle()`: DFS with recursion stack tracking; returns cycle paths. Verified 0 cycles in canonical graph.
  - `topologicalSort()`: Kahn's algorithm producing deterministic, dependency-preserving order; throws `Circular dependency detected` on cycles.
  - `isPrerequisiteMet()` & `getMissingPrerequisites()`: Checks student progress (`UserProgress`, `{ completedLessonIds }`, `string[]`, `Set<string>`) against direct prerequisites.
  - `getAllPrerequisites()`: Computes transitive prerequisite closure.

## 3. Expand Course Configurations (`courses/medchem/` & `courses/pharmacology/`)
- **11 Total Modules**:
  - `courses/medchem/course.config.json`: 5 modules (`mc-mod-01` through `mc-mod-05`).
  - `courses/pharmacology/course.config.json`: 6 modules (`ph-mod-01` through `ph-mod-06`).
- **22 Permanently Free Lessons**:
  - Exactly 2 free preview lessons per module (10 in MedChem, 12 in Pharmacology).
  - Each free preview lesson provides bilingual title, bilingual description, prerequisite IDs matching the Knowledge Graph DAG, interactive widget bindings, and estimated study duration.

## 4. Leitner Spaced Retrieval Engine with Memory Decay (`packages/platform/src/spaced_repetition/LeitnerEngine.ts` & `LeitnerEngine.test.ts`)
- **Standardized Intervals (R6)**: `[1, 3, 7, 21, 60]` days across Boxes 1 through 5.
- **Memory Retrievability Decay Modeling**:
  $$R(t) = \exp\left(-\frac{\Delta t}{S}\right)$$
  - Stability $S$ mapped to box levels: `{ 1: 1.0, 2: 3.0, 3: 7.0, 4: 21.0, 5: 60.0 }`.
  - Implemented `calculateMemoryDecay` and `calculateCardRetrievability`.
  - Desirable difficulty stability updating on success:
    $$S_{\text{new}} = \max\left(S_{\text{box}}, S_{\text{old}} \cdot (1 + 0.5 \cdot \exp(1 - R))\right)$$
  - Stability reduction on lapse: $S_{\text{new}} = \max(1.0, S_{\text{old}} \cdot 0.25)$.
- **Dynamic Due Card Detection**: Cards become due when scheduled review date passes OR when retrievability decays below threshold ($R \le 0.80$).
- **Formative Micro-Remediation Routing**:
  - 0 lapses $\to$ `action: 'none'`
  - 1 lapse $\to$ `action: 'diagnostic_hint'` (Tier 2 Diagnostic Clue)
  - 2+ lapses $\to$ `action: 'micro_remediation'` with targeted micro-remediation node containing intuitive reframing ($\le 30$ words), interactive widget manipulation task, and near-transfer assessment.
  - Seeded canonical catalog: `MISC-SPARE-RECEPTOR-SATURATION`, `MISC-EFFICACY-POTENCY-CONFLATION`, `MISC-LIPOPHILICITY-BIOAVAILABILITY`, `MISC-ACID-BASE-IONIZATION`, `MISC-FERGUSON-NONSPECIFIC`.

## 5. Web Application Integration (`apps/web/src/pages/LessonPage.tsx`)
- Added `getLocalizedText` helper for bilingual `{ tr, ar }` rendering of lesson titles, step titles, prompts, and hints.
- Ensured strict typing compatibility with `exactOptionalPropertyTypes: true`.

## 6. Monorepo Verification Summary
| Check | Command | Result |
| :--- | :--- | :--- |
| **Monorepo Tests** | `pnpm -r --workspace-concurrency=1 run test` | **PASS** (61 tests in platform, 35 in ui, 54 in widgets, 6 in web) |
| **Typecheck** | `pnpm -r --workspace-concurrency=1 run typecheck` | **PASS** (0 errors across 5 workspace packages) |
| **Lint** | `pnpm -r run lint` | **PASS** (0 errors) |
| **Production Build** | `pnpm run build` | **PASS** (100% clean bundle, 0 internal audit leaks) |
| **Claim Inventory** | `pnpm claim-inventory` | **PASS** (0 forbidden strings, 100% claims mapped) |
