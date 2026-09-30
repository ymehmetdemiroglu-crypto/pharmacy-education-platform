# TEST INFRASTRUCTURE SPECIFICATION & METHODOLOGY (TEST_INFRA.md)

**Project**: Multilingual, Interactive, Concept-Mastery Pharmacy Education Platform  
**Author**: `test_writer_e2e_1` (Teamwork E2E Test Writer)  
**Standard**: Dual Track Quality Assurance & Opaque-Box E2E Testing Protocol  
**Date**: 2026-09-30  
**Version**: 1.0.0  

---

## 1. Overview & Testing Philosophy

The Pharmacy Education Platform is an institutional-grade, bilingual (Turkish primary, Modern Standard Arabic with canonical Turkish technical terms) learning system for clinical and undergraduate pharmacy education. It delivers concept-mastery instruction through a 12-stage pedagogical sequence, interactive biophysical simulation widgets, spaced retrieval with memory decay models, and strict Turkish Lira (TRY) freemium pricing.

### 1.1 Opaque-Box Testing Philosophy
To ensure unyielding test integrity and prevent facade implementations:
1. **Zero White-Box Leaks**: Tests treat the platform as an opaque application, interacting with it solely through the rendered DOM, accessible user semantics (`role`, accessible names, ARIA properties), URL transitions, keyboard events, and network boundaries.
2. **Behavioral Contract Enforcement**: Tests verify external behavior, interface contracts, and scientific correctness, not internal component implementation details or private state.
3. **No Cheating or Facade Acceptance**: Tests assert authentic behavior (e.g. real calculations of Henderson-Hasselbalch, real Ferguson thermodynamic activity ratios, actual DOM attributes `dir="rtl"` and `lang="ar"`, actual local/remote storage mutations). Hardcoded dummy passes or superficial facade tests are prohibited.

---

## 2. 4-Tier Test Architecture & Methodology

The test track follows the 4-tier testing hierarchy defined in the Quality Assurance and Dual Track testing specifications:

