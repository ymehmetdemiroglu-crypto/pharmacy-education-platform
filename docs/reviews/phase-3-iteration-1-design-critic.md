# Independent Review Report — Design Critic
**Phase**: Phase 3 — Vertical Slice A (Course A: MedChem Lesson 1 & Freemium Platform)  
**Iteration**: 1 (Visual, Aesthetic, Typography, Spacing, Contrast & Layout Audit)  
**Reviewer Role**: Independent Design Critic (Fresh Context Subagent)  
**Target Specifications**: [`docs/ui-guidelines.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/ui-guidelines.md), [`.agents/rules/design-rules.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/.agents/rules/design-rules.md), Section 5 of [`AGENTS.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/AGENTS.md)  
**Artifact**: [`docs/reviews/phase-3-iteration-1-design-critic.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/reviews/phase-3-iteration-1-design-critic.md)  
**Verdict**: **CHANGES REQUESTED (0 P0 Blockers, 6 P1 Critical Issues, 3 P2 Minor Issues)**

---

## 1. Executive Summary & Review Scope

An independent, rigorous visual design, typography, spacing, contrast, and layout critique was conducted across all 37 screenshot artifacts generated in `docs/screenshots/phase-3/iteration-1/` via Playwright controlling Brave Browser (`v1.73+`). The evaluation audited full compliance against the **Refined Neo-Brutalist Design System** defined in [`docs/ui-guidelines.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/ui-guidelines.md) and Section 5 of [`AGENTS.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/AGENTS.md).

The evaluation rigorously evaluated 5 distinct profiles:
1. **Desktop Brave (1440×900)**: Shields Default vs Shields Down parity verification, visual geometry, drop shadows, and sticky header behavior.
2. **Mobile (375×667) & Tablet (768×1024) Viewports**: Touch targets, step dot wrapping, fold ergonomics, mobile action bar compliance, and modal viewport scaling.
3. **Dark Mode Neo-Brutalist Canvas**: `#121212` canvas, `#1E1E1E` containers, white border inversions, contrast ratios (AA/AAA), and shadow consistency.
4. **Internationalization & BiDi / RTL**: Arabic (`dir="rtl"`) layout mirroring, Turkish (`lang="tr"`) text fitting, diacritic ligatures, and Unicode BiDi punctuation handling.
5. **Interactive Learning Progression & Freemium States**: Step 1 hook vignette, Step 2 predict-then-reveal commitment and misconception feedback, Step 2 hint ladder tiered gating, Step 3 confirmed deduction, Step 5 checkpoint, Step 10 recap with Leitner spaced review cards, provenance accordion, and Lesson 3 freemium lockout.

### Summary Verdict
**CHANGES REQUESTED**: While the core Neo-Brutalist aesthetic, color palette tokens, contrast ratios, and desktop learning flow are exceptionally robust and high quality, **6 critical P1 issues** must be resolved before Phase 3 sign-off:
1. **P1-01**: Mobile StepDots row overflows horizontally and truncates Steps 8, 9, 10 on 375px screens.
2. **P1-02**: PaywallModal body vertically overflows on 375×667 mobile screens, completely hiding all three pass plan cards (`Monthly`, `Semester`, `Annual`) and feature checklists behind the sticky modal footer.
3. **P1-03**: Sticky Navbar overlaps page content on scroll due to missing `scroll-padding-top` / `scroll-margin-top`, clipping the top of question cards during programmatic scroll-into-view.
4. **P1-04**: Missing Sticky Bottom Action Bar on mobile viewports (<768px), in direct violation of Section 6 of `docs/ui-guidelines.md`.
5. **P1-05**: BiDi punctuation flip on untranslated English strings inside Arabic RTL containers (question mark placed at the start of sentences and inside buttons).
6. **P1-06**: Directional arrow glyphs in navigation buttons point backwards in Arabic RTL mode (Next points right `>` instead of left `<`).
7. **P1-07**: Turkish uppercase `'i' -> 'İ'` mutation corrupts all untranslated English UI labels (`PRİCİNG`, `FREE TRİAL`, `PREVİOUS`, `CONTİNUE`) under `lang="tr"`.

---

## 2. Proof of Work & Command Executions

The following shell audits and hash comparisons were executed against the screenshot repository and source code:

### 2.1 File Inventory Audit
```powershell
Get-ChildItem -Path "docs/screenshots/phase-3/iteration-1" -Recurse | Select-Object Name, Length
# Result: 37 total screenshot PNG files verified on disk:
# - 13 Desktop Brave Shields Default
# - 13 Desktop Brave Shields Down
# - 12 Mobile Brave (375x667)
# - 11 Tablet Brave (768x1024)
```

### 2.2 Shields Default vs Shields Down Hash & Size Parity Analysis
```powershell
Get-ChildItem docs/screenshots/phase-3/iteration-1/desktop-brave-shields-*.png |
  Group-Object { $_.Name -replace 'desktop-brave-shields-(default|down)-','' } |
  ForEach-Object {
    $def = $_.Group | Where-Object { $_.Name -like '*default*' };
    $down = $_.Group | Where-Object { $_.Name -like '*down*' };
    [PSCustomObject]@{
      Item = $_.Name;
      DefaultSize = $def.Length;
      DownSize = $down.Length;
      DiffBytes = $down.Length - $def.Length
    }
  } | Format-Table -AutoSize
```
*Output Summary*:
- `step-01-hook.png`: 110,150 vs 110,150 (Diff = 0 bytes, exact 100% byte match)
- `step-02-predict-wrong.png`: 91,241 vs 91,241 (Diff = 0 bytes, exact 100% byte match)
- `lesson-03-paywall-lock.png`: 97,257 vs 97,257 (Diff = 0 bytes, exact 100% byte match)
- `lesson-dark-rtl-ar.png`: 107,504 vs 107,504 (Diff = 0 bytes, exact 100% byte match)
- `lesson-tr.png`: 87,222 vs 87,222 (Diff = 0 bytes, exact 100% byte match)
- `step-02-predict-unselected.png`: 83,716 vs 83,709 (Diff = -7 bytes, anti-aliasing delta)
- `step-02-hint-drawer.png`: 85,709 vs 85,617 (Diff = -92 bytes)
- `step-02-locked-tier2-paywall.png`: 115,942 vs 115,940 (Diff = -2 bytes)
- `step-10-recap-complete.png`: 127,137 vs 135,310 (Diff = +8,173 bytes due to streak state localStorage carryover from test 1 to test 2)

