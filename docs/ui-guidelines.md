# UI Guidelines & Motion System: Refined Neo-Brutalist Design System

## 1. Aesthetic Foundations & Core Principles

The user interface follows a refined **Neo-Brutalist** design language tailored for intense, distraction-free pharmacy and medicinal chemistry education. It pairs the raw tactile clarity of 3px black borders and zero-blur hard drop shadows with a disciplined typographic scale, a restrained palette, and buttery-smooth, subtle micro-motion.

### Core Tenets:
1. **Structural Legibility**: Uncompromising boundaries. Every interactive element, container, and formula card is delineated by a crisp 3px or 4px solid `#000000` border.
2. **Subtle & Disciplined Motion**: Animation is utilitarian, never ornamental. Transitions are snappy (150–250ms), strictly hardware-accelerated (`transform`, `opacity`), free of bounce/overshoot, and fully respectful of `prefers-reduced-motion`.
3. **No Fluff or Gradients**: No glassmorphism, floating drop shadows, pastel gradients, or blurred backdrop filters.
4. **Complete Accessibility (WCAG 2.1 AA)**: Minimum 4.5:1 contrast on all body text, visible 3px focus rings with 3px offsets, and dual redundant signaling (color + icon + text).

---

## 2. Design Tokens & Styling Constants

### 2.1 Spacing Scale
All margins, paddings, and gap dimensions align to a strict 8-point geometric scale:

| Token | Dimension | Tailwind Class | Semantic Application |
| :--- | :--- | :--- | :--- |
| `space-1` | 4px | `p-1`, `gap-1`, `m-1` | Micro-spacing, badge padding, inner icon gaps |
| `space-2` | 8px | `p-2`, `gap-2`, `m-2` | Tight element spacing, chip padding, step dot gaps |
| `space-3` | 12px | `p-3`, `gap-3`, `m-3` | Compact button padding, input field horizontal inset |
| `space-4` | 16px | `p-4`, `gap-4`, `m-4` | Standard card internal padding, default element margins |
| `space-6` | 24px | `p-6`, `gap-6`, `m-6` | Large card padding, module container spacing |
| `space-8` | 32px | `p-8`, `gap-8`, `m-8` | Section separation, lesson step vertical gap |
| `space-12` | 48px | `p-12`, `gap-12`, `m-12` | Page hero margins, empty state container padding |
| `space-16` | 64px | `p-16`, `gap-16`, `m-16` | Major layout breaks, footer offsets |

---

### 2.2 Restrained Color Palette Tokens

The color system avoids visual chaos by strictly reserving vibrant accents for pedagogical semantics:

| Token Name | Hex Code | Semantic Role | Contrast vs `#000000` |
| :--- | :--- | :--- | :--- |
| `surface-canvas` | `#FFF8E7` | Primary page background (warm cream) | 16.5:1 (Pass AAA) |
| `surface-card` | `#FFFFFF` | Default card & widget interactive surface | 21:1 (Pass AAA) |
| `surface-ink` | `#000000` | Heavy borders, text, titles, hard shadows | N/A (Foreground) |
| `surface-muted` | `#E5E7EB` | Disabled states, subtle card borders, inactive dot fill | 12.8:1 (Pass AAA) |
| `accent-yellow` | `#FFD93D` | Hints, attention cards, active step selection | 13.9:1 (Pass AAA) |
| `accent-green` | `#6BCB77` | Correct answers, completed steps, mastery badges | 10.4:1 (Pass AAA) |
| `accent-pink` | `#FF6B9D` | Misconception feedback, alerts, contrast warnings | 6.8:1 (Pass AA) |
| `accent-blue` | `#4D96FF` | MedChem theme accent, chemical structure links | 7.9:1 (Pass AA) |
| `accent-orange` | `#FF9F45` | Pharmacology theme accent, receptor binding highlights | 9.8:1 (Pass AAA) |

---

### 2.3 Typography Hierarchy