```
┌────────────────────────────────────────────────────────────────────────┐
│               TIER 4: REAL-WORLD APPLICATION SCENARIOS                 │
│      - 5 End-to-End Persona-Driven Clinical & Academic Workflows       │
│      - Student Discovery, Arabic Study, Free Trial Lifecycle, A11y    │
├────────────────────────────────────────────────────────────────────────┤
│               TIER 3: CROSS-FEATURE COMBINATIONS                       │
│      - Pairwise Interaction Testing Across Intersecting Dimensions     │
│      - Arabic RTL + Paywall, Dark Mode + Sliders, Locale + Stepper     │
├────────────────────────────────────────────────────────────────────────┤
│               TIER 2: BOUNDARY & CORNER CASES (>=5 / Feature Area)     │
│      - Viewport Stress (375px-2560px), Rapid Locale/Theme Toggling     │
│      - Biophysical Slider Bounds (Pt=0, Pt=P0, pH 0-14, logP bounds)   │
│      - Entitlement Tampering, Idempotency, Malformed Auth Form Inputs  │
├────────────────────────────────────────────────────────────────────────┤
│               TIER 1: FEATURE COVERAGE (>=5 / Feature Across R1-R7)    │
│      - Localization & Language Switcher, Default Turkish, UI Strings   │
│      - Canonical "Farmasötik Kimya", Special Arabic Rule & Badges      │
│      - Bidirectional RTL Mirroring, Strict LTR Scientific Isolation    │
│      - Strictly TRY Pricing Architecture, 22 Free Lessons, Faculty Auth│
└────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Tier 1: Feature Coverage (`e2e/tier1-features.spec.ts`)
Validates every functional requirement across R1–R7 with at least 5 positive verification tests per feature area:
- **Feature 1: Global Localization Architecture & Language Switcher (F01, R1)**: Verifies Turkish, Arabic, and English locale switching, document attributes (`lang`, `dir`), route preservation, and fallback behavior.
- **Feature 2: Default Turkish Locale & Complete UI String Coverage (F02, F03, R1)**: Verifies `tr` as default locale on fresh sessions, zero untranslated English strings, and complete UI coverage across catalog, pricing, gallery, and modals.
- **Feature 3: Canonical Turkish Terminology — "Farmasötik Kimya" (F04, R1, R2)**: Verifies exclusive use of canonical *"Farmasötik Kimya"* across titles, cards, and metadata, asserting zero occurrences of the obsolete term *"Medisinal Kimya"*.
- **Feature 4: The Special Arabic Rule & Typographical Semantic Badges (F05, R2)**: Verifies Arabic instructional prose paired with Turkish canonical keywords (*mitokondri*, *reseptör*, *iyonizasyon*) wrapped in distinct semantic badges with `dir="ltr"` isolation.
- **Feature 5: Bidirectional RTL / LTR Layout Mirroring (F06, R3)**: Verifies full layout mirroring in Arabic mode (`dir="rtl"`) for navigation, progress bars, cards, buttons, and drawer panels.
- **Feature 6: Strict LTR Scientific Isolation (F07, R3)**: Verifies strict `dir="ltr"` container isolation for chemical formulas, SMILES notations, KaTeX equations ($a = P_t / P_0$), and simulation canvases.
- **Feature 7: TRY Pricing & Freemium Architecture (F08, F09, R7)**: Verifies strictly Turkish Lira pricing (₺250, ₺850, ₺1,450), 22 permanently free lessons guarantee, 7-day cardless trial highlight, and Turkish Pharmacy Faculty selection.

### 2.2 Tier 2: Boundary & Corner Cases (`e2e/tier2-boundaries.spec.ts`)
Validates robustness under boundary conditions and stress inputs (>=5 tests per boundary domain):
- **Boundary 1: Extreme Viewport Scaling & Mobile Limits**: Mobile (375x667), Tablet (768x1024), 4K Desktop (2560x1440), zero horizontal scrollbar leaks, sticky mobile action bar, text wrap for long university names.
- **Boundary 2: Rapid Locale & Theme Switching**: Rapidly toggling TR/AR/EN 10 times in 2 seconds, toggling locale during active step progression, toggling locale with open modals without unmounting state.
- **Boundary 3: Biophysical Slider Boundaries**: Ferguson saturation $P_t = P_0$ ($a = 1.00$ without floating-point overflow), $P_t = 0$ ($a = 0.00$ division-by-zero protection), Henderson-Hasselbalch extreme pH (0.0 and 14.0), logP boundaries (-5.0 to +10.0).
- **Boundary 4: Cardless Trial & Entitlement Boundaries**: Duplicate trial start attempts rejected with idempotent guard, direct deep link to paid lesson without entitlement triggers paywall, client-side localStorage tampering blocked, expired trial downgrade retains 100% of progress/XP.
- **Boundary 5: Input Validation & Step Boundaries**: Empty email/password submission blocked with localized error alerts, password < 6 characters validation, advancing without committing prediction hypothesis blocked, rapid double-click on commit does not duplicate XP, step boundary keyboard events (ArrowLeft on Step 1, ArrowRight on Step 10).

### 2.3 Tier 3: Cross-Feature Combinations (`e2e/tier3-combinations.spec.ts`)
Evaluates pairwise interactions across intersecting dimensions:
- `T3-COMB-01`: Arabic RTL (`ar`) + Paywall Modal (Mirrored dialog, TRY pricing in RTL, escape close).
- `T3-COMB-02`: Academic Midnight Slate Dark Mode (`#0B0F17`) + Interactive Simulation Widgets.
- `T3-COMB-03`: Active Lesson Step Progression + Dynamic Locale Switching (preserving step index and answers).
- `T3-COMB-04`: Special Arabic Rule + Chemical Formula LTR Isolation + Typographical Badges.
- `T3-COMB-05`: Reduced Motion Mode (`prefers-reduced-motion: reduce`) + Modal Transitions and Widgets.
- `T3-COMB-06`: Guest Mode + Step Progress Persistence in LocalStorage.
- `T3-COMB-07`: Keyboard Navigation + AuthModal Turkish Pharmacy Faculty Dropdown.
- `T3-COMB-08`: Pricing Scope Toggle (Single vs Dual Bundle) in Turkish and Arabic locales.

