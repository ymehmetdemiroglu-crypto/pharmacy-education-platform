# Comprehensive Codebase, UI, Localization & Architectural Gap Analysis

**Agent**: `explorer_codebase_1` (Key Improvement Areas Detector Agent & Codebase/UI Explorer)  
**Date**: 2026-09-30  
**Target Repository**: `pharmacy_education_platform_setup`  
**Status**: Investigation Complete  

---

## 1. Executive Summary & Monorepo Architecture

An exhaustive, read-only audit of the entire repository was conducted against the user requirements defined in `ORIGINAL_REQUEST.md` (Requirements R1 through R7). While the project possesses a functional pnpm monorepo structure with 86 passing unit tests across `@pharmacy/platform`, `@pharmacy/ui`, and `@pharmacy/widgets`, **critical systemic architectural, localization, bi-directional (RTL/LTR), pedagogical, and pricing integrity gaps exist**.

### 1.1 Monorepo Structure & Package Inventory

| Package / Directory | Stated Purpose | Actual State & Critical Discoveries |
| :--- | :--- | :--- |
| `apps/web` | Main client application (React 18, Vite 6, Tailwind 3.4.17) | Fully functional SPA. Contains severe localization hardcoding in pages (`GalleryPage`, `LessonPage`, `PricingPage`), raw `alert()` checkout prompts, and forced LTR hacks in Arabic mode. |
| `packages/ui` | Neo-Brutalist design primitives & tokens | 14 components. Strong tactile aesthetic. Lacks complete logical property (`start-`, `end-`) parity; multiple components override warm amber focus rings (`#F59E0B`) with `#FFD93D`. |
| `packages/widgets` | 9 domain-specific interactive simulation widgets | All 9 widgets are 100% hardcoded in English. Zero i18n support, no locale prop ingestion, no bidirectional layout adaptability, no KaTeX integration. |
| `packages/platform` | Pure TS business logic, auth, access control, Leitner engine | Solid data stores and state engines. Curriculum Zod schema (`schema.ts`) lacks strict 12-stage pedagogical validation and permits single-language lesson definitions. |
| `@pharmacy/courses` | Expected course content & curriculum package | **DOES NOT EXIST**. Course configurations and lessons reside directly in the root `/courses` folder, causing fragmented client-side data imports. |
| `courses/medchem` | Course A (Farmasötik Kimya) | Contains `course.config.json`, `pricing.json`, and **only 1 lesson** (`lesson-01.json`). Explicitly uses the forbidden term *"Medisinal Kimya"*. |
| `courses/pharmacology` | Course B (Farmakoloji) | Contains `course.config.json` and `pricing.json`. **Has zero lessons** (missing lessons directory entirely). |
| `functions` | Firebase backend functions | Cloud Functions v2 handlers for customer claims and Stripe/Dodo payments. |

---

## 2. Localization Architecture & i18n Audit

### 2.1 Absence of Centralized Localization Files (`tr.json`, `ar.json`)
- **Finding**: There is **no `tr.json`, `ar.json`, or `en.json` file** anywhere in the workspace. Search for `*.json` returned zero translation files.
- **Architectural Flaw**: Localization is currently implemented via ad-hoc, brittle inline ternary expressions inside component bodies:
  ```typescript
  // Typical pattern scattered across UI components:
  locale === 'tr' ? 'Metin' : locale === 'ar' ? 'نص' : 'Text'
  ```
- **Consequence**: This pattern produces massive cognitive clutter, copy duplication, untypeable translation keys, translation omissions, and impossible maintenance across courses.

