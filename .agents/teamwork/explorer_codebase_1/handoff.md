# Handoff Report — Codebase & UI Improvement Areas Detection

**Agent**: `explorer_codebase_1` (Key Improvement Areas Detector Agent & Codebase/UI Explorer)  
**Type**: Hard Handoff (Investigation Complete)  
**Date**: 2026-09-30  
**Working Directory**: `C:\Users\hp\.gemini\antigravity\worktrees\valiant-raman\pharmacy_education_platform_setup\.agents\teamwork\explorer_codebase_1\`  
**Comprehensive Report**: [`analysis.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/.agents/teamwork/explorer_codebase_1/analysis.md)  

---

## 1. Observation

Direct code observations with exact file paths and line numbers:

1. **Localization Architecture & Missing Files**:
   - `find_by_name` across the workspace confirmed that `tr.json`, `ar.json`, and `en.json` **do not exist**.
   - [`apps/web/src/main.tsx:12`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/main.tsx#L12): `<ThemeProvider defaultTheme="light" defaultLocale="en">` explicitly initializes the application in English instead of Turkish.
   - Component copy is scattered in inline ternaries (e.g. `apps/web/src/components/Navbar.tsx:20-33`, `apps/web/src/pages/PricingPage.tsx:26-166`, `apps/web/src/pages/LessonPage.tsx:332-356`).
   - [`apps/web/src/pages/PricingPage.tsx:123-124`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/pages/PricingPage.tsx#L123): Inside the Arabic dictionary `copy.ar`, Turkish strings are hardcoded verbatim:
     ```typescript
     guaranteeFreeLessons: 'Her modülde 1. ve 2. dersler Kalıcı Olarak Ücretsizdir (Toplam 22 ders bedelsiz)',
     guaranteeCardlessTrial: '7 Günlük Kartsız Deneme Sürümü',
     ```
   - [`apps/web/src/App.tsx:54-68`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/App.tsx#L54): Global footer is 100% hardcoded in English with zero localization.
   - [`packages/widgets/src/**`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/widgets/src): All 9 interactive widgets (`SarExplorer`, `StructureIdentifier`, `DoseResponseCurve`, `PkSimulator`, `MetabolismMap`, `ReceptorLigandMatcher`, `PredictThenReveal`, `MultipleChoice`, `HintLadder`) are 100% hardcoded in English and take no locale or translation props.

2. **Canonical Turkish Terminology Violations**:
   - [`courses/medchem/course.config.json:4`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/courses/medchem/course.config.json#L4):
     `"title": "Medicinal Chemistry / Farmasötik ve Medisinal Kimya"` explicitly uses prohibited "Medisinal Kimya".
   - [`courses/medchem/course.config.json:9`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/courses/medchem/course.config.json#L9) and [`courses/pharmacology/course.config.json:9`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/courses/pharmacology/course.config.json#L9):
     `"supportedLocales": ["tr", "en"]` omits `"ar"`.
   - [`apps/web/src/pages/PricingPage.tsx:34`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/pages/PricingPage.tsx#L34):
     `singleCourse: 'Tek Ders (MedKim veya Farmakoloji)'` uses informal abbreviation "MedKim" instead of canonical "Farmasötik Kimya".

3. **Special Arabic Rule & Forced LTR Override**:
   - Zero implementation of the Special Arabic Rule (Arabic instructional prose with Turkish key technical terms in specialized typographical markers/badges).
   - [`apps/web/src/pages/LessonPage.tsx:457, 467, 543, 600, 616, 620`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/pages/LessonPage.tsx#L457):
     `dir={locale === 'ar' ? 'ltr' : undefined}` is applied to prompts, options, and explanations because `courses/medchem/lessons/lesson-01.json` is authored in English.

4. **Bidirectional Layout & Scientific LTR Isolation**:
   - [`packages/ui/src/components/ProgressBar/ProgressBar.tsx:59`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/ui/src/components/ProgressBar/ProgressBar.tsx#L59):
     `border-r-3` hardcodes right border, which inverts in RTL progression.
   - [`apps/web/src/pages/PricingPage.tsx:344, 376`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/pages/PricingPage.tsx#L344):
     `className="absolute -top-3.5 left-6"` fails to use logical property `start-6` or `rtl:right-6`.
   - [`packages/widgets/src/ReceptorLigandMatcher/ReceptorLigandMatcher.tsx:80`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/widgets/src/ReceptorLigandMatcher/ReceptorLigandMatcher.tsx#L80):
     Prose says "Select a drug group on the left, then click its complementary receptor residue on the right", which physically mirrors in RTL.
   - KaTeX is **not installed** in the workspace. Equations in `ModelIllustrationNotice.tsx:50` are plain strings inside `<code>`.
   - SVG molecular canvases in `StructureIdentifier.tsx` and `MetabolismMap.tsx` and Cartesian plots in `DoseResponseCurve.tsx` and `PkSimulator.tsx` lack `dir="ltr"` container wrappers.

5. **Design System Focus Rings**:
   - `index.css:30-33` sets `:focus-visible` to `#F59E0B` in dark mode.
   - Overridden with `#FFD93D` (neo yellow) in:
     - `AuthModal.tsx:404`: `focus:ring-[#FFD93D]`
     - `Input.tsx:34`: `focus:ring-[#FFD93D]`
     - `PaywallModal.tsx:214, 216`: `focus:ring-[#FFD93D]`

6. **Pricing & Student Authentication**:
   - Front-end displays TRY (₺250, ₺850, ₺1,450).
   - But [`courses/medchem/pricing.json:6`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/courses/medchem/pricing.json#L6) and `pharmacology/pricing.json:6` have `"currencyDefault": "USD"` and define USD, SAR, and EUR.
   - [`packages/ui/src/components/PaywallModal/PaywallModal.tsx:10`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/ui/src/components/PaywallModal/PaywallModal.tsx#L10) defines `Currency = 'USD' | 'TRY' | 'SAR'`.
   - `PaywallModal.tsx:140` references "55 modules", contradicting the 11-module architecture.
   - `PricingPage.tsx:333, 369, 401` uses raw `alert()` for checkout.

7. **Pedagogical 12-Stage Progression**:
   - `courses/medchem/lessons/lesson-01.json` contains only 10 steps, not 12.
   - `courses/pharmacology/` contains 0 lessons.
   - 21 of the 22 promised free lessons do not exist.

---

## 2. Logic Chain

1. **Observation**: `tr.json` and `ar.json` are absent, while UI strings in `apps/web` and `packages/widgets` are hardcoded in English, with ad-hoc ternaries for Turkish.
   **Inference**: The platform cannot meet Acceptance Criteria (0 missing translation keys, 0 untranslated English strings) without a centralized i18n dictionary system and component refactoring.

2. **Observation**: `courses/medchem/course.config.json` uses `"title": "... Farmasötik ve Medisinal Kimya"`, and `PricingPage.tsx` uses `"MedKim"`.
   **Inference**: The platform directly violates Requirement R1 (mandatory canonical `"Farmasötik Kimya"`).

3. **Observation**: In `LessonPage.tsx`, `dir={locale === 'ar' ? 'ltr' : undefined}` is applied to all prompts and options because `lesson-01.json` has only English content.
   **Inference**: When users select Arabic, the layout is broken by an artificial hack forcing LTR on Arabic screens. The Special Arabic Rule (Arabic prose with Turkish technical badges) was never implemented.

4. **Observation**: KaTeX is absent from `package.json`, and SVG canvases/plots lack explicit `dir="ltr"` isolation.
   **Inference**: Mathematical equations cannot render with proper mathematical typography, and Cartesian plots risk bidirectional inversion in Arabic RTL mode.

5. **Observation**: Backend `pricing.json` files default to USD and define foreign currencies, and `PaywallModal.tsx` defines USD and SAR types.
   **Inference**: The system violates the strict TRY-only mandate (Requirement R7), creating risks of currency leakage and pricing confusion.

6. **Observation**: Only 1 lesson exists (`lesson-01.json`), structured with 10 steps rather than the 12-stage active learning progression.
   **Inference**: The platform fails Requirement R4 (12-stage instructional anatomy) and the 22-free-lesson guarantee (R7).

---

## 3. Caveats

- **Scope Boundary**: This was a read-only investigation. No source code was modified.
- **Backend Emulators**: Firebase emulator integration tests for Cloud Functions payments and rules were verified via `npm test` passing, but external Stripe/Dodo gateways were not called live.
- **E2E Playwright Suite**: Existing Playwright test specs (`e2e/lesson-slice.spec.ts`) pass only because they assert a single translated title before reverting to English or looking for English text. They do not yet assert 100% Arabic or Turkish copy coverage.

---

## 4. Conclusion

The pharmacy education platform has a solid technical foundation (functional React SPA, Neo-Brutalist UI styling, 86 passing unit tests, and interactive simulation primitives). However, **it requires a systematic overhaul to achieve the required world-class bilingual standard**:
1. Implement centralized `tr.json` and `ar.json` dictionaries and an i18n hook.
2. Set default locale to Turkish (`tr`) in `main.tsx`.
3. Eliminate "Medisinal Kimya" and "MedKim" in favor of canonical "Farmasötik Kimya".
4. Implement the Special Arabic Rule with a dedicated `<TechnicalTermBadge>` component and author Arabic lesson content.
5. Remove the Arabic forced LTR hack in `LessonPage.tsx`.
6. Add strict `dir="ltr"` wrappers around all molecular SVG canvases, coordinate graphs, and install KaTeX.
7. Enforce `#F59E0B` warm amber focus rings across all UI components.
8. Align backend pricing schemas strictly to TRY and author the remaining free lessons following the 12-stage instructional anatomy.

A complete file-by-file remediation matrix is provided in [`analysis.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/.agents/teamwork/explorer_codebase_1/analysis.md).

---

## 5. Verification Method

To independently verify these findings, inspect the following files and execute the commands below:

1. **Verify Unit Test Suite Baseline**:
   ```pwsh
   pnpm -r --workspace-concurrency=1 run test
   ```
   *Expected*: 86 tests pass across `@pharmacy/platform`, `@pharmacy/ui`, and `@pharmacy/widgets`.

2. **Verify Absence of Localization Files**:
   ```pwsh
   Get-ChildItem -Path . -Recurse -Include "tr.json","ar.json" -Exclude "node_modules"
   ```
   *Expected*: Zero files returned.

3. **Verify "Medisinal Kimya" Violation**:
   ```pwsh
   Select-String -Path "courses\medchem\course.config.json" -Pattern "Medisinal Kimya"
   ```
   *Expected*: Line 4 matches.

4. **Verify Default Locale Bug in `main.tsx`**:
   ```pwsh
   Select-String -Path "apps\web\src\main.tsx" -Pattern "defaultLocale"
   ```
   *Expected*: Line 12 matches `defaultLocale="en"`.

5. **Verify Forced LTR Hack in `LessonPage.tsx`**:
   ```pwsh
   Select-String -Path "apps\web\src\pages\LessonPage.tsx" -Pattern "dir=\{locale === 'ar' \? 'ltr' : undefined\}"
   ```
   *Expected*: Matches on lines 457, 467, 543, 600, 616, 620.

6. **Verify USD Default in Backend Pricing**:
   ```pwsh
   Select-String -Path "courses\medchem\pricing.json" -Pattern "currencyDefault"
   ```
   *Expected*: Line 6 matches `"currencyDefault": "USD"`.

7. **Invalidation Conditions**:
   - If `tr.json` or `ar.json` exist, finding 1 is invalidated.
   - If `main.tsx` sets `defaultLocale="tr"`, finding 2 is invalidated.
   - If `courses/medchem/course.config.json` uses exclusively "Farmasötik Kimya", finding 3 is invalidated.
