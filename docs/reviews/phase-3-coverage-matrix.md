# Phase 3 Automated Test & Screenshot Coverage Matrix

*Generated automatically by `scripts/generate-coverage-table.mjs` from on-disk artifact inspection.*

## 1. True Viewport Configurations

- **Mobile Viewport**: 375x667 (1 unique viewport width: **375px**)
- **Tablet Viewport**: 768x1024 (1 unique viewport width: **768px**)
- **Desktop Viewport**: 1440x900 (1 unique viewport width: **1440px**, evaluated across Shields Default & Shields Down)
- **Total Unique Viewport Widths Audited**: **3** (375, 768, 1440).

## 2. Interactive Lesson Step Screenshot Coverage

| Step / State | Mobile (375px) | Tablet (768px) | Desktop Default (1440px) | Desktop Shields Down (1440px) |
|---|---|---|---|---|
| Step 1: Hook (Two Drugs, Vastly Different Quantities) | `mobile-brave-step-01-hook.png` | `tablet-brave-step-01-hook.png` | `desktop-brave-shields-default-step-01-hook.png` | `desktop-brave-shields-down-step-01-hook.png` |
| Step 2: Predict Relative Saturation (Vapor Pressure) | `mobile-brave-step-02-predict-unselected.png` | `tablet-brave-step-02-predict-unselected.png` | `desktop-brave-shields-default-step-02-predict-unselected.png` | `desktop-brave-shields-down-step-02-predict-unselected.png` |
| Step 2 Incorrect Hypothesis Feedback | `mobile-brave-step-02-predict-wrong.png` | `tablet-brave-step-02-predict-wrong.png` | `desktop-brave-shields-default-step-02-predict-wrong.png` | `desktop-brave-shields-down-step-02-predict-wrong.png` |
| Step 2 Hint Tier 1 (Free Guiding Nudge) | `mobile-brave-step-02-hint-drawer.png` | `tablet-brave-step-02-hint-drawer.png` | `desktop-brave-shields-default-step-02-hint-drawer.png` | `desktop-brave-shields-down-step-02-hint-drawer.png` |
| Step 2 Hint Tier 2/3 (Paywall Trigger) | `mobile-brave-step-02-locked-tier2-paywall.png` | `tablet-brave-step-02-locked-tier2-paywall.png` | `desktop-brave-shields-default-step-02-locked-tier2-paywall.png` | `desktop-brave-shields-down-step-02-locked-tier2-paywall.png` |
| Step 3: Hypothesis Confirmed / Equilibrium Threshold | `mobile-brave-step-03-predict-revealed.png` | `tablet-brave-step-03-predict-revealed.png` | `desktop-brave-shields-default-step-03-predict-revealed.png` | `desktop-brave-shields-down-step-03-predict-revealed.png` |
| Step 4: Exobiophase to Endobiophase | — *(E2E Assertion in `e2e/lesson-slice.spec.ts`)* | — *(E2E Assertion in `e2e/lesson-slice.spec.ts`)* | — *(E2E Assertion in `e2e/lesson-slice.spec.ts`)* | — *(E2E Assertion in `e2e/lesson-slice.spec.ts`)* |
| Step 5: Checkpoint (Classify Mystery Compounds) | `mobile-brave-step-05-checkpoint.png` | `tablet-brave-step-05-checkpoint.png` | `desktop-brave-shields-default-step-05-checkpoint.png` | `desktop-brave-shields-down-step-05-checkpoint.png` |
| Step 6: Core Structural Sensitivity | — *(E2E Assertion in `e2e/lesson-slice.spec.ts`)* | — *(E2E Assertion in `e2e/lesson-slice.spec.ts`)* | — *(E2E Assertion in `e2e/lesson-slice.spec.ts`)* | — *(E2E Assertion in `e2e/lesson-slice.spec.ts`)* |
| Step 7: Chemical Diversity in Anesthesia | — *(E2E Assertion in `e2e/lesson-slice.spec.ts`)* | — *(E2E Assertion in `e2e/lesson-slice.spec.ts`)* | — *(E2E Assertion in `e2e/lesson-slice.spec.ts`)* | — *(E2E Assertion in `e2e/lesson-slice.spec.ts`)* |
| Step 8: Differentiating Affinity from Saturation | — *(E2E Assertion in `e2e/lesson-slice.spec.ts`)* | — *(E2E Assertion in `e2e/lesson-slice.spec.ts`)* | — *(E2E Assertion in `e2e/lesson-slice.spec.ts`)* | — *(E2E Assertion in `e2e/lesson-slice.spec.ts`)* |
| Step 9: Calculate Thermodynamic Activity | — *(E2E Assertion in `e2e/lesson-slice.spec.ts`)* | — *(E2E Assertion in `e2e/lesson-slice.spec.ts`)* | — *(E2E Assertion in `e2e/lesson-slice.spec.ts`)* | — *(E2E Assertion in `e2e/lesson-slice.spec.ts`)* |
| Step 10: Recap Mastered & Review Cards Enqueued | `mobile-brave-step-10-recap-complete.png` | `tablet-brave-step-10-recap-complete.png` | `desktop-brave-shields-default-step-10-recap-complete.png` | `desktop-brave-shields-down-step-10-recap-complete.png` |

