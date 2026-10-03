# Independent Review Report: Design Critic
**Phase**: Phase 0 Amendment — Standing Quality Protocol & Pricing Redo
**Iteration**: 1
**Reviewer Role**: Design Critic (Fresh Context)
**Target Specifications**: [`docs/ui-guidelines.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/ui-guidelines.md), [`.agents/rules/design-rules.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/.agents/rules/design-rules.md), [`AGENTS.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/AGENTS.md)

---

## 1. Executive Summary & Review Scope
An adversarial design review was conducted to evaluate the refined Neo-Brutalist design tokens, typography scale, spacing scale, restrained color palette, and micro-motion standards defined in the Phase 0 Amendment.

The audit revealed **two critical visual specification gaps (P1)**: missing dark mode palette and contrast specifications (a mandatory matrix theme), and missing mobile safe-area inset and Arabic RTL directional layout rules.

---

## 2. Findings Matrix

| ID | Severity | Category | File & Location | Summary | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `DC-01` | **P1** | Design Tokens | [`docs/ui-guidelines.md:33-50`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/ui-guidelines.md#L33-L50) | Dark mode token palette (`surface-canvas-dark`, `surface-card-dark`, `surface-ink-dark`) and contrast ratios against `#121212` are completely missing despite dark mode being a required testing theme | **ACTION REQUIRED** |
| `DC-02` | **P1** | Layout Integrity | [`docs/ui-guidelines.md:162`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/ui-guidelines.md#L162) | Sticky bottom mobile action bar lacks `env(safe-area-inset-bottom)` padding causing home-indicator collision on mobile devices; Arabic RTL directional mirroring and shadow rules are undefined | **ACTION REQUIRED** |

---

## 3. Detailed Audit & Finding Notes

### [P1] DC-01: Missing Dark Mode Restrained Color Palette & Contrast Table
- **File / Location**: `docs/ui-guidelines.md:33-50`, `.agents/rules/design-rules.md:15-27`
- **Observed Discrepancy**: The task specifies: `Themes: light + dark`. `docs/ui-guidelines.md` only defined tokens for light mode (`#FFF8E7` canvas). No dark mode canvas, surface, or text tokens were tabulated with WCAG contrast verification against `#121212`.
- **Evidence / Trigger**:
  `ui-guidelines.md` Section 2.2 only had a single table titled "Restrained Color Palette Tokens" with `#000000` ink.
- **Actionable Fix Suggestion**:
  Add an explicit Dark Mode Palette table defining `surface-canvas-dark` (`#121212`), `surface-card-dark` (`#1E1E1E`), `surface-ink-dark` (`#FFFFFF`), `surface-muted-dark` (`#2D2D2D`), and tabulate contrast ratios against `#121212`.

### [P1] DC-02: Missing Safe-Area Inset and Arabic RTL Neo-Brutalist Layout Guidelines
- **File / Location**: `docs/ui-guidelines.md:162`, `.agents/rules/design-rules.md:55`
- **Observed Discrepancy**: The mobile sticky bottom bar on 375px viewports does not specify `env(safe-area-inset-bottom)`, which causes button clipping against the mobile gesture bar. Additionally, for the Arabic (`AR`) RTL layout, directional rules for step progression, navigation arrows, and drop shadow directions were omitted.
- **Evidence / Trigger**:
  Sticky bottom bar only specified `p-4`, colliding with bottom indicator.
- **Actionable Fix Suggestion**:
  Add `padding-bottom: max(16px, env(safe-area-inset-bottom))` and document Section 7: Arabic (AR) RTL Neo-Brutalist Layout Guidelines.

---

## 4. Final Verdict

- **P0 Blockers**: 0
- **P1 Critical Issues**: 2
- **P2 Minor Recommendations**: 0
- **Verdict**: **FAIL — REMEDIATION REQUIRED**