### 2.4 Tier 4: Real-World Scenarios (`e2e/tier4-scenarios.spec.ts`)
End-to-end clinical pharmacy student workflows:
- **Scenario 1**: 1st-Year Turkish Student (Deniz, Istanbul University) completes Farmasötik Kimya Lesson 1 (predict-reveal commit, diagnostic misconception feedback, calculation, Leitner card enqueue, textbook citations).
- **Scenario 2**: Arabic-Speaking Student (Tariq) analyzes receptor binding with the Special Arabic Rule (Arabic prose, Turkish badges in LTR, simulation widget interaction).
- **Scenario 3**: Freemium Lifecycle & Non-Destructive Downgrade (Ayşe) (Lesson 1 & 2 free preview, Lesson 3 paywall, 1-click cardless trial start, trial expiration simulation, verification that 100% of progress, XP, and Leitner review cards are preserved).
- **Scenario 4**: Student Registration with Turkish Pharmacy Faculty Affiliation (Registers selecting "Hacettepe Üniversitesi", profile stores affiliation, free tier activated).
- **Scenario 5**: Academic Midnight Slate High-Contrast Accessibility & Keyboard Audit (Zeynep) (Full dark mode keyboard navigation through catalog, lesson, and widgets).

---

## 3. Playwright Multi-Viewport Matrix

All Playwright tests are configured to run across a multi-viewport and multi-engine matrix configured in `playwright.config.ts`:

| Project Name | Browser Engine | Viewport | Target Locales | Emulation / Features |
|---|---|---|---|---|
| `desktop-brave-shields-default` | Brave / Chromium | 1440 x 900 | TR, AR, EN | Shields ON (Aggressive tracker/fingerprint block) |
| `desktop-brave-shields-down` | Brave / Chromium | 1440 x 900 | TR, AR, EN | Shields OFF (`--disable-brave-shields`) |
| `tablet-brave` | Brave / Chromium | 768 x 1024 | TR, AR | Tablet portrait touch & responsive layout |
| `mobile-brave` | Brave / Chromium | 375 x 667 | TR, AR | Mobile viewport, `isMobile: true`, touch gestures |

---

## 4. Axe-Core Accessibility Automated Scan Protocol

In compliance with WCAG 2.1 AA standards and Deliverable H:
1. **Automated Axe-Core Audits (`e2e/a11y-audit.spec.ts`)**:
   - Injects `axe-core` directly into page context via `page.addScriptTag({ path: AXE_PATH })`.
   - Runs against tags: `['wcag2a', 'wcag2aa', 'wcag21aa']`.
   - **Pass/Fail Semantics**: The test strictly filters for violations with `impact === 'serious' || impact === 'critical'`. Test FAILS if `seriousOrCritical.length > 0`.
2. **Coverage Routes**:
   - `/catalog`: Course catalog and module curriculum listings.
   - `/pricing`: Subscription passes and bundle toggle.
   - `/gallery`: Interactive component showcase and 9 simulation widgets.
   - `/courses/medchem/lessons/1`: 12-stage interactive lesson progression, hint ladder, and citations.
   - `PaywallModal`: Open modal dialog in Light, Dark, and Arabic RTL.
   - `AuthModal`: Open student registration dialog with faculty selection.
3. **Contrast Standard**:
   - Body copy against background: Contrast ratio >= 4.5:1.
   - UI controls & borders: Contrast ratio >= 3.0:1.
   - Academic Midnight Slate tokens: `#0B0F17` (canvas), `#131B2A` (cards), `#1E293B` (surfaces), `#334155` (borders), `#F59E0B` (amber focus ring with 3px offset).
   - Strict ban on pure white cages (`border-white`) and fluorescent drop shadows.

---

## 5. Test Runner Commands & CI Integration

### 5.1 Playwright E2E Runner Commands
```powershell
# Run the entire E2E test suite across all 4 projects:
npx playwright test

# Run a specific tier:
npx playwright test e2e/tier1-features.spec.ts
npx playwright test e2e/tier2-boundaries.spec.ts
npx playwright test e2e/tier3-combinations.spec.ts
npx playwright test e2e/tier4-scenarios.spec.ts
npx playwright test e2e/a11y-audit.spec.ts

# Run with specific project filter:
npx playwright test --project=desktop-brave-shields-default
npx playwright test --project=tablet-brave
npx playwright test --project=mobile-brave

# Dry-run list all tests without executing:
npx playwright test --list
```

### 5.2 Pass/Fail Semantics & Invariants
Every test run must satisfy the following invariant criteria:
1. `expect(seriousOrCriticalViolations).toEqual([])`: Zero serious or critical WCAG 2.1 AA violations.
2. `expect(consoleErrors).toEqual([])`: Zero unhandled JavaScript exceptions or console errors.
3. `expect(failedRequests).toEqual([])`: Zero 4xx or 5xx internal asset/API network request failures.
4. `expect(remoteFirestoreWrites).toEqual([])`: Zero unauthorized remote database mutations for guest users.
5. Exit code 0 on all test runs.
