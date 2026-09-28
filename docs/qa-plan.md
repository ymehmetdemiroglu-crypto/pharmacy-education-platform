# Quality Assurance & Verification Plan

## 1. Quality Philosophy
In commercial medical and chemical education, errors erode trust and endanger clinical learning. QA operates as an adversarial, independent verification gate. No lesson, widget, or rule is marked "Done" without documented empirical evidence.

---

## 2. Testing Tiers & Coverage Objectives

### 2.1 Tier 1: Scientific & Content Fact-Checking
- **Objective**: 100% of claims, equations, and structures verified against `/materials`.
- **Workflow**:
  - Independent fact-checker compares every step against the cited PDF page.
  - Verification results are recorded in `/docs/qa/<course>-factcheck.md`.
  - Format:
    ```markdown
    | Step ID | Claim / Structure | Cited File + Page | Verification Status | Notes |
    | :--- | :--- | :--- | :--- | :--- |
    | bioisostere-01-s1 | Tetrazole pKa ~4.5 | Biyoizosterizm.pdf p.8 | PASS | Exact match with text table |
    ```
  - Gate: 0 unresolved factual discrepancies allowed.

### 2.2 Tier 2: Interactive Widget Testing
- Every widget in `/packages/widgets/` must pass Vitest tests covering:
  - Valid and invalid Zod config parsing.
  - Event callback dispatches (`onAttempt`, `onHint`, `onCorrect`, `onIncorrect`).
  - Boundary value handling (e.g., zero clearance, negative dose, saturated Emax).
  - High-density click and drag interaction states.

### 2.3 Tier 3: Accessibility & Screen-Reader Operability (WCAG 2.1 AA)
- Full keyboard navigation: every interactive widget must be completely operable using `Tab`, `Arrow keys`, `Space`, and `Enter`.
- ARIA semantics: all SVG chemical structures, sliders, and buttons have descriptive `aria-label` attributes.
- High contrast: color contrast ratios verified >= 4.5:1 for all interactive text.
- Redundant feedback: success/error states must include both visual icons and descriptive text.

### 2.4 Tier 4: Mobile & Responsive Viewport Verification
- Verified on responsive viewports down to **360px width** (small Android/iPhone screens).
- Touch target minimum: 48px by 48px.
- Sticky bottom action bar verified: does not overlap lesson prompts on small screens.

### 2.5 Tier 5: Network Resilience & Offline Sync
- Offline test: disconnect network mid-lesson. Student can continue answering steps; progress is cached in local IndexedDB / Zustand queue.
- Reconnect test: progress syncs automatically with Firestore using conflict resolution.

### 2.6 Tier 6: Firestore Security Rules Emulator Tests
- Executed via `@firebase/rules-unit-testing` against local emulator.
- 100% pass on security rules test matrix before any deployment.
