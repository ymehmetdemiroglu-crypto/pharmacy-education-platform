# Original User Request

## 2026-09-30T06:20:41Z

# Teamwork Project Prompt — Multilingual, Interactive, Concept-Mastery Learning Platform

Transform the existing pharmacy education platform into a world-class, concept-mastery learning system featuring rigorous bilingual localization (Turkish primary and Arabic RTL with Turkish technical terms), interactive simulations, active predict-and-reveal pedagogy, and adaptive spaced retrieval.

Working directory: C:\Users\hp\.gemini\antigravity\worktrees\valiant-raman\pharmacy_education_platform_setup
Integrity mode: development

---

## Requested Team Composition
As requested by the user, coordinate the following multidisciplinary team:
1. **Brainstormer and Planning Agent**: Analyzes instructional design, maps pedagogical sequences, decomposes competencies into prerequisite graphs, and architects learning pathways.
2. **Key Improvement Areas Detector Agent**: Scans the existing codebase, UI components, lesson JSONs, and localization trees to detect gaps, untranslated fragments, RTL defects, passive text walls, and cognitive overload.
3. **Implementation Agent**: Executes the systemic code enhancements, updates JSON schemas, implements interactive simulation artifacts, applies localized strings, and hardens UI components.
4. **Code Reviewer and Fixer Agent**: Conducts adversarial audits, verifies bidirectional rendering, runs automated testing suites, validates pedagogical constraints, and fixes discovered defects.

---

## Requirements

### R1. Global Localization Architecture & Complete UI Inventory
- The entire application must be professionally localized into **Turkish** (primary default locale) and **Arabic** (RTL).
- Complete UI inventory coverage: Every visible and accessible element across navigation, headers, subheaders, buttons, labels, cards, tabs, form inputs, tooltips, modals, error/empty/loading/success states, notifications, course/lesson interfaces, interactive simulation widgets, help text, microcopy, and ARIA labels.
- Zero untranslated English strings or placeholder text anywhere in the user experience.
- Turkish localization must use authentic academic and clinical pharmacy language standard in Turkish universities (specifically canonical **"Farmasötik Kimya"**, never "Medisinal Kimya").

### R2. Terminology Governance & The Special Arabic Rule
- Centralized terminology system: Canonical mapping of scientific, medical, and pharmacological concepts ensuring 100% consistency across all courses and UI surfaces.
- **The Special Arabic Rule**: In Arabic lessons and courses, instructional explanations and prose must be written in high-quality Modern Standard Arabic, while key technical, chemical, and pharmacological terminology must remain in canonical Turkish/international terminology (e.g., Arabic prose with canonical terms like *"mitokondri"*, *"reseptör"*, *"iyonizasyon"*).
- The user interface must cleanly distinguish technical keywords from surrounding explanatory prose using specialized typographical styling (e.g., distinctive token tags or semantic badges) without disrupting bidirectional reading flow.

### R3. Bidirectional RTL / LTR Architecture
- Full layout mirroring when active locale is Arabic (`dir="rtl"`): navigation, drawer panels, progression bars, card layouts, grid systems, icons with directional semantics, and form controls.
- Strict LTR isolation (`dir="ltr"`) for chemical structures, SMILES notations, 2D/3D molecular canvases, mathematical equations (KaTeX), numerical data tables, dosage calculations, and code snippets.
- Punctuation and bidirectional boundary stability: Punctuation marks (parentheses, colons, question marks, quotation marks, hyphens) must not invert or detach at language boundaries.

### R4. Concept-Mastery Pedagogical Architecture & 12-Stage Lesson Progression
- Every lesson must implement an active, concept-mastery progression following the 12-stage instructional anatomy:
  1. **Hook**: Clinical or biochemical puzzle grounding the concept.
  2. **Question**: Prediction challenge prompting the learner to commit to a hypothesis.
  3. **Intuition**: Analogical or visual intuition before formal terminology.
  4. **Visual Explanation**: Structural diagram or dynamic visual clarifying mechanism.
  5. **Interactive Artifact**: Purpose-built simulation allowing direct variable manipulation.
  6. **Guided Discovery**: Targeted prompts navigating the learner through cause-and-effect relationships.
  7. **Formal Explanation**: Rigorous biochemical/pharmacological principles and terminology.
  8. **Concept Check**: Diagnostic prompt catching common student misconceptions.
  9. **Application**: Realistic clinical case or drug-design decision scenario.
  10. **Retrieval**: Spaced recall prompt connecting to prior concepts.
  11. **Connection**: Forward look showing where this principle applies next.
  12. **Mastery Check**: Summative evaluation validating transfer and autonomous application.
- Cognitive load constraints: Prompts must remain concise (<=40 words per prompt stage), eliminating passive text walls in favor of predict-then-reveal mechanics.

