# Project: Pharmacy Education Platform Transformation

## Architecture
- **Monorepo Structure**:
  - `packages/platform`: Curriculum validation, LessonStepSchema (12-stage), Prerequisite DAG, LeitnerEngine (spaced retrieval with decay and formative remediation), and access control.
  - `packages/ui`: Neo-Brutalist design system components adhering to Academic Midnight Slate palette (`#0B0F17`, `#131B2A`, `#1E293B`, `#334155`, `#F59E0B`), bidirectional RTL/LTR layout utilities, `<TechnicalTermBadge>`, `AuthModal`, `PaywallModal`.
  - `packages/widgets`: Interactive biophysical simulation widgets (`IonizationEquilibriumSlider`, `MembranePartitionSimulator`, `ThermodynamicActivityFergusonSlider`, `DoseResponseCurve`, `PkSimulator`, `ReceptorLigandMatcher`, etc.) with strict `dir="ltr"` scientific isolation and bilingual props.
  - `apps/web`: React SPA entry point (`main.tsx` default locale `tr`), full page routing (Catalog, Course, Lesson, Pricing, Profile, Gallery), i18n context provider with `tr.json` and `ar.json` dictionaries.
  - `courses/`: Curriculum definitions, `course.config.json` (canonical *"Farmasötik Kimya"* and *"Farmakoloji"*), lesson JSONs for 11 modules across Course A and Course B (22 permanently free lessons).
  - `e2e/`: Playwright 4-tier testing suite and axe-core accessibility audits across Desktop, Tablet, and Mobile in TR and AR.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F01 | Centralized i18n Architecture | Central `tr.json` and `ar.json` dictionaries with i18n hook replacing inline ternaries | M1 | R1, Del A, B |
