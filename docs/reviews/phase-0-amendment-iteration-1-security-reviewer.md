# Independent Review Report: Security Reviewer
**Phase**: Phase 0 Amendment — Standing Quality Protocol & Pricing Redo
**Iteration**: 1
**Reviewer Role**: Security Reviewer (Fresh Context)
**Target Specifications**: [`docs/backend.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/backend.md), [`docs/payments-plan.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/payments-plan.md), [`docs/security-guidelines.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/security-guidelines.md)

---

## 1. Executive Summary & Review Scope
An adversarial security assessment was conducted to audit the monetization gating rules, trial-abuse vectors, webhook signature verification pipelines, and entitlement protections introduced in the Phase 0 Amendment.

The assessment analyzed potential client-side tampering, replay attacks, trial recycling loops, and unauthorized data leakage.

---

## 2. Findings Matrix

| ID | Severity | Category | File & Location | Summary | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `SEC-01` | **P2** | Abuse Prevention | `docs/payments-plan.md:120` | Add IP-based and device fingerprint velocity limits to `startFreeTrial` Cloud Function to curb automated disposable email account generation | Logged (Non-blocking) |
| `SEC-02` | **P2** | Secrets Hardening | `docs/backend.md:313` | Ensure `DODO_WEBHOOK_SECRET` rotation runbook is documented in deployment guides | Logged (Non-blocking) |

---

## 3. Detailed Audit & Finding Notes

### Threat Model & Attack Vector Analysis

#### 1. Trial Abuse & Recycling Vector: Can a client spoof or reset its trial?
- **Inspection**:
  - In `docs/backend.md`, `users/{userId}` update rule enforces:
    `!request.resource.data.diff(resource.data).affectedKeys().hasAny(['roles', 'isAdmin', 'userId', 'plan', 'trialUsed', 'trialStartedAt', 'trialEndsAt', 'entitlements'])`
  - In `users/{userId}` create rule, clients cannot provide `plan`, `trialUsed`, or `entitlements`.
  - The `startFreeTrial` function is an HTTPS Callable running Firebase Admin SDK privileges that atomically inspects `user.trialUsed === false` before setting `trialUsed = true` and creating entitlement documents.
- **Finding**: Tamper-proof. Clients cannot alter their trial state or bypass the one-trial-per-account restriction via Firestore SDK.

#### 2. Entitlement Elevation: Can a client grant itself paid access?
- **Inspection**:
  - `match /users/{userId}/entitlements/{courseId}` specifies:
    `allow read: if isOwner(userId); allow write: if false;`
- **Finding**: Client write access is completely blocked. Only Cloud Functions via Firebase Admin SDK can create or update entitlements.

#### 3. Webhook Replay & Spoofing: Can a malicious actor forge purchase notifications?
- **Inspection**:
  - `handleDodoWebhook` enforces HMAC-SHA256 signature verification using `crypto.createHmac` with a secret stored in Google Cloud Secret Manager.
  - Idempotency is enforced using a Firestore transaction on `/webhook_events/{eventId}`, preventing duplicate entitlement provisioning on replayed requests.
- **Finding**: Secure. Signature validation rejects forged requests; transaction prevents replays.

#### 4. Content Leakage: Can unauthenticated users read proprietary steps?
- **Inspection**:
  - `steps/{stepId}` read rule requires `isFreePreview == true` OR `hasCourseAccess(courseId)`.
  - `hasCourseAccess(courseId)` strictly checks `request.auth != null`, existence of entitlement, `status == 'active'`, and `expiresAt > request.time`.
- **Finding**: Secure. Unauthenticated users cannot read proprietary steps. Expired trials/passes lose step access immediately upon expiry.

---

## 4. Final Verdict

- **P0 Blockers**: 0
- **P1 Critical Issues**: 0
- **P2 Minor Recommendations**: 2
- **Verdict**: **PASS**
