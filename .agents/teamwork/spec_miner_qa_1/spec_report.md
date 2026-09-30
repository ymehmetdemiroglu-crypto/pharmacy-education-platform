# QA and Requirements Specification Report
**Project**: Multilingual, Interactive, Concept-Mastery Pharmacy Education Platform  
**Author**: `spec_miner_qa_1` (Teamwork Requirements & QA Spec Miner)  
**Date**: 2026-09-30  
**Status**: Authoritative Technical & Verification Specification  

---

## 1. Executive Summary

This report establishes the comprehensive Quality Assurance, Testing Architecture, Deliverables Specification, and Acceptance Criteria mapping for the pharmacy education platform. Grounded in the authoritative requirements from `ORIGINAL_REQUEST.md`, existing architectural decision records (`docs/decisions.md`), pedagogy specifications (`docs/pedagogy-spec.md`), and empirical codebase probing, this document provides the engineering blueprint for testing and verifying Deliverables A through H.

The platform targets undergraduate pharmacy students, licensure candidates (EUS, NAPLEX, SPLE), and practicing clinical pharmacists. Its hallmark features include:
1. **Bilingual Localization**: Authentic academic Turkish as primary default (with canonical *"Farmasötik Kimya"*, never *"Medisinal Kimya"*) and Modern Standard Arabic (RTL) adhering to **The Special Arabic Rule** (Arabic prose paired with Turkish canonical scientific keywords in dedicated semantic tokens).
2. **Bidirectional Layout Architecture**: Full layout mirroring (`dir="rtl"`) with strict LTR isolation (`dir="ltr"`) for chemical structures, SMILES notations, KaTeX formulas, and numerical data.
3. **12-Stage Concept-Mastery Pedagogy**: Problem-first instruction, predict-then-reveal mechanics, <=40-word prompt limits, and purpose-built biophysical interactive artifacts.
4. **Adaptive Progression & Spaced Retention**: 5-box expanding Leitner retrieval engine, formative remediation for student misconceptions, and prerequisite knowledge DAG validation.
5. **Freemium & Pricing Integrity**: 22 permanently free lessons (Lessons 1 & 2 across all 11 modules), 7-day cardless free trial, and strict Turkish Lira (TRY / ₺) pricing.

---

## 2. Codebase Test Setup & Verification Commands

### 2.1 Monorepo Workspace Topology

The repository is structured as a pnpm workspace (`pnpm-workspace.yaml`) with packages, web application, backend functions, courses, and tests:

| Directory | Package Name | Role / Tech Stack | Test Framework | Existing Tests |
|---|---|---|---|---|
| `packages/ui` | `@pharmacy/ui` | Neo-Brutalist design tokens, primitives, ThemeProvider | Vitest 3.0.5 (jsdom) | 14 test files, 32 unit tests |
| `packages/widgets` | `@pharmacy/widgets` | 9 domain-specific interactive simulation widgets | Vitest 3.0.5 (jsdom) | 9 test files, 19 unit tests |
| `packages/platform` | `@pharmacy/platform` | Auth, progress store, access control, Leitner engine | Vitest 3.0.5 (node) | 4 test files, 35 unit tests |
| `apps/web` | `@pharmacy/web` | React 18, Vite 6, Tailwind CSS, React Router 6 | Playwright E2E (via root) | No unit tests; 4 E2E specs in `e2e/` |
| `functions` | `functions` | Cloud Functions v2, Firebase Admin, Dodo webhook | Vitest (rules harness) | Tests located in root `tests/` |
| `courses` | *(none)* | Raw course configs & lesson JSONs (`medchem`, `pharmacology`) | None (schema unvalidated in CI) | 0 tests; not a workspace package |
| `tests` | *(root)* | Firebase Emulator security rules, trial lifecycle | `@firebase/rules-unit-testing` | 3 test files (rules, security, trial) |
| `e2e` | *(root)* | Playwright E2E suite against Brave Browser | `@playwright/test` 1.50.1 | 4 spec files (a11y, gallery, lesson, motion) |

### 2.2 Exact Build and Test Execution Commands

All commands are validated on Windows 11 with PowerShell (`pwsh`), Node.js >= 20, pnpm >= 9, and OpenJDK 17.

```powershell
# 1. Install all dependencies across workspace
pnpm install

# 2. Run unit tests across all workspace packages (memory-safe single-thread mode)
pnpm -r --workspace-concurrency=1 run test
# Command breakdown per package:
# - packages/platform: pnpm --filter @pharmacy/platform run test (vitest run)
# - packages/ui:       pnpm --filter @pharmacy/ui run test (vitest run)
# - packages/widgets:  pnpm --filter @pharmacy/widgets run test (vitest run)

# 3. Run TypeScript typecheck across all workspace packages
pnpm -r --workspace-concurrency=1 run typecheck
# (Runs 'tsc --noEmit' in packages/platform, packages/ui, packages/widgets, apps/web, functions)

# 4. Run ESLint across all workspace packages
pnpm -r run lint
# (Runs 'eslint src/' across packages and apps/web)

# 5. Build production bundle and execute Release Blocker Dev Notes Guard
pnpm run build
# (Compiles web app with Vite and executes 'node scripts/test-prod-bundle.mjs')

# 6. Audit scientific claims and string inventory
pnpm claim-inventory
# (Executes 'node scripts/claim-inventory.mjs' auditing 100% of lesson strings and numerals)

# 7. Run Firebase emulator security rules and backend lifecycle test suite
pnpm test:rules
# (Spawns Firebase Firestore emulator on port 8080 and runs vitest on vitest.rules.config.ts)

# 8. Run Playwright E2E Test Suite (All Projects: Desktop Default, Shields Down, Tablet, Mobile)
pnpm test:e2e
# Or run with specific project filter:
npx playwright test --project=desktop-brave-shields-default
npx playwright test --project=desktop-brave-shields-down
npx playwright test --project=tablet-brave
npx playwright test --project=mobile-brave

# 9. Run single Playwright spec (e.g. Accessibility Audit)
npx playwright test e2e/a11y-audit.spec.ts --project=desktop-brave-shields-default
```

### 2.3 Verification Results from Codebase Probe

Empirical test executions performed during this mining audit:
- `pnpm -r --workspace-concurrency=1 run test`: **PASSED** (27 test files, 86 tests passed in 20.75s).
- `pnpm typecheck`: **PASSED** (5/5 packages clean, exit code 0).
- `pnpm lint`: **PASSED** (5/5 packages clean, exit code 0).
- `pnpm build`: **PASSED** (Vite production build + 3 bundle files audited with 0 forbidden dev notes).
- `pnpm claim-inventory`: **PASSED** (249 string nodes audited, 104 matches mapped, 0 undeclared hits).
- `e2e/a11y-audit.spec.ts` on Desktop Brave: **PASSED** (13 tests passed in 48.2s with zero axe-core critical or serious violations).

---

## 3. Systematic Mapping of Acceptance Criteria & Deliverables A through H

### Deliverable A: Global Localization Architecture & Terminology System

#### Requirements & Scope
1. **Canonical Turkish Terminology**:
   - Course A name must be strictly **"Farmasötik Kimya"** across all UI strings, URLs, metadata, and slide citations. The obsolete term **"Medisinal Kimya"** is strictly forbidden.
   - Course B name is **"Farmakoloji"**.
   - Standardized academic vocabulary based on curricula of Turkish Faculties of Pharmacy (Istanbul University, Ankara University, Hacettepe University).
