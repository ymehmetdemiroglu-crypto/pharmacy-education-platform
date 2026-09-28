# Quality Assurance & Verification Plan (Phase 0 Amendment)

## 1. Quality Philosophy & Independent Review Mandate

In commercial medical and chemical education, errors erode trust and endanger clinical learning. Quality assurance operates as an adversarial, independent verification gate. **Author agents are strictly forbidden from approving their own work.**

Every phase and major deliverable must pass through the **Mandatory Independent Review Loop** and end-to-end **Playwright UI Verification** before crossing any STOP gate.

---

## 2. Playwright UI Verification with Brave Browser

All browser-based UI and interaction testing runs against the user's local Brave Browser installation to verify real-world rendering, Shields behavior, performance, and accessibility.

### 2.1 Brave Browser Configuration
- **Verified Executable Path (Windows)**:
  `C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe`
- **Playwright Launch Configuration**:
  ```typescript
  import { chromium } from '@playwright/test';

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    headless: false, // Visual verification
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  ```
- **Brave Shields Dual Verification Requirement**:
  1. **Shields Default (Standard Protections)**: Test with Brave's aggressive default tracker/ad blocking and fingerprint protection enabled. Assert that authentication, Firestore WebSocket synchronization, local storage, and widget interactivity work seamlessly without blocked essential calls.
  2. **Shields Down (Disabled)**: Test with Shields turned off. Verify identical visual rendering and deterministic functionality. The application must function flawlessly under both configurations.

---

### 2.2 Comprehensive Verification Matrix

Playwright tests must systematically cover:

1. **Routes**:
   - Course catalog (`/`, `/courses/medchem`, `/courses/pharmacology`)
   - Module dashboard (`/courses/:courseId/modules/:moduleId`)
   - Interactive lesson viewer (`/courses/:courseId/lessons/:lessonId`)
   - Spaced repetition queue (`/review`)
   - Paywall & pricing modals (`/pricing`, `/checkout`)
   - Settings & billing portal (`/settings`)
2. **Widget & Component States**:
   - `default` (initial resting state)
   - `hover` (subtle lift +2px, 8px shadow)
   - `focus` (3px black outline + 3px white offset)
   - `active` / `pressed` (sink 6px, 0px shadow)
   - `disabled` (grey fill `#E5E7EB`, 0px shadow)
   - `loading` / `skeleton` (neo-brutalist pulsing block)
   - `error` (pink alert border `#FF6B9D`, descriptive misconception)
   - `empty` (hatched pattern fill, tactical icon, CTA)
   - `correct answer` (green tint, checkmark, 4px gentle lift)
   - `incorrect answer` (pink tint, misconception callout, 4px gentle nudge)
   - `paywall prompt` (ethical, transparent tiers, equally weighted dismissal)
   - `active trial banner` (days remaining indicator)
   - `expired trial banner` (graceful Day 8 downgrade message)
3. **Viewports Matrix**:
   - **Mobile**: `375 x 667` (iPhone SE baseline)
   - **Tablet**: `768 x 1024` (iPad portrait)
   - **Desktop**: `1440 x 900` (MacBook / Standard HD display)
4. **Themes Matrix**:
   - `light` (default warm cream `#FFF8E7` canvas)
   - `dark` (high-contrast neo-brutalist dark canvas `#121212`, white ink, vibrant yellow/green/pink borders)
5. **Locales Matrix**:
   - `EN` (English, LTR layout)
   - `AR` (Arabic, RTL layout with mirrored layout cards and directional step flow)
   - `TR` (Turkish, LTR layout with specialized Turkish pharmacy terminology)

---

### 2.3 Visual Inspection & Screenshot Review Protocol

Automated DOM assertions are insufficient to catch subtle visual defects:
1. **Screenshot Destination**: Every test run writes high-resolution PNGs to:
   `docs/screenshots/<phase>/iteration-<n>/<route>-<viewport>-<theme>-<locale>-<state>.png`
