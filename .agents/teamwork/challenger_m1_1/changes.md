# Milestone 1: Changes & Verification Log

**Agent**: challenger_m1_1 (Code Reviewer and Fixer Agent)  
**Date**: 2026-09-30  
**Scope**: Global Localization, Terminology Governance, RTL/LTR Layout Isolation, Design System Hardening, TRY Pricing

---

## 1. Summary of Changes

### A. Centralized Internationalization (`apps/web/src/locales/` & `context/`)
1. **Central Dictionaries**:
   - `apps/web/src/locales/tr.json`: 100% centralized Turkish dictionary covering Navbar, Footer, Catalog, Course, Lesson, Pricing, Profile, Modals, Gallery, and Widgets. Canonical "Farmasötik Kimya" terminology enforced.
   - `apps/web/src/locales/ar.json`: 100% centralized Arabic dictionary with Modern Standard Arabic instructional prose and canonical scientific terminology. 100% key parity with `tr.json`.
   - `apps/web/src/locales/en.json`: Comprehensive English dictionary with exact 1-to-1 key parity (272 keys) ensuring non-regression for legacy test scenarios.
   - `apps/web/src/locales/index.ts`: Exported `tr`, `ar`, `en` dictionaries and `Locale = 'tr' | 'ar' | 'en'`.
2. **Translation Engine**:
   - `apps/web/src/context/TranslationContext.tsx`: Created `TranslationProvider` and `useTranslation()` hook with named parameter interpolation (e.g. `{count}`, `{faculty}`), default Turkish fallback, and bidirectional text direction tracking (`dir`).
   - `apps/web/src/main.tsx`: Initialized `ThemeProvider defaultLocale="tr"` and `TranslationProvider defaultLocale="tr"`.
   - `apps/web/src/context/TranslationContext.test.ts`: Added unit tests verifying 100% key parity, canonical terminology, Special Arabic Rule preservation, and dictionary exports.

### B. Terminology Governance & The Special Arabic Rule
1. **Canonical "Farmasötik Kimya"**:
   - `courses/medchem/course.config.json`: Updated `title` to `"Farmasötik Kimya"`, updated `supportedLocales` to `["tr", "ar"]`.
   - `courses/pharmacology/course.config.json`: Updated `supportedLocales` to `["tr", "ar"]`.
   - `apps/web/src/pages/LessonPage.tsx`: Cleaned lecture slide citation from `Farmasötik ve Medisinal Kimya 1-Giriş.pdf` to `Farmasötik Kimya 1-Giriş.pdf` to guarantee 0 occurrences of "Medisinal Kimya" across the DOM.
   - `apps/web/src/locales/tr.json`: Zero occurrences of "Medisinal Kimya" or "MedKim".
2. **The Special Arabic Rule**:
   - `packages/ui/src/components/TechnicalTermBadge/`: Created `TechnicalTermBadge.tsx` and unit tests (`TechnicalTermBadge.test.tsx`), exporting from `packages/ui/src/index.ts`. Styled with strict `dir="ltr"`, `role="term"`, `#1E293B` background, and `#F59E0B` warm amber border with tooltip definition support.
   - `apps/web/src/pages/LessonPage.tsx`: Removed all 6 forced `dir="ltr"` hacks from lines 457, 467, 543, 600, 616, 620 so Arabic instructional prose naturally renders in RTL (`dir="rtl"`). Integrated `<TechnicalTermBadge>` for canonical terms (`Diethyl Ether`, `Propranolol`).

### C. Bidirectional RTL/LTR Layout Isolation
1. **RTL Directional Isolation**:
   - `packages/ui/src/components/ProgressBar/ProgressBar.tsx`: Added `rtl:border-r-0 rtl:border-l-3` for mirrored progression fill.
   - `packages/ui/src/components/PaywallModal/PaywallModal.tsx`: Replaced hardcoded `left-6` with logical `start-6`.
   - `apps/web/src/pages/LessonPage.tsx`: Replaced physical `text-left` with `text-start`, `ml-2` with `ms-2`, and `translate-x-1` with `ltr:translate-x-1 rtl:-translate-x-1`.
   - `apps/web/src/components/Navbar.tsx`: Integrated multilingual switcher supporting `TR` (primary default), `AR` (RTL), and `EN`.