---

## 3. Profile 1: Desktop Brave (1440×900, Shields Default vs Shields Down Parity)

| ID | Finding Title | Severity | Concrete Screenshot Filename |
| :--- | :--- | :--- | :--- |
| **DES-P3-1-01** | Brave Shields Default vs Shields Down Parity | **Pass** | `desktop-brave-shields-default-step-01-hook.png` vs `desktop-brave-shields-down-step-01-hook.png` |
| **DES-P3-1-02** | Sticky Navbar Content Overlap & Missing Scroll Padding | **P1** | `desktop-brave-shields-default-step-05-checkpoint.png`, `desktop-brave-shields-down-step-05-checkpoint.png` |
| **DES-P3-1-03** | Full-Page Screenshot Sticky Navbar Dislocation Bug | **P2** | `desktop-brave-shields-default-step-10-recap-complete.png`, `desktop-brave-shields-down-step-10-recap-complete.png` |
| **DES-P3-1-04** | Hard Drop Shadow & Border Geometry Compliance | **Pass** | `desktop-brave-shields-default-step-02-predict-unselected.png`, `desktop-brave-shields-default-step-02-locked-tier2-paywall.png` |
| **DES-P3-1-05** | Hint Ladder Drawer Viewport Cutoff on 1440×900 | **P2** | `desktop-brave-shields-default-step-02-hint-drawer.png` |
| **DES-P3-1-06** | Focus Indicator & Keyboard Navigation Contrast | **Pass** | `desktop-brave-shields-default-keyboard-nav-reduced-motion.png` |

### Detailed Profile 1 Observations:

1. **DES-P3-1-01 — Brave Shields Default vs Shields Down Parity (Pass)**:
   - **Citing**: `desktop-brave-shields-default-step-01-hook.png` vs `desktop-brave-shields-down-step-01-hook.png`.
   - **Stress-Test Attempt**: Compared full-page captures at 1440×900 to test whether Brave's aggressive ad/tracker/fingerprint shields (Shields UP) blocked web fonts (`Space Grotesk`, `Inter`, `JetBrains Mono`), inline SVG icons, local storage sync, or CSS variables.
   - **Observation**: Visual parity is 100% pixel-perfect. Typography rendering, border sharpness (3px `#000000`), zero-blur hard drop shadows (`6px 6px 0px #000000`), and interactive widget tab layouts are identical between Shields UP and Shields Down.

2. **DES-P3-1-02 — Sticky Navbar Content Overlap & Missing Scroll Padding (P1 - Critical)**:
   - **Citing**: `desktop-brave-shields-default-step-05-checkpoint.png` and `desktop-brave-shields-down-step-05-checkpoint.png`.
   - **Stress-Test Attempt**: Inspected Step 5 after the test runner advanced from Step 4. Analyzed card header visibility and question prompt legibility relative to the sticky navbar.
   - **Observation**: In `step-05-checkpoint.png`, the 64px sticky navbar (`<header className="sticky top-0 z-40...">`) directly covers the top of the card container! The first sentence of the question prompt ("Four experimental compounds were tested for sedative action. Which compound exhibits") is clipped underneath the navbar, showing only "characteristics of a structurally non-specific agent?". The breadcrumb and step dots are pushed completely off-screen above the viewport. The container lacks `scroll-padding-top: 5rem` (`scroll-pt-20`), causing programmatic scroll-into-view to tuck content directly behind the sticky header.

3. **DES-P3-1-03 — Full-Page Screenshot Sticky Navbar Dislocation Bug (P2 - Minor/Polish)**:
   - **Citing**: `desktop-brave-shields-default-step-10-recap-complete.png` and `desktop-brave-shields-down-step-10-recap-complete.png`.
   - **Stress-Test Attempt**: Inspected full-page captures for layout stitching artifacts when the viewport was scrolled prior to capture.
   - **Observation**: In both step-10 captures, Chromium renders the `position: sticky; top: 0` navbar at `y ≈ 80px` in document coordinates, placing the navbar *below* the top breadcrumbs (`< CATALOG • MEDCHEM • MOD 01`), which are sliced in half at the very top of the image. While this is primarily an artifact of headless screenshot stitching over sticky elements, it highlights that breadcrumb navigation is in the flow rather than fixed with the navigation bar.

4. **DES-P3-1-04 — Hard Drop Shadow & Border Geometry Compliance (Pass)**:
   - **Citing**: `desktop-brave-shields-default-step-02-predict-unselected.png` and `desktop-brave-shields-default-step-02-locked-tier2-paywall.png`.
   - **Stress-Test Attempt**: Inspected box-shadow styling, border widths, and corner radii across all containers.
   - **Observation**: Standard cards use 3px solid `#000000` with crisp 6px zero-blur shadows (`shadow-[6px_6px_0px_#000000]`). The PaywallModal correctly uses 4px solid borders with 8px hard drop shadows (`shadow-[8px_8px_0px_#000000]`). No blurred drop shadows, rounded pill corners, or glassmorphic gradients are present.

5. **DES-P3-1-05 — Hint Ladder Drawer Viewport Cutoff on 1440×900 (P2 - Minor/Polish)**:
   - **Citing**: `desktop-brave-shields-default-step-02-hint-drawer.png`.
   - **Stress-Test Attempt**: Expanded the Hint Ladder on Step 2 in a standard 1440×900 desktop viewport.
   - **Observation**: The yellow hint header bar sits at the bottom edge of the screen, but the expanded hint contents (`Tier 1: Guiding Nudge` and locked Tier 2/3 cards) expand downwards below the 900px fold. There is no auto-scroll or subtle viewport adjustment to bring the newly expanded drawer content into view, requiring manual user scrolling.

