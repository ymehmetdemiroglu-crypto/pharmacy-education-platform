# Neo-Brutalist Design System & UI Rules

## 1. Visual Language & Principles
The platform adopts a bold, distinctive **Neo-Brutalist** visual aesthetic tailored to high-density scientific education. It eschews modern generic corporate SaaS tropes (gradients, translucent glassmorphism, faint borders, floaty drop shadows) in favor of uncompromising tactile clarity and structure.

## 2. Core Tokens & Geometry
- **Borders**: Continuous 3px to 4px solid `#000000` on cards, buttons, modals, input fields, and widgets.
- **Corner Radii**: Strictly geometric. `0px` (crisp sharp boxes) to `4px` maximum for subtle tactile finish.
- **Drop Shadows**: Hard, directional, non-blurred offset shadows:
  - Default resting shadow: `6px 6px 0px #000000`
  - Interactive hover state: lifts to `8px 8px 0px #000000` (transforms `translate(-2px, -2px)`)
  - Active / pressed state: sinks to `0px 0px 0px #000000` (transforms `translate(6px, 6px)`)
- **Backgrounds**: High-contrast, warm foundational tone:
  - Default Canvas: Cream `#FFF8E7`
  - Pure White Card Fill: `#FFFFFF`
  - Ink / Text: `#000000`

## 3. Semantic Color Palette
- **Primary & Accent Blocks**:
  - Yellow: `#FFD93D` (Hints, attention cards, active indicators)
  - Pink / Coral: `#FF6B9D` (Incorrect feedback, alerts, contrast cards)
  - Blue: `#4D96FF` (MedChem theme accent, chemical structure links)
  - Green: `#6BCB77` (Correct feedback, completed steps, mastery badges)
  - Orange: `#FF9F45` (Pharmacology theme accent, receptor binding indicators)
- **Course Identity**:
  - Course A (Medicinal Chemistry): Primary Accent = Blue `#4D96FF` / Yellow `#FFD93D`
  - Course B (Pharmacology): Primary Accent = Orange `#FF9F45` / Green `#6BCB77`

## 4. Typography Hierarchy
- **Headings & Display**: Heavy grotesque sans-serif (`Space Grotesk` or `Archivo Black`). High contrast, bold weight (700-900).
- **Body Text**: Clean, readable grotesque (`Inter` or `Space Grotesk` at normal weight 400/500). High legibility for rapid scientific reading.
- **Formulas, SMILES & Constants**: Strict monospaced font (`JetBrains Mono`). Required for all SMILES strings, chemical equations, stoichiometric numbers, and pharmacokinetic metrics.

## 5. Component Library Standards
- **Buttons**: Chunky, solid border with hard shadow. Never use subtle outline or low-contrast text.
- **Progress Bar**: Thick segmented progress blocks with heavy border; completed segments fill solid green with black divider lines.
- **Step Dots**: Bold square/circular indicators reflecting current step position, completed status, and checkpoint flags.
- **Feedback Blocks**: Immediate full-width solid color block below interaction:
  - Green `#6BCB77` for correct responses with affirmative icon + concise explanation.
  - Pink `#FF6B9D` for incorrect responses with specific misconception-targeted correction.
  - Yellow `#FFD93D` for revealed hints.

## 6. Accessibility & Responsiveness
- **WCAG 2.1 AA Compliance**: All text and background combinations must satisfy at minimum 4.5:1 contrast ratio against `#000000` ink.
- **Focus Rings**: Accessible, high-visibility 3px offset focus rings (`outline: 3px solid #000000; outline-offset: 3px`).
- **Mobile First**: All touch targets at least 48x48px. Sticky bottom action bar in lesson view ensures thumb-reachability on mobile screens down to 360px width.
- **Reduced Motion**: Obey `prefers-reduced-motion` media query; replace snappy 100-150ms transitions with instantaneous state changes.
