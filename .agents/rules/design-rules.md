# Neo-Brutalist Design System & UI Motion Rules

## 1. Visual Language & Principles
The platform adopts a bold, distinctive **Neo-Brutalist** visual aesthetic tailored to high-density scientific education. It prioritizes structural clarity, high tactile contrast, and disciplined micro-motion. It strictly rejects generic corporate SaaS tropes (gradients, translucent glassmorphism, floating drop shadows, violent animations, and decorative loops).

## 2. Core Tokens & Geometry
- **Borders**: Continuous 3px to 4px solid `#000000` on cards, buttons, modals, input fields, and widgets.
- **Corner Radii**: Strictly geometric: `0px` (sharp box) to `4px` maximum (`rounded-none` or `rounded-sm`).
- **Drop Shadows**: Hard, directional, non-blurred offset shadows:
  - Resting shadow: `6px 6px 0px #000000`
  - Subtle Hover lift: `8px 8px 0px #000000` (transforms `translate(-2px, -2px)`)
  - Active / pressed state: `0px 0px 0px #000000` (transforms `translate(6px, 6px)`)
- **Spacing Scale**: Strict 8-point geometric scale (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px).
- **Backgrounds**: High-contrast, warm foundational tone:
  - Canvas: Cream `#FFF8E7`
  - Cards & Interactive Surfaces: Pure White `#FFFFFF`
  - Ink / Text: `#000000`

## 3. Restrained Semantic Color Palette
Vibrant colors are strictly reserved for pedagogical meaning:
- `accent-yellow` (`#FFD93D`): Hints, active selections, attention items.
- `accent-green` (`#6BCB77`): Correct answers, progress mastery.
- `accent-pink` (`#FF6B9D`): Incorrect answers, misconception alerts.
- `accent-blue` (`#4D96FF`): MedChem theme accent, chemical structure links.
- `accent-orange` (`#FF9F45`): Pharmacology theme accent, receptor binding highlights.
- `surface-muted` (`#E5E7EB`): Disabled states, inactive step indicators.

## 4. Typography Hierarchy
- **Headings & Display**: Heavy grotesque sans-serif (`Space Grotesk` or `Archivo Black`). Bold weight (700–800), tracking tight (-0.02em).
- **Body Prompts**: Grotesque sans-serif (`Inter` or `Space Grotesk` at weight 400/500). Max 40 words per prompt.
- **Formulas, SMILES & Constants**: Strict monospaced font (`JetBrains Mono`). Required for all SMILES strings, chemical equations, stoichiometric numbers, and pharmacokinetic metrics.

## 5. Animation & Motion Rules (Subtle, Smooth & Performant)
1. **Durations**:
   - Micro-interactions (hover, active, focus): `150ms` to `250ms`.
   - Drawers & modals: `200ms` to `300ms`.
   - Page and step transitions: Up to `400ms` maximum.
2. **Easings**:
   - Standard: `cubic-bezier(0.22, 1, 0.36, 1)` (snappy ease-out) or standard `ease-out`.
   - Prohibited: Never use bounce (`cubic-bezier(0.68, -0.55, 0.27, 1.55)`), overshoot, or elastic curves.
3. **Hardware Acceleration & Zero Layout Thrashing**:
   - Animate `transform` and `opacity` ONLY.
   - Never animate `width`, `height`, `top`, `bottom`, `left`, `right`, `margin`, or `padding`.
   - Small offsets only (`4px` to `12px` maximum).
4. **Pedagogical Feedback Animation**:
   - Correct answer: Gentle upward shift (`translateY(-4px)`) over 200ms + light green tint. **NO confetti explosions or full-screen fireworks.**
   - Incorrect answer: Gentle horizontal nudge (`translateX(-4px) -> 0`) over 200ms + light pink tint. **NO violent screen shakes.**
5. **Reduced Motion**:
   - Strictly obey `prefers-reduced-motion: reduce`. When active, disable all transforms (`transform: none !important`) and limit transitions to instantaneous state changes or subtle 100ms opacity cross-fades.

## 6. Accessibility & Responsiveness (WCAG AA)
- **Contrast Ratios**: All colored buttons and cards paired with `#000000` text exceed 4.5:1 ratio requirement (all primary tokens exceed 7:1 against black).
- **Focus Rings**: Accessible, high-visibility 3px offset focus rings (`outline: 3px solid #000000; outline-offset: 3px`).
- **Touch Targets**: Minimum 48x48px on all interactive elements.
- **Sticky Bottom Action Bar**: Mobile viewports (<768px) host submit and hint actions in a thumb-accessible sticky bottom container.
- **Empty States**: Styled with 3px border, 45-degree diagonal hatched pattern, and prominent tactile CTA.
- **Loading Skeletons**: Solid neo-brutalist blocks with 3px black border and gentle opacity pulse (no blurred shimmering gradients).