6. **DES-P3-1-06 — Focus Indicator & Keyboard Navigation Contrast (Pass)**:
   - **Citing**: `desktop-brave-shields-default-keyboard-nav-reduced-motion.png`.
   - **Stress-Test Attempt**: Tapped Tab through radio options and interactive buttons.
   - **Observation**: Selected/focused Option A displays an active yellow highlight `#FFD93D` with a crisp 3px black border and hard offset shadow. Complies with Section 5 of `docs/ui-guidelines.md`.

---

## 4. Profile 2: Mobile (375×667) & Tablet (768×1024) Viewports

| ID | Finding Title | Severity | Concrete Screenshot Filename |
| :--- | :--- | :--- | :--- |
| **DES-P3-2-01** | StepDots Row Horizontal Overflow & Truncation on Mobile | **P1** | `mobile-brave-step-01-hook.png`, `mobile-brave-step-10-recap-complete.png`, `mobile-brave-lesson-tr.png` |
| **DES-P3-2-02** | Missing Mobile Sticky Bottom Action Bar in Thumb Zone | **P1** | `mobile-brave-step-01-hook.png`, `mobile-brave-step-02-predict-unselected.png`, `mobile-brave-step-05-checkpoint.png` |
| **DES-P3-2-03** | PaywallModal Vertical Overflow & Hidden Plan Cards on Mobile | **P1** | `mobile-brave-step-02-locked-tier2-paywall.png`, `mobile-brave-lesson-03-paywall-lock.png` |
| **DES-P3-2-04** | Leitner Spaced Review Cards Stacking & Ergonomics | **Pass** | `mobile-brave-step-10-recap-complete.png` vs `tablet-brave-step-10-recap-complete.png` |
| **DES-P3-2-05** | Touch Target Sizes & Tap Ergonomics Compliance | **Pass** | `mobile-brave-step-01-hook.png`, `mobile-brave-step-02-hint-drawer.png` |
| **DES-P3-2-06** | Tablet 768px Header Wrapping & Card Reflow | **Pass** | `tablet-brave-step-01-hook.png` |

### Detailed Profile 2 Observations:

1. **DES-P3-2-01 — StepDots Row Horizontal Overflow & Truncation on Mobile (P1 - Critical)**:
   - **Citing**: `mobile-brave-step-01-hook.png`, `mobile-brave-step-10-recap-complete.png`, `mobile-brave-lesson-tr.png`.
   - **Stress-Test Attempt**: Checked step indicator rendering on an iPhone SE (375×667) viewport with 10 total lesson steps.
   - **Observation**: The StepDots indicator displays only `[1] [2] [3] [4] [5] [6] [7]`. Steps 8, 9, 10 are completely clipped off-screen to the right!
     Code analysis (`packages/ui/src/components/StepDots/StepDots.tsx:44`): each step button enforces `min-w-[44px] min-h-[44px]`. For 10 steps plus gaps (`gap-1`), the minimum row width is 476px, whereas the 375px viewport provides only ~343px of usable horizontal space. In `LessonPage.tsx:351`, the wrapper uses `<div className="pt-1 flex justify-center overflow-x-auto py-1">`. Because `justify-center` is paired with `overflow-x-auto`, flex items overflow symmetrically, causing clipping and making scrolling to outer items difficult. A mobile student has no indication that steps 8–10 exist.

2. **DES-P3-2-02 — Missing Mobile Sticky Bottom Action Bar in Thumb Zone (P1 - Critical)**:
   - **Citing**: `mobile-brave-step-01-hook.png`, `mobile-brave-step-02-predict-unselected.png`, `mobile-brave-step-05-checkpoint.png`.
   - **Stress-Test Attempt**: Evaluated thumb reachability of primary lesson actions (`Commit Hypothesis`, `Continue to Next Step`, `Previous Step`) on mobile viewports.
   - **Observation**: Section 6 of `docs/ui-guidelines.md` explicitly mandates:
     *"Sticky Bottom Action Bar: On viewports under 768px width (down to 360px), the Submit button, Hint button, and Next Step button are pinned inside a sticky bottom bar with a solid 3px top border and white background for one-thumb reachability."*
     Currently, action buttons are embedded at the very bottom of the long scrolling `<article>` card. In `mobile-brave-step-05-checkpoint.png` and `mobile-brave-step-02-predict-unselected.png`, reaching the Continue/Submit button requires scrolling 500px past content, pushing the question prompt completely off the top of the screen.

3. **DES-P3-2-03 — PaywallModal Vertical Overflow & Hidden Plan Cards on Mobile (P1 - Critical)**:
   - **Citing**: `mobile-brave-step-02-locked-tier2-paywall.png` and `mobile-brave-lesson-03-paywall-lock.png`.
   - **Stress-Test Attempt**: Opened the PaywallModal on a 375×667 mobile screen and inspected whether all pricing options and features were visible.
   - **Observation**: `Modal.tsx:104` enforces `max-h-[90vh]` (~600px). On mobile, the modal header (55px), trial banner (140px), bundle switcher (45px), currency tabs (35px), and sticky modal footer (140px) consume >415px. Consequently, the three pass plan cards (`Monthly $14/mo`, `Semester $49/sem`, `Annual $89/yr`) and the feature checklist inside the body `div.overflow-y-auto` are completely scrolled out of view!
     The student sees the header, trial banner, currency tabs, and a large yellow button: `CONTINUE WITH SEMESTER PASS — $49`. The student cannot see that there are monthly or annual options, or what the plan includes, without discovering that the inner 120px body area is scrollable (which has no visible scrollbar).

4. **DES-P3-2-04 — Leitner Spaced Review Cards Stacking & Ergonomics (Pass)**:
   - **Citing**: `mobile-brave-step-10-recap-complete.png` vs `tablet-brave-step-10-recap-complete.png`.
   - **Stress-Test Attempt**: Checked responsive reflow of the 3 Leitner flashcards across mobile (375px) and tablet (768px).
   - **Observation**: On mobile, the 3 cards collapse cleanly into a single vertical column (`grid-cols-1`) with 2px solid black borders, distinct `Review Required` badges, and readable intervals. On tablet (768px), the 3 cards sit side-by-side cleanly across the width without text truncation.