| Style Role | Font Family | Size / Line Height | Weight & Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `display-xl` | Space Grotesk / Archivo Black | 36px / 44px | Bold 800, tracking -0.02em | Course hero titles, modal headlines |
| `display-lg` | Space Grotesk / Archivo Black | 28px / 36px | Bold 800, tracking -0.02em | Module titles, paywall headline |
| `display-md` | Space Grotesk | 22px / 28px | Bold 700, tracking -0.01em | Lesson titles, section headers |
| `display-sm` | Space Grotesk | 18px / 24px | Bold 700, tracking normal | Widget titles, card titles |
| `body-lg` | Inter / Space Grotesk | 16px / 24px | Medium 500, line-height 1.5 | Primary step instructional prompts (<40 words) |
| `body-md` | Inter | 14px / 20px | Regular 400 / Medium 500 | Explanations, hint ladder copy, tooltips |
| `body-sm` | Inter | 12px / 16px | Medium 500 | Metadata, source citations, date stamps |
| `mono-md` | JetBrains Mono | 14px / 20px | Regular 400 | Chemical SMILES strings, pKa/logP values |
| `mono-sm` | JetBrains Mono | 12px / 16px | Regular 400 | Stoichiometric equations, PK rate constants |

---

### 2.4 Elevation & Geometry
- **Borders**: Standard 3px solid `#000000` (`border-3 border-black`) on cards, buttons, inputs. Heavy 4px solid on modals and heroes.
- **Corner Radii**: Strictly sharp or micro-radii: `0px` (default) or `2px` to `4px` maximum (`rounded-none` or `rounded-sm`).
- **Drop Shadows**: Crisp, non-blurred offset shadows:
  - Resting: `box-shadow: 6px 6px 0px #000000;`
  - Subtle Hover Lift: `box-shadow: 8px 8px 0px #000000; transform: translate(-2px, -2px);`
  - Active Press: `box-shadow: 0px 0px 0px #000000; transform: translate(6px, 6px);`

---

## 3. Motion & Animation System

All transitions and animations adhere to strict guidelines to eliminate cognitive distraction, avoid motion sickness, and prevent layout thrashing:

### 3.1 Timing & Duration Tokens
- **Micro-Interactions (Buttons, Checkboxes, Tabs, Tooltips)**: `150ms` to `250ms`.
- **Containers & Drawers (Hint drawer slide, Accordion toggle)**: `200ms` to `300ms`.
- **Page & Step Transitions**: Up to `400ms` maximum.

### 3.2 Easing Curves
- **Standard Ease-Out**: `cubic-bezier(0.22, 1, 0.36, 1)` (rapid start with smooth, natural deceleration into rest).
- **Linear**: Used only for continuous loading spinners.
- **Prohibited**: Never use bounce (`cubic-bezier(0.68, -0.55, 0.27, 1.55)`), overshoot, or elastic curves.

### 3.3 Strict Property Constraints (Zero Layout Thrashing)
- **Permitted Properties**: Only `transform` and `opacity` are animated.
- **Forbidden Properties**: Never animate layout properties (`width`, `height`, `top`, `bottom`, `left`, `right`, `margin`, `padding`). Height expansions must use CSS Grid `grid-template-rows: 0fr -> 1fr` or `transform: scaleY()`.
- **Displacement Limits**: Small offsets only: `4px` to `12px` maximum.
- **No Decorative Loops**: No looping pulse animations, floating icons, or ambient background motion.

### 3.4 Feedback Animation Specification
- **Correct Feedback**:
  - Container gently shifts upward by `4px` (`transform: translateY(-4px)`) over `200ms`.
  - Surface color smoothly transitions to soft green tint (`#F0FFF4`) with green checkmark icon.
  - **CONFUSED/DISTRACTING CONFETTI OR FULL-SCREEN EXPLOSIONS ARE STRICTLY FORBIDDEN.**
