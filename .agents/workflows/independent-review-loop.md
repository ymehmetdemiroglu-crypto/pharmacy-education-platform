# Workflow: Independent Review Loop Execution

## 1. Trigger
This workflow is triggered automatically at the conclusion of every phase build or amendment before presenting the phase STOP gate report to the user.

---

## 2. Execution Steps

### Step 1: Pre-Review Health Check
1. Verify that all source files, schemas, configs, and documentation for the phase are committed or staged.
2. Confirm the build compiles with 0 errors (`pnpm build`).
3. Confirm existing unit and security rules tests pass (`pnpm test`, `pnpm test:rules`).

### Step 2: Spawn 5 Independent Reviewer Subagents
Invoke 5 fresh subagents with clean contexts. Provide only the repository workspace, the relevant specs in `docs/`, and the respective role instructions:
1. **Design Critic** -> Inspects UI components, CSS tokens, spacing, typography, contrast, motion tokens, and visual screenshots in `docs/screenshots/<phase>/iteration-<n>/`.
2. **Code Reviewer** -> Audits code correctness, types, structure, dead code, performance, keyboard accessibility, ARIA semantics.
3. **Security Reviewer** -> Audits `firestore.rules`, Cloud Functions entitlement checks, webhook HMAC signatures, idempotency, secret management, trial abuse vectors.
4. **Content / Pedagogy Reviewer** -> Audits source fidelity against `/materials`, <=40 words per prompt, 3-tier hint ladders, predict-then-reveal mechanics.
5. **QA Agent** -> Runs Playwright test suite against Brave browser (`C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe`) with Shields default AND off, checks console logs, network requests, axe-core reports, and Lighthouse metrics.

### Step 3: Collect & Aggregate Findings
Each reviewer outputs its findings report to:
`docs/reviews/<phase>-iteration-<n>-<role>.md`
The review files must strictly list:
- Summary of review scope
- Table of findings with severity (`P0`, `P1`, `P2`)
- Detailed finding cards with file/line, observed defect, evidence, and actionable fix
- Final sign-off verdict: `PASS (0 P0, 0 P1)` or `FAIL (N blockers found)`

### Step 4: Author Remediation
1. If any `P0` or `P1` findings exist:
   - The author agent reviews the findings.
   - The author implements fixes for 100% of P0 and P1 issues.
   - P2 findings are either addressed or logged as non-blocking technical debt.
2. If `iteration == 4` and unresolved P0/P1 issues persist:
   - STOP immediately.
   - Escalate to project owner with complete breakdown in `docs/open-questions.md`.

### Step 5: Verification & Walkthrough Logging
1. Instantiate new reviewer instances to re-verify resolved issues.
2. If all 5 reviewers declare `PASS`:
   - Log the iteration outcome in `docs/walkthrough.md`.
   - Re-issue or issue the phase STOP gate report to the user with the review evidence.
