# Independent Review Report — Design Critic
**Phase**: Phase 2 — Monorepo Scaffold, Design System, Widgets, Platform, Functions  
**Iteration**: 1 (Visual & Aesthetic Design System Audit)  
**Reviewer Role**: Independent Design Critic (Fresh Context Subagent)  
**Target Specifications**: [`docs/ui-guidelines.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/ui-guidelines.md), [`.agents/rules/design-rules.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/.agents/rules/design-rules.md), Section 5 of [`AGENTS.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/AGENTS.md)  
**Artifact**: [`docs/reviews/phase-2-iteration-1-design-critic.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/reviews/phase-2-iteration-1-design-critic.md)  
**Verdict**: **CHANGES REQUESTED (0 P0 Blockers, 5 P1 Critical Issues, 4 P2 Minor Issues)**

---

## 1. Executive Summary & Review Scope

An independent, rigorous visual and aesthetic design critique was conducted across all 68 screenshot artifacts in `docs/screenshots/phase-2/` captured via Playwright in Brave Browser (`v1.73+`). The evaluation audited full compliance against the **Refined Neo-Brutalist Design System** defined in [`docs/ui-guidelines.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/ui-guidelines.md) and Section 5 of [`AGENTS.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/AGENTS.md).

The audit rigorously evaluated 5 distinct profiles:
1. **Desktop Brave**: 1440×900 viewport, Shields Default vs Shields Down parity verification.
2. **Mobile & Tablet Viewports**: 375×667 mobile thumb zone and 768×1024 tablet reflow.
3. **Dark Mode Neo-Brutalist Canvas**: `#121212` background, `#1E1E1E` / `#252525` containers, and WCAG 2.1 AA/AAA contrast ratios.
4. **Internationalization & RTL**: Arabic (`dir="rtl"`) layout mirroring, Turkish (`lang="tr"`) text expansion, and chemical LTR preservation.
5. **Component & Widget State Matrix**: Tactile buttons, form controls, cards, steppers, empty states, paywall modals, and 9 domain widgets.

Every observation cites concrete screenshot filenames from `docs/screenshots/phase-2/` and documents what was stress-tested to attempt breaking the interface.

---

## 2. Profile 1: Desktop Brave (1440×900, Shields Default vs Shields Down Parity)

| ID | Finding Title | Severity | Concrete Screenshot Citing |
| :--- | :--- | :--- | :--- |
| **DES-PROF1-01** | Shields Default vs Shields Down Pixel Parity | **Pass** | `desktop-brave-shields-default-gallery-light-en.png` vs `desktop-brave-shields-down-gallery-light-en.png` |
| **DES-PROF1-02** | Catalog Course Cards & Exam Alignment Badge | **Pass** | `desktop-brave-shields-default-catalog.png` vs `desktop-brave-shields-down-catalog.png` |
| **DES-PROF1-03** | Pricing Scope & Currency Controls Layout | **Pass** | `desktop-brave-shields-default-pricing.png` vs `desktop-brave-shields-down-pricing.png` |
| **DES-PROF1-04** | Paywall Modal Geometry & Non-Deceptive Link | **Pass** | `desktop-brave-shields-default-paywall-modal-sar.png` vs `desktop-brave-shields-down-paywall-modal-sar.png` |
| **DES-PROF1-05** | Dark Mode Desktop Shields Parity | **Pass** | `desktop-brave-shields-default-gallery-dark.png` vs `desktop-brave-shields-down-gallery-dark.png` |
| **DES-PROF1-06** | Dedicated Widget Screenshots Viewport Framing | **P2** | `desktop-brave-shields-default-widget-1-sar-default.png`, `desktop-brave-shields-default-widget-2-structure-default.png` |

### Detailed Profile 1 Observations:

1. **DES-PROF1-01 — Shields Default vs Shields Down Pixel Parity (Pass)**:
   - **Citing**: `desktop-brave-shields-default-gallery-light-en.png` vs `desktop-brave-shields-down-gallery-light-en.png`.
   - **Stress-Test Attempt**: Compared full-page captures at 1440×900 to test whether Brave's aggressive ad/tracker/fingerprint shields (Shields UP) blocked custom web fonts (`Space Grotesk`, `Inter`, `JetBrains Mono`), inline SVG icons (`Rx`, `Lucide`), local storage sync, or CSS variables.
   - **Observation**: Visual parity is 100% pixel-perfect. Typography rendering, border sharpness (3px `#000000`), zero-blur hard drop shadows (`6px 6px 0px #000000`), and widget tab layouts are identical between Shields UP and Shields Down.