| F02 | Default Turkish Locale | `apps/web/src/main.tsx` initialized with `defaultLocale="tr"` | M1 | R1, Del A |
| F03 | Complete UI String Coverage | Zero untranslated English strings or placeholder text across all user-facing views | M1 | R1, Del B |
| F04 | Canonical Turkish Terminology | Canonical *"Farmasötik Kimya"* used exclusively (eliminating *"Medisinal Kimya"* and *"MedKim"*) | M1 | R1, R2, Del A |
| F05 | The Special Arabic Rule | Arabic instructional prose with Turkish canonical key terms rendered via `<TechnicalTermBadge>` | M1 | R2, Del A, H |
| F06 | Bidirectional Layout Mirroring | Full `dir="rtl"` layout mirroring for Arabic locale without flex/grid inversion bugs | M1 | R3, Del A |
| F07 | Strict LTR Scientific Isolation | Enforced `dir="ltr"` isolation containers for KaTeX formulas, molecular SVGs, and Cartesian plots | M1 | R3, Del A |
| F08 | Design System Midnight Slate Palette | Academic Midnight Slate (`#0B0F17`, `#131B2A`, `#1E293B`, `#334155`, `#F59E0B`), zero `border-white` | M1 | R7 |
| F09 | Strict TRY Pricing & Auth Modal | Exclusively Turkish Lira (TRY / ₺) pricing (₺250, ₺850, ₺1,450), cardless trial, Turkish faculty auth | M1 | R7, Del B |
| F10 | Ionization Equilibrium Slider | Biophysical Henderson-Hasselbalch simulation widget with interactive pH/pKa modulation | M2 | R5, Del F |
| F11 | Membrane Partition Simulator | Biophysical logP/logD octanol-water partition and passive membrane diffusion simulation | M2 | R5, Del F |
| F12 | Ferguson Thermodynamic Activity Slider | Biophysical simulation of Ferguson vapor saturation $a = P_t/P_0$ and non-specific cutoff | M2 | R5, Del F |
| F13 | Bilingual Widget Localization | Support for TR and AR localized labels/instructions across all interactive simulation widgets | M2 | R1, R5, Del F |
| F14 | 12-Stage Lesson Anatomy Schema | Schema enforcement of 12 stages (Hook, Question, Intuition, Visual, Artifact, Discovery, Formal, Concept Check, Application, Retrieval, Connection, Mastery Check) | M3 | R4, Del E |
| F15 | Prerequisite Knowledge Graph DAG | Formal acyclic DAG mapping concept prerequisites across chemistry, Farmasötik Kimya, and Farmakoloji | M3 | R6, Del C |
| F16 | Course Topology (11 Modules) | Course A (5 modules) + Course B (6 modules) establishing 11 modules total | M3 | R7, Del C, D |
| F17 | Spaced Retrieval & Memory Decay Engine | Leitner intervals `[1, 3, 7, 21, 60]`, memory decay $R(t) = \exp(-\Delta t / S)$, and formative micro-remediation | M3 | R6, Del G |
| F18 | Course A Lesson Blueprints (10 Lessons) | 12-stage lessons for Lessons 1 & 2 across Modules 1-5 of Farmasötik Kimya | M4 | R4, Del E |
| F19 | Course B Lesson Blueprints (12 Lessons) | 12-stage lessons for Lessons 1 & 2 across Modules 1-6 of Farmakoloji | M4 | R4, Del E |
| F20 | Special Arabic Rule Content Authoring | Bilingual authoring of all 22 lessons with Arabic prose and Turkish technical badge markers | M4 | R2, R4, Del E, H |
| F21 | Cognitive Load & Predict-Reveal | Prompts <= 40 words per prompt stage, predict-then-reveal mechanics, zero passive text walls | M4 | R4, Del E |
| F22 | 4-Tier E2E Test Suite (Tiers 1-4) | Comprehensive Playwright test suite covering Feature, Boundary, Pairwise, and Real-World Scenarios | M5 | E2E, Del H |
| F23 | Cross-Device & Locale Playwright Matrix | Desktop (Brave/Chromium), Tablet, Mobile viewports tested in both Turkish and Arabic locales | M5 | R3, E2E |
| F24 | Axe-core Accessibility Automation | Automated accessibility scans verifying 0 critical and 0 serious violations in light & dark modes | M5 | R7, E2E |
| F25 | TEST_READY.md Publication | Formal sign-off and E2E test suite readiness artifact published at project root | M5 | E2E |
| F26 | 100% E2E Test Suite Pass | Full execution and 100% pass rate across all unit, integration, and E2E test suites | M6 | Acceptance |
| F27 | Tier 5 Adversarial Coverage Hardening | Challenger stress-testing edge cases, misconception branches, and bidirectional rendering | M6 | Verification |
| F28 | Forensic Integrity Audit | Binary veto audit verifying zero hardcoded facades, authentic biophysical models, and genuine i18n | M6 | Audit |
| F29 | Deliverables Synthesis A through H | Publication of all 8 core deliverables in authoritative reference documentation | M6 | Deliverables |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Global Localization, Terminology Governance & Design System | F01, F02, F03, F04, F05, F06, F07, F08, F09 | none | DONE |
| M2 | Interactive Biophysical Simulation Engine & Widgets | F10, F11, F12, F13 | M1 | DONE |
| M3 | Curriculum Schema, Knowledge Graph DAG & Spaced Retrieval Engine | F14, F15, F16, F17 | M1 | DONE |
| M4 | 12-Stage Lesson Blueprints & Content Authoring (22 Free Lessons) | F18, F19, F20, F21 | M2, M3 | DONE |
| M5 | E2E Testing Suite Track (Tiers 1-4, Playwright Matrix, Axe-core) | F22, F23, F24, F25 | M1 (runs in parallel) | DONE |
| M6 | Final Integration, Tier 5 Adversarial Hardening & Forensic Audit | F26, F27, F28, F29 | M4, M5 | DONE |

## Interface Contracts

