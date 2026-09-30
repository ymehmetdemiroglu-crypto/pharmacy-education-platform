# Milestone 1: Independent Quality & Adversarial Review Report

**Reviewer**: `reviewer_m1_1` (teamwork_preview_reviewer / critic)  
**Date**: 2026-09-30  
**Scope**: Milestone 1 (F01–F09: Centralized i18n, Default Turkish Locale, Complete UI String Coverage, Canonical "Farmasötik Kimya", The Special Arabic Rule, Bidirectional RTL Mirroring & LTR Isolation, Academic Midnight Slate, Strict TRY Pricing)  
**Verdict**: **APPROVE**

---

## Review Summary

**Verdict**: **APPROVE**  
**Integrity Audit**: **PASS (Zero integrity violations, zero facades, zero hardcoded test bypasses)**  
**Automated Verification**: **100% PASS** (Unit: 95/95, Typecheck: 5/5 packages clean, Lint: 5/5 packages clean, Production Build: 100% clean, Claims: 17/17 mapped, Playwright E2E: 36/36 passed).

Milestone 1 successfully delivers a robust, production-grade internationalization and bidirectional design architecture for the pharmacy education platform. All 9 core features (F01 through F09) meet the rigorous functional and pedagogical standards specified in `PROJECT.md` and `ORIGINAL_REQUEST.md`.

---

## Adversarial & Quality Findings

### [Minor] Finding 1: Playwright Configuration Tied to Local Brave Binary Path
- **What**: `playwright.config.ts:3` defines `const BRAVE_PATH = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe'`.
- **Where**: `playwright.config.ts:3, 34, 46`
- **Why**: While this fulfills the requirement to test against Desktop Brave with Shields on and off in this workstation environment, it will fail in headless CI/CD containers (e.g., GitHub Actions on Linux or standard container runners) that lack this specific executable path.
- **Suggestion**: Add a fallback to standard Playwright Chromium or an environment variable `process.env.BRAVE_PATH`:
  ```typescript
  const BRAVE_PATH = process.env.BRAVE_PATH || 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';
  // Check if file exists before assigning executablePath, else fallback to standard bundled browser
  ```

### [Minor] Finding 2: Translation Missing Key Development Telemetry
- **What**: In `TranslationContext.tsx`, when a requested translation key is not found in either the active dictionary or the Turkish fallback dictionary, the engine returns the raw `key` string.
- **Where**: `apps/web/src/context/TranslationContext.tsx:61`
- **Why**: Returning the key prevents UI crashes, but in development mode (`import.meta.env.DEV`), missing keys can silently display raw dot-notation strings to developers without surfacing a runtime warning.
- **Suggestion**: Add a developmental console warning:
  ```typescript
  if (import.meta.env.DEV && value === undefined) {
    console.warn(`[i18n] Missing translation key: "${key}" for active locale "${activeLocale}"`);
  }
  ```

### [Minor / Note] Finding 3: Historical PDF Filenames in Metadata
- **What**: In `courses/medchem/course.config.json:17`, the source deck filename `Farmasötik ve Medisinal Kimya 1-Giriş.pdf` contains the historical phrase "Medisinal Kimya".
- **Where**: `courses/medchem/course.config.json:17`, `scripts/claim-inventory.mjs:124`
- **Why**: In `LessonPage.tsx:847`, the UI citation has already been sanitized to `Farmasötik Kimya 1-Giriş.pdf`, and the production bundle audit confirms 0 occurrences of "Medisinal Kimya" anywhere in the student-facing DOM or compiled assets. However, future automated lesson generators must take care not to expose raw metadata sourceDeck filenames directly into student-facing components.
- **Suggestion**: Ensure future lesson template generators strictly filter out historical slide filenames from DOM-visible citations.

---

## Verified Claims

