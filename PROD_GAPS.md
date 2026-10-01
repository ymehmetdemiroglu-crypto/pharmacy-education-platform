# Production Gaps: Firebase Backend & Dodo Payments Integration

## Priority Classification
* **P0**: Release Blockers / Payment Failures / Security Vulnerabilities (Must be 100% resolved)
* **P1**: Core Integration, Entitlement Lifecycle, and Compliance Requirements
* **P2**: Operational Reliability, Tooling, and Deployment Automation

---

## P0: Critical Blockers

| ID | Title | Evidence (File:Line) | Impact / Risk | Resolution | Status |
|---|---|---|---|---|---|
| **GAP-P0-01** | Stubbed Checkout Session Creation | `functions/src/index.ts:133-140` | Users cannot pay; returns fake random URL string instead of authentic Dodo Payments hosted session. | Replace with official `client.checkoutSessions.create()` mapping course, plan, customer, and return URLs. | **CLOSED** |
| **GAP-P0-02** | Missing Portal, Cancel, & Change Plan Endpoints | `functions/src/index.ts:1-347` | Customers cannot manage subscriptions, cancel, update billing methods, or change plans self-service. | Implement `createCustomerPortalSession`, `cancelSubscription`, and `changeSubscriptionPlan` Cloud Functions with SDK. | **CLOSED** |
| **GAP-P0-03** | Invalid Webhook Signature Verification | `functions/src/index.ts:154-183` | Incompatible with Dodo Payments Standard Webhooks protocol (`webhook-id`, `webhook-timestamp`, `webhook-signature`). Insecure. | Use `client.webhooks.unwrap()` with raw body Buffer and `DODO_PAYMENTS_WEBHOOK_KEY`. | **CLOSED** |
| **GAP-P0-04** | Missing Critical Webhook Events & Wrong Names | `functions/src/index.ts:223-278` | Listens to non-existent `refund.created` instead of `refund.succeeded`. Missing `subscription.renewed`, `on_hold`, `past_due`, `plan_changed`, `expired`. | Authoritatively handle all 8 lifecycle events with idempotency and state transitions. | **CLOSED** |
| **GAP-P0-05** | Missing Zod Input Validation & Error Handling | `functions/src/index.ts:114-130` | Malformed inputs cause unhandled exceptions or cryptic path errors (`/payments/undefined`). | Add strict Zod schemas for all callables with typed error returns. | **CLOSED** |
| **GAP-P0-06** | Single-Switch Environment Architecture (`DODO_ENV`) | `functions/src/config.ts:1-125` | No centralized configuration mapping test vs live keys, base URLs, product IDs, and webhook secrets. | Implement `config.ts` where `DODO_ENV=test\|live` dynamically selects keys and product maps with zero code changes. | **CLOSED** |

---

## P1: Core Functionality & Compliance

| ID | Title | Evidence (File:Line) | Impact / Risk | Resolution | Status |
|---|---|---|---|---|---|
| **GAP-P1-01** | Past-Due Grace Period & Entitlement Derived Access | `firestore.rules:164-176`, `packages/platform/src/access/AccessControl.ts:27-36` | Users whose renewal is temporarily past-due lose instant access without grace period. | Update rules and platform access helper to support `past_due` grace period (e.g. 7 days). | **CLOSED** |
| **GAP-P1-02** | 7-Day No-Card Trial Enforcement | `functions/src/index.ts:17-78` | Ensure robust trial provisioning without card requirement, verified abuse-resistant by Firestore transaction. | Audit and harden single-use trial logic across both courses. | **CLOSED** |
| **GAP-P1-03** | Out-of-Order Webhook Delivery & Idempotency Locking | `functions/src/index.ts:187-220` | Rapid out-of-order events (e.g. renewal then cancel) could overwrite with stale state. | Implement event timestamp checking and atomic idempotency in `webhook_events`. | **CLOSED** |
| **GAP-P1-04** | Compliance: Account Deletion & Subscription Cleanup | Missing in `functions/src/index.ts` | Required by GDPR/KVKK and Dodo live merchant approval. User deletion must cancel active subscriptions. | Implement `deleteUserAccount` callable that cancels active Dodo subscriptions and cleans Firestore. | **CLOSED** |
| **GAP-P1-05** | Public Legal Compliance Pages | `apps/web/src/pages/` | Dodo Payments requires active Terms of Service, Privacy Policy, and Refund Policy links. | Verify/create legal policy views in `apps/web`. | **CLOSED** |

---

## P2: Reliability, Tooling & Verification

| ID | Title | Evidence (File:Line) | Impact / Risk | Resolution | Status |
|---|---|---|---|---|---|
| **GAP-P2-01** | Structured Logging & PII Sanitization | `functions/src/index.ts` | Logs could leak customer email, card brand, or sensitive metadata. | Implement structured logger redacting customer PII. | **CLOSED** |
| **GAP-P2-02** | Offline Mocked Unit Tests & Live Guard | `tests/functions-and-security.test.ts` | Tests must run offline cleanly via emulators without requiring live Dodo secrets. | Configure unit/integration tests with mocked SDK by default; live calls behind `RUN_LIVE=1`. | **CLOSED** |
| **GAP-P2-03** | Operational Runbook: Go-Live & Rollback Checklist | `GO_LIVE.md` | Live rollout requires precise product ID mappings, dashboard webhooks, and test-card verification. | Create `GO_LIVE.md` with step-by-step instructions. | **CLOSED** |
