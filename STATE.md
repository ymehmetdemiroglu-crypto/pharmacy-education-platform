# System State: Firebase Backend & Dodo Payments Production Hardening

## Current Task Status
* **Phase**: Task 0 — Foundation & Audit Synthesis
* **Status**: In Progress
* **Active Working Directory**: `C:\Users\hp\.gemini\antigravity\worktrees\valiant-raman\pharmacy_education_platform_setup`
* **Active Git Branch**: `pharmacy_education_platform_setup`

---

## Logged Assumptions & Architectural Decisions
1. **7-Day Trial Mechanism**: Dodo Payments checkout sessions require upfront payment method capture; therefore, the 7-day cardless free trial is handled server-side in Firestore via atomic transaction (`executeStartFreeTrial`), setting `trialUsed: true` and provisioning `dual_bundle` entitlement with strict 7-day expiration.
2. **Immediate vs Period-End Cancellation**: In `dodopayments`, passing `cancel_at_next_billing_date: true` schedules cancellation at period end; immediate cancellation requires passing `status: 'cancelled'`. Setting `cancel_at_next_billing_date: false` does NOT cancel immediately.
3. **Environment Strategy**: Single environment switch `DODO_ENV=test|live` controls API key, base URL, product catalog, and webhook secret. Zero code changes required to flip to live mode.
4. **Offline First Testing**: Unit tests and rules tests use mocked SDK by default to guarantee 100% pass rate in CI/Windows without needing live secrets; real test-mode API integration is guarded behind `RUN_LIVE=1`.

---

## Task Roadmap & Tracking

| Step | Task Description | Dependencies | Status |
|---|---|---|---|
| **Task 0** | Audit synthesis, state initialization (`STATE.md`, `PROD_GAPS.md`, `PAYMENTS_NOTES.md`), pre-commit secret scan, `.gitignore` update. | None | **DONE** |
| **Task 1** | Install & configure dependencies in `functions/` (`dodopayments`, `zod`, `standardwebhooks`). Create centralized environment config (`config.ts`). | Task 0 | **NEXT** |
| **Task 2** | Implement Server Endpoints with Zod validation: `createCheckoutSession`, `createCustomerPortalSession`, `cancelSubscription`, `changeSubscriptionPlan`. | Task 1 | **TODO** |
| **Task 3** | Implement Production Standard Webhook Handler with raw body verification, idempotency locking, and 8 event handlers. | Task 2 | **TODO** |
| **Task 4** | Harden Entitlements, Grace Period (`past_due`), and Firestore Security Rules. | Task 3 | **TODO** |
| **Task 5** | Implement Compliance: Account Deletion (`deleteUserAccount`) and Legal Policy views. | Task 4 | **TODO** |
| **Task 6** | End-to-End Test Suite & Verification Matrix with mocked SDK and live test scripts. | Task 5 | **TODO** |
| **Task 7** | Generate `TEST_REPORT.md`, `GO_LIVE.md`, and 5-Minute Verification Script. Final Secret Scan & DoD. | Task 6 | **TODO** |