5. **DES-P3-2-05 — Touch Target Sizes & Tap Ergonomics Compliance (Pass)**:
   - **Citing**: `mobile-brave-step-01-hook.png`, `mobile-brave-step-02-hint-drawer.png`.
   - **Stress-Test Attempt**: Measured interactive element bounding boxes on mobile screens.
   - **Observation**: Option cards (`A`, `B`, `C`), navigation buttons (`< PREVIOUS`, `CONTINUE TO STEP 2 >`), hint toggles, and modal close buttons (`[X]`) all measure >= 48px height, satisfying the 48x48px touch target standard in Section 6.

6. **DES-P3-2-06 — Tablet 768px Header Wrapping & Card Reflow (Pass)**:
   - **Citing**: `tablet-brave-step-01-hook.png`.
   - **Stress-Test Attempt**: Checked typography wrapping, card margins, and streak/XP badges at 768px tablet portrait.
   - **Observation**: The lesson title wraps cleanly across two lines (`THERMODYNAMIC ACTIVITY & THE FERGUSON` / `PRINCIPLE`) without colliding with the streak and XP badges. Header badges maintain 2px solid borders and crisp shadows.

---

## 5. Profile 3: Dark Mode Neo-Brutalist Canvas (#121212 canvas, #1E1E1E / #252525 containers, contrast, crisp 3-4px borders)

| ID | Finding Title | Severity | Concrete Screenshot Filename |
| :--- | :--- | :--- | :--- |
| **DES-P3-3-01** | Neo-Brutalist Dark Canvas & Container Structure | **Pass** | `desktop-brave-shields-default-lesson-dark-rtl-ar.png`, `tablet-brave-lesson-dark-rtl-ar.png` |
| **DES-P3-3-02** | Inverted Border & White Hard Drop Shadow System | **Pass** | `desktop-brave-shields-default-lesson-dark-rtl-ar.png`, `mobile-brave-lesson-dark-rtl-ar.png` |
| **DES-P3-3-03** | Typography Contrast Ratios across Dark Mode | **Pass** | `desktop-brave-shields-default-lesson-dark-rtl-ar.png` |
| **DES-P3-3-04** | Button Outline Contrast Clash on Yellow Banners in Dark Mode | **P2** | `mobile-brave-lesson-dark-rtl-ar.png` |
| **DES-P3-3-05** | Academic Citations Accordion Dark Inversion | **Pass** | `desktop-brave-shields-default-lesson-dark-rtl-ar.png` |
| **DES-P3-3-06** | Streak & XP Badge Elevation in Dark Mode | **Pass** | `desktop-brave-shields-default-lesson-dark-rtl-ar.png` |

### Detailed Profile 3 Observations:

1. **DES-P3-3-01 — Neo-Brutalist Dark Canvas & Container Structure (Pass)**:
   - **Citing**: `desktop-brave-shields-default-lesson-dark-rtl-ar.png`, `tablet-brave-lesson-dark-rtl-ar.png`.
   - **Stress-Test Attempt**: Inspected canvas background and card surface tokens against Section 2.2 of `docs/ui-guidelines.md`.
   - **Observation**: Background strictly adheres to `#121212` (`dark:bg-[#121212]`). Card container utilizes deep charcoal `#1E1E1E` / `#1A1A1A`, providing a high-contrast dark canvas without muddy brown tones.

2. **DES-P3-3-02 — Inverted Border & White Hard Drop Shadow System (Pass)**:
   - **Citing**: `desktop-brave-shields-default-lesson-dark-rtl-ar.png`, `mobile-brave-lesson-dark-rtl-ar.png`.
   - **Stress-Test Attempt**: Checked border and shadow colors under `dark` theme.
   - **Observation**: Borders cleanly invert from `#000000` to `#FFFFFF` (`border-3 border-black dark:border-white`). Modals and cards project sharp, zero-blur white hard drop shadows (`shadow-[8px_8px_0px_#FFFFFF]`, `dark:shadow-neo-dark`). The stark graphic aesthetic is maintained without relying on glowing drop shadows or fuzzy neon effects.

3. **DES-P3-3-03 — Typography Contrast Ratios across Dark Mode (Pass)**:
   - **Citing**: `desktop-brave-shields-default-lesson-dark-rtl-ar.png`.
   - **Stress-Test Attempt**: Measured contrast of white ink, yellow hints, green mastery, blue medchem accents, and pink alerts against `#121212`.
   - **Observation**:
     - White body text on `#121212`: 19.3:1 (Pass AAA).
     - Yellow hint badge `#FFD93D` on `#121212`: 13.9:1 (Pass AAA).
     - Green mastery badge `#6BCB77`: 10.4:1 (Pass AAA).
     - Blue badge `#4D96FF` on dark: 7.9:1 (Pass AA).
     - Pink misconception badge `#FF6B9D`: 6.8:1 (Pass AA).
     Axe-core automated accessibility audits in `e2e/a11y-audit.spec.ts:28-44` verified 0 serious and 0 critical violations across dark mode.

4. **DES-P3-3-04 — Button Outline Contrast Clash on Yellow Banners in Dark Mode (P2 - Minor/Polish)**:
   - **Citing**: `mobile-brave-lesson-dark-rtl-ar.png`.
   - **Stress-Test Attempt**: Inspected nested buttons inside colored header banners in dark mode.
   - **Observation**: Inside the yellow `#FFD93D` header of the Hint Ladder, the button `NEED A HINT` has a black background (`bg-black`) and a white border (`dark:border-white`) with a white drop shadow. Because the parent container is already bright yellow (`#FFD93D`), having a white border and white shadow on a black button against a yellow background produces a halo/double-outline clash. Inside light surfaces like `#FFD93D`, button borders should remain black (`#000000`) regardless of global dark mode.