2. **DES-PROF1-02 — Catalog Course Cards & Exam Alignment Badge (Pass)**:
   - **Citing**: `desktop-brave-shields-default-catalog.png` vs `desktop-brave-shields-down-catalog.png`.
   - **Stress-Test Attempt**: Checked 2-column curriculum module reflow, badge contrast, and exam alignment container (`NAPLEX (Area 1) • EUS Pharmacy Licensure • SPLE`) for flex wrapping or text clipping at 1440px.
   - **Observation**: Course cards display balanced internal padding (`p-6 sm:p-8`), distinct theme badges (`MEDCHEM` blue `#4D96FF` and `PHARM` orange `#FF9F45`), and clear green `2 Lessons Free` pills on all 5 modules.

3. **DES-PROF1-03 — Pricing Scope & Currency Controls Layout (Pass)**:
   - **Citing**: `desktop-brave-shields-default-pricing.png` vs `desktop-brave-shields-down-pricing.png`.
   - **Stress-Test Attempt**: Inspected the scope toggle (`SINGLE COURSE` vs `DUAL BUNDLE`) and currency switcher (`USD`, `TRY`, `SAR`) toolbar to check for flex collapse or shadow clipping. Tested card elevation on the Semester Pass card (`scale-[1.02]`).
   - **Observation**: Controls align within a single Neo-Brutalist toolbar with 3px black borders and 6px shadow. The recommended Semester card pops forward with a prominent 3px ring without overlapping neighboring cards.

4. **DES-PROF1-04 — Paywall Modal Geometry & Non-Deceptive Link (Pass)**:
   - **Citing**: `desktop-brave-shields-default-paywall-modal-sar.png` vs `desktop-brave-shields-down-paywall-modal-sar.png`.
   - **Stress-Test Attempt**: Inspected modal backdrop (`bg-black/50`), 4px border geometry, zero-blur 8px drop shadow (`shadow-neo-lg`), and checked whether the dismissal link was subdued or hidden.
   - **Observation**: The modal adheres to ethical monetization standards. The dismissal link `"Continue Free with Lessons 1 & 2"` is prominently underlined and placed alongside the secure Dodo Payments badge, providing students a transparent, non-deceptive exit.

5. **DES-PROF1-05 — Dark Mode Desktop Shields Parity (Pass)**:
   - **Citing**: `desktop-brave-shields-default-gallery-dark.png` vs `desktop-brave-shields-down-gallery-dark.png`.
   - **Stress-Test Attempt**: Checked if Brave shields affected dark mode stylesheet evaluation, CSS custom properties, or inverted shadows (`shadow-neo-dark` `6px 6px 0px #FFFFFF`).
   - **Observation**: Zero deviation detected. Dark mode canvas `#121212` and card surfaces `#1E1E1E` display complete parity with white borders (`border-white`) and white drop shadows.

6. **DES-PROF1-06 — Dedicated Widget Screenshots Viewport Framing (P2 - Minor/Polish)**:
   - **Citing**: `desktop-brave-shields-default-widget-1-sar-default.png`, `desktop-brave-shields-default-widget-2-structure-default.png`, `desktop-brave-shields-default-widget-3-dose-response-default.png`.
   - **Stress-Test Attempt**: Verified whether dedicated widget test screenshots in `e2e/gallery-matrix.spec.ts` framed the interactive widgets properly.
   - **Observation**: In `e2e/gallery-matrix.spec.ts:108-159`, `page.screenshot()` was invoked without scrolling to `#widget-display` (located at y≈850px) or using `fullPage: true`. Consequently, screenshots for Widgets 2 through 9 capture only the top hero banner (y=0 to 900), leaving the widgets off-screen. While the full gallery capture (`desktop-brave-shields-default-gallery-light-en.png`) proves the widgets exist, the dedicated test artifacts themselves are misframed.
   - **Fix Recommendation**: In `e2e/gallery-matrix.spec.ts`, add `await page.locator('#widget-container').scrollIntoViewIfNeeded()` or take element screenshots `await page.locator('[data-testid="section-widgets"]').screenshot(...)`.

---

## 3. Profile 2: Mobile & Tablet Viewports (375×667 Mobile, 768×1024 Tablet)