### R5. Interactive Learning Artifacts & Simulation Engine
- Interactive artifacts must precede formal explanations to foster discovery-driven learning.
- Purposeful interactivity: No decorative animations. Every widget must represent a real biophysical or pharmacological model (e.g., pH/pKa ionization equilibrium slider, logP lipophilicity partition membrane, receptor-ligand lock-and-key binding affinity, dose-response curve modulator).
- Every artifact must define: Purpose, user interaction inputs, real-time outputs, visual feedback states, error/boundary conditions, mobile-responsive layout, accessibility fallbacks, and pedagogical objectives.

### R6. Course Knowledge Graph, Spaced Retrieval & Adaptive Progression
- Prerequisite Knowledge Graph: Formal DAG (Directed Acyclic Graph) of concepts, mapping dependencies so no concept is presented before its prerequisites are mastered.
- Spaced Retrieval Engine: Active retention system prompting learners to review decaying concepts at optimal spaced intervals (e.g., 1 day, 3 days, 7 days, 21 days).
- Formative remediation: If a learner demonstrates a persistent misconception during a checkpoint, provide targeted micro-remediation rather than simple right/wrong signaling.

### R7. Design System Guardrails & Pricing Integrity
- Dark Mode Palette: Maintain the "Academic Midnight Slate" palette (`#0B0F17` canvas, `#131B2A` cards, `#1E293B` surfaces, `#334155` slate borders, `#030712` deep neo shadows, `#F59E0B` warm amber focus rings). Pure white cages (`border-white`) and fluorescent drop shadows are strictly prohibited.
- Pricing Architecture: Exclusively Turkish Lira (TRY / ₺) (₺250 monthly, ₺850 semester, ₺1,450 annual). Dual and single course options. Clearly highlight the 22 permanently free lessons (Lessons 1 & 2 across all 11 modules) and the 7-day cardless free trial.
- Student Authentication: Neo-brutalist modal bridging student login/registration with faculty affiliation selection across Turkish pharmacy faculties.

---

## Acceptance Criteria

### Localization & Copy Coverage
- [ ] Automated UI scan verifies 0 missing translation keys across Turkish and Arabic locales.
- [ ] Zero untranslated English strings displayed on any user-facing page (Catalog, Course, Lesson, Pricing, Profile, Modals).
- [ ] Turkish copy adheres to academic standards, verifying "Farmasötik Kimya" is used exclusively for Course A.
- [ ] Arabic lessons adhere strictly to the Special Arabic Rule: Arabic instructional prose with Turkish canonical key terms in dedicated semantic markers.

### Bidirectional Layout & Accessibility
- [ ] Switching locale to Arabic sets `<html dir="rtl" lang="ar">` with mirrored layouts and zero misaligned flex/grid containers.
- [ ] Chemical equations, molecular canvases, KaTeX formulas, and numerical expressions remain isolated in LTR orientation.
- [ ] Axe-core accessibility automated scan reports 0 critical or serious violations across all pages in both light and dark themes.

### Pedagogical Integrity & Lesson Execution
- [ ] Core course lessons adhere to the 12-stage lesson anatomy with verified predict-then-reveal mechanics.
- [ ] Instructional prompt text remains concise (<=40 words per prompt stage) with zero passive text walls.
- [ ] Every lesson contains at least one interactive simulation artifact with responsive real-time feedback and biophysical validity.
- [ ] Knowledge graph accurately defines concept prerequisites, blocking advanced lessons until foundational prerequisites are completed.

### System Verification & Code Quality
- [ ] All package test suites (`@pharmacy/ui`, `@pharmacy/courses`, `@pharmacy/platform`, `@pharmacy/web`) pass cleanly with 0 failures.
- [ ] Playwright E2E matrix passes across Desktop (Brave/Chromium), Tablet, and Mobile viewports for both Turkish and Arabic locales.
- [ ] Academic Midnight Slate theme retains consistent contrast ratios (>= 4.5:1 for body copy, >= 3:1 for UI controls) under WCAG AA standards.
- [ ] Pricing interface renders strictly in TRY with zero references to foreign currencies.

---

## Deliverables Checklist
- [ ] **Deliverable A**: Global Localization Architecture & Terminology System
- [ ] **Deliverable B**: Complete Product Content Inventory (Page → Component → State → String → TR → AR)
- [ ] **Deliverable C**: Course Architecture & Prerequisite Knowledge Graph
- [ ] **Deliverable D**: Course Sequence & Pedagogical Rationales
- [ ] **Deliverable E**: Lesson Blueprints for Course A (Farmasötik Kimya) and Course B (Farmakoloji)
- [ ] **Deliverable F**: Interactive Artifact Specifications (Mechanisms, States, Inputs, Fallbacks)
- [ ] **Deliverable G**: Adaptive Progression & Spaced Retention Engine
- [ ] **Deliverable H**: Translation & Content QA Audit Matrix