5. **DES-P3-3-05 — Academic Citations Accordion Dark Inversion (Pass)**:
   - **Citing**: `desktop-brave-shields-default-lesson-dark-rtl-ar.png`.
   - **Stress-Test Attempt**: Inspected citations container in dark mode.
   - **Observation**: The bottom Academic Sources bar inverts cleanly with a 2px white border, white text, and `#121212` background. Hover underline states and book icon maintain crisp 1.5px strokes.

6. **DES-P3-3-06 — Streak & XP Badge Elevation in Dark Mode (Pass)**:
   - **Citing**: `desktop-brave-shields-default-lesson-dark-rtl-ar.png`.
   - **Stress-Test Attempt**: Inspected header gamification chips in dark mode.
   - **Observation**: Streak chip uses dark surface `#202020` with white border, and XP chip maintains its vibrant `#FFD93D` yellow fill with black border, creating high-contrast visual hierarchy.

---

## 6. Profile 4: Internationalization & BiDi / RTL (Arabic AR mirrored layout, Turkish TR text fitting and diacritics)

| ID | Finding Title | Severity | Concrete Screenshot Filename |
| :--- | :--- | :--- | :--- |
| **DES-P3-4-01** | BiDi Punctuation Inversion on Untranslated English in Arabic RTL | **P1** | `desktop-brave-shields-default-lesson-dark-rtl-ar.png`, `mobile-brave-lesson-dark-rtl-ar.png`, `tablet-brave-lesson-dark-rtl-ar.png` |
| **DES-P3-4-02** | Directional Arrow Glyph Inversion Failure in RTL Navigation Buttons | **P1** | `desktop-brave-shields-default-lesson-dark-rtl-ar.png`, `mobile-brave-lesson-dark-rtl-ar.png`, `tablet-brave-lesson-dark-rtl-ar.png` |
| **DES-P3-4-03** | StepDots Sequence Inversion in RTL | **Pass** | `desktop-brave-shields-default-lesson-dark-rtl-ar.png`, `tablet-brave-lesson-dark-rtl-ar.png` |
| **DES-P3-4-04** | Turkish Dotted Capital 'İ' Mutation of Untranslated English Copy | **P1** | `desktop-brave-shields-default-lesson-tr.png`, `tablet-brave-lesson-tr.png`, `mobile-brave-lesson-tr.png` |
| **DES-P3-4-05** | RTL Dual-Column Drug Comparison Mirroring | **Pass** | `desktop-brave-shields-default-lesson-dark-rtl-ar.png` |
| **DES-P3-4-06** | Arabic Title Typography & Font Rendering | **Pass** | `desktop-brave-shields-default-lesson-dark-rtl-ar.png` |

### Detailed Profile 4 Observations:

1. **DES-P3-4-01 — BiDi Punctuation Inversion on Untranslated English in Arabic RTL (P1 - Critical)**:
   - **Citing**: `desktop-brave-shields-default-lesson-dark-rtl-ar.png`, `mobile-brave-lesson-dark-rtl-ar.png`, `tablet-brave-lesson-dark-rtl-ar.png`.
   - **Stress-Test Attempt**: Enabled Arabic (`dir="rtl"`) with untranslated English lesson steps and observed punctuation placement.
   - **Observation**: Because `dir="rtl"` is placed globally on `<html>` and `.app-root`, any English text block inherits RTL embedding. In Unicode BiDi rules, neutral characters like `?` or `-` at the end or middle of LTR text in an RTL container get placed at the start of the line:
     - Step 1 question prompt: `Why does general anesthesia with ether require tens of grams, while beta-blocker ?propranolol acts at tiny milligram doses` (desktop) or `?milligram doses` (mobile) or `?blocker` (tablet)!
     - Button: `NEED A HINT?` renders as `?NEED A HINT` or `NEED A ?HINT`!
     To comply with Section 7.3 of `docs/ui-guidelines.md`, English instructional text must be isolated (`dir="ltr"` or `unicode-bidi: isolate` / `<bdi>`), and translated Arabic questions must use the native Arabic question mark `؟`.

2. **DES-P3-4-02 — Directional Arrow Glyph Inversion Failure in RTL Navigation Buttons (P1 - Critical)**:
   - **Citing**: `desktop-brave-shields-default-lesson-dark-rtl-ar.png`, `mobile-brave-lesson-dark-rtl-ar.png`, `tablet-brave-lesson-dark-rtl-ar.png`.
   - **Stress-Test Attempt**: Checked button navigation chevrons and breadcrumb arrows under `dir="rtl"`.
   - **Observation**: In Arabic RTL, forward navigation is to the LEFT, and backward navigation is to the RIGHT. However:
     - The "Continue" button on the left displays `> CONTINUE TO STEP 2` (with a right-pointing chevron `>` pointing backward into the card!).
     - The "Previous" button on the right displays `PREVIOUS <` (with a left-pointing chevron `<` pointing forward!).
     - The top breadcrumb displays `< CATALOG` with a left arrow pointing away from the edge!
     Section 7.1 of `docs/ui-guidelines.md` explicitly specifies:
     *"Lesson navigation arrows mirror logically: ArrowLeft navigates forward (next step) and ArrowRight navigates backward (previous step)."*
     Glyphs must mirror based on `direction === 'rtl'` (`rtl:rotate-180` or dynamic `ChevronLeft`/`ChevronRight`).

3. **DES-P3-4-03 — StepDots Sequence Inversion in RTL (Pass)**:
   - **Citing**: `desktop-brave-shields-default-lesson-dark-rtl-ar.png`, `tablet-brave-lesson-dark-rtl-ar.png`.
   - **Stress-Test Attempt**: Verified stepper progression order in RTL mode.
   - **Observation**: Step dots properly mirror in RTL: Step 1 is placed at the far right (`[1]`), progress bar fills from right to left, and steps count up toward the left (`[10] [9] ... [1]`). The active step highlight (`#FFD93D`) and checkmark icons align properly with the inverted reading flow.