| ID | Finding Title | Severity | Concrete Screenshot Citing |
| :--- | :--- | :--- | :--- |
| **DES-PROF2-01** | SAR Explorer Chemical Substituent Button Text Wrapping | **P1** | `mobile-brave-gallery-light-en.png` |
| **DES-PROF2-02** | Mobile Paywall Modal Overflow & Off-Screen Primary CTA | **P1** | `mobile-brave-paywall-modal-sar.png` |
| **DES-PROF2-03** | Mobile Header Collapse & Touch Hit-Box Sizing | **Pass** | `mobile-brave-gallery-light-en.png`, `mobile-brave-catalog.png` |
| **DES-PROF2-04** | Tablet Curriculum Grid & Pricing Toolbar Reflow | **Pass** | `tablet-brave-catalog.png`, `tablet-brave-pricing.png` |
| **DES-PROF2-05** | Tablet Centered Paywall Modal Alignment | **Pass** | `tablet-brave-paywall-modal-sar.png` |
| **DES-PROF2-06** | Tablet Gallery Cards Screenshot Desynchronization | **P2** | `tablet-brave-gallery-light-en.png` |

### Detailed Profile 2 Observations:

1. **DES-PROF2-01 — SAR Explorer Chemical Substituent Button Text Wrapping (P1 - Critical)**:
   - **Citing**: `mobile-brave-gallery-light-en.png` (Section 2).
   - **Stress-Test Attempt**: Stress-tested chemical substituent names inside SAR Explorer grid buttons on 375px mobile viewport with `grid-cols-2`.
   - **Observation**: On a 375px viewport, buttons such as `Isopropyl (-CH(CH3)2)` and `tert-Butyl (-C(CH3)3)` wrap awkwardly across 3 separate lines (`Isopropyl (-` / `CH(CH3)2)` / `-iPr`). In addition, at the top of the SAR card, the blue badge `SAR EXPLORER` and `Source: 2-reseptrler.pdf (p. 27)` collide directly and touch horizontally.
   - **Fix Recommendation**: In `packages/widgets/src/SarExplorer/SarExplorer.tsx:153`, adjust the grid to `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2` on narrow screens so chemical names do not break at hyphens. At line 99, change `flex items-center justify-between` to `flex flex-wrap items-center justify-between gap-1` to prevent header collision.

