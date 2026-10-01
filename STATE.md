# System State: Firebase Backend & Dodo Payments Production Hardening

## Current Task Status
* **Phase**: Correction Pass — Code-Level Security Hardening & Zero-Fabrication Verification
* **Status**: Complete (All Code-Level Gaps Remediated, Test Suites 100% Passing, Live Deploy Blocked on Credentials)
* **Active Working Directory**: `C:\Users\hp\.gemini\antigravity\worktrees\valiant-raman\pharmacy_education_platform_setup`
* **Active Git Branch**: `pharmacy_education_platform_setup`

---

## Logged Assumptions & Architectural Decisions
1. **7-Day Trial Abuse Mitigations**:
   - Dodo Payments hosted checkouts require a credit card; cardless 7-day trial is server-enforced in Firestore via atomic transaction.
   - Mitigations added: verified email requirement (`emailVerified !== false`), dot-aliasing and plus-addressing normalization (`normalizeEmail`), and transactional uniqueness claim in `/trial_claims/{normalizedEmail}`. Client cannot read or write `/trial_claims` (`allow read, write: if false`).
2. **Firestore-Backed Transactional Rate Limiter**:
   - Replaced in-memory rate limiting with atomic Firestore transactions on `rate_limits/{userId}_{endpoint}` storing `count`, `windowStart`, `windowEnd`.
   - Client is completely locked out of `/rate_limits` in `firestore.rules`.
   - Added scheduled cron `cleanupRateLimits` (`onSchedule('every 1 hours')`) with `cleanupExpiredRateLimits`.
3. **App Check Enforcement**:
   - Functions default to ENFORCED outside emulators unless `ENFORCE_APP_CHECK=false`.
   - Wired client Firebase App Check in `apps/web/src/lib/firebase.ts` with `ReCaptchaV3Provider` in production and debug token fallback in local dev.
   - Manual registration of web app in Firebase Console required for Yahya.
4. **Zero-Fabrication Live Sandbox Status**:
   - Command `npx firebase-tools projects:list` exits with code 1 (`Error: Failed to authenticate, have you run firebase login?`).
   - `functions/.env` not found (no `DODO_PAYMENTS_API_KEY`).
   - Live checkout session creation, real webhook receipt, and live API cancellations are **BLOCKED** awaiting Yahya's credentials, reported truthfully with pasted terminal output.
5. **Git Architecture & Repository Isolation**:
   - `master` branch in `../valiant-raman` contains only the MCP server (1 commit: `5ff3563`).
   - `pharmacy_education_platform_setup` is an orphan branch (40 commits) with no shared history with `master` (`git merge-base` exits 1).
   - Zero branch renames in `../valiant-raman`. Standalone course repository can be cleanly cloned from `pharmacy_education_platform_setup`.

---

## Task Roadmap & Tracking

| Step | Task Description | Dependencies | Status |
|---|---|---|---|
| **Task 0** | Audit synthesis, state initialization (`STATE.md`, `PROD_GAPS.md`, `PAYMENTS_NOTES.md`), pre-commit secret scan. | None | **DONE** |
| **Task 1** | Dependencies in `functions/` (`dodopayments`, `zod`, `standardwebhooks`). Centralized config (`config.ts`). | Task 0 | **DONE** |
| **Task 2** | Server Endpoints with Zod: `createCheckoutSession`, `createCustomerPortalSession`, `cancelSubscription`, `changeSubscriptionPlan`. | Task 1 | **DONE** |
| **Task 3** | Production Standard Webhook Handler with raw body verification, idempotency locking, 18 lifecycle events. | Task 2 | **DONE** |
| **Task 4** | Harden Entitlements, Grace Period (`past_due`), and Firestore Security Rules. | Task 3 | **DONE** |
| **Task 5** | Compliance: Account Deletion (`deleteUserAccount`) and Legal Policy views. | Task 4 | **DONE** |
| **Task 6** | End-to-End Test Suite & Verification Matrix with mocked SDK and live test scripts. | Task 5 | **DONE** |
| **Task 7** | Generate `TEST_REPORT.md`, `GO_LIVE.md`, and 5-Minute Verification Script. Final Secret Scan & DoD. | Task 6 | **DONE** |
| **Correction Pass** | Strict multi-tree secret scan, Firestore transactional rate limiter, App Check client wiring, trial abuse guards, 0 fabricated outputs. | Tasks 1-7 | **DONE** |