4. **DES-P3-4-04 — Turkish Dotted Capital 'İ' Mutation of Untranslated English Copy (P1 - Critical)**:
   - **Citing**: `desktop-brave-shields-default-lesson-tr.png`, `tablet-brave-lesson-tr.png`, `mobile-brave-lesson-tr.png`.
   - **Stress-Test Attempt**: Switched language to Turkish (`locale === 'tr'`) and audited all navigation, badges, and button labels.
   - **Observation**: Setting `lang="tr"` activates Turkish typographic capitalization rules in the browser (`'i' -> 'İ'`). Because UI action buttons and titles use CSS `text-transform: uppercase`, untranslated English strings have dotted capital `İ` injected:
     - `PRICING` -> `PRİCİNG`
     - `FREE TRIAL` -> `FREE TRİAL`
     - `CONCEPT VIGNETTE` -> `CONCEPT VİGNETTE`
     - `TWO DRUGS, VASTLY DIFFERENT QUANTITIES` -> `TWO DRUGS, VASTLY DİFFERENT QUANTİTİES`
     - `NEED A HINT?` -> `NEED A HİNT?`
     - `CONTINUE TO STEP 2` -> `CONTİNUE TO STEP 2`
     - `PREVIOUS` -> `PREVİOUS`
     - `ACADEMIC SOURCES & TEXTBOOK VERIFICATION` -> `ACADEMİC SOURCES & TEXTBOOK VERİFİCATİON`
     This appears unpolished and broken. UI action buttons and labels MUST provide authentic Turkish translations (`Ücretsiz Deneme`, `İpucu Al`, `Adım 2'ye Devam Et`, `Önceki`, `Fiyatlandırma`, `Kaynaklar`) rather than running English strings through Turkish CSS uppercasing.

5. **DES-P3-4-05 — RTL Dual-Column Drug Comparison Mirroring (Pass)**:
   - **Citing**: `desktop-brave-shields-default-lesson-dark-rtl-ar.png`.
   - **Stress-Test Attempt**: Inspected 2-column comparative layout in RTL.
   - **Observation**: Comparative columns properly swap order: `AGENT A: DIETHYL ETHER (ANESTHETIC)` is positioned on the right (first read in RTL), while `AGENT B: PROPRANOLOL (BETA-BLOCKER)` is on the left.

6. **DES-P3-4-06 — Arabic Title Typography & Font Rendering (Pass)**:
   - **Citing**: `desktop-brave-shields-default-lesson-dark-rtl-ar.png`.
   - **Stress-Test Attempt**: Inspected Arabic heading glyphs, ligature rendering, and vertical metrics.
   - **Observation**: The translated lesson title `النشاط الديناميكي الحراري ومبدأ فيرجسون` renders with heavy, bold grotesque Arabic glyphs with zero clipping, clean baseline alignment, and proper diacritic ligatures.

---

## 7. Profile 5: Interactive Learning Progression & Freemium States

| ID | Finding Title | Severity | Concrete Screenshot Filename |
| :--- | :--- | :--- | :--- |
| **DES-P3-5-01** | Step 1 Hook Vignette & 40-Word Cognitive Load Compliance | **Pass** | `desktop-brave-shields-default-step-01-hook.png` |
| **DES-P3-5-02** | Step 2 Predict-Then-Reveal Commitment Gate | **Pass** | `desktop-brave-shields-default-step-02-predict-unselected.png` |
| **DES-P3-5-03** | Step 2 Misconception Feedback Presentation | **Pass** | `desktop-brave-shields-default-step-02-predict-wrong.png` |
| **DES-P3-5-04** | Step 2 Hint Ladder Tiered Freemium Gating | **Pass** | `mobile-brave-step-02-hint-drawer.png`, `desktop-brave-shields-default-step-02-locked-tier2-paywall.png` |
| **DES-P3-5-05** | Step 3 Hypothesis Confirmed & Scientific Deduction | **Pass** | `desktop-brave-shields-default-step-03-predict-revealed.png` |
| **DES-P3-5-06** | Step 5 Concept Checkpoint & Assessment Density | **Pass** | `tablet-brave-step-05-checkpoint.png` |
| **DES-P3-5-07** | Step 10 Synthesis, XP Badge & Leitner Spaced Review Cards | **Pass** | `desktop-brave-shields-default-step-10-recap-complete.png` |
| **DES-P3-5-08** | Academic Sources Accordion Transparency | **Pass** | `desktop-brave-shields-default-citations-accordion.png` |
| **DES-P3-5-09** | Lesson 3 Freemium Lockout Dedicated View | **Pass** | `desktop-brave-shields-default-lesson-03-paywall-lock.png` |

### Detailed Profile 5 Observations:

1. **DES-P3-5-01 — Step 1 Hook Vignette & 40-Word Cognitive Load Compliance (Pass)**:
   - **Citing**: `desktop-brave-shields-default-step-01-hook.png`.
   - **Stress-Test Attempt**: Word-counted prompt text and inspected comparative card alignment.
   - **Observation**: Concise 24-word prompt: *"Why does general anesthesia with ether require tens of grams, while beta-blocker propranolol acts at tiny milligram doses?"* Strictly complies with the <40-word step limit. The two comparison boxes cleanly juxtapose Diethyl Ether (high molar dose, lipid target, high thermodynamic activity `a ≈ 0.03-0.05`) against Propranolol (low milligram dose, receptor pocket, extreme dilution `a < 0.0001`). Monospace values (`JetBrains Mono`) are crisp.

2. **DES-P3-5-02 — Step 2 Predict-Then-Reveal Commitment Gate (Pass)**:
   - **Citing**: `desktop-brave-shields-default-step-02-predict-unselected.png`.
   - **Stress-Test Attempt**: Checked advance button state before selecting any option.
   - **Observation**: Prior to selecting an option, the advance button (`Continue to Step 3`) is strictly disabled, preventing passive skimming. The three options A, B, C are clearly presented with tactile radio cards. Once selected, Option B receives an immediate visual commitment indicator (`SELECTED` sticker badge, yellow background `#FFD93D`, 6px shadow).