### 2.2 Default Locale Violation in Client Initialization
- **File**: [`apps/web/src/main.tsx:12`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/main.tsx#L12)
- **Code**:
  ```tsx
  <ThemeProvider defaultTheme="light" defaultLocale="en">
  ```
- **Violation of R1**: Requirement R1 mandates that **Turkish is the primary default locale**. In `main.tsx`, the client overrides `ThemeProvider`'s internal default (`tr`) and forces `defaultLocale="en"`. First-time visitors land on an English page.

### 2.3 Canonical Terminology Violations ("Farmasötik Kimya" vs "Medisinal Kimya")
- **Mandate**: *"Turkish localization must use authentic academic and clinical pharmacy language standard in Turkish universities (specifically canonical 'Farmasötik Kimya', never 'Medisinal Kimya')."*
- **Violations Found**:
  1. [`courses/medchem/course.config.json:4`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/courses/medchem/course.config.json#L4):
     ```json
     "title": "Medicinal Chemistry / Farmasötik ve Medisinal Kimya"
     ```
     Uses the forbidden string *"Farmasötik ve Medisinal Kimya"*.
  2. [`courses/medchem/course.config.json:9`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/courses/medchem/course.config.json#L9) and [`courses/pharmacology/course.config.json:9`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/courses/pharmacology/course.config.json#L9):
     ```json
     "supportedLocales": ["tr", "en"]
     ```
     Completely omits `"ar"` from supported locales.
  3. [`apps/web/src/pages/PricingPage.tsx:34`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/pages/PricingPage.tsx#L34):
     ```typescript
     singleCourse: 'Tek Ders (MedKim veya Farmakoloji)',
     ```
     Uses colloquial and informal *"MedKim"* instead of canonical *"Farmasötik Kimya"*.
  4. [`apps/web/src/pages/LessonPage.tsx:838`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/pages/LessonPage.tsx#L838), [`courses/medchem/lessons/lesson-01.json:17`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/courses/medchem/lessons/lesson-01.json#L17):
     ```typescript
     Source Slides: <code>Farmasötik ve Medisinal Kimya 1-Giriş.pdf</code>
     ```

### 2.4 Unimplemented "Special Arabic Rule" (R2)
- **Mandate**: In Arabic lessons, instructional prose must be high-quality Modern Standard Arabic, while key technical, chemical, and pharmacological terminology remains in canonical Turkish/international terminology (e.g. *mitokondri*, *reseptör*, *iyonizasyon*), distinguished by semantic typographical markers/badges without breaking RTL reading flow.
- **Current State**:
  - **Zero implementation exists**. There is no tokenizer, keyword highlighter, or semantic Turkish-term badge for Arabic prose.
  - In `apps/web/src/pages/CatalogPage.tsx:93`, Course A is translated purely into Arabic as `المقرر أ: الكيمياء الدوائية` without canonical Turkish technical term markers.
  - In `courses/medchem/lessons/lesson-01.json`, there are **no Arabic step contents whatsoever**.

### 2.5 The Arabic LTR Force-Override Hack in `LessonPage.tsx`
- **File**: [`apps/web/src/pages/LessonPage.tsx`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/pages/LessonPage.tsx)
- **Code Locations**:
  - Line 457: `<p className="..." dir={locale === 'ar' ? 'ltr' : undefined}>{currentStep.prompt}</p>`
  - Line 467: `<div className="..." dir={locale === 'ar' ? 'ltr' : undefined}>`
  - Line 543: `<span dir={locale === 'ar' ? 'ltr' : undefined}>{optText}</span>`
  - Line 600: `<div className="..." dir={locale === 'ar' ? 'ltr' : undefined}>`
  - Line 616: `<p className="..." dir={locale === 'ar' ? 'ltr' : undefined}>`
  - Line 620: `<p className="..." dir={locale === 'ar' ? 'ltr' : undefined}>`
- **Diagnosis**: Because lesson steps in `lesson-01.json` are authored exclusively in English, selecting Arabic (`AR`) caused English text to reverse punctuation in RTL mode. Instead of properly localizing the lesson into Arabic, an artificial override `dir={locale === 'ar' ? 'ltr' : undefined}` was applied to force English text to render LTR even when the user selected Arabic RTL mode.

### 2.6 Inventory of Hardcoded English Text

1. **Global App Footer** ([`apps/web/src/App.tsx:54-68`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/App.tsx#L54)):
   - `"PharmLearn Education Platform"`
   - `"Commercial-grade interactive learning for Medicinal Chemistry & Pharmacology"`
   - `"100% Originally Authored Curriculum • Native Vector SMILES"`
   - `"Source slide references cited for academic verifiability."`
2. **Pricing Page Cross-Language Bleed** ([`apps/web/src/pages/PricingPage.tsx`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/pages/PricingPage.tsx)):
   - Lines 123–124 (Inside Arabic `ar` dictionary!):
     ```typescript
     guaranteeFreeLessons: 'Her modülde 1. ve 2. dersler Kalıcı Olarak Ücretsizdir (Toplam 22 ders bedelsiz)',
     guaranteeCardlessTrial: '7 Günlük Kartsız Deneme Sürümü',
     ```
     Turkish text appears verbatim in Arabic mode.
   - Line 304: `<span>₺ TRY Fiyatlandırma</span>` (hardcoded Turkish in all locales).
   - Lines 333, 369, 401: `onClick={() => alert('Proceeding to monthly checkout')}` (raw English alerts).
3. **Gallery Page** ([`apps/web/src/pages/GalleryPage.tsx`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/pages/GalleryPage.tsx)):
   - Lines 93–94: Badges `"Commercial Grade"`, `"Neo-Brutalist"`.
   - Line 136: `"9 Dedicated Widgets"`.
   - Lines 113, 133, 166: Section headers (`"1. Trial & Plan Banners"`, `"2. Interactive Pharmacy Widgets"`, `"3. Neo-Brutalist UI Primitives"`).
   - Lines 172–300: Entire form control and state matrix demo labels.
4. **All 9 Interactive Simulation Widgets** (`packages/widgets`):
   - Every single widget (`SarExplorer`, `StructureIdentifier`, `DoseResponseCurve`, `PkSimulator`, `MetabolismMap`, `ReceptorLigandMatcher`, `PredictThenReveal`, `MultipleChoice`, `HintLadder`) uses 100% hardcoded English titles, button labels, parameter readouts, tooltips, and feedback messages.
5. **Screen Reader Accessibility Labels (`aria-label`)**:
   - `StepDots.tsx:40`: `aria-label={`Step ${idx + 1}${isCurrent ? ' (current)' : ''}...`}` (Hardcoded English).
   - `Modal.tsx:121`: `aria-label="Close modal"` (Hardcoded English).
   - `ProgressBar.tsx:50`: `aria-label={label || 'Progress'}` (Hardcoded English).
   - `HintDrawer.tsx:143`: `aria-label={isOpen ? 'Collapse hints' : 'Expand hints'}` (Hardcoded English).
   - `DoseResponseCurve.tsx:116`: `aria-label="Dose response curve plot"` (Hardcoded English).
   - `StructureIdentifier.tsx:86`: `aria-label={`Chemical structure of ${config.moleculeName}`}` (Hardcoded English).

---

## 3. Bidirectional RTL / LTR Architecture Audit

### 3.1 Layout Mirroring & CSS Logical Properties
- **Strengths**:
  - `ThemeProvider.tsx` properly synchronizes `document.documentElement.setAttribute('dir', direction)` and `lang`.
  - Directional icons in `TrialBanner.tsx`, `LessonPage.tsx`, and `CatalogPage.tsx` use `rtl:rotate-180`.
- **Defects & Regressions**:
  - **Hardcoded Physical Positioning**:
    - [`PricingPage.tsx:344, 376`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/pages/PricingPage.tsx#L344): `className="absolute -top-3.5 left-6"`. In RTL, the badge remains on the physical left, causing a visual imbalance with RTL card hierarchy. Must use `start-6` or `rtl:right-6 rtl:left-auto`.
    - [`LessonPage.tsx:535`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/pages/LessonPage.tsx#L535): Active option uses `translate-x-1`, translating rightward (away from natural indentation in RTL).
  - **Progress Bar Border Flip**:
    - [`packages/ui/src/components/ProgressBar/ProgressBar.tsx:59`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/ui/src/components/ProgressBar/ProgressBar.tsx#L59):
      ```tsx
      className="h-full border-r-3 border-black dark:border-slate-700 ..."
      ```
      The trailing border is hardcoded to `border-r-3`. In RTL, progress fills from right to left, so the leading edge is on the left; the separator border appears on the wrong side. Must be `border-inline-end-3` or `rtl:border-r-0 rtl:border-l-3`.
  - **Directional Semantic Text Clash in Matcher**:
    - [`packages/widgets/src/ReceptorLigandMatcher/ReceptorLigandMatcher.tsx:80`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/widgets/src/ReceptorLigandMatcher/ReceptorLigandMatcher.tsx#L80):
      Instruction text reads: `"(Select a drug group on the left, then click its complementary receptor residue on the right)"`.
      When Arabic RTL mirrors the flex/grid layout, the drug group is on the physical **right** and residues are on the physical **left**, directly contradicting the prose.

### 3.2 Scientific Notation & Formula LTR Isolation
- **Mandate**: Strict LTR isolation (`dir="ltr"`) for chemical structures, SMILES notations, 2D/3D molecular canvases, KaTeX formulas, numerical data tables, dosage calculations, and code snippets.
- **Defects Found**:
  1. **Complete Absence of KaTeX**:
     - KaTeX is **not installed** in `package.json` or `apps/web/package.json`.
     - In `ModelIllustrationNotice.tsx:50-52`, mathematical formulas are rendered as raw text inside plain `<code>` tags:
       ```tsx
       <code>{equation}</code>
       ```
  2. **Molecular SVG Canvases Lack `dir="ltr"` Isolation**:
     - `StructureIdentifier.tsx:81–84`: SVG element and parent container have no `dir="ltr"` attribute.
     - `MetabolismMap.tsx:62–68`: SVG element and parent container have no `dir="ltr"` attribute.
     - `DoseResponseCurve.tsx:111–114`: Cartesian coordinate plot has no `dir="ltr"` attribute. In RTL, text anchors and logarithmic axes can render inverted.
     - `PkSimulator.tsx:141–146`: Plasma concentration curve has no `dir="ltr"` attribute.
  3. **SMILES Notations**:
     - `StructureIdentifier.tsx:76`: `SMILES: <code>{config.smiles}</code>` relies solely on the global CSS rule `[dir='rtl'] code`. If wrapper formatting tags are introduced, bidirectional bleeding occurs without an explicit `<bdi>` or `<span dir="ltr">` wrapper.

---

## 4. Design System Compliance & "Academic Midnight Slate" Palette

### 4.1 Token Verification Matrix

| Token Name | Required Value | Implemented in `tailwind.config.js` | Compliance Status |
| :--- | :--- | :--- | :--- |
| Canvas Dark | `#0B0F17` | `canvas.dark: '#0B0F17'` | **Compliant** |
| Card Dark | `#131B2A` | `card.dark: '#131B2A'` | **Compliant** |
| Surface Dark | `#1E293B` | `surface.dark: '#1E293B'` | **Compliant** |
| Slate Border | `#334155` | `border.dark: '#334155'` | **Compliant** |
| Neo Shadow Dark | `#030712` | `shadow.neo-dark: '4px 4px 0px #030712'` | **Compliant** |
| Focus Ring Warm Amber | `#F59E0B` | In `index.css`: `.dark :focus-visible { outline: 3px solid #F59E0B; }` | **Partially Compliant (Overridden in Components)** |

### 4.2 Focus Ring Clashes with `#FFD93D`
While `index.css` sets `:focus-visible` to `#F59E0B` in dark mode, several components use Tailwind utility classes that override this with neo-yellow (`#FFD93D`):
1. [`AuthModal.tsx:404`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/components/AuthModal.tsx#L404): `focus:ring-2 focus:ring-[#FFD93D]` on the university select dropdown.
2. [`Input.tsx:34`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/ui/src/components/Input/Input.tsx#L34): `focus:ring-2 focus:ring-[#FFD93D]`.
3. [`PaywallModal.tsx:214, 216`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/ui/src/components/PaywallModal/PaywallModal.tsx#L214): `focus:ring-[#FFD93D]`, `ring-[#FFD93D]`.

### 4.3 Border and Shadow Audits
- **Pure White Cages (`border-white`)**: Verified absent from production code. Previous occurrences were confined to historical markdown review notes.
- **Fluorescent Shadows**: Verified that sharp Neo-Brutalist shadows (`#000000` in light, `#030712` in dark) are maintained. No glowing blurs detected.

---

## 5. Pricing Architecture & Student Authentication Modal

### 5.1 Exclusively Turkish Lira (TRY / ₺) Mandate vs Backend Discrepancies
- **Mandate**: *"Exclusively Turkish Lira (TRY / ₺) (₺250 monthly, ₺850 semester, ₺1,450 annual). Dual and single course options. Clearly highlight the 22 permanently free lessons (Lessons 1 & 2 across all 11 modules) and the 7-day cardless free trial. Zero references to foreign currencies."*
- **Front-End State**:
  - `PricingPage.tsx` correctly displays:
    - Single Course: `₺250` monthly, `₺850` semester, `₺1.450` annual.
    - Bundle: `₺350` monthly, `₺1.150` semester, `₺2.100` annual.
- **Critical Back-End & Component Gaps**:
  1. **Course Pricing JSON Defaults to USD**:
     - [`courses/medchem/pricing.json:6`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/courses/medchem/pricing.json#L6):
       ```json
       "currencyDefault": "USD"
       ```
       Contains full pricing catalogs in USD, SAR, and EUR.
     - [`courses/pharmacology/pricing.json:6`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/courses/pharmacology/pricing.json#L6):
       ```json
       "currencyDefault": "USD"
       ```
  2. **`PaywallModal.tsx` Currency Types**:
     - [`packages/ui/src/components/PaywallModal/PaywallModal.tsx:10, 28–44`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/ui/src/components/PaywallModal/PaywallModal.tsx#L10):
       Defines `export type Currency = 'USD' | 'TRY' | 'SAR';` and contains pricing objects for `USD` and `SAR`.
  3. **Module Count Inconsistency in Paywall Copy**:
     - [`packages/ui/src/components/PaywallModal/PaywallModal.tsx:140`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/ui/src/components/PaywallModal/PaywallModal.tsx#L140):
       Turkish text states: `"55 modülün tümünü ve gelişmiş ipuçlarını deneyimleyin."` (Refers to 55 modules, whereas the curriculum architecture specifies 11 modules total: 5 in MedChem, 6 in Pharmacology).
  4. **Browser `alert()` Stubs**:
     - Checkout buttons in `PricingPage.tsx` (lines 333, 369, 401) and `LessonPage.tsx` (line 867) use unstyled browser `alert(...)` strings in English.

### 5.2 Student Authentication Modal (`AuthModal.tsx`)
- **Faculty Dropdown**: Implements affiliation selection across 10 Turkish pharmacy faculties (`İstanbul`, `Marmara`, `Ankara`, `Hacettepe`, `Bezmialem Vakıf`, `Ege`, `Yeditepe`, `Gazi`, `Anadolu`, `Diğer`).
- **Free Lessons Banner**: Mentions unlocking 22 free lessons immediately upon registration.
- **Defects Found**:
  - All form validation errors and feedback messages are implemented via ad-hoc ternaries rather than i18n keys.
  - Line 221: Fallback error on Google Auth failure is hardcoded to `'Google Auth Error'`.
  - Line 357: Hardcoded Turkish name placeholder `"Yahya..."` in all locales.
  - Line 404: Faculty `<select>` uses `focus:ring-[#FFD93D]` instead of `#F59E0B`.

---

## 6. Pedagogical Architecture & Lesson Progression Audit

### 6.1 The 12-Stage Instructional Anatomy vs Actual Implementation
- **Mandate (R4)**: Every lesson must implement an active, concept-mastery progression following the 12-stage instructional anatomy:
  1. *Hook* → 2. *Question* → 3. *Intuition* → 4. *Visual Explanation* → 5. *Interactive Artifact* → 6. *Guided Discovery* → 7. *Formal Explanation* → 8. *Concept Check* → 9. *Application* → 10. *Retrieval* → 11. *Connection* → 12. *Mastery Check*.
- **Actual State in `courses/medchem/lessons/lesson-01.json`**:
  - The lesson contains only **10 steps** (indexed 0 through 9):
    - Step 1: Clinical Vignette (Hook)
    - Step 2: Prediction challenge
    - Step 3: Threshold prediction
    - Step 4: Exobiophase equilibrium
    - Step 5: Cell membrane accumulation
    - Step 6: Alkanol cut-off effect
    - Step 7: Structurally specific vs non-specific
    - Step 8: Propranolol stereospecificity
    - Step 9: Clinical case application
    - Step 10: Recap, celebration & Leitner card enqueue
  - Stages 3 (*Intuition*), 4 (*Visual Explanation*), 6 (*Guided Discovery*), 11 (*Connection*), and 12 (*Mastery Check*) are compressed or omitted.
  - The curriculum Zod schema in `packages/platform/src/curriculum/schema.ts:93` allows any arbitrary array of 8 to 15 steps without validating the 12 specific pedagogical stage identities.

### 6.2 Missing Curriculum Inventory
- **Claimed**: 22 free lessons (Lessons 1 & 2 across 11 modules).
- **Reality**:
  - `courses/medchem/lessons/`: Exactly **1 lesson** (`lesson-01.json`).
  - `courses/pharmacology/`: **0 lessons** (`lessons/` folder is completely absent).
  - 21 of the 22 free lessons promised to students are not yet authored.

### 6.3 Knowledge Graph & Prerequisite Blocking
- Knowledge graph DAGs exist in `docs/medchem/concept-map.json` (26 nodes) and `docs/pharmacology/concept-map.json` (22 nodes).
- However, **neither graph is loaded into `@pharmacy/platform` or connected to the application router**. Lessons do not verify whether prerequisite nodes have been mastered before allowing access.

---

## 7. Prioritized Remediation Matrix for Downstream Agents

| Priority | Area | Required Action | Target Files |
| :---: | :--- | :--- | :--- |
| **P0** | **i18n Architecture** | Create centralized `tr.json`, `ar.json`, and `en.json` dictionaries. Implement a lightweight, type-safe i18n hook (`useTranslation`) in `@pharmacy/ui` or a new `@pharmacy/i18n` package. Replace all ad-hoc inline ternaries. | `packages/ui`, `apps/web/src` |
| **P0** | **Locale Default** | Change `defaultLocale="en"` to `defaultLocale="tr"` in `apps/web/src/main.tsx`. | `apps/web/src/main.tsx:12` |
| **P0** | **Canonical Terminology** | Remove *"Medisinal Kimya"* and *"MedKim"*. Replace with canonical *"Farmasötik Kimya"* across course configs, pricing pages, and citations. Add `"ar"` to `supportedLocales`. | `courses/medchem/course.config.json`, `apps/web/src/pages/PricingPage.tsx:34` |
| **P0** | **Special Arabic Rule** | Implement typography component (`<TechnicalTermBadge>`) for Turkish technical keywords in Arabic prose. Author Arabic lesson data adhering to this rule. Remove the forced LTR override hack (`dir={locale === 'ar' ? 'ltr' : undefined}`). | `packages/ui`, `apps/web/src/pages/LessonPage.tsx`, `courses/medchem/lessons` |
| **P1** | **Scientific LTR Isolation** | Add `dir="ltr"` wrappers to SVG canvases (`StructureIdentifier`, `MetabolismMap`), coordinate plots (`DoseResponseCurve`, `PkSimulator`), SMILES notations, and numerical tables. Install KaTeX for mathematical equations. | `packages/widgets`, `packages/ui`, `apps/web/src/index.css` |
| **P1** | **Widget Localization** | Refactor all 9 widgets in `@pharmacy/widgets` to consume i18n translations for all labels, modes, axis titles, and disclaimers. | `packages/widgets/src/**` |
| **P1** | **RTL Layout Miracles** | Fix `ProgressBar` trailing border (`border-inline-end-3`), `PricingPage` badge positioning (`start-6`), and `ReceptorLigandMatcher` directional instruction prose. | `packages/ui`, `apps/web/src/pages/PricingPage.tsx`, `packages/widgets` |
| **P1** | **Pricing Cleanliness** | Update `courses/*/pricing.json` to default to `TRY`. Eliminate USD/SAR from `PaywallModal.tsx`. Fix "55 modules" copy to 11 modules. Replace browser `alert()` with accessible modal/toast notifications. | `courses/*/pricing.json`, `packages/ui/src/components/PaywallModal`, `apps/web` |
| **P2** | **Design System Focus Rings** | Eliminate `#FFD93D` overrides on focus rings. Enforce `#F59E0B` warm amber focus rings across `AuthModal`, `Input`, and `PaywallModal`. | `packages/ui/src/components/Input`, `packages/ui/src/components/PaywallModal`, `apps/web/src/components/AuthModal` |
| **P2** | **12-Stage Pedagogical Anatomy** | Expand lesson schema and structure `lesson-01.json` to strictly embody all 12 stages of the concept-mastery progression. Implement Lesson 2 and Course B foundations. | `packages/platform/src/curriculum`, `courses/medchem/lessons`, `courses/pharmacology` |