2. **Mandatory Visual Review**: Reviewer agents must explicitly inspect the generated images using file inspection tools to critique:
   - Layout clipping or text overflow.
   - Dropped borders or missing drop shadows.
   - Text contrast failures against custom background blocks.
   - RTL mirroring breaks (misaligned badges, reversed arrow icons, truncated Arabic typography).
   - Misalignment in the sticky bottom action bar on 375px viewports.
3. **Before & After Commits**: For each design refinement iteration, both before and after screenshots must be committed to track visual evolution.

---

### 2.4 Automated Assertions & Performance Budgets

Every Playwright test suite execution mandates:
- **Zero Console Errors**: `page.on('console', msg => { if (msg.type() === 'error') throw ... })`.
- **Zero Failed Network Requests**: No 4xx or 5xx responses for internal assets, fonts, or APIs.
- **Axe-Core Automated Accessibility**:
  - Run `@axe-core/playwright`.
  - **Zero Serious or Critical Violations** permitted.
- **Complete Keyboard Navigation**: Full tab sequence verification from first interactive element to submit button.
- **Lighthouse Performance Score >= 90**: Run Google Lighthouse audits on desktop and mobile viewports.
- **Motion & Frame Jank Budget**:
  - Record video of key interactions (`video: 'on'`).
  - Verify zero long frames (>50ms).
  - Verify Cumulative Layout Shift (CLS) < 0.05 during transitions.

---

## 3. Standing Independent Review Loop Protocol

Before any phase STOP gate is approved, five distinct reviewer subagents must execute in fresh contexts:

```
+-----------------------------------------------------------------------------------+
|                           PHASE IMPLEMENTATION COMPLETE                           |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|               SPAWN 5 INDEPENDENT REVIEWERS (FRESH CONTEXT ONLY)                  |
|                                                                                   |
|  1. Design Critic        -> docs/reviews/<phase>-iteration-<n>-design-critic.md   |
|  2. Code Reviewer        -> docs/reviews/<phase>-iteration-<n>-code-reviewer.md   |
|  3. Security Reviewer    -> docs/reviews/<phase>-iteration-<n>-security.md        |
|  4. Content Reviewer     -> docs/reviews/<phase>-iteration-<n>-content.md         |
|  5. QA Agent             -> docs/reviews/<phase>-iteration-<n>-qa-agent.md        |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                             SEVERITY CLASSIFICATION                               |
|                                                                                   |
|  - P0: Blocker (Fatal security vulnerability, broken gating, scientific error)    |
|  - P1: Critical (Broken layout, a11y violation, dark pattern, unhandled error)    |
|  - P2: Minor Improvement (Style polishing, non-blocking copy refinement)          |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
                       Any P0 or P1 Findings Found?
                                /             \
                              YES              NO
                              /                 \
                             v                   v
              +-----------------------+     +-------------------------------+
              | Author Fixes Issues   |     | ZERO P0/P1 DISCREPANCIES      |
              | Iteration count n+1   |     | STOP Gate Report Re-Issued    |
              | Fresh Reviewers Spawn |     | Handoff to User for Approval  |
              | (Max 4 iterations)    |     +-------------------------------+
              +-----------------------+
```

### Reviewer Roles & Scope:
1. **Design Critic**: Evaluates visual hierarchy, spacing scale adherence, typography, contrast ratios, and alignment against `docs/ui-guidelines.md`.
2. **Code Reviewer**: Evaluates TypeScript strictness, architecture patterns, code smells, dead code, performance, bundle size, and keyboard accessibility.
3. **Security Reviewer**: Audits Firestore security rules, HMAC signature checks, trial-abuse prevention paths, and secret handling.
4. **Content / Pedagogy Reviewer**: Verifies scientific claims against `/materials`, enforces 40-word step limits, predict-then-reveal mechanics, and 3-tier hint ladders.
5. **QA Agent**: Executes Playwright test suite against Brave browser, audits screenshots, checks console errors, and verifies axe-core a11y reports.