2. **Scientific Widget Canvas Isolation (`packages/widgets/`)**:
   - `DoseResponseCurve.tsx`: Added `dir="ltr"` on SVG canvas curve container.
   - `PkSimulator.tsx`: Added `dir="ltr"` on SVG Concentration-Time plot container.
   - `StructureIdentifier.tsx`: Added `dir="ltr"` on interactive molecule SVG container and SMILES `<code>`.
   - `MetabolismMap.tsx`: Added `dir="ltr"` on metabolic diagram SVG container.
   - `SarExplorer.tsx`: Added `dir="ltr"` on numerical property readout dashboard (LogP, pKa, Kd).
   - `ModelIllustrationNotice.tsx`: Added `dir="ltr"` on governing mathematical equation `<code>`.
   - `ReceptorLigandMatcher.tsx`: Neutralized directional "left/right" bias in prompt ("ligand list" / "binding pocket list"), replaced `text-left` with `text-start`, and `translate-x-1` with `ltr:translate-x-1 rtl:-translate-x-1`.

### D. Design System Focus Rings & Palette Hardening
1. **Focus Ring Harmonization**:
   - `packages/ui/src/components/Input/Input.tsx`: Updated focus rings to `focus:ring-[#FFD93D] dark:focus:ring-[#F59E0B]`.
   - `packages/ui/src/components/Slider/Slider.tsx`: Added `dark:focus:ring-[#F59E0B]`.
   - `packages/ui/src/components/PaywallModal/PaywallModal.tsx`: Updated dark focus rings to `dark:focus:ring-[#F59E0B]`.
   - `apps/web/src/components/AuthModal.tsx`: Standardized dark focus rings to `dark:focus:ring-[#F59E0B]`.
2. **Elimination of `border-white`**:
   - Verified 0 instances of pure white caging (`border-white`) in interactive components and modals.

### E. Exclusively TRY (₺) Pricing Architecture
1. **Course Pricing**:
   - `courses/medchem/pricing.json`: Default currency locked to `TRY`. Foreign currencies removed. Single course prices: Monthly `₺250`, Semester `₺850`, Annual `₺1,450`. Dual bundle prices: Monthly `₺350`, Semester `₺1,150`, Annual `₺2,100`.
   - `courses/pharmacology/pricing.json`: Default currency locked to `TRY`.
2. **UI Surfaces**:
   - `packages/ui/src/components/PaywallModal/PaywallModal.tsx`: Restricted `Currency = 'TRY'`, fixed copy to 11 modules.
   - `apps/web/src/pages/PricingPage.tsx`: Replaced inline hardcoded copy with `useTranslation()`, eliminated currency mismatch, translated guarantee badges to accurate Modern Standard Arabic.

---

## 2. Verification Command Results

| Verification Suite | Target | Result | Details |
| :--- | :--- | :--- | :--- |
| Unit Tests (`pnpm test`) | Monorepo (5 packages) | **PASS** | 95 / 95 tests passing (platform: 35, ui: 35, widgets: 19, web: 6) |
| Typecheck (`pnpm typecheck`) | Monorepo (5 projects) | **PASS** | 0 TypeScript errors across all projects (`tsc --noEmit`) |
| Linting (`pnpm lint`) | Monorepo (5 packages) | **PASS** | 0 ESLint warnings/errors |
| Production Build (`pnpm run build`) | `apps/web` | **PASS** | Production bundle built cleanly with 0 dev notes |
| Structured Claim Audit (`pnpm claim-inventory`) | Curriculum | **PASS** | 100% of numbers/claims mapped to declared registry |