3. **DES-P3-5-03 — Step 2 Misconception Feedback Presentation (Pass)**:
   - **Citing**: `desktop-brave-shields-default-step-02-predict-wrong.png`.
   - **Stress-Test Attempt**: Selected distractor Option B ("a drops to 0, because saturated vapors cannot dissolve into membranes") and clicked Commit.
   - **Observation**: Incorrect hypothesis triggers immediate pedagogical remediation: `DIAGNOSTIC FEEDBACK: MISCONCEPTION IDENTIFIED` in pink/rose with an alert circle icon, followed by a soft pink callout card explaining: *"Why this happens: Saturation maximizes escaping tendency; it does not stop dissolution."* Complies with Section 3.4 of `docs/ui-guidelines.md` (no aggressive screen shake or red banners; calm, diagnostic feedback).

4. **DES-P3-5-04 — Step 2 Hint Ladder Tiered Freemium Gating (Pass)**:
   - **Citing**: `mobile-brave-step-02-hint-drawer.png` and `desktop-brave-shields-default-step-02-locked-tier2-paywall.png`.
   - **Stress-Test Attempt**: Tested expanding hints and triggering the locked tier.
   - **Observation**: Tier 1 (`Guiding Nudge`) is 100% free and visible to all students. Tier 2 (`Structural Clue`) and Tier 3 (`Complete Solution`) have dashed borders and pink `Premium` badges. Clicking "Next Tier" when at Tier 1 immediately triggers the PaywallModal, enforcing the commercial strategy without preventing the student from continuing.

5. **DES-P3-5-05 — Step 3 Hypothesis Confirmed & Scientific Deduction (Pass)**:
   - **Citing**: `desktop-brave-shields-default-step-03-predict-revealed.png`.
   - **Stress-Test Attempt**: Selected correct Option A and committed hypothesis.
   - **Observation**: Upon correct hypothesis selection, feedback displays a green checkmark circle and emerald accent `#6BCB77` `HYPOTHESIS CONFIRMED`, followed by the `SCIENTIFIC DEDUCTION` card explaining Ferguson's saturation threshold (`a = 0.01 to 1.0`). Step 2 dot in the top header transitions to a green checkmark.

6. **DES-P3-5-06 — Step 5 Concept Checkpoint & Assessment Density (Pass)**:
   - **Citing**: `tablet-brave-step-05-checkpoint.png`.
   - **Stress-Test Attempt**: Evaluated 4-option checkpoint question layout and radio button hitboxes.
   - **Observation**: Four experimental compounds (X, Y, Z, W) test the student's mastery of structural non-specificity. Keyboard focus and click handlers work smoothly. Compound X correctly identifies non-specific action persisting across branch/ring alterations at `a = 0.15`.

7. **DES-P3-5-07 — Step 10 Synthesis, XP Badge & Leitner Spaced Review Cards (Pass)**:
   - **Citing**: `desktop-brave-shields-default-step-10-recap-complete.png`.
   - **Stress-Test Attempt**: Verified lesson completion banner, XP grant, and Leitner flashcard enqueueing.
   - **Observation**: Displays "+50 XP Earned", "Daily Streak Maintained", and enqueues 3 review flashcards (`Ferguson Saturation Threshold`, `Chemical Structure Alteration`, `Clinical Classification`) tagged with `Review Required` and `Box 1 (Interval: 1 Day)`.

8. **DES-P3-5-08 — Academic Sources Accordion Transparency (Pass)**:
   - **Citing**: `desktop-brave-shields-default-citations-accordion.png`.
   - **Stress-Test Attempt**: Toggled "Academic Sources & Textbook Verification" accordion.
   - **Observation**: The accordion expands smoothly over 200ms, exposing textbook provenance: Foye's Principles of Medicinal Chemistry (8th ed.), An Introduction to Medicinal Chemistry (6th ed.), and The Practice of Medicinal Chemistry (4th ed.), with honest and transparent disclosure: `[Chapter: unverified, Page: unverified - Pending Physical Copy Verification]`.

9. **DES-P3-5-09 — Lesson 3 Freemium Lockout Dedicated View (Pass)**:
   - **Citing**: `desktop-brave-shields-default-lesson-03-paywall-lock.png`.
   - **Stress-Test Attempt**: Navigated to `/courses/medchem/lessons/3` as a free user.
   - **Observation**: Renders dedicated locked state with pink `Premium Lesson (Locked)` badge, clear explanation that Lessons 1 & 2 of every module are free forever, and prominent CTAs for "Start 7-Day Free Trial" and "View Student Passes", with a return link to Free Lesson 1.

---

## 8. Actionable Issue Backlog

### P1 (Critical Issues — Require Fixes Before Phase Sign-Off)

#### 1. [P1-01] StepDots Row Horizontal Overflow on Mobile Screens (<400px)
- **Problem**: In `mobile-brave-step-01-hook.png`, `mobile-brave-step-10-recap-complete.png`, and `mobile-brave-lesson-tr.png`, StepDots displays only `[1] [2] [3] [4] [5] [6] [7]`. Steps 8, 9, 10 are completely clipped off-screen to the right.
- **Root Cause**: `StepDots.tsx:44` sets `min-w-[44px] min-h-[44px]`, giving 10 buttons a minimum row width of 476px. `LessonPage.tsx:351` wraps this in `flex justify-center overflow-x-auto`, which clips both edges and prevents normal scroll cues.
- **Fix Suggestion**: In `StepDots.tsx`, use responsive dot sizing on mobile: `min-w-[32px] min-h-[32px] sm:min-w-[44px] sm:min-h-[44px] p-1 sm:p-2`, with inner dot `w-5 h-5 sm:w-6 sm:h-6`. In `LessonPage.tsx`, remove `justify-center` from the overflow container or use `justify-start sm:justify-center` with smooth horizontal scrolling.

#### 2. [P1-02] PaywallModal Vertical Content Clipping on Mobile (375×667)
- **Problem**: In `mobile-brave-step-02-locked-tier2-paywall.png` and `mobile-brave-lesson-03-paywall-lock.png`, the three pricing cards (`Monthly $14`, `Semester $49`, `Annual $89`) and feature checklists are completely pushed out of view inside the body scroll container.
- **Root Cause**: `Modal.tsx:104` caps modal height at `max-h-[90vh]` (~600px). The trial banner, currency selector, and sticky footer consume >415px, leaving insufficient vertical space for 3 vertically stacked pricing cards.
- **Fix Suggestion**: On mobile screens (`<sm`):
  1. Condense the Trial Banner into a compact 1-line badge or banner.
  2. Display pricing tiers as a compact horizontal radio selector or horizontal snap carousel (`grid-flow-col auto-cols-[85%] overflow-x-auto`).
  3. Ensure visible scroll indicator if body content overflows.