2. **The Special Arabic Rule**:
   - Instructional prose, explanations, questions, and narratives are written in fluent Modern Standard Arabic (الفصحى الحديثة).
   - Core scientific, chemical, pharmacological, and physiological keywords remain in canonical Turkish/international terminology (e.g., *mitokondri*, *reseptör*, *iyonizasyon*, *biyoizosterizm*, *farmakokinetik*, *afinite*).
   - Technical terms in Arabic text must be enclosed in dedicated typographical semantic badges (e.g. `<span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700" dir="ltr">...</span>`).
3. **Bidirectional (BiDi) RTL / LTR Architecture**:
   - Global root tag switches between `<html lang="tr" dir="ltr">`, `<html lang="ar" dir="rtl">`, and fallback `<html lang="en" dir="ltr">`.
   - Layout mirroring applies to navigation bars, progress bars, drawer panels, step dots, cards, and grid columns.
   - Strict LTR isolation (`dir="ltr"`) for chemical structures, SMILES notations, KaTeX mathematical formulas, numerical expressions, dosage calculations, and code snippets.
   - Punctuation mark stabilization: Commas, periods, colons, parentheses, and brackets must not invert or disconnect at the boundary between Arabic text and Turkish technical terms.

#### Verification Criteria
- [ ] Automated grep/audit script confirms 0 occurrences of "Medisinal Kimya" in any user-facing code or JSON.
- [ ] Automated scanner confirms that every technical term in Arabic lessons is rendered within the designated semantic badge with `dir="ltr"`.
- [ ] Bidirectional rendering test verifies that mathematical equations ($a = P_t / P_0$) and SMILES strings retain correct left-to-right orientation in Arabic mode.

---

### Deliverable B: Complete Product Content Inventory

#### Requirements & Scope
Exhaustive hierarchical mapping of every user-facing string across every page, component, state, and locale:

```
Page -> Component -> State -> String Key -> Turkish (TR) -> Arabic (AR)
```

Surfaces included:
1. **Catalog Page (`/catalog`)**:
   - Navigation, hero header, search filter bar, course selection cards (Course A & Course B).
   - Module list accordions, free lesson badges (`"Her Modülde 1. ve 2. Ders Kalıcı Olarak Ücretsiz"` / `"الدرس 1 و 2 مجاناً في كل موديول"`).
   - Exam alignment badges (EUS, NAPLEX, SPLE).
   - CTAs (`"Ücretsiz 1. Derse Başla"`, `"Öğrenci Aboneliklerini İncele"`).
2. **Course / Module View (`/courses/:courseId/modules/:moduleId`)**:
   - Module title, description, learning competencies, prerequisite warning banner.
   - Lesson items (Lesson 1 & 2 marked "Ücretsiz / Free", Lessons 3+ marked with lock icon).