- **Incorrect Feedback**:
  - Container gently shifts horizontally by `4px` and returns over `200ms` (`translateX(-4px) -> translateX(0)`).
  - Surface color transitions to soft pink tint (`#FFF5F5`) with targeted misconception callout.
  - **VIOLENT FULL-PAGE SCREEN SHAKING IS STRICTLY FORBIDDEN.**

### 3.5 Accessibility: `prefers-reduced-motion`
When `prefers-reduced-motion: reduce` is active:
- All transforms are completely eliminated (`transform: none !important;`).
- State changes transition instantaneously or reduce to subtle 100ms opacity fades (`opacity: 0 -> 1`).

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
    transform: none !important;
  }
}
```

---

## 4. Component State Matrix & Visual Specifications

| Component | Visual Description | Key States |
| :--- | :--- | :--- |
| **Button** | Solid colored block (Yellow/Green/Blue/White) with 3px black border & 6px shadow. | Default, Hover (translate -2px, -2px, 8px shadow), Focus (3px ring + 3px offset), Active (translate 6px, 6px, 0px shadow), Disabled (`#E5E7EB` bg, 3px border, 0px shadow, cursor not-allowed). |
| **Input / Field** | White surface, 3px black border, 4px shadow, JetBrains Mono text. | Resting, Focus (Yellow outline ring, 6px shadow), Error (Pink 3px border, 4px shadow), Disabled (`#E5E7EB`). |
| **Hint Drawer** | Neo-brutalist card sliding down over 250ms with 3-tier stepper. | Closed, Tier 1 Active (Yellow `#FFD93D`), Tier 2 Active (Clue revealed), Tier 3 Active (Full Solution). |
| **Empty State** | 3px border container filled with 45-degree diagonal hatched pattern: `repeating-linear-gradient(45deg, #FFF8E7, #FFF8E7 10px, #F3ECE0 10px, #F3ECE0 20px)`. | Resting with prominent tactile icon, bold title, and action button. |
| **Loading State** | Skeleton block with 3px black border and subtle 200ms opacity pulse (0.7 -> 1.0). | In-Progress, Loaded. (No shimmering gradients). |
| **Paywall Modal** | Heavy 4px border modal with bold header, transparent pass options, and prominent "Continue Free" action. | Displayed, Checkout Redirecting, Dismissed. |
| **Trial Banner** | Cream bar with 3px black bottom border fixed at dashboard header. | Active Trial (shows days remaining), Expired (Day 8 friendly notice). |
| **Step Dots** | Square 16x16px boxes across lesson header. | Unvisited (white, 2px border), Current (Yellow `#FFD93D`, 3px border), Completed (Green `#6BCB77`, checkmark). |

---

## 5. Focus Indicators & Keyboard Navigation

- **Focus Ring Standard**:
  ```css
  :focus-visible {
    outline: 3px solid #000000;
    outline-offset: 3px;
  }
  ```
- **Sequential Tab Order**: All interactive steps (radio options, atom buttons, slider handles, submit CTA, hint CTA) are fully navigable via `Tab` and `Shift+Tab`.
- **Keyboard Shortcuts**:
  - `Enter` or `Space`: Submit answer / select active atom.
  - `H`: Open next hint tier.
  - `ArrowLeft` / `ArrowRight`: Navigate previous / next step.
  - `Esc`: Close paywall or modal.

---

## 6. Mobile Standards & Thumb-Zone Layout

- **Minimum Touch Target**: 48px by 48px on all buttons and interactive targets.
- **Sticky Bottom Action Bar**: On viewports under 768px width (down to 360px), the Submit button, Hint button, and Next Step button are pinned inside a sticky bottom bar with a solid 3px top border and white background for one-thumb reachability.
- **Horizontal Scrolling Guard**: All container wrappers enforce `max-w-full overflow-x-hidden`. Molecular SMILES canvases scale responsively using SVG viewboxes to prevent layout clipping.