2. **DES-PROF2-02 — Mobile Paywall Modal Overflow & Off-Screen Primary CTA (P1 - Critical)**:
   - **Citing**: `mobile-brave-paywall-modal-sar.png`.
   - **Stress-Test Attempt**: Tested paywall modal initial display on 375×667 mobile screen without user scrolling.
   - **Observation**: In `mobile-brave-paywall-modal-sar.png`, the 3 stacked plan cards, feature checklist, primary checkout CTA ("CONTINUE WITH SEMESTER PASS — SAR 190"), and free dismissal link are pushed entirely off-screen below the fold. Only the trial banner, toggle, and the Monthly card are visible. Students must scroll through a long dialog before finding the action button. Per [`docs/ui-guidelines.md:176`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/ui-guidelines.md#L176), mobile action buttons must be immediately reachable.
   - **Fix Recommendation**: In `packages/ui/src/components/PaywallModal/PaywallModal.tsx`, implement a sticky bottom footer inside the modal dialog on mobile (`sticky bottom-0 bg-white dark:bg-[#1E1E1E] pt-3 border-t-2 border-black/20 dark:border-white/20`) containing the primary CTA button and dismissal link.

3. **DES-PROF2-03 — Mobile Header Collapse & Touch Hit-Box Sizing (Pass)**:
   - **Citing**: `mobile-brave-gallery-light-en.png`, `mobile-brave-catalog.png`.
   - **Stress-Test Attempt**: Evaluated mobile navbar at 375px width for horizontal layout shift (`overflow-x-hidden`) and verified 48px touch targets.
   - **Observation**: Nav links (`Gallery`, `Courses`, `Pricing`) collapse cleanly; brand mark and controls (`[EN|TR|AR]`, theme switch) remain accessible with zero horizontal scrolling or clipping.

4. **DES-PROF2-04 — Tablet Curriculum Grid & Pricing Toolbar Reflow (Pass)**:
   - **Citing**: `tablet-brave-catalog.png`, `tablet-brave-pricing.png`.
   - **Stress-Test Attempt**: Tested 768px tablet layout for module cards, scope/currency switchers, and pricing tiers.
   - **Observation**: Module list displays a well-balanced 2-column grid (`grid-cols-2`); pricing controls fit in a neat horizontal bar without wrapping; tier cards display as an even 3-column layout with appropriate 16px/24px margins.

5. **DES-PROF2-05 — Tablet Centered Paywall Modal Alignment (Pass)**:
   - **Citing**: `tablet-brave-paywall-modal-sar.png`.
   - **Stress-Test Attempt**: Inspected modal horizontal centering and plan card column grid at 768px width.
   - **Observation**: The modal constraints to `max-w-lg` centered horizontally with balanced 128px margins on both sides. The 3 plan cards (Monthly, Semester, Annual) remain side-by-side in a 3-column grid with clear SAR currency formatting and full CTA visibility.

6. **DES-PROF2-06 — Tablet Gallery Cards Screenshot Desynchronization (P2 - Minor/Polish)**:
   - **Citing**: `tablet-brave-gallery-light-en.png`.
   - **Stress-Test Attempt**: Verified presence and alignment of all 4 card variants (Default, Highlight, Misconception, Success) in Section 3 on tablet.
   - **Observation**: In `tablet-brave-gallery-light-en.png` (Section 3), only 3 cards (Default, Highlight, Misconception) are visible because this full-page screenshot was captured prior to adding the 4th card (`Success Card`) to `GalleryPage.tsx`. The component matrix screenshot `desktop-brave-shields-default-components-cards.png` verifies all 4 cards exist, but the tablet full-page screenshot needs re-capture.

---

## 4. Profile 3: Dark Mode Neo-Brutalist Canvas (#121212 Canvas, #1E1E1E / #252525 Containers, Contrast)

| ID | Finding Title | Severity | Concrete Screenshot Citing |
| :--- | :--- | :--- | :--- |
| **DES-PROF3-01** | Catalog & Pricing Page Hero Headings Illegible in Dark Mode | **P1** | `desktop-brave-shields-default-catalog-dark-rtl-ar.png`, `desktop-brave-shields-default-pricing-dark-rtl-ar.png` |
| **DES-PROF3-02** | Dark Mode Canvas Color Transition Truncated in Captures | **P1** | `desktop-brave-shields-default-catalog-dark-rtl-ar.png`, `desktop-brave-shields-default-pricing-dark-rtl-ar.png` |
| **DES-PROF3-03** | Gallery Page Deep Canvas & Elevation Separation | **Pass** | `desktop-brave-shields-default-gallery-dark.png` |
| **DES-PROF3-04** | Vibrant Semantic Accent Preservation in Dark Mode | **Pass** | `desktop-brave-shields-default-gallery-dark.png`, `mobile-brave-gallery-dark.png` |
| **DES-PROF3-05** | Dark Mode Form Controls & Slider Thumb Contrast | **Pass** | `desktop-brave-shields-default-gallery-dark.png` |

### Detailed Profile 3 Observations:

1. **DES-PROF3-01 — Catalog & Pricing Page Hero Headings Illegible in Dark Mode (P1 - Critical)**:
   - **Citing**: `desktop-brave-shields-default-catalog-dark-rtl-ar.png`, `desktop-brave-shields-default-pricing-dark-rtl-ar.png`.
   - **Stress-Test Attempt**: Tested dark mode contrast across all page heroes. Sampled RGB pixel values of heading `h1` in `CatalogPage` and `PricingPage`.
   - **Observation**: In `desktop-brave-shields-default-catalog-dark-rtl-ar.png` and `pricing-dark-rtl-ar.png`, the hero section has dark background `dark:bg-[#121212]`, but `h1` in `apps/web/src/pages/CatalogPage.tsx:108` and `apps/web/src/pages/PricingPage.tsx:73` lacks `text-black dark:text-white`. The heading text renders as `(8, 8, 8)` to `(15, 15, 15)` against the `#121212` `(18, 18, 18)` background! Contrast ratio is 1.05:1 (near total illegibility, catastrophic WCAG 2.1 AA failure). By contrast, `GalleryPage.tsx:96` explicitly includes `text-black dark:text-white` and passes.
   - **Fix Recommendation**: In `apps/web/src/pages/CatalogPage.tsx:108` and `apps/web/src/pages/PricingPage.tsx:73`, add `text-black dark:text-white` to the `h1` className.

2. **DES-PROF3-02 — Dark Mode Canvas Color Transition Truncated in Captures (P1 - Critical)**:
   - **Citing**: `desktop-brave-shields-default-catalog-dark-rtl-ar.png`, `desktop-brave-shields-default-pricing-dark-rtl-ar.png`.
   - **Stress-Test Attempt**: Analyzed full page canvas background in dark mode across non-gallery pages.
   - **Observation**: In `desktop-brave-shields-default-catalog-dark-rtl-ar.png`, the hero is dark (`(18, 18, 18)`), but the rest of the canvas below y=350px is warm cream (`(247, 241, 224)`), and the card surfaces are muddy gray (`(157, 157, 157)`). This occurred because `App.tsx:10` specifies `transition-colors duration-150` and the test immediately took a screenshot after clicking the theme toggle without awaiting the transition completion or settling of the DOM classes.
   - **Fix Recommendation**: In `e2e/gallery-matrix.spec.ts:205`, add `await page.waitForTimeout(200)` after clicking toggle dark mode before taking the screenshot.

3. **DES-PROF3-03 — Gallery Page Deep Canvas & Elevation Separation (Pass)**:
   - **Citing**: `desktop-brave-shields-default-gallery-dark.png`.
   - **Stress-Test Attempt**: Checked contrast between canvas `#121212` and container cards `#1E1E1E` / `#252525`, verified 3px solid `#FFFFFF` borders and white drop shadows (`shadow-neo-dark` `6px 6px 0px #FFFFFF`).
   - **Observation**: In `desktop-brave-shields-default-gallery-dark.png`, the visual elevation is crisp, tactile, and adheres strictly to Neo-Brutalist dark rules. Surfaces are elevated cleanly with 16.2:1 contrast against white ink.

4. **DES-PROF3-04 — Vibrant Semantic Accent Preservation in Dark Mode (Pass)**:
   - **Citing**: `desktop-brave-shields-default-gallery-dark.png`, `mobile-brave-gallery-dark.png`.
   - **Stress-Test Attempt**: Evaluated whether yellow (`#FFD93D`), green (`#6BCB77`), and pink (`#FF6B9D`) accents retain sufficient contrast against dark containers and whether text inside them remains black `#000000`.
   - **Observation**: Badges and buttons retain black text on vibrant fills, achieving >10:1 contrast ratios. In the Navbar, the "FREE TRIAL" button pops with `#FFD93D` fill and black text.

5. **DES-PROF3-05 — Dark Mode Form Controls & Slider Thumb Contrast (Pass)**:
   - **Citing**: `desktop-brave-shields-default-gallery-dark.png` (Section 3).
   - **Stress-Test Attempt**: Verified input fields, sliders, and toggles on dark surfaces. Checked if disabled controls fade into illegibility.
   - **Observation**: Inputs feature `#1E1E1E` background with white border and white JetBrains Mono text; slider tracks have crisp white outlines; the yellow slider thumb (`#FFD93D`) provides immediate visual focus.

---

## 5. Profile 4: Internationalization & RTL (Arabic AR Mirrored Layout, Turkish TR Text Fitting)

| ID | Finding Title | Severity | Concrete Screenshot Citing |
| :--- | :--- | :--- | :--- |
| **DES-PROF4-01** | Paywall Modal RTL Price Rate and Number Collision | **P1** | `desktop-brave-shields-default-paywall-modal-dark-rtl.png` |
| **DES-PROF4-02** | Directional Arrow Icons Pointing in Wrong Direction in RTL | **P2** | `desktop-brave-shields-default-gallery-rtl-ar.png`, `desktop-brave-shields-default-gallery-dark-rtl-ar.png` |
| **DES-PROF4-03** | Turkish Dotted Capital I (İ) & Diacritics Display | **Pass** | `desktop-brave-shields-default-gallery-tr.png`, `desktop-brave-shields-default-catalog-tr.png` |
| **DES-PROF4-04** | Arabic Grotesk Typography Hierarchy & Readability | **Pass** | `desktop-brave-shields-default-gallery-dark-rtl-ar.png` |
| **DES-PROF4-05** | Monospace Chemical Notation LTR Isolation in Arabic Mode | **Pass** | `desktop-brave-shields-default-gallery-rtl-ar.png` |
| **DES-PROF4-06** | English Copy BiDi Punctuation Flipping in RTL Unlocalized Text | **P2** | `desktop-brave-shields-default-gallery-rtl-ar.png`, `desktop-brave-shields-default-gallery-dark-rtl-ar.png` |

### Detailed Profile 4 Observations:

1. **DES-PROF4-01 — Paywall Modal RTL Price Rate and Number Collision (P1 - Critical)**:
   - **Citing**: `desktop-brave-shields-default-paywall-modal-dark-rtl.png`.
   - **Stress-Test Attempt**: Tested price rate formatting (`SAR 190 / sem`, `SAR 340 / yr`) inside narrow pricing tier cards inside the paywall modal under `dir="rtl"`.
   - **Observation**: In `desktop-brave-shields-default-paywall-modal-dark-rtl.png`, the flex baseline layout in RTL causes the rate frequency text `/sem` to collide and overlap directly on top of the number `190`, and `/yr` to overlap `340`! In addition, Arabic BiDi text reordering causes the feature description below to read `"full months of exam 6 prep (~40% discount)"` instead of `"6 full months of exam prep"`.
   - **Fix Recommendation**: In `packages/ui/src/components/PaywallModal/PaywallModal.tsx:185`, wrap the price display in a container with `dir="ltr"` and `unicode-bidi: isolate`:
     ```tsx
     <div className="flex items-baseline gap-1" dir="ltr">
       <span className="font-display font-black text-4xl">{symbol}{activePrices.semester}</span>
       <span className="font-mono text-xs opacity-70">/ sem</span>
     </div>
     ```

2. **DES-PROF4-02 — Directional Arrow Icons Pointing in Wrong Direction in RTL (P2 - Minor/Polish)**:
   - **Citing**: `desktop-brave-shields-default-gallery-rtl-ar.png`, `desktop-brave-shields-default-gallery-dark-rtl-ar.png`.
   - **Stress-Test Attempt**: Inspected action button icons in trial banners ("START 7-DAY FREE TRIAL", "VIEW STUDENT PASSES", "CHOOSE ACADEMIC PASS").
   - **Observation**: In `desktop-brave-shields-default-gallery-rtl-ar.png`, the button text is preceded by a right-pointing arrow (`-> START 7-DAY FREE TRIAL`). In an RTL reading context, forward progression is to the left (`<-`). Placing a right-pointing arrow pointing backward into the left margin of the button violates directional reading expectations.
   - **Fix Recommendation**: In `packages/ui/src/components/TrialBanner/TrialBanner.tsx`, mirror directional icons in RTL using `rtl:rotate-180` or pass directional arrow components.

3. **DES-PROF4-03 — Turkish Dotted Capital I (İ) & Diacritics Display (Pass)**:
   - **Citing**: `desktop-brave-shields-default-gallery-tr.png`, `desktop-brave-shields-default-catalog-tr.png`, `desktop-brave-shields-default-pricing-tr.png`.
   - **Stress-Test Attempt**: Stress-tested Turkish uppercase transformations and special characters (`Ç`, `Ğ`, `İ`, `Ö`, `Ş`, `Ü`) across headers, button badges, and widget tabs.
   - **Observation**: In `desktop-brave-shields-default-gallery-tr.png` and `catalog-tr.png`, Turkish typography behaves with complete linguistic fidelity. `i` capitalizes to `İ` ("ECZACILIK ETKİLEŞİMLİ GALERİSİ", "PRİCİNG", "DERS A: FARMASÖTİK KİMYA"), and diacritics maintain proper ascender metrics without clipping against 3px card borders.

4. **DES-PROF4-04 — Arabic Grotesk Typography Hierarchy & Readability (Pass)**:
   - **Citing**: `desktop-brave-shields-default-gallery-dark-rtl-ar.png`.
   - **Stress-Test Attempt**: Checked Arabic heading font application (`Cairo`), tracking, line height, and bold rendering.
   - **Observation**: In `desktop-brave-shields-default-gallery-dark-rtl-ar.png`, the hero title "معرض الصيدلة التفاعلي" renders in bold 800 Cairo font with high structural impact and generous line spacing, avoiding the squished appearance common in non-localized font stacks.

5. **DES-PROF4-05 — Monospace Chemical Notation LTR Isolation in Arabic Mode (Pass)**:
   - **Citing**: `desktop-brave-shields-default-gallery-rtl-ar.png`.
   - **Stress-Test Attempt**: Inspected chemical formulas, SMILES notations, pKa values, and affinity constants when `dir="rtl"` is set on the `html` tag.
   - **Observation**: In `desktop-brave-shields-default-gallery-rtl-ar.png`, chemical parameters (`Kd 150 nM`, `pKa 9.4`, `ΔlogP +0.4`) remain strictly left-to-right (`unicode-bidi: isolate; direction: ltr !important`), completely preventing reverse chemical formula corruption.

6. **DES-PROF4-06 — English Copy BiDi Punctuation Flipping in RTL Unlocalized Text (P2 - Minor/Polish)**:
   - **Citing**: `desktop-brave-shields-default-gallery-rtl-ar.png`, `desktop-brave-shields-default-gallery-dark-rtl-ar.png`.
   - **Stress-Test Attempt**: Inspected punctuation when English copy is displayed inside an RTL container.
   - **Observation**: In the trial banners, English strings have their leading punctuation shifted to the right (e.g. `?Lessons 1 & 2 of all modules...` and `!Your 7-day trial has ended...`). In Section 2, the numbering renders as `TRIAL & PLAN BANNERS .1` instead of `1. TRIAL & PLAN BANNERS`. This occurs because the text is currently unlocalized English inside a `dir="rtl"` parent without explicit LTR wrapping.
   - **Fix Recommendation**: When rendering unlocalized English text inside an RTL container, wrap the text container with `dir="ltr"` or localize banner copy into Arabic in `apps/web/src/pages/GalleryPage.tsx`.

---

## 6. Profile 5: Component & Widget State Matrix (Buttons, Cards, Forms, Modals, 9 Widgets)

| ID | Finding Title | Severity | Concrete Screenshot Citing |
| :--- | :--- | :--- | :--- |
| **DES-PROF5-01** | Neo-Brutalist Button State Matrix Compliance | **Pass** | `desktop-brave-shields-default-components-buttons.png` |
| **DES-PROF5-02** | Tactile Form Controls & Accessible Error Signaling | **Pass** | `desktop-brave-shields-default-components-form-controls.png` |
| **DES-PROF5-03** | Empty State Diagonal Hatched Pattern & Skeleton Loader Zero CLS | **Pass** | `desktop-brave-shields-default-components-empty-and-skeleton.png` |
| **DES-PROF5-04** | StepDots Stepper Accessible Touch Targets | **Pass** | `desktop-brave-shields-default-components-steppers.png` |
| **DES-PROF5-05** | Freemium Lifecycle Banners Differentiation | **Pass** | `desktop-brave-shields-default-components-trial-banners.png` |
| **DES-PROF5-06** | SAR Explorer Analog State Mutation Feedback | **Pass** | `desktop-brave-shields-default-widget-1-sar-default.png` vs `desktop-brave-shields-default-widget-1-sar-analog.png` |
| **DES-PROF5-07** | Reduced Motion Paywall Modal Instant Render | **Pass** | `reduced-motion-paywall-open.png` |

### Detailed Profile 5 Observations:

1. **DES-PROF5-01 — Neo-Brutalist Button State Matrix Compliance (Pass)**:
   - **Citing**: `desktop-brave-shields-default-components-buttons.png`.
   - **Stress-Test Attempt**: Inspected 9 button variants across Default, Hover, Focus, Disabled, and Loading states. Tested border thickness, active drop shadow suppression, and disabled color tokens.
   - **Observation**: All buttons strictly enforce 3px solid `#000000` borders, uppercase grotesque typography, and uniform 6px hard drop shadows. Loading state preserves layout width with integrated spinner; disabled state suppresses drop shadow to 0px.

2. **DES-PROF5-02 — Tactile Form Controls & Accessible Error Signaling (Pass)**:
   - **Citing**: `desktop-brave-shields-default-components-form-controls.png`.
   - **Stress-Test Attempt**: Evaluated Input focus rings, error message borders, Slider thumb hitboxes, and Toggle switch geometry. Checked for dual-redundant error signaling (color + text + icon).
   - **Observation**: Focused input shows 3px black border with yellow outline; error state uses 3px pink border (`#FF6B9D`) paired with warning icon and explicit textual error message below (`Value exceeds valid aqueous pKa spectrum (-2 to 16)`); sliders feature tactile 24x24px thumbs with value readouts in JetBrains Mono.

3. **DES-PROF5-03 — Empty State Diagonal Hatched Pattern & Skeleton Loader Zero CLS (Pass)**:
   - **Citing**: `desktop-brave-shields-default-components-empty-and-skeleton.png`.
   - **Stress-Test Attempt**: Verified 45-degree diagonal hatched CSS gradient pattern in EmptyState, tactile icon centering, and verified that SkeletonLoader cards match exact production component heights to prevent Cumulative Layout Shift (CLS).
   - **Observation**: In `desktop-brave-shields-default-components-empty-and-skeleton.png`, the 45-degree hatched pattern renders flawlessly at `repeating-linear-gradient(45deg, #FFF8E7, #FFF8E7 10px, #F3ECE0 10px, #F3ECE0 20px)`. Skeletons match exact button/card heights with 3px black borders.

4. **DES-PROF5-04 — StepDots Stepper Accessible Touch Targets (Pass)**:
   - **Citing**: `desktop-brave-shields-default-components-steppers.png`.
   - **Stress-Test Attempt**: Inspected StepDots hitboxes, verified that visual 24x24px dots are wrapped inside `min-w-[44px] min-h-[44px]` touch targets, and verified completed checkmark icons.
   - **Observation**: StepDots renders sharp square boxes with checkmark icons for completed steps, yellow `#FFD93D` for active step with 3px border and 2px shadow, and unvisited gray outlines. Meets WCAG 2.1 AA touch target standards.

5. **DES-PROF5-05 — Freemium Lifecycle Banners Differentiation (Pass)**:
   - **Citing**: `desktop-brave-shields-default-components-trial-banners.png`.
   - **Stress-Test Attempt**: Evaluated visual distinctiveness and ethical tone across Free Forever preview, 7-Day Active Trial, and Expired Trial banners.
   - **Observation**: Dual-signaling is flawlessly implemented: Free Forever (Cream/White `#FFFFFF`, Sparkles icon), Active Trial (Yellow `#FFD93D`, Clock icon, days remaining counter), and Expired Trial (Pink `#FF6B9D`, Clock icon, reassuring progress preservation notice).

6. **DES-PROF5-06 — SAR Explorer Analog State Mutation Feedback (Pass)**:
   - **Citing**: `desktop-brave-shields-default-widget-1-sar-default.png` vs `desktop-brave-shields-default-widget-1-sar-analog.png`.
   - **Stress-Test Attempt**: Inspected state change when switching substituent from Methyl (-CH3) to Isopropyl (-CH(CH3)2). Checked dynamic property readout updates (LogP, pKa, Affinity Kd) and button selection styling.
   - **Observation**: Selected substituent highlights in yellow `#FFD93D` with 2px shadow and bold text; readout updates from LogP 1.5 / Kd 150 nM to LogP 2.8 / Kd 12 nM with zero layout thrashing or CLS.

7. **DES-PROF5-07 — Reduced Motion Paywall Modal Instant Render (Pass)**:
   - **Citing**: `reduced-motion-paywall-open.png`.
   - **Stress-Test Attempt**: Tested paywall modal rendering with `@media (prefers-reduced-motion: reduce)` active.
   - **Observation**: In `reduced-motion-paywall-open.png`, modal renders immediately without sliding or zoom transforms (`transform: none !important`), adhering to Section 5.3 of `AGENTS.md` and `ui-guidelines.md:121`.

---

## 7. Actionable Remediation Plan for Author Agents (P1 Criticals)

The following actionable fixes are required before Phase 2 design sign-off can be granted:

| Finding ID | Target File & Line | Concrete Actionable Remediation |
| :--- | :--- | :--- |
| **DES-PROF3-01** | [`apps/web/src/pages/CatalogPage.tsx:108`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/pages/CatalogPage.tsx#L108)<br>[`apps/web/src/pages/PricingPage.tsx:73`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/pages/PricingPage.tsx#L73) | Add `text-black dark:text-white` to `h1` className to eliminate dark mode illegibility (1.05:1 contrast failure). |
| **DES-PROF3-02** | [`e2e/gallery-matrix.spec.ts:205`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/e2e/gallery-matrix.spec.ts#L205) | Add `await page.waitForTimeout(200)` after clicking theme toggle to allow `App.tsx` CSS color transitions to settle before screenshot capture. |
| **DES-PROF4-01** | [`packages/ui/src/components/PaywallModal/PaywallModal.tsx:185`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/ui/src/components/PaywallModal/PaywallModal.tsx#L185) | Wrap the price container with `dir="ltr"` and `unicode-bidi: isolate` so `/sem` and `/yr` do not collide directly on top of numbers in RTL. |
| **DES-PROF2-01** | [`packages/widgets/src/SarExplorer/SarExplorer.tsx:153`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/widgets/src/SarExplorer/SarExplorer.tsx#L153) | Update substituent buttons container from `grid-cols-2` to `grid-cols-1 sm:grid-cols-2 md:grid-cols-3` to prevent chemical name hyphen wrapping on 375px mobile. Update header line 99 with `flex-wrap gap-1`. |
| **DES-PROF2-02** | [`packages/ui/src/components/PaywallModal/PaywallModal.tsx:280`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/ui/src/components/PaywallModal/PaywallModal.tsx#L280) | Pin the checkout CTA button and free dismissal link into a sticky footer inside the modal dialog on mobile viewports. |

---

## 8. Defect Severity Triage & Stop Gate Verdict

- **P0 Blockers**: **0**
- **P1 Critical Issues**: **5** (Dark mode hero heading contrast, dark mode screenshot transition delay, RTL paywall price text collision, mobile SAR formula wrapping, mobile paywall off-screen CTA)
- **P2 Minor Recommendations**: **4** (E2E widget screenshot framing, RTL button arrow direction, tablet gallery cards refresh, English BiDi punctuation in RTL)

### Verdict: **CHANGES REQUESTED**
Per Section 3 of [`AGENTS.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/AGENTS.md), Phase 2 Stop Gate sign-off requires **zero P0 and zero P1 issues**. The 5 identified P1 critical issues must be resolved by author agents and re-verified by a fresh Design Critic subagent in Iteration 2.