### Localization System ↔ UI Components (`packages/ui`, `apps/web`)
- `useTranslation()` hook provides:
  ```typescript
  export interface TranslationContextValue {
    locale: 'tr' | 'ar';
    setLocale: (locale: 'tr' | 'ar') => void;
    t: (key: string, params?: Record<string, string | number>) => string;
    dir: 'ltr' | 'rtl';
  }
  ```
- `<TechnicalTermBadge>` component:
  ```typescript
  export interface TechnicalTermBadgeProps {
    term: string; // Canonical Turkish / international pharmacological term
    transliteration?: string; // Optional Arabic transliteration
    definitionKey?: string; // Translation key for tooltip definition
    className?: string;
  }
  ```
  Renders semantic inline badge (`dir="ltr"`) with `#1E293B` background, `#F59E0B` subtle border, and distinct typography ensuring seamless bidirectional reading flow.

### Simulation Widgets ↔ Lesson Runner (`packages/widgets` ↔ `packages/platform`)
- Interactive biophysical widgets expose standardized props:
  ```typescript
  export interface BaseSimulationWidgetProps {
    locale?: 'tr' | 'ar';
    readOnly?: boolean;
    initialState?: Record<string, any>;
    onStateChange?: (state: Record<string, any>) => void;
    onPredict?: (hypothesis: any) => void;
  }
  ```
- All simulation containers enforce strict LTR isolation:
  ```html
  <div dir="ltr" className="isolate ...">
    <!-- SVG canvases, KaTeX formulas, Cartesian plots -->
  </div>
  ```

### Curriculum Schema ↔ Lesson Runner (`packages/platform` ↔ `apps/web`)
- 12-Stage Lesson Anatomy Schema:
  ```typescript
  export type LessonStage =
    | 'hook'
    | 'question'
    | 'intuition'
    | 'visual_explanation'
    | 'interactive_artifact'
    | 'guided_discovery'
    | 'formal_explanation'
    | 'concept_check'
    | 'application'
    | 'retrieval'
    | 'connection'
    | 'mastery_check';

  export interface LessonStep {
    id: string;
    stage: LessonStage;
    stageIndex: number; // 1 to 12
    title: { tr: string; ar: string };
    prompt: { tr: string; ar: string }; // <= 40 words enforced by Zod schema
    technicalTerms?: Array<{ term: string; arContext: string }>;
    widget?: {
      type: string;
      config: Record<string, any>;
    };
    conceptCheck?: {
      options: Array<{ id: string; text: { tr: string; ar: string }; isCorrect: boolean; misconceptionFeedback?: { tr: string; ar: string } }>;
    };
  }
  ```

## Code Layout
- `apps/web/src/locales/`: `tr.json`, `ar.json`, `index.ts`
- `apps/web/src/context/`: `TranslationContext.tsx`
- `packages/ui/src/components/TechnicalTermBadge/`: `TechnicalTermBadge.tsx`
- `packages/widgets/src/IonizationEquilibriumSlider/`: `IonizationEquilibriumSlider.tsx`, `.test.tsx`
- `packages/widgets/src/MembranePartitionSimulator/`: `MembranePartitionSimulator.tsx`, `.test.tsx`
- `packages/widgets/src/ThermodynamicActivityFergusonSlider/`: `ThermodynamicActivityFergusonSlider.tsx`, `.test.tsx`
- `packages/platform/src/curriculum/`: `schema.ts`, `knowledgeGraph.ts`, `lesson-validator.ts`
- `packages/platform/src/spaced_repetition/`: `LeitnerEngine.ts`
- `courses/medchem/`: `course.config.json`, `pricing.json`, `lessons/lesson-01.json` ... `lesson-10.json`
- `courses/pharmacology/`: `course.config.json`, `pricing.json`, `lessons/lesson-01.json` ... `lesson-12.json`
- `e2e/`: `tier1-features.spec.ts`, `tier2-boundaries.spec.ts`, `tier3-combinations.spec.ts`, `tier4-scenarios.spec.ts`, `a11y-audit.spec.ts`
