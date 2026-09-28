# UI Guidelines: Neo-Brutalist Design System

## 1. Aesthetic Foundations
The user interface follows a distinct **Neo-Brutalist** aesthetic tailored for high-intensity, distraction-free pharmacy education. It prioritizes clarity, raw structural boundaries, sharp contrast, and playful tactile feedback.

---

## 2. Design Tokens & Styling Constants

### 2.1 Color Palette Tokens
| Token Name | Hex Code | Semantic Role |
| :--- | :--- | :--- |
| `surface-canvas` | `#FFF8E7` | Primary page background (warm cream) |
| `surface-card` | `#FFFFFF` | Default card and interactive container fill |
| `surface-ink` | `#000000` | Heavy borders, text, titles, deep shadows |
| `accent-yellow` | `#FFD93D` | Hints, active selections, warning callouts |
| `accent-pink` | `#FF6B9D` | Incorrect answers, contrast items, error states |
| `accent-blue` | `#4D96FF` | MedChem theme accent, chemical structure links |
| `accent-green` | `#6BCB77` | Correct answers, progress completion, mastery |
| `accent-orange` | `#FF9F45` | Pharmacology theme accent, receptor binding highlights |

### 2.2 Elevation & Geometry
- **Borders**: All cards, inputs, buttons, and badges have a solid `3px` or `4px` black border (`border-3 border-black` / `border-4 border-black`).
- **Corner Radii**: Strictly constrained: `rounded-none` (`0px`) or `rounded-sm` (`2px` to `4px` maximum).
- **Shadows**: Hard, high-contrast, zero-blur drop shadows:
  - Default: `box-shadow: 6px 6px 0px #000000;`
  - Hover Lift: `box-shadow: 8px 8px 0px #000000; transform: translate(-2px, -2px);`
  - Active Press: `box-shadow: 0px 0px 0px #000000; transform: translate(6px, 6px);`

### 2.3 Typography Tokens
- **Display & Headings**: `font-display` -> `Space Grotesk` or `Archivo Black`, bold (weight 700-900), tracking tight.
- **Body & Prompts**: `font-sans` -> `Space Grotesk` / `Inter`, weight 500, line height 1.5.
- **Formulas & Code**: `font-mono` -> `JetBrains Mono` for SMILES strings, pKa/logP values, equations, stoichiometric constants.

---

## 3. Core Component Catalog & State Matrix

| Component | Visual Description | Key States |
| :--- | :--- | :--- |
| **Button** | Solid colored block (Yellow/Green/Blue/Pink/White) with 3px black border & 6px shadow. | Default, Hover (lift), Active (sink), Disabled (greyed-out `#E5E7EB` with 3px border, 0px shadow). |
| **Card** | Clean white surface, 3px solid border, 6px shadow, bold headline. | Resting, Selected (4px yellow border), Active. |
| **Sticker Badge** | Compact pill with 2px black border, angled at -2° or +2° for tactile notebook aesthetic. | Neutral, Free, Paid, Mastered, Needs Review. |
| **Progress Bar** | Thick segmented bar (height 20px) with 3px black outer border and black internal dividers. | Empty (cream), In-Progress (yellow pulse), Completed (solid green). |
| **Step Dots** | Square/circle indicators across top of lesson header indicating progress through the 8-15 steps. | Unvisited (white), Current (thick yellow with black border), Answered (green). |
| **Slider** | Thick 8px black track, square 24x24px colored draggable thumb with 3px border. | Resting, Dragging, Focused. |
| **Paywall Card** | Large neo-brutalist card featuring bold sticker badge ("PRO COURSE"), key outcomes, and pricing call-to-action. | Locked view, Purchase Pending, Access Granted. |
| **Lesson Tile** | Course map node with lesson title, step count, and status badge. | Locked (grey hatched fill with padlock icon), Unlocked (white with border/shadow), Completed (green background with checkmark). |
| **Streak Counter** | Neo-brutalist sticker badge displaying fire icon and day count with yellow/orange highlight. | Active, Frozen, Broken. |

---

## 4. Accessibility & Mobile Standards (WCAG AA)

- **Contrast Ratios**: All colored buttons and cards paired with `#000000` text exceed the 4.5:1 ratio requirement (Yellow `#FFD93D`, Cream `#FFF8E7`, Green `#6BCB77` all exceed 10:1 against black).
- **Focus Indicators**: 3px black outline with 3px white offset:
  ```css
  outline: 3px solid #000000;
  outline-offset: 3px;
  ```
- **Redundant Feedback Signaling**: Never rely on color alone to indicate correctness. Correct feedback always includes a checkmark icon + text ("Correct!"); incorrect feedback includes an exclamation icon + diagnosis text.
- **Mobile First & Sticky Action Bar**:
  - Minimum touch target: 48px by 48px.
  - On mobile viewports (down to 360px width), the primary interaction submit button and hint button are housed in a sticky bottom action bar fixed to the bottom of the viewport for easy single-thumb operation.
- **Motion Reduction**: All transitions use standard 100–150ms durations. Respect `prefers-reduced-motion: reduce` by setting transitions to `none`.
