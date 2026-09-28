# Independent Review Rules & Adversarial Quality Protocol

## 1. Core Mandate & Isolation Principle
- **Authors Never Approve Their Own Work**: Under no circumstances may an author agent sign off on or approve its own code, architecture, design, or content.
- **Fresh Context Isolation**: Every reviewer subagent must operate in a clean context containing exclusively the repository files, specifications, and source materials. Reviewers are strictly blocked from receiving the author's internal chain-of-thought, defense, or rationalizations.
- **Adversarial Mindset**: Reviewers are tasked with attempting to break, challenge, and audit the deliverable against strict standards.

---

## 2. Reviewer Roles & Inspection Focus

| Reviewer Role | Primary Domain | Evaluation Criteria |
| :--- | :--- | :--- |
| **Design Critic** | UI/UX & Visual System | Visual hierarchy, adherence to 8-point spacing scale, typographic hierarchy, WCAG AA contrast (>=4.5:1), border and shadow integrity, adherence to refined motion tokens (150–250ms, no layout thrashing, prefers-reduced-motion), and inspection of Playwright screenshots across viewports/themes/locales. |
| **Code Reviewer** | Code Quality & Architecture | Correctness, TypeScript strictness (no `any`), modular design, absence of dead code, component reusability, bundle size/perf impact, and full keyboard/ARIA accessibility. |
| **Security Reviewer** | Security & Entitlements | Cloud Firestore security rules (zero client entitlement writes, server-enforced trial gating), HMAC-SHA256 signature verification for Dodo Payments webhooks, webhook idempotency transactions, zero secrets in codebase, and trial-abuse vectors. |
| **Content / Pedagogy Reviewer** | Medical & Pedagogical Fidelity | 100% verifiability of claims, chemical structures, and equations against `/materials`, strict <=40 words per prompt, predict-then-reveal mechanics, 3-tier hint ladders (nudge -> clue -> solution), and worked-example fading. |
| **QA Agent** | Automated End-to-End Testing | Playwright test suite execution on local Brave Browser (`C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe`), verifying Shields default AND off, zero console errors, zero failed network calls, axe-core 0 serious/critical violations, and Lighthouse perf >= 90. |

---

## 3. Severity Classification & Standard Finding Format

Every finding written by a reviewer must be classified into one of three strict severity tiers:
- **`P0` — Blocker**: Fatal bug, security vulnerability, broken billing/entitlement gating, scientific error or invalid chemical structure, application crash, or broken review loop.
- **`P1` — Critical**: Visual layout break, contrast failure, serious/critical accessibility violation, dark pattern in billing/upgrade UX, unhandled error state, or missing source citation.
- **`P2` — Minor**: Visual polish suggestion, non-blocking copy refinement, minor lint or formatting preference, or non-critical code comment enhancement.

### Mandatory Finding Template:
```markdown
### [P0|P1|P2] <Descriptive Title>
- **File / Location**: `<absolute-path-or-relative-path>:<line-number>`
- **Observed Discrepancy**: <Precise description of what violates the specification>
- **Evidence / Trigger**: <Exact state, input, or rule snippet where the failure occurs>
- **Actionable Fix Suggestion**: <Concrete code or text change required to resolve the issue>
```

---

## 4. Lifecycle & Iteration Limits
1. Reviewers write findings to `docs/reviews/<phase>-iteration-<n>-<role>.md`.
2. The author agent implements fixes for **all P0 and P1 findings**.
3. A **NEW** reviewer instance is instantiated to verify the fixes.
4. If **zero P0 and zero P1 issues** remain, the phase review loop is declared **CLEAN** and the STOP gate report is issued.
5. If after **4 iterations** unresolved P0 or P1 blockers remain, work immediately halts and escalates to the project owner with an exhaustive blocker summary.
6. Every iteration, finding count, and resolution must be recorded in `docs/walkthrough.md`.