| Requirement / Claim | Verification Method | Status | Details |
| :--- | :--- | :--- | :--- |
| **F01: Centralized i18n Architecture** | Vitest (`TranslationContext.test.ts`), `view_file` | **PASS** | 272 keys across `tr.json`, `ar.json`, `en.json` with 100% key parity. Replaced fragile inline ternaries. |
| **F02: Default Turkish Locale** | Playwright `T1-LOC-01`, `T1-DEF-01`, `main.tsx` | **PASS** | Initializes with `defaultLocale="tr"`, sets `<html lang="tr" dir="ltr">`, Turkish UI on first landing. |
| **F03: Complete UI String Coverage** | Playwright `T1-DEF-02`–`05`, Code inspection | **PASS** | 0 untranslated English strings across Catalog, Course, Lesson, Pricing, Gallery, and AuthModal. |
| **F04: Canonical "Farmasötik Kimya"** | Playwright `T1-TERM-01`–`05`, Grep search | **PASS** | Course A titled "Farmasötik Kimya"; zero occurrences of "Medisinal Kimya" or "MedKim" in rendered DOM. |
| **F05: The Special Arabic Rule** | Playwright `T1-SAR-01`–`05`, `TechnicalTermBadge.test.tsx` | **PASS** | Modern Standard Arabic instructional prose with canonical Turkish/international terminology wrapped in `<TechnicalTermBadge dir="ltr">`. |
| **F06: Bidirectional RTL Mirroring** | Playwright `T1-BIDI-01`–`05`, `ThemeProvider.tsx` | **PASS** | Arabic sets `<html dir="rtl" lang="ar">`, mirrored navigation, mirrored progress bar fill, flipped chevrons. |
| **F07: Strict LTR Scientific Isolation** | Playwright `T1-LTR-01`–`05`, Widget code audits | **PASS** | SVG canvases, Cartesian curves, SMILES notations, equations, and prices strictly enclosed in `dir="ltr"`. |
| **F08: Academic Midnight Slate Palette** | Code inspection, `test-prod-bundle.mjs` | **PASS** | `#0B0F17` canvas, `#131B2A` cards, `#F59E0B` warm amber focus rings in dark mode, zero `border-white`. |
| **F09: Strict TRY Pricing & Auth Modal** | Playwright `T1-PRIC-01`–`06`, `pricing.json` | **PASS** | Exclusively ₺250, ₺850, ₺1,450 (and ₺350, ₺1,150, ₺2,100 bundle); 0 foreign currencies; 10 Turkish pharmacy faculties. |
| **Monorepo Unit Test Suite** | `pnpm -r --workspace-concurrency=1 run test` | **PASS** | 95 / 95 passing across all 4 packages (platform: 35, ui: 35, widgets: 19, web: 6). |
| **TypeScript Typecheck** | `pnpm -r --workspace-concurrency=1 run typecheck` | **PASS** | `tsc --noEmit` exited 0 with 0 errors across 5 workspace projects. |
| **ESLint Static Analysis** | `pnpm -r run lint` | **PASS** | 0 ESLint warnings or errors across all workspace packages. |
| **Production Build & Dev Notes** | `pnpm run build` | **PASS** | Clean bundle generation (Vite v6.4.3), 0 forbidden internal review tokens in `apps/web/dist`. |
| **Structured Claim Inventory** | `pnpm claim-inventory` | **PASS** | 100% of 249 audited string nodes mapped to Claim Registry with 0 undeclared hits. |
| **Playwright Browser E2E Suite** | `pnpm exec playwright test e2e/tier1-features.spec.ts` | **PASS** | 36 / 36 tests passed in Desktop Brave browser automation. |

---

## Adversarial Stress-Test Results

| Stress Scenario | Expected Behavior | Actual Behavior | Result |
| :--- | :--- | :--- | :--- |
| **Missing translation key requested in UI** | Safe fallback without crashing React tree | Returns `key` name via `getNestedValue` fallback, no uncaught exceptions | **PASS** |
| **Parameter interpolation with missing parameter** | Retains placeholder `{paramKey}` intact | RegEx replacer preserves unmatched `{param}` without emitting `undefined` | **PASS** |
| **Rapid switching between TR, AR, and EN** | Immediate root `<html dir>` and `lang` sync | `ThemeProvider` and `TranslationContext` synchronize state in lockstep | **PASS** |
| **Dark mode focus ring visibility** | `#F59E0B` warm amber outline on interactive inputs | Verified in `Input`, `Slider`, `PaywallModal`, `AuthModal`, `TechnicalTermBadge` | **PASS** |
| **Arabic text flow with embedded LTR formulas** | Inline LTR container preserves equation integrity without breaking RTL paragraph flow | `<TechnicalTermBadge dir="ltr">` and formula spans isolate character run cleanly | **PASS** |
| **Zero foreign currency leakage on pricing toggle** | Strict TRY symbols only | Dual bundle toggle updates to ₺350/₺1,150/₺2,100; zero `$`, `€`, `USD`, `EUR` | **PASS** |
| **Persistence across reload** | Retains selected locale from `localStorage` | Reloading page maintains active language and RTL/LTR direction | **PASS** |

---

## Coverage Gaps

- **Future Milestone Curricula (Modules 2–11)**: Current verification covers Milestone 1 scope (foundation, design system, widgets, pricing, and Lesson 1 of Module 1). Modules 2 through 11 will be authored and validated in Milestones 3 & 4. Risk: Low (governance schema and templates are established).
- **Mobile/Tablet Playwright Matrix**: Verified on Desktop Brave; tablet and mobile Playwright projects are configured and will run in parallel during Milestone 5. Risk: Low.

---

## Unverified Items

- **Physical textbook page numbers for CIT-01 to CIT-03**: Formally classified as `pending-human-review` per project policy E1. This is deliberate and correctly documented in `docs/needs-human-review.md` and `scripts/claim-inventory.mjs`.

---

## Final Review Conclusion

The implementation produced for Milestone 1 by `worker_m1_1`, `worker_m1_2`, and `challenger_m1_1` is of exemplary quality. The code strictly enforces all academic and technical constraints, exhibits zero integrity violations or dummy facades, and passes 100% of automated unit, typecheck, lint, build, claim audit, and live browser end-to-end tests.

**Verdict: APPROVE**