## 3. Platform & Paywall State Screenshot Coverage

| Platform State | Mobile (375px) | Tablet (768px) | Desktop Default (1440px) | Desktop Shields Down (1440px) |
|---|---|---|---|---|
| Citations & Provenance Accordion | `mobile-brave-citations-accordion.png` | `tablet-brave-citations-accordion.png` | `desktop-brave-shields-default-citations-accordion.png` | `desktop-brave-shields-down-citations-accordion.png` |
| Lesson 3 Paywall Light (EN) | `mobile-brave-lesson-03-paywall-light-en.png` | `tablet-brave-lesson-03-paywall-light-en.png` | `desktop-brave-shields-default-lesson-03-paywall-light-en.png` | `desktop-brave-shields-down-lesson-03-paywall-light-en.png` |
| Lesson 3 Paywall Dark Mode | `mobile-brave-lesson-03-paywall-dark.png` | `tablet-brave-lesson-03-paywall-dark.png` | `desktop-brave-shields-default-lesson-03-paywall-dark.png` | `desktop-brave-shields-down-lesson-03-paywall-dark.png` |
| Lesson 3 Paywall Dark + RTL (AR) | `mobile-brave-lesson-03-paywall-dark-rtl-ar.png` | `tablet-brave-lesson-03-paywall-dark-rtl-ar.png` | `desktop-brave-shields-default-lesson-03-paywall-dark-rtl-ar.png` | `desktop-brave-shields-down-lesson-03-paywall-dark-rtl-ar.png` |
| Turkish Localization (TR) | `mobile-brave-lesson-tr.png` | `tablet-brave-lesson-tr.png` | `desktop-brave-shields-default-lesson-tr.png` | `desktop-brave-shields-down-lesson-tr.png` |
| 7-Day Free Trial Started UI | `mobile-brave-trial-started-ui.png` | `tablet-brave-trial-started-ui.png` | `desktop-brave-shields-default-trial-started-ui.png` | `desktop-brave-shields-down-trial-started-ui.png` |
| Keyboard Nav & Reduced Motion | — *(N/A or E2E Tested)* | `tablet-brave-keyboard-nav-reduced-motion-step-10.png` | `desktop-brave-shields-default-keyboard-nav-reduced-motion-step-10.png` | `desktop-brave-shields-down-keyboard-nav-reduced-motion-step-10.png` |

## 4. Keyboard-Only Navigation Run: Assertions Per Step

The keyboard-only navigation suite in `e2e/lesson-slice.spec.ts` executes a full 10-step completion with reduced motion enabled, asserting accessibility without mouse interaction:

| Step | Action Sequence | Assertions Executed |
|---|---|---|
| Step 1 | `ArrowRight` | `expect(getByText('Thermodynamic Activity of Vapors')).toBeVisible()` |
| Step 2 | `'1' -> Enter -> ArrowRight` | `expect(getByText(/Diagnostic Feedback|Hypothesis Confirmed/i)).toBeVisible()` |
| Step 3 | `'1' -> Enter -> ArrowRight` | `expect(getByText('The Non-Specific Activity Threshold')).toBeVisible(); expect(getByText(/Hypothesis Confirmed/i)).toBeVisible()` |
| Step 4 | `'1' -> Enter -> ArrowRight` | `expect(getByText('Exobiophase to Endobiophase Equilibrium')).toBeVisible(); expect(getByText(/Hypothesis Confirmed/i)).toBeVisible()` |
| Step 5 | `'1' -> ArrowRight` | `expect(getByText('Classify Mystery Compounds')).toBeVisible()` |
| Step 6 | `'1' -> Enter -> ArrowRight` | `expect(getByText('Core Structural Sensitivity')).toBeVisible(); expect(getByText(/Hypothesis Confirmed/i)).toBeVisible()` |
| Step 7 | `'1' -> Enter -> ArrowRight` | `expect(getByText('Chemical Diversity in Anesthesia')).toBeVisible(); expect(getByText(/Hypothesis Confirmed/i)).toBeVisible()` |
| Step 8 | `'1' -> Enter -> ArrowRight` | `expect(getByText('Differentiating Affinity from Saturation')).toBeVisible(); expect(getByText(/Hypothesis Confirmed/i)).toBeVisible()` |
| Step 9 | `'1' -> Enter -> ArrowRight` | `expect(getByRole('heading', { name: 'Calculate Thermodynamic Activity' })).toBeVisible(); expect(getByText(/Hypothesis Confirmed/i)).toBeVisible()` |
| Step 10 | `ArrowRight (Arrival)` | `expect(getByText('Lesson 1 Mastered!')).toBeVisible(); verifies XP badge and Leitner card enqueue` |