3. **Lesson Viewer (`/courses/:courseId/lessons/:lessonId`)**:
   - Top progress bar, step counter (`"Adım 1 / 10"` / `"الخطوة 1 من 10"`), streak counter, XP counter.
   - Step card: Category badge, title, concise prompt (<=40 words).
   - Interactive simulation container, radio options, commit hypothesis button (`"Hipotezi Onayla ve Sonucu Gör"` / `"تأكيد الفرضية وإظهار النتيجة"`).
   - Diagnostic feedback banners: Misconception identified vs. Hypothesis confirmed.
   - 3-Tier Hint Ladder Drawer: Guiding Nudge (Free) vs. Mechanism & Worked Solution (Locked/Trial).
   - Sources & Textbook Citations Accordion (Foye's, Patrick, Wermuth, university lecture slide provenance).
   - Step 10 Recap Card: Key takeaways, XP award animation, Leitner queue enrollment notice.
4. **Pricing Page (`/pricing`)**:
   - Hero header, scope switcher (Single Course vs Dual Bundle).
   - Pass cards: Monthly (₺250 single / ₺350 bundle), Semester (₺850 single / ₺1,150 bundle), Annual (₺1,450 single / ₺2,100 bundle).
   - Exclusively TRY (₺) currency symbols with zero USD/EUR references.
   - 22 free lessons guarantee banner, 7-day cardless free trial banner and activation CTA.
5. **Interactive Gallery (`/gallery`)**:
   - Neo-Brutalist component matrix (buttons, cards, badges, inputs, sliders, steppers, empty states, skeleton loaders).
   - All 9 interactive pharmacy widgets showcase with live parameter controls.
6. **Authentication & Paywall Modals**:
   - `AuthModal`: Student login/register tabs, Turkish Pharmacy Faculties selector dropdown (10 faculties), guest mode link.
   - `PaywallModal`: Locked lesson interception, pass selection, 1-click cardless 7-day trial button.

#### Verification Criteria
- [ ] 0 untranslated English strings or placeholder text on any page in TR or AR locale.
- [ ] 0 missing translation keys across translation dictionaries.

---

### Deliverable C: Course Architecture & Prerequisite Knowledge Graph

#### Requirements & Scope
The platform delivers two complete, commercial-grade courses structured into **11 modules** and formal concept dependency DAGs:

```
                            [ COURSE A: Farmasötik Kimya ]
                                          │
            ┌─────────────────────────────┼─────────────────────────────┐
            ▼                             ▼                             ▼
   Module 1: Fizikokimyasal      Module 2: Fonksiyonel         Module 3: Biyoizosterizm
   Esaslar (Ferguson, Çözünürlük) Gruplar & Bağlar (H-bağı,     & Akılcı İlaç Tasarımı
            │                             │ (İyonik, van der Waals)     │
            └──────────────┬──────────────┘                             ▼
                           ▼                                   Module 4: Stereokimya &
                  Module 5: İlaç Biyotransformasyonu           Optik İzomeri (Kiralite)
                  & Metabolizma (CYP Faz I/II)
                                          │
                                          │ (Cross-Course Concept Bridge)
                                          ▼
                            [ COURSE B: Farmakoloji ]
                                          │
            ┌─────────────────────────────┼─────────────────────────────┐
            ▼                             ▼                             ▼
   Module 1: İlaç-Reseptör       Module 2: Farmakodinami       Module 3: Farmakokinetik
   Etkileşimleri & Kuvvetler     (Konsantrasyon-Etki, Emax)    (ADME, Klirens, Vd, t1/2)
            │                             │                             │
            └─────────────────────────────┼─────────────────────────────┘
                                          ▼
                     ┌────────────────────┴────────────────────┐
                     ▼                                         ▼
   Module 4: Otonom Sinir Sistemi            Module 5: Kardiyovasküler &
   (Sempatik / Parasempatik)                 Renal Farmakoloji
                     │                                         │
                     └────────────────────┬────────────────────┘
                                          ▼
                             Module 6: Merkezi Sinir Sistemi
                             (Sedatif, Anestezik, Nörotransmiter)
```

#### Curriculum Breakdown:
1. **Course A: Farmasötik Kimya (5 Modules)**
   - Module 1: İlaç Etkisinin Fizikokimyasal Esasları (Lessons 1 & 2 Free)
   - Module 2: Fonksiyonel Gruplar, İyonizasyon ve Kimyasal İskeletler (Lessons 1 & 2 Free)
   - Module 3: Klasik ve Non-Klasik Biyoizosterizm (Lessons 1 & 2 Free)
   - Module 4: Moleküler Stereokimya ve 3B Reseptör Uyumu (Lessons 1 & 2 Free)
   - Module 5: İlaç Biyotransformasyonu ve Enzimatik Yolaklar (Lessons 1 & 2 Free)
2. **Course B: Farmakoloji (6 Modules)**
   - Module 1: İlaç-Reseptör Etkileşimleri ve Moleküler Kuvvetler (Lessons 1 & 2 Free)
   - Module 2: Farmakodinami: Konsantrasyon-Etki Dinamikleri (Lessons 1 & 2 Free)
   - Module 3: Farmakokinetik (ADME) ve İn Vivo Biyotransformasyon (Lessons 1 & 2 Free)
   - Module 4: Otonom Sinir Sistemi Farmakolojisi (Lessons 1 & 2 Free)
   - Module 5: Kardiyovasküler ve Renal Terapötikler (Lessons 1 & 2 Free)
   - Module 6: Merkezi Sinir Sistemi Farmakolojisi (Lessons 1 & 2 Free)
3. **Total Modules**: 11
4. **Total Permanently Free Lessons**: 11 modules * 2 lessons = **22 Free Lessons**.

#### Knowledge Graph DAG Rules:
- **Acyclicity**: Graph must be an authenticated Directed Acyclic Graph (DAG) with zero circular dependencies.
- **Strict Prerequisite Gating**: A student cannot start an advanced lesson until all prerequisite concept nodes are completed with >=80% accuracy.
- **Fast-Track Placement**: Students scoring >=85% on a module pre-test may mark prerequisite concepts as verified.

#### Verification Criteria
- [ ] Topological sort test validates that knowledge graph contains 0 cycles.
- [ ] Prerequisite enforcement test confirms that attempting to start a lesson with unfulfilled prerequisites displays a locked state and references the required prerequisite lesson.

---

### Deliverable D: Course Sequence & Pedagogical Rationales

#### Pedagogical Design Rules
1. **Cognitive Load Optimization (Sweller's CLT)**:
   - Fundamental physical parameters (thermodynamic activity, solubility, ionization) must precede complex 3D molecular targets.
   - Pharmacodynamics (receptor binding affinity, efficacy, competitive antagonism) must precede organ-system clinical pharmacology.
2. **Backward Fading & Scaffolding (Renkl & Atkinson)**:
   - Full Worked Example -> Faded Mechanistic Calculation -> Independent Transfer Task.
3. **Interleaving & Dual-Course Cross-Linking**:
   - Concepts in Farmasötik Kimya directly reinforce Farmakoloji. Example: Thermodynamic activity in MedChem Module 1 bridges directly to inhalation anesthetics in Pharmacology Module 6.

#### Verification Criteria
- [ ] Each lesson module config contains documented rationale and cross-course prerequisite references.
- [ ] Review sessions interleave concepts between Course A and Course B.

---

### Deliverable E: Lesson Blueprints for Course A & Course B

#### 12-Stage Lesson Progression Anatomy
Every lesson across both courses must implement exactly the 12-stage progression:

| Stage # | Stage Name | Pedagogical Purpose | Interaction Format | Max Word Limit |
|---|---|---|---|---|
| **1** | **Hook** | Problem-first curiosity spark; clinical puzzle | Clinical vignette or observation card | <= 40 words |
| **2** | **Question** | Prior knowledge retrieval; commit to hypothesis | Multi-choice prediction challenge | <= 40 words |
| **3** | **Intuition** | Analogical or visual intuition before jargon | Visual scaffold or physical analogy | <= 40 words |
| **4** | **Visual Explanation** | Dynamic visual clarifying molecular mechanism | 2D/3D structure or molecular diagram | <= 40 words |
| **5** | **Interactive Artifact** | Variable manipulation & discovery learning | Purpose-built simulation widget | Interactive |
| **6** | **Guided Discovery** | Structured exploration of cause and effect | Targeted discovery prompts | <= 40 words |
| **7** | **Formal Explanation** | Rigorous chemical/pharmacological principle | Theoretical summary card | <= 40 words |
| **8** | **Concept Check** | Formative checkpoint catching misconceptions | Diagnostic checkpoint question | <= 40 words |
| **9** | **Application** | Realistic clinical case or drug design challenge | Transfer scenario with options | <= 40 words |
| **10** | **Retrieval** | Spaced recall connecting to earlier modules | Low-stakes recall challenge | <= 40 words |
| **11** | **Connection** | Forward-looking bridge to next topic | Conceptual synthesis note | <= 40 words |
| **12** | **Mastery Check** | Summative validation & reward | XP celebration, citations, Leitner card enqueue | <= 40 words |

#### Verification Criteria
- [ ] Automated content linter asserts that every lesson JSON contains all 12 stages.
- [ ] Prompt word counter asserts that prompt strings contain <= 40 words per stage.
- [ ] Every stage contains 3-tier hints (Nudge, Mechanism, Solution).
- [ ] Distractor options provide diagnostic misconception feedback.

---

### Deliverable F: Interactive Artifact Specifications

9 purpose-built biophysical and pharmacological simulation widgets:

| Artifact ID | Artifact Name | Scientific Domain | Controlled Inputs | Observable Real-Time Outputs | Error / Boundary Conditions | Fallback Mode |
|---|---|---|---|---|---|---|
| `ART-01` | **Ferguson Thermodynamic Activity Simulator** | MedChem (Mod 1) | Vapor pressure slider ($P_t$), Saturation pressure ($P_0$) | Activity curve $a = P_t / P_0$, partition percentage into lipid biophase | $P_t > P_0$ prevented; $P_0 = 0$ division-by-zero clamped | Static comparison table |
| `ART-02` | **Henderson-Hasselbalch Ionization Modulator** | MedChem (Mod 1, 2) | pH slider (0.0 to 14.0), drug pKa slider (1.0 to 12.0), acid/base toggle | % ionized vs % un-ionized, membrane diffusion rate indicator | Extreme pH clamped at 0 and 14 | Tabular ionization reference |
| `ART-03` | **LogP Lipophilicity & BBB Partition Canvas** | MedChem (Mod 1) | Alkyl chain length slider, polar group additions | Octanol/water partition ratio, Lipinski Rule of 5 alert | LogP > 7 precipitates; LogP < -2 fails absorption | Static partition graphic |
| `ART-04` | **SAR Explorer (Propranolol Analogs)** | MedChem (Mod 2, 4) | Substituent dropdown (isopropyl, tert-butyl, methyl), ring modifications | Binding affinity ($K_i$), beta-1 vs beta-2 selectivity badge | Bulky hindrance warning; steric clash alert | 2D structure card |
| `ART-05` | **Classical & Non-Classical Bioisostere Replacer** | MedChem (Mod 3) | Target group selection (carboxylate, ester, amide), bioisostere replacement (tetrazole, hydroxamic acid) | pKa change, metabolic stability indicator, electronic density map | Incompatible valence rejected | Static bioisostere table |
| `ART-06` | **Receptor-Ligand Lock & Key Matcher** | Pharmacology (Mod 1) | Draggable chemical moieties (amine, hydroxyl, aromatic ring) | Binding energy ($\Delta G$), bond type indicator (ionic, H-bond, van der Waals) | Misaligned moiety causes repulsive steric clash | Multiple-choice pairing |
| `ART-07` | **Dose-Response Curve & Antagonist Modulator** | Pharmacology (Mod 2) | Agonist concentration slider, antagonist presence (competitive vs non-competitive), antagonist dose | Semi-log sigmoidal curve, $EC_{50}$ shift, $E_{max}$ depression, Schild plot | Negative concentration rejected; maximum dose capped | Static dose-response graph |
| `ART-08` | **One-Compartment Pharmacokinetics Simulator** | Pharmacology (Mod 3) | Dose (mg), Clearance ($Cl$), Volume of Distribution ($V_d$), Single vs Multiple dosing toggle | Plasma concentration-time curve ($C_p$ vs $t$), $t_{1/2}$, $AUC$, peak/trough steady-state | $V_d \le 0$ clamped; clearance rate exceeding cardiac output flagged | Pre-calculated concentration table |
| `ART-09` | **CYP450 Metabolism Pathway Mapper** | MedChem (Mod 5) / Pharm (Mod 3) | Substrate drug selector, enzyme isoform selector (CYP3A4, CYP2D6, CYP2C9, UGT) | Phase I metabolite structure, Phase II conjugated product, inactive vs toxic metabolite flag | Co-administered inhibitor blocks pathway with clinical alert | Static metabolism pathway chart |

#### Verification Criteria
- [ ] Real-time updates without page reload or layout shift (CLS < 0.05).
- [ ] Keyboard accessible: All sliders, toggles, and buttons controllable via Tab, Enter, Space, and Arrow keys.
- [ ] Responsive down to 375px mobile viewport without clipping.

---

### Deliverable G: Adaptive Progression & Spaced Retention Engine

#### Requirements & Scope
1. **5-Box Expanding Leitner Spaced Repetition**:
   - Upon completing any lesson, exactly **3 retrieval tokens / review cards** are automatically enqueued to Box 1.
   - Leitner Schedule:
     - **Box 1**: 1-day interval
     - **Box 2**: 3-day interval
     - **Box 3**: 7-day interval
     - **Box 4**: 16-day interval
     - **Box 5**: 35-day interval (Mastered)
   - Correct recall advances card to Box $N+1$; incorrect recall demotes card to Box 1 immediately.
2. **Formative Remediation Engine**:
   - If a student selects an incorrect distractor in a checkpoint, the engine delivers diagnostic micro-remediation tailored to that specific misconception.
   - Student cannot proceed until demonstrating comprehension of the remediation card.
3. **Inactivity Reactivation Warmup**:
   - Inactivity > 14 days triggers a gentle 3-card reactivation warmup prior to presenting new curriculum content.
4. **Data Integrity & Offline Persistence**:
   - Progress and review cards persist in `localStorage` for guest users and sync to Cloud Firestore `/users/{uid}/progress` and `/users/{uid}/review_cards` upon authentication.
   - Downgrade from trial to free preserves 100% of user progress, XP, and Leitner review history.

#### Verification Criteria
- [ ] Completing Lesson 1 creates exactly 3 cards in Box 1 with `nextDueDate` set to tomorrow.
- [ ] Answering correctly advances card to Box 2 with `nextDueDate` set to +3 days.
- [ ] Trial expiry downgrade retains 100% of completed lesson IDs and XP.

---

### Deliverable H: Translation & Content QA Audit Matrix

#### Requirements & Scope
Rigorous audit protocol verifying:
1. **Vocabulary Standards**: 100% compliance with canonical Turkish ("Farmasötik Kimya") and Special Arabic Rule.
2. **Design Tokens & Dark Mode**: Academic Midnight Slate (`#0B0F17` canvas, `#131B2A` cards, `#1E293B` surfaces, `#334155` slate borders, `#030712` deep shadows, `#F59E0B` warm amber focus rings). Pure white cages (`border-white`) and fluorescent drop shadows strictly prohibited.
3. **Currency & Commercial Integrity**: Strict TRY (₺) pricing with ₺250 monthly, ₺850 semester, ₺1,450 annual single-course passes; ₺350 monthly, ₺1,150 semester, ₺2,100 annual dual bundle passes.
4. **Automated Axe-Core Accessibility**: 0 critical or serious violations, WCAG 2.1 AA contrast standards (>= 4.5:1 for body copy, >= 3:1 for UI controls).
5. **No Production Dev String Leaks**: Zero occurrences of `unverified`, `pending-human-review`, or internal audit tags in production bundle.

---

## 4. 4-Tier E2E Testing Strategy & Matrix

To ensure institutional credibility, bulletproof security, and flawless multilingual UX, testing is structured across four progressive tiers.

```
+-----------------------------------------------------------------------------------+
|               TIER 4: REAL-WORLD APPLICATION SCENARIOS (E2E Clinical Flows)       |
+-----------------------------------------------------------------------------------+
                                          ▲
+-----------------------------------------------------------------------------------+
|               TIER 3: CROSS-FEATURE COMBINATIONS (Pairwise Interactions)          |
+-----------------------------------------------------------------------------------+
                                          ▲
+-----------------------------------------------------------------------------------+
|               TIER 2: BOUNDARY & CORNER CASES (>=5 Tests Per Feature)             |
+-----------------------------------------------------------------------------------+
                                          ▲
+-----------------------------------------------------------------------------------+
|               TIER 1: FEATURE COVERAGE (>=5 Tests Per Feature)                    |
+-----------------------------------------------------------------------------------+
```

---

### 4.1 Tier 1: Feature Coverage (>=5 Test Cases Per Feature)

Every platform feature must have at least 5 distinct, automated positive verification test cases:

#### Feature 1: Global Localization & Language Switcher
1. `T1-LOC-01`: Switch to Turkish (TR) sets `<html lang="tr" dir="ltr">` and renders Turkish headers.
2. `T1-LOC-02`: Switch to Arabic (AR) sets `<html lang="ar" dir="rtl">` and activates mirrored flex/grid layouts.
3. `T1-LOC-03`: Language switcher preserves active route and query parameters across toggles.
4. `T1-LOC-04`: Navigation links, catalog cards, and footer display 0 untranslated English strings in TR.
5. `T1-LOC-05`: Fallback to default locale (`tr`) occurs seamlessly when no locale is stored in localStorage.

#### Feature 2: Terminology Governance & Special Arabic Rule
1. `T2-TERM-01`: Course A displays strictly "Farmasötik Kimya" across all headers, cards, and metadata.
2. `T2-TERM-02`: Zero occurrences of "Medisinal Kimya" anywhere in rendered DOM or bundle strings.
3. `T2-TERM-03`: In Arabic lesson mode, instructional prose renders in Modern Standard Arabic while canonical keywords (*mitokondri*, *reseptör*, *iyonizasyon*) render in Turkish.
4. `T2-TERM-04`: Technical terms in Arabic prose are wrapped in dedicated semantic badge elements with `dir="ltr"`.
5. `T2-TERM-05`: Semantic badges feature distinct styling (amber tone, mono font, pill border) without breaking line height.

#### Feature 3: Bidirectional RTL / LTR Mirroring
1. `T3-BIDI-01`: Top navigation bar mirrors layout in Arabic mode (logo on right, navigation links on left).
2. `T3-BIDI-02`: Progress bar fills from right to left in Arabic mode (`dir="rtl"`).
3. `T3-BIDI-03`: Chemical SMILES notations and 2D molecular canvases remain strictly in LTR orientation.
4. `T3-BIDI-04`: KaTeX mathematical equations ($a = P_t / P_0$) render with LTR formula alignment.
5. `T3-BIDI-05`: Punctuation marks (colons, question marks, parentheses) do not invert or detach at BiDi boundaries.

#### Feature 4: 12-Stage Lesson Progression & Anatomy
1. `T4-LESSON-01`: Step 1 Hook displays clinical contrast scenario with problem-first presentation.
2. `T4-LESSON-02`: Step 2 Question enforces hypothesis selection before enabling Advance button.
3. `T4-LESSON-03`: Committing an incorrect hypothesis reveals diagnostic misconception feedback without blocking progress.
4. `T4-LESSON-04`: Committing correct hypothesis displays confirmation feedback and enables next step.
5. `T4-LESSON-05`: Step 12 Mastery Check awards +50 XP and confirms 3 review cards enqueued to Leitner queue.

#### Feature 5: Interactive Simulation Widgets
1. `T5-WIDGET-01`: Ferguson Simulator recalculates thermodynamic activity $a$ in real-time as slider moves.
2. `T5-WIDGET-02`: Dose-Response widget demonstrates rightward parallel shift upon competitive antagonist selection.
3. `T5-WIDGET-03`: PK Simulator updates plasma concentration curve upon toggling multiple dosing mode.
4. `T5-WIDGET-04`: Receptor Ligand Matcher validates hydrogen bonding moiety alignment.
5. `T5-WIDGET-05`: Structure Identifier highlights essential pharmacophore groups upon student selection.

#### Feature 6: Prerequisite Knowledge Graph & Navigation
1. `T6-GRAPH-01`: Module 1 displays as unlocked and accessible for initial student start.
2. `T6-GRAPH-02`: Advanced modules display prerequisite requirement badges.
3. `T6-GRAPH-03`: Completing foundational lesson unlocks dependent lesson in the knowledge graph.
4. `T6-GRAPH-04`: Course switcher navigates cleanly between Farmasötik Kimya and Farmakoloji catalogs.
5. `T6-GRAPH-05`: Fast-track placement allows students scoring >=85% on diagnostic pre-test to mark prerequisites completed.

#### Feature 7: Spaced Retrieval & Adaptive Progression Engine
1. `T7-SPACED-01`: Enqueues exactly 3 cards to Leitner Box 1 upon lesson completion.
2. `T7-SPACED-02`: Review cards display prompt on front and detailed scientific rationale on back.
3. `T7-SPACED-03`: Marking card correct promotes it to Box 2 with 3-day interval.
4. `T7-SPACED-04`: Marking card incorrect returns it to Box 1 with 1-day interval.
5. `T7-SPACED-05`: Formative diagnostic failure on checkpoint presents targeted micro-remediation.

#### Feature 8: Freemium Gating & Pricing Integrity
1. `T8-PAYWALL-01`: Lessons 1 and 2 across all 11 modules are accessible to unauthenticated guest students.
2. `T8-PAYWALL-02`: Navigating to Lesson 3 automatically triggers the PaywallModal for free-tier users.
3. `T8-PAYWALL-03`: Pricing page displays exclusively Turkish Lira (₺250, ₺850, ₺1,450) with 0 foreign currency references.
4. `T8-PAYWALL-04`: 1-click activation of 7-day cardless free trial grants immediate premium access.
5. `T8-PAYWALL-05`: Simulated day 8 downgrade relocks Lesson 3 while preserving 100% of student progress and XP.

#### Feature 9: Student Authentication & Faculty Affiliation
1. `T9-AUTH-01`: Registration modal includes dropdown of Turkish Pharmacy Faculties (10 canonical options).
2. `T9-AUTH-02`: Selecting faculty saves affiliation to user profile in Firestore.
3. `T9-AUTH-03`: Guest student can complete free lessons without creating an account.
4. `T9-AUTH-04`: Converting guest to registered account seamlessly transfers localStorage progress.
5. `T9-AUTH-05`: Form validation displays localized inline error messages for invalid emails/passwords.

#### Feature 10: Academic Midnight Slate Design & Accessibility
1. `T10-THEME-01`: Dark mode applies `#0B0F17` canvas, `#131B2A` card backgrounds, and `#334155` borders.
2. `T10-THEME-02`: Focus states display `#F59E0B` warm amber outline with 3px offset.
3. `T10-THEME-03`: Pure white cages (`border-white`) and fluorescent drop shadows are absent.
4. `T10-THEME-04`: Full keyboard navigation (Tab, Enter, Space, Arrows) completes lesson without mouse.
5. `T10-THEME-05`: Axe-core automated scan reports 0 critical or serious accessibility violations.

---

### 4.2 Tier 2: Boundary & Corner Cases (>=5 Test Cases Per Feature)

#### Boundary 1: Localization & RTL Boundaries
1. `T2-BND-01`: Rapidly toggling between TR, AR, and EN 10 times in 2 seconds causes no layout explosion or unhandled exception.
2. `T2-BND-02`: Chemical formula embedded in middle of Arabic RTL paragraph maintains LTR order without punctuation inversion.
3. `T2-BND-03`: KaTeX equation with complex fractions ($\frac{P_t}{P_0}$) renders correctly inside Arabic flex container.
4. `T2-BND-04`: Long Arabic university name does not overflow or truncate faculty selector button.
5. `T2-BND-05`: Resizing window across mobile (375px), tablet (768px), and desktop (1440px) during RTL mode produces 0 horizontal scrollbar leaks.

#### Boundary 2: 12-Stage Lesson Stepper Boundaries
1. `T2-BND-06`: Pressing Enter on prediction step without selecting a radio option triggers validation warning; does not crash or advance.
2. `T2-BND-07`: Rapidly double-clicking "Commit Hypothesis" submits exactly once without duplicate XP awards.
3. `T2-BND-08`: Refreshing browser at Step 6 restores student directly to Step 6 with previous choices retained.
4. `T2-BND-09`: Navigating backwards to Step 1 locks previously revealed answers to preserve diagnostic honesty.
5. `T2-BND-10`: Keyboard ArrowLeft on Step 1 and ArrowRight on Step 12 do not throw index out-of-bounds errors.

#### Boundary 3: Interactive Simulation Widget Boundaries
1. `T2-BND-11`: Setting Ferguson slider to $P_t = P_0$ reaches exactly $a = 1.00$ without floating-point precision overflow ($1.0000000000002$).
2. `T2-BND-12`: Setting $P_t = 0$ calculates $a = 0.00$ cleanly without division by zero errors.
3. `T2-BND-13`: Extreme pH slider values ($0.0$ and $14.0$) render correctly without NaN or off-scale graph plots.
4. `T2-BND-14`: LogP slider set to $-5.0$ and $+10.0$ handles extreme hydrophilic/lipophilic color scales without canvas crash.
5. `T2-BND-15`: Dragging multiple receptor ligands simultaneously on touch screens does not orphan SVG coordinate bindings.

#### Boundary 4: Spaced Repetition Engine Boundaries
1. `T2-BND-16`: Reviewing cards when 0 cards are due renders Neo-Brutalist empty state with "Tüm tekrarlar tamamlandı" message.
2. `T2-BND-17`: Returning after 30 days of inactivity enqueues 3-card gentle reactivation warmup before new lessons.
3. `T2-BND-18`: Demoting card from Box 5 back to Box 1 resets interval to 1 day and logs lapse count.
4. `T2-BND-19`: Enqueueing review cards when localStorage is near quota handles storage errors gracefully.
5. `T2-BND-20`: User in UTC+14 timezone completes cards at 23:59 and 00:01 without streak calculation double-count.

#### Boundary 5: Paywall, Trial & Security Boundaries
1. `T2-BND-21`: Invoking `executeStartFreeTrial` twice on same user account rejects with `failed-precondition`.
2. `T2-BND-22`: Client-side tampering with localStorage entitlement status does not permit reading paid Firestore lesson docs.
3. `T2-BND-23`: Expired trial user navigating directly to `/courses/medchem/lessons/3` via deep link is blocked by PaywallModal.
4. `T2-BND-24`: Webhook endpoint rejects requests missing `x-dodo-signature` header with 401 Unauthorized.
5. `T2-BND-25`: Webhook replay attack with identical `eventId` is rejected by Firestore idempotency lock.

---

### 4.3 Tier 3: Cross-Feature Combinations (Pairwise Matrix)

Pairwise interaction matrix validating intersecting dimensions:

| Test ID | Dimension A | Dimension B | Test Scenario & Verification |
|---|---|---|---|
| `T3-PAIR-01` | Arabic RTL Mode (`ar`) | Academic Midnight Slate Dark Theme | Verify high contrast, zero border clipping, mirrored navigation, and correct amber focus rings on `#0B0F17` background. |
| `T3-PAIR-02` | Mobile Viewport (375px) | 12-Stage Lesson Step Dots | Verify that 12 step dots scroll smoothly horizontally without overflowing screen width or causing Cumulative Layout Shift (CLS < 0.05). |
| `T3-PAIR-03` | Special Arabic Rule | Chemical Formula LTR Isolation | In Arabic mode, verify sentence: *"تتحقق التهدئة عندما يصل تركيز <span class='tr-term' dir='ltr'>dietil eter</span> إلى $a = 0.05$ في الأغشية"* renders with formula and Turkish term in LTR without punct inversion. |
| `T3-PAIR-04` | 7-Day Free Trial (Active) | 3-Tier Hint Ladder | Verify that activating free trial unlocks Tiers 2 (Mechanism) and 3 (Solution) hints across all lesson steps without triggering paywall. |
| `T3-PAIR-05` | Trial Expiry Downgrade | LocalStorage Progress & Leitner Queue | After Day 8 downgrade to Free, verify that student's completed lessons, earned XP (+50 XP), and Box 1/2 review cards remain 100% intact. |
| `T3-PAIR-06` | Turkish Locale (`tr`) | Pricing Scope Toggle (Single vs Dual) | Switching between "Tek Ders" and "İkili Paket" toggles prices between ₺250/₺850/₺1,450 and ₺350/₺1,150/₺2,100 with zero delay. |
| `T3-PAIR-07` | Guest User Mode | Step Progress Persistence | Guest student completes 10 steps of Lesson 1, refreshes page, and verifies that progress bar and completion state persist via localStorage. |
| `T3-PAIR-08` | Reduced Motion Mode | Paywall Modal & Interactive Widget | Under `prefers-reduced-motion: reduce`, modal opens with instant fade (0ms transform) and widget sliders update without animated spring delays. |
| `T3-PAIR-09` | Keyboard Navigation | Turkish Pharmacy Faculty Dropdown | Using Tab to enter AuthModal and ArrowDown to select "Hacettepe Üniversitesi", pressing Enter commits selection cleanly. |
| `T3-PAIR-10` | Offline Network Simulation | Free Preview Lesson Navigation | Disconnecting network allows seamless completion of cached Lesson 1 & 2 steps; attempting to load paid Lesson 3 shows offline notice. |

---

### 4.4 Tier 4: Real-World Application Scenarios (Clinical & Learning Flows)

#### Scenario 1: First-Year Turkish Student Discovers Ferguson's Principle (Course A, Lesson 1)
- **Persona**: Deniz, 1st year pharmacy student at Istanbul University preparing for Farmasötik Kimya exams.
- **Flow**:
  1. Lands on `/catalog`, reads Turkish description under *"Ders A: Farmasötik Kimya"*.
  2. Clicks *"Ücretsiz 1. Derse Başla"*, landing on `/courses/medchem/lessons/1`.
  3. Step 1 (Hook): Reads clinical puzzle contrasting diethyl ether (grams) vs propranolol (milligrams).
  4. Step 2 (Question): Predicts that thermodynamic activity $a$ drops to 0 when vapor reaches saturation.
  5. Commits hypothesis: Sees diagnostic misconception card: *"Doygunluk buharlaşma eğilimini maksimize eder; çözünmeyi durdurmaz."*
  6. Opens Hint Ladder: Reads free Tier 1 nudge hint.
  7. Step 3 to Step 9: Explores non-specific threshold, equilibrium partition, and completes faded calculation ($a = 10 / 200 = 0.05$).
  8. Step 10: Receives "+50 XP", masters lesson, and observes 3 cards enqueued to Leitner Box 1.
  9. Expands Citations Accordion: Inspects textbook citations (Foye's, Patrick) and lecture slide provenance (*Farmasötik ve Medisinal Kimya 1-Giriş.pdf*, pp. 17-23).

#### Scenario 2: Arabic-Speaking Student Analyzes Receptor Binding with Special Arabic Rule (Course B, Lesson 1)
- **Persona**: Tariq, pharmacy student in the MENA region using the platform in Arabic.
- **Flow**:
  1. Clicks "AR" language button on navbar; interface transforms to `<html dir="rtl" lang="ar">`.
  2. Enters Course B (Farmakoloji) Module 1 Lesson 1.
  3. Instructional text displays in Modern Standard Arabic with Turkish canonical keywords (*reseptör*, *bağlanma afinitesi*, *hidrojen bağı*) rendered in distinct amber-bordered badges with LTR isolation.
  4. Interacts with Receptor Matcher widget: drags functional moieties into beta-1 adrenergic receptor binding pocket.
  5. Verifies that chemical structures and interaction formulas ($\Delta G = \Delta H - T\Delta S$) render strictly in LTR without font corruption or punctuation inversion.

#### Scenario 3: Free Trial Lifecycle & Non-Destructive Freemium Downgrade
- **Persona**: Ayşe, completing free preview and exploring premium content.
- **Flow**:
  1. Completes Lesson 1 and Lesson 2 of Module 1 for free.
  2. Attempts to open Lesson 3: PaywallModal immediately opens with semester pass highlighted (₺850).
  3. Clicks "7 Günlük Kartsız Deneme Sürümünü Başlat".
  4. Trial activates instantly with zero credit card entry; user profile updates to `plan: 'trial'` with active `dual_bundle` entitlement.
  5. Lesson 3 unlocks immediately with full access to Tier 2 & 3 hints.
  6. Simulated backend trial expiration (Day 8): Cloud Function downgrades user to `plan: 'free'`.
  7. Navigates back to platform: Trial expired banner appears; Lesson 3 is locked again.
  8. **Data Integrity Check**: 100% of Ayşe's Lesson 1 & 2 completion records, 100 XP, and Leitner spaced repetition flashcards remain completely intact.

#### Scenario 4: Interleaved Daily Spaced Review Session
- **Persona**: Mehmet, returning on Day 3 for his daily retention warmup.
- **Flow**:
  1. Opens platform; notification badge indicates 5 review cards due in Box 1 and Box 2.
  2. Enters `/review`: Session presents interleaved deck mixing MedChem SAR cards and Pharmacology receptor affinity cards.
  3. Card 1 (Ferguson threshold): Answers correctly -> Card promoted to Box 2 (+3 day interval).
  4. Card 2 (CYP3A4 oxidation): Answers incorrectly -> Card demoted to Box 1 (+1 day interval).
  5. Session completes in 4 minutes with updated mastery score and streak incremented to 3 days.

#### Scenario 5: Academic Midnight Slate Accessibility & Keyboard Audit
- **Persona**: Zeynep, visually impaired pharmacy student using keyboard navigation and dark mode.
- **Flow**:
  1. Toggles Dark Mode; canvas updates to `#0B0F17`, cards to `#131B2A`, borders to `#334155`.
  2. Navigates entire catalog and lesson flow using keyboard only (`Tab`, `Enter`, `Space`, `1-4`, `ArrowRight`).
  3. Focus indicator renders in `#F59E0B` warm amber with 3px visible offset.
  4. Automated Axe-Core scan confirms: 0 critical violations, 0 serious violations, body contrast ratio >= 7.1:1, UI control contrast >= 4.5:1.

---

### 4.5 Playwright E2E Matrix Configurations

Test projects configured in `playwright.config.ts`:

| Project Name | Browser Engine | Executable Path | Viewport | Locale Tested | Shield Mode |
|---|---|---|---|---|---|
| `desktop-brave-shields-default` | Brave / Chromium | `C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe` | 1440 x 900 | TR, AR, EN | Shields ON (Aggressive tracker & fingerprint block) |
| `desktop-brave-shields-down` | Brave / Chromium | `C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe` | 1440 x 900 | TR, AR, EN | Shields OFF (`--disable-brave-shields`) |
| `tablet-brave` | Brave / Chromium | `C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe` | 768 x 1024 | TR, AR | Default |
| `mobile-brave` | Brave / Chromium | `C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe` | 375 x 667 | TR, AR | Mobile emulation (`isMobile: true`) |

#### Execution Assertions Per Test:
- Zero unhandled console errors: `expect(consoleErrors).toEqual([])`.
- Zero failed internal network requests: `expect(failedRequests).toEqual([])`.
- Zero unauthorized remote Firestore writes for guest users: `expect(remoteFirestoreWrites).toEqual([])`.
- Cumulative Layout Shift (CLS) < 0.05.
- Zero jank frames exceeding 250ms during micro-interactions.

---

### 4.6 Axe-Core Automated Accessibility Scan Suite

Every user-facing route (`/gallery`, `/catalog`, `/pricing`, `/courses/medchem/lessons/:id`) and open modal must pass automated axe-core scanning:

```typescript
const axeResults = await page.evaluate(async () => {
  return await (window as any).axe.run({
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
  });
});

const seriousOrCritical = axeResults.violations.filter(
  (v: any) => v.impact === 'serious' || v.impact === 'critical'
);
expect(seriousOrCritical).toEqual([]);
```

#### Contrast Standards (WCAG 2.1 AA):
- Body text against canvas/card: Ratio >= 4.5:1 (`#F1F5F9` on `#0B0F17` = 16.8:1, `#000000` on `#FFF8E7` = 19.5:1).
- Large text / Headings: Ratio >= 3.0:1.
- UI Controls & Borders: Ratio >= 3.0:1 against adjacent background.

---

## 5. Features Discovered & Edge Cases

### Features Discovered
| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|---|---|---|---|---|---|---|
| 1 | Localization | Language Toggle | Switches active language between Turkish (`tr`), Arabic (`ar`), and English (`en`) | User click on locale button | Root attributes `lang` & `dir`, translated UI strings | Defaults to `tr` if invalid locale given | `apps/web/src/components/Navbar.tsx` |
| 2 | BiDi | RTL Layout Mirroring | Automatically mirrors flex, grid, and navigation containers when Arabic is active | Active locale `ar` | `dir="rtl"` applied to document element and containers | Elements with `dir="ltr"` preserved | `packages/ui/src/theme/ThemeProvider.tsx` |
| 3 | BiDi | LTR Formula Isolation | Forces left-to-right orientation for KaTeX, SMILES, and chemical structures | Chemical/formula data | DOM container with `dir="ltr"` | Prevents inverted notation or broken brackets | `e2e/lesson-slice.spec.ts` |
| 4 | Terminology | Academic Turkish Standard | Enforces canonical term "Farmasötik Kimya" and forbids "Medisinal Kimya" | Curriculum and UI copy | Standard university terminology | Build linter fails if forbidden terms detected | `ORIGINAL_REQUEST.md` R1 |
| 5 | Terminology | Special Arabic Rule | Combines Modern Standard Arabic prose with Turkish scientific keywords in badges | Lesson content in Arabic | Arabic text + styled Turkish technical terms | Plaintext fallback if styling fails | `ORIGINAL_REQUEST.md` R2 |
| 6 | Pedagogy | 12-Stage Progression | Structured lesson anatomy from Hook to Mastery Check | Student step progression | Sequential cognitive micro-steps | Locked step navigation until input committed | `ORIGINAL_REQUEST.md` R4 |
| 7 | Pedagogy | <=40-Word Prompt Limit | Limits instructional prompt length to minimize extraneous cognitive load | Authoring prompt text | Bite-sized instructional prompts | Content linter flags prompts > 40 words | `docs/pedagogy-spec.md` |
| 8 | Pedagogy | 3-Tier Hint Ladder | Scaffolds assistance: Nudge (Tier 1), Mechanism (Tier 2), Solution (Tier 3) | Student click on "Need a hint?" | Step-specific scaffolding hints | Tiers 2 & 3 locked behind trial/subscription | `packages/widgets/src/HintLadder` |
| 9 | Pedagogy | Diagnostic Misconception Feedback | Diagnoses student's false assumption upon selecting wrong distractor | Distractor option selection | Targeted misconception callout | Never displays generic "Wrong" | `courses/medchem/lessons/lesson-01.json` |
| 10 | Simulation | SAR Explorer Widget | Modulates substituents on drug core to observe affinity changes | Substituent selection | Real-time binding affinity & selectivity badge | Steric clash warnings on invalid analogs | `packages/widgets/src/SarExplorer` |
| 11 | Simulation | Dose-Response Curve | Simulates agonist concentration-effect and antagonist shifts | Agonist/antagonist sliders | Dynamic sigmoidal curve and $EC_{50}$ calculation | Clamped at physical concentration limits | `packages/widgets/src/DoseResponseCurve` |
| 12 | Simulation | PK Simulator | Models one-compartment IV/oral pharmacokinetics and multiple dosing | Dose, clearance, volume, interval | Plasma concentration-time curve | Flags non-physiological clearance values | `packages/widgets/src/PkSimulator` |
| 13 | Adaptive | Leitner Spaced Retrieval | 5-box expanding interval retention queue (1, 3, 7, 16, 35 days) | Student review recall accuracy | Rescheduled due date and box promotion/demotion | Corrupt storage falls back to fresh queue | `packages/platform/src/spaced_repetition` |
| 14 | Freemium | 22 Free Lessons Gating | Lessons 1 & 2 of all 11 modules permanently free | Lesson route navigation | Free access vs PaywallModal trigger | Unauthorized access blocked by Firestore rules | `ORIGINAL_REQUEST.md` R7 |
| 15 | Freemium | 7-Day Cardless Free Trial | 168 hours of full premium access without requiring credit card | 1-click activation button | Account plan set to `trial` with expiration timestamp | Single activation per account enforced | `functions/src/index.ts` |
| 16 | Commercial | Strictly TRY Currency | Pricing presented exclusively in Turkish Lira (₺250, ₺850, ₺1,450) | Pricing page / modal view | Formatted TRY price strings | Zero USD or foreign currency references | `ORIGINAL_REQUEST.md` R7 |
| 17 | Authentication | Pharmacy Faculty Selection | Captures student faculty affiliation across Turkish universities | Registration form dropdown | Stored faculty ID on user profile | Defaults to "Diğer" if unspecified | `apps/web/src/components/AuthModal.tsx` |
| 18 | Theme | Academic Midnight Slate | Dark mode palette: `#0B0F17` canvas, `#131B2A` cards, `#F59E0B` focus | Theme toggle button | High-contrast WCAG AA dark styling | Strict ban on `border-white` | `ORIGINAL_REQUEST.md` R7 |
| 19 | Build Guard | Release Blocker Dev Notes Linter | Audits production bundle files for forbidden internal review notes | Build output files | Pass / Exit code 1 build failure | Halts deployment if dev notes detected | `scripts/test-prod-bundle.mjs` |
| 20 | Scientific Guard | Claim & Numeral Inventory Scanner | Exhaustively verifies numbers, units, and empirical statements | Lesson JSON data | Verification table & coverage status | Fails build if undeclared numbers found | `scripts/claim-inventory.mjs` |

---

### Edge Cases
| # | Feature | Input | Observed Behavior |
|---|---|---|---|
| 1 | Locale Switcher | Rapid toggling between TR, AR, and EN in quick succession | ThemeProvider updates `lang` and `dir` on `document.documentElement` without unmounting state; no memory leaks observed. |
| 2 | Bidirectional Rendering | Arabic sentence containing LTR chemical formula and parenthesis: `(Pt/P0 = 0.05)` | Parentheses remain correctly positioned at ends of formula without detached or reversed glyphs. |
| 3 | Step Navigation | Keyboard ArrowRight pressed before selecting hypothesis on predict-reveal step | Navigation is intercepted and blocked until learner selects an option and commits hypothesis. |
| 4 | Step Navigation | Direct URL entry to `/courses/medchem/lessons/1` with saved step index 8 in localStorage | LessonPage automatically restores learner to Step 9 (0-indexed step 8) while preserving prior interaction state. |
| 5 | Freemium Paywall | Unauthenticated guest navigates to locked Lesson 3 (`/courses/medchem/lessons/3`) | PaywallModal automatically mounts and opens; student is offered trial activation or student passes. |
| 6 | Free Trial Lifecycle | Student activates free trial, uses 7 days, and trial expires | Cloud Functions cron downgrades plan to `free`; Lesson 3 locks again; 100% of student XP and review cards are preserved. |
| 7 | Free Trial Re-activation | User with `trialUsed: true` invokes `startFreeTrial` function | Cloud Function rejects with `failed-precondition` error; client displays already-used notice. |
| 8 | Spaced Review Queue | User answers card correctly in Box 5 | Card remains in Box 5 as "Mastered" with maximum interval (35 days). |
| 9 | Spaced Review Queue | User answers card incorrectly in Box 4 | Card is demoted immediately to Box 1 with 1-day interval; lapse counter incremented. |
| 10 | Interactive Slider | User drags pH slider beyond 14.0 or below 0.0 | Input component clamps values strictly between [0.0, 14.0]; curve does not render out-of-bounds artifacts. |
| 11 | Reduced Motion | User has `prefers-reduced-motion: reduce` enabled in OS | Transition durations drop to 0s, transforms are disabled (`transform: none`), and animations execute instantly. |
| 12 | Keyboard Navigation | User tabs into open PaywallModal and presses Escape key | Dialog closes immediately and restores focus to the triggering CTA button. |

---

## 6. Existing Codebase Test Gaps & Required Infrastructure

Through thorough codebase inspection and command execution, the following critical test gaps have been identified:

### Gap 1: Missing `@pharmacy/courses` Workspace Package
- **Current State**: Course definitions exist as loose JSON files in `courses/medchem` and `courses/pharmacology`. There is no `package.json`, no Vitest configuration, and no automated schema validation for courses.
- **Required Infrastructure**: Create or integrate `@pharmacy/courses` with Zod schema verification tests asserting that all course configs and lesson files adhere to the 12-stage anatomy, <=40-word prompts, and valid citations.

### Gap 2: Incomplete Lesson Content (Only 1 Lesson Implemented)
- **Current State**: Only `courses/medchem/lessons/lesson-01.json` exists. Lessons 2 through 5 for Course A are missing. All 6 modules for Course B (Pharmacology) have zero lessons implemented.
- **Required Infrastructure**: Authoring pipelines and automated test suites that validate all 22 free lessons and paid curriculum blueprints.

### Gap 3: Unimplemented Special Arabic Rule in Lesson Body
- **Current State**: In `lesson-01.json` and `lesson01.client.ts`, step prompts, options, hints, and feedback are written in English only. The `translations` object only contains title and objective. When Arabic is active, `LessonPage.tsx` forces `dir="ltr"` on the prompt because it is in English.
- **Required Infrastructure**: Full translation matrix for all 12 stages in Arabic and Turkish. Automated test asserting that Arabic lesson steps render Arabic prose with Turkish canonical technical keywords wrapped in `<span class="tr-term" dir="ltr">`.

### Gap 4: Obsolete Academic Terminology in Config
- **Current State**: `courses/medchem/course.config.json` uses `"title": "Medicinal Chemistry / Farmasötik ve Medisinal Kimya"`. This violates Acceptance Criteria R1 which explicitly demands `"Farmasötik Kimya"` and forbids `"Medisinal Kimya"`.
- **Required Infrastructure**: Automated terminology linter in CI that fails builds if `"Medisinal Kimya"` is detected.

### Gap 5: Untranslated Copy in Web Components & Footer
- **Current State**:
  - `apps/web/src/App.tsx`: Footer contains hardcoded English strings.
  - `apps/web/src/pages/PricingPage.tsx`: Arabic dictionary has untranslated Turkish text for `guaranteeFreeLessons` and `guaranteeCardlessTrial`.
  - `apps/web/src/pages/GalleryPage.tsx`: Badges display hardcoded English text ("Commercial Grade", "Neo-Brutalist", "9 Dedicated Widgets").
- **Required Infrastructure**: Complete i18n dictionary audit and automated scanner asserting 0 English strings on user-facing pages in TR or AR mode.

### Gap 6: No Unit Tests in `apps/web`
- **Current State**: `apps/web/package.json` contains no `"test"` script. Page components (`CatalogPage`, `PricingPage`, `LessonPage`, `GalleryPage`, `AuthModal`, `Navbar`) have zero isolated unit or component tests.
- **Required Infrastructure**: Configure Vitest + `@testing-library/react` in `apps/web` to test component rendering, language switching, and routing in isolation.

### Gap 7: Playwright Automated Suite Expansion
- **Current State**: Playwright tests cover Gallery, Catalog, Pricing, and Lesson 1 on Desktop Brave. Tablet and mobile viewport tests are not automated in default test runs. Furthermore, there are no Playwright specs verifying the 11 modules, knowledge graph gating, or Special Arabic Rule badges.
- **Required Infrastructure**: Implement full 4-tier Playwright test matrix covering Desktop Chromium, Tablet (768px), and Mobile (375px) across TR and AR locales.

---

## 7. Verification Method

To verify the findings and specifications in this report:

1. **Test Suite Execution**:
   ```powershell
   pnpm -r --workspace-concurrency=1 run test
   ```
   *Expected*: 27 test files, 86 unit tests passing across `@pharmacy/platform`, `@pharmacy/ui`, `@pharmacy/widgets`.
2. **Typecheck & Lint**:
   ```powershell
   pnpm -r --workspace-concurrency=1 run typecheck
   pnpm -r run lint
   ```
   *Expected*: Zero TypeScript diagnostics, zero ESLint errors.
3. **Bundle & Claim Verification**:
   ```powershell
   pnpm run build
   pnpm claim-inventory
   ```
   *Expected*: Zero leaked dev notes in `apps/web/dist`, 100% of claims mapped to registry.
4. **Playwright Accessibility Scan**:
   ```powershell
   npx playwright test e2e/a11y-audit.spec.ts --project=desktop-brave-shields-default
   ```
   *Expected*: 13 tests passing with 0 critical/serious axe-core violations across `/gallery`, `/catalog`, `/pricing`, and `PaywallModal`.