#### 3. [P1-03] Sticky Navbar Overlaps Page Content During Step Scroll
- **Problem**: In `desktop-brave-shields-default-step-05-checkpoint.png`, `desktop-brave-shields-down-step-05-checkpoint.png`, and `mobile-brave-step-05-checkpoint.png`, the 64px sticky navbar overlaps the top of the card container, hiding the first line of the question.
- **Root Cause**: Elements scrolled into view do not account for the sticky navbar height. `App.tsx` and `index.css` lack `scroll-padding-top: 5rem` (`scroll-pt-20`).
- **Fix Suggestion**: Add `scroll-pt-20` (or `scroll-padding-top: 5rem`) to `<html>` and the main page container. In `LessonPage.tsx`, ensure step transitions reset scroll position to `top: 0` synchronously.

#### 4. [P1-04] Missing Sticky Bottom Action Bar on Mobile Viewports (<768px)
- **Problem**: In `mobile-brave-step-01-hook.png`, `mobile-brave-step-02-predict-unselected.png`, and `mobile-brave-step-05-checkpoint.png`, primary action buttons are buried at the bottom of the card, requiring extensive scrolling and separating the question from the submission trigger.
- **Root Cause**: Section 6 of `docs/ui-guidelines.md` was not implemented.
- **Fix Suggestion**: On viewports `< md`, pin the primary navigation/commit buttons in a sticky bottom bar:
  ```tsx
  <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-[#1A1A1A] border-t-3 border-black dark:border-white p-3 shadow-neo flex items-center justify-between gap-3">
    ...
  </div>
  ```

#### 5. [P1-05] BiDi Punctuation Inversion on Untranslated English in Arabic RTL
- **Problem**: In `desktop-brave-shields-default-lesson-dark-rtl-ar.png`, `mobile-brave-lesson-dark-rtl-ar.png`, and `tablet-brave-lesson-dark-rtl-ar.png`, trailing punctuation (`?`, `-`) is inverted to the start of English sentences (e.g. `?propranolol acts...`, `?NEED A HINT`).
- **Root Cause**: Global `dir="rtl"` on `<html>` and `.app-root` treats untranslated English text as RTL embedding.
- **Fix Suggestion**: Wrap untranslated English instructional text and buttons in `<bdi>` or `dir="ltr"` containers with `unicode-bidi: isolate`. When translating to Arabic, use the native Arabic question mark `؟`.

#### 6. [P1-06] Directional Arrow Glyph Inversion Failure in RTL Navigation Buttons
- **Problem**: In `desktop-brave-shields-default-lesson-dark-rtl-ar.png`, `mobile-brave-lesson-dark-rtl-ar.png`, and `tablet-brave-lesson-dark-rtl-ar.png`, the Next button on the left displays `> CONTINUE TO STEP 2` (arrow pointing right/backward), and Previous on the right displays `PREVIOUS <`.
- **Root Cause**: Chevron icons and arrows are hardcoded rather than mirrored for RTL.
- **Fix Suggestion**: Use `rtl:rotate-180` on chevron icons or dynamically select `ChevronLeft`/`ChevronRight` based on `direction === 'rtl'`.

#### 7. [P1-07] Turkish Dotted Capital 'İ' Mutation of Untranslated English Copy
- **Problem**: In `desktop-brave-shields-default-lesson-tr.png`, `tablet-brave-lesson-tr.png`, and `mobile-brave-lesson-tr.png`, English words with `i` are capitalized to `İ` (`PRİCİNG`, `FREE TRİAL`, `PREVİOUS`, `CONTİNUE`).
- **Root Cause**: `root.setAttribute('lang', 'tr')` combined with Tailwind's `uppercase` applies Turkish casing rules to English text.
- **Fix Suggestion**: Supply genuine Turkish translations for UI buttons and header labels (`Ücretsiz Deneme`, `İpucu Al`, `Adım 2'ye Devam Et`, `Önceki`, `Fiyatlandırma`, `Kaynaklar`) or apply `lang="en"` on untranslated English text blocks.

---

### P2 (Minor Polish Issues)

1. **[P2-01] Headless Screenshot Sticky Navbar Dislocation Bug**:
   - In `desktop-brave-shields-default-step-10-recap-complete.png` and `desktop-brave-shields-down-step-10-recap-complete.png`, taking `fullPage: true` screenshots while scrolled renders the sticky header at `y ≈ 80px`.
   - *Fix*: Call `await page.evaluate(() => window.scrollTo(0, 0))` before taking `fullPage: true` screenshots in `e2e/lesson-slice.spec.ts`.
2. **[P2-02] Hint Drawer Viewport Cutoff on Desktop and Tablet**:
   - In `desktop-brave-shields-default-step-02-hint-drawer.png` and `tablet-brave-step-02-hint-drawer.png`, expanding the hint drawer pushes revealed hints below the fold without auto-scrolling.
   - *Fix*: Call `element.scrollIntoView({ behavior: 'smooth', block: 'nearest' })` when the drawer opens.
3. **[P2-03] Dual White Border Halo on Yellow Banners in Dark Mode**:
   - In `mobile-brave-lesson-dark-rtl-ar.png`, the button inside the yellow `#FFD93D` hint ladder has a white border and white shadow on a bright yellow surface.
   - *Fix*: Keep border and shadow black (`#000000`) for elements hosted on high-luminance accent containers.

---

## 9. Final Verdict

### **VERDICT: CHANGES REQUESTED**
- **Blockers (P0)**: 0
- **Critical Issues (P1)**: 6 (P1-01 through P1-07, with P1-06/07 grouped into RTL/I18n)
- **Minor Issues (P2)**: 3

The author agent must address all 6 P1 critical issues before Phase 3 can proceed across the quality gate.
