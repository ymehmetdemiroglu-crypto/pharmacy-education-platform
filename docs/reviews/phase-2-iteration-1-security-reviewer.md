# Independent Review Report — Security Reviewer
**Phase**: Phase 2: Core Architecture & Backend Security Foundation  
**Iteration**: 1  
**Reviewer Role**: Security Reviewer (Independent Fresh Context Instance)  
**Date**: 2026-09-28  
**Verdict**: **REVISE REQUIRED (4 P0 Blockers, 5 P1 Critical Issues, 3 P2 Minor Observations)**

---

## 1. Executive Summary

As the independent Security Reviewer for Phase 2, a comprehensive red-team and defensive security audit was conducted covering:
1. **Cloud Firestore Security Rules** ([`firestore.rules`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/firestore.rules)) and Rules Test Suite ([`tests/firestore-rules.test.ts`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/tests/firestore-rules.test.ts)).
2. **Cloud Functions Backend** ([`functions/src/index.ts`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/functions/src/index.ts)): `startFreeTrial`, `createCheckoutSession`, `handleDodoWebhook`, and `cleanupExpiredTrials`.
3. **Repository Secret Management & Environment Configurations** ([`.gitignore`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/.gitignore) and git tracked files).

### Key Takeaways
- **Firestore Security Rules**: The rule architecture demonstrates strong foundational defense: unauthenticated public catalog access is maintained, free preview gating (Lessons 1 & 2) is enforced, server-authoritative entitlement checking (`hasCourseAccess`) prevents unauthorized step reads, client writes to `/users/{uid}/entitlements` are completely blocked, and client tampering with sensitive user fields (`plan`, `trialUsed`, `roles`, etc.) is rejected on `create` and `update`.
- **Cloud Functions Security**: **CRITICAL VULNERABILITIES IDENTIFIED**. The `handleDodoWebhook` implementation contains fatal flaws: the HMAC signature check is executed conditionally (`if (signature)`), enabling complete authentication bypass when headers are omitted; signature comparison uses non-constant-time string comparison (`!==`); a hardcoded fallback secret is present; and premium entitlements are unconditionally granted for any event payload (including failed payments and cancellations). Additionally, `startFreeTrial` can overwrite active premium subscriptions.
- **Verdict**: **REVISE REQUIRED**. Author remediation of all P0 and P1 issues is mandatory prior to sign-off.

---

## 2. Threat Modeling & Attack Surface Analysis

```
                              ATTACK SURFACE & THREAT VECTORS
                              
      [ Unauthenticated Attacker ]               [ Malicious Authenticated Student ]
                   |                                             |
   (Vector 1)      | (Vector 2)                   (Vector 3)     | (Vector 4)
   Omit Webhook    | Timing Attack on             Trial Overwrite| Spaced-Repetition
   Signature       | HMAC String Compare          of Premium     | Storage Exhaustion
         |         |                                     |       |
         v         v                                     v       v
   +------------------------------------+        +-------------------------------+
   |   handleDodoWebhook HTTP Endpoint  |        |    Firestore Database         |
   |   - Bypassable signature check     |        |    - /users/{uid}/progress    |
   |   - Unconditional entitlement grant|        |    - /users/{uid}/spaced_cards|
   +------------------------------------+        +-------------------------------+
```

### Threat Vectors Evaluated
1. **Unauthenticated Payment Forgery (Vector 1)**: Webhook endpoints exposed to the public internet must never process unsigned or improperly signed requests. The current logic treats `signature` as optional.
2. **Side-Channel Timing Leak (Vector 2)**: Variable-time string comparison allows statistical timing analysis to infer HMAC bytes.
3. **Privilege Downgrade / Inconsistent State (Vector 3)**: A paying student activating a free trial could have their premium access degraded to a 7-day expiration.
4. **Idempotency Race Conditions**: Duplicate concurrent webhook notifications from payment processors could cause redundant or conflicting entitlement writes without atomic idempotency locking.
5. **Client-Side Document Flooding (Vector 4)**: Unbounded array or document structures can lead to Firestore document size limit exhaustion (1MB document limit) or billing denial of service.

---

## 3. Firestore Security Rules Audit

### 3.1 Verification Matrix vs Phase 2 Requirements

| Requirement | Implementation in `firestore.rules` | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Unauthenticated Catalog Read** | Lines 179–191: `allow read: if true;` on `/courses`, `/modules`, `/lessons` | **VERIFIED** | Catalog metadata is publicly visible; writes denied. |
| **Free Preview Gating** | Lines 197–203: `isFreePreview == true` check on step or parent lesson | **VERIFIED** | Lessons 1 & 2 open to unauthenticated; Lessons 3+ require entitlement. |
| **Server Entitlement Check** | Lines 164–176: `hasCourseAccess(courseId)` checks `status == 'active'` && `expiresAt > request.time` | **VERIFIED** | Checks both specific course and `dual_bundle`. Guarded with `exists()`. |
| **Entitlement Write Lockout** | Lines 223–226: `allow write: if false;` | **VERIFIED** | Clients cannot create, modify, or delete entitlement records. |
| **Sensitive Field Protection** | Lines 212–219: `hasAny` on `create` and `affectedKeys().hasAny` on `update` | **VERIFIED** | `roles`, `isAdmin`, `plan`, `trialUsed`, `trialStartedAt`, `trialEndsAt`, `entitlements` locked. |
| **Progress Size Guards** | Lines 231–234: `completedLessonIds is list && size() < 500` | **VERIFIED** | Guard present in rule, but **untested in test suite**. |

### 3.2 Audit Findings in Rules & Test Suite
- **Rules Quality Score**: 4/5 (Minor hardening recommendations on type constraints and subcollection boundaries).
- **Test Suite Coverage Gap**: `tests/firestore-rules.test.ts` only contains 6 test cases. It fails to test:
  1. Denying access when an entitlement is expired (`expiresAt <= request.time`) or has non-active status (`status: 'expired'`).
  2. Rejecting user document `create` operations containing sensitive fields.
  3. Bounded list validation (`completedLessonIds.size() < 500`) on `/users/{userId}/progress/{courseId}`.
  4. Access to both courses granted via `dual_bundle`.

---

## 4. Webhook & Cloud Functions Audit

### 4.1 Verification Matrix vs Backend Architecture (`docs/backend.md`)

| Function | Trigger | Requirement | Audit Result | Severity |
| :--- | :--- | :--- | :--- | :--- |
| `startFreeTrial` | `onCall` | Atomic single-use check, 7-day expiration | Functional atomic transaction, but overwrites active `premium` plans. | **P1** |
| `handleDodoWebhook` | `onRequest` | Mandatory timing-safe HMAC signature verification | Signature check is optional if header missing; non-constant time comparison. | **P0** |
| `handleDodoWebhook` | `onRequest` | Secure secret handling | Falls back to hardcoded `'test_webhook_secret'`. | **P0** |
| `handleDodoWebhook` | `onRequest` | Event type verification | Unconditionally grants premium for failed payments and cancellations. | **P0** |
| `handleDodoWebhook` | `onRequest` | Strict event idempotency | Check-then-act `.get()` followed by `.set()` has race hazard. | **P1** |
| `handleDodoWebhook` | `onRequest` | Raw buffer payload verification | Computes HMAC on `JSON.stringify(req.body)` instead of `req.rawBody`. | **P1** |
| `cleanupExpiredTrials` | `onSchedule` | Daily downgrade to `free` with progress preservation | `batch.update(dualRef)` throws error if `dual_bundle` doc missing. | **P1** |

---

## 5. Repository Secret Management & Environment Security

1. **`.gitignore` Audit**:
   - Checked lines 12–22:
     ```gitignore
     .env
     .env.*
     !.env.example
     *.pem
     *.key
     service-account*.json
     *serviceAccount*.json
     *credential*.json
     client-secret*.json
     ```
   - Rules comply with Non-Negotiable Rule 7.
2. **Git Tracking Scan**:
   - `git ls-files` verification confirms zero credential files, service account JSONs, or live certificates are tracked.
3. **Hardcoded Secrets in Source Code**:
   - Found hardcoded fallback `'test_webhook_secret'` in [`functions/src/index.ts:117`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/functions/src/index.ts#L117). This must be removed to prevent insecure defaults.

---

## 6. Categorized Findings & Actionable Remediation Plans

### 6.1 P0 Blockers (Must be fixed before sign-off)

---

#### [SEC-P0-01] Webhook Signature Verification is Bypassed When Header is Omitted
- **File / Location**: [`functions/src/index.ts:118-129`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/functions/src/index.ts#L118-L129)
- **Vulnerability**:
  ```typescript
  // Current code:
  const signature = req.headers['x-dodo-signature'] as string | undefined;
  if (signature) {
    // ... verification logic ...
  }
  // Continues to process event even if signature was undefined!
  ```
  If an attacker sends an HTTP POST request without the `x-dodo-signature` header, the entire verification block is skipped. The function proceeds directly to process the payload and grant premium access to whatever `userId` is supplied.
- **Actionable Fix**:
  Require the signature header and reject immediately if missing:
  ```typescript
  if (!signature || typeof signature !== 'string') {
    res.status(401).send('Unauthorized: Missing or invalid x-dodo-signature header');
    return;
  }
  ```

---

#### [SEC-P0-02] Non-Constant-Time Signature Comparison (Timing Attack Vulnerability)
- **File / Location**: [`functions/src/index.ts:125`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/functions/src/index.ts#L125)
- **Vulnerability**:
  ```typescript
  if (computedHmac !== signature) {
    res.status(401).send('Invalid signature');
    return;
  }
  ```
  Standard JavaScript `!==` performs short-circuit string comparison, terminating at the first unequal character. Over high-frequency network requests, this leaks timing information allowing an attacker to deduce the expected signature byte-by-byte.
- **Actionable Fix**:
  Use `crypto.timingSafeEqual` with buffer length validation:
  ```typescript
  const sigBuffer = Buffer.from(signature, 'utf8');
  const compBuffer = Buffer.from(computedHmac, 'utf8');

  if (sigBuffer.length !== compBuffer.length || !crypto.timingSafeEqual(sigBuffer, compBuffer)) {
    res.status(401).send('Unauthorized: Invalid webhook signature');
    return;
  }
  ```

---

#### [SEC-P0-03] Insecure Fallback Webhook Secret
- **File / Location**: [`functions/src/index.ts:117`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/functions/src/index.ts#L117)
- **Vulnerability**:
  ```typescript
  const webhookSecret = process.env.DODO_WEBHOOK_SECRET || 'test_webhook_secret';
  ```
  If `DODO_WEBHOOK_SECRET` is omitted from the deployment environment or secret manager, the system falls back to a trivial, public hardcoded secret. Anyone with knowledge of the repository can compute valid signatures.
- **Actionable Fix**:
  Fail closed with a 500 configuration error if the secret is not defined in the environment:
  ```typescript
  const webhookSecret = process.env.DODO_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('FATAL: DODO_WEBHOOK_SECRET environment variable is not configured.');
    res.status(500).send('Webhook endpoint configuration error');
    return;
  }
  ```

---

#### [SEC-P0-04] Unconditional Entitlement Grant for Any Webhook Event Type (Payment Bypass)
- **File / Location**: [`functions/src/index.ts:145-189`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/functions/src/index.ts#L145-L189)
- **Vulnerability**:
  The function extracts `customerId` and immediately sets `userRef.plan = 'premium'` and creates an active entitlement without inspecting `event.type`. Incoming events for `payment.failed`, `subscription.cancelled`, `refund.created`, or `dispute.created` will grant the student an unearned active subscription.
- **Actionable Fix**:
  Implement an explicit event type router. Only grant access on verified successful payment events, and revoke/downgrade on cancellation or refund:
  ```typescript
  const eventType = event?.type;
  
  switch (eventType) {
    case 'payment.succeeded':
    case 'subscription.active':
    case 'subscription.renewed': {
      // Grant / extend active entitlement
      await userRef.update({ plan: 'premium', lastActiveAt: now });
      await entitlementRef.set({ status: 'active', ... });
      break;
    }
    case 'subscription.cancelled':
    case 'subscription.expired':
    case 'refund.created': {
      // Revoke entitlement
      await entitlementRef.update({
        status: 'revoked',
        revokedAt: now,
        autoRenew: false,
      });
      break;
    }
    default: {
      console.log(`Unhandled webhook event type: ${eventType}`);
      break;
    }
  }
  ```

---

### 6.2 P1 Critical Issues (Must be resolved before sign-off)

---

#### [SEC-P1-01] HMAC Calculated on Reserialized JSON Instead of Raw Request Buffer
- **File / Location**: [`functions/src/index.ts:120-123`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/functions/src/index.ts#L120-L123)
- **Vulnerability**:
  Computing HMAC on `JSON.stringify(req.body)` is fragile and non-standard. JSON property ordering and whitespace are not preserved by body-parsers, causing legitimate payment provider signatures to fail verification.
- **Actionable Fix**:
  Use `(req as any).rawBody` (the raw buffer supplied by Cloud Functions):
  ```typescript
  const rawPayload = (req as any).rawBody || Buffer.from(JSON.stringify(req.body));
  const computedHmac = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawPayload)
    .digest('hex');
  ```

---

#### [SEC-P1-02] Check-Then-Act Race Condition in Webhook Idempotency Enforcement
- **File / Location**: [`functions/src/index.ts:136-150`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/functions/src/index.ts#L136-L150)
- **Vulnerability**:
  ```typescript
  const eventDoc = await eventRef.get();
  if (eventDoc.exists) { ... return; }
  await eventRef.set({ ... });
  ```
  Two concurrent deliveries of the same webhook event ID can both execute `.get()` simultaneously, see `exists === false`, and proceed to execute redundant downstream writes.
- **Actionable Fix**:
  Use `eventRef.create(...)` which is atomic and throws an error (`ALREADY_EXISTS`, error code 6) if the document already exists:
  ```typescript
  try {
    await eventRef.create({
      eventId,
      gateway: 'dodo_payments',
      eventType: event?.type || 'unknown',
      receivedAt: Timestamp.now(),
      status: 'processing',
    });
  } catch (err: any) {
    if (err?.code === 6 || err?.message?.includes('ALREADY_EXISTS')) {
      res.status(200).send({ received: true, status: 'already_processed' });
      return;
    }
    throw err;
  }
  ```

---

#### [SEC-P1-03] `startFreeTrial` Overwrites Active Premium Subscriptions
- **File / Location**: [`functions/src/index.ts:35-49`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/functions/src/index.ts#L35-L49)
- **Vulnerability**:
  If a student purchases an annual or semester pass directly without first activating their free trial, `userData.trialUsed` remains `false`. If they subsequently invoke `startFreeTrial`, the function sets `plan: 'trial'` and overwrites their `dual_bundle` entitlement with a 7-day expiration, leading to account downgrade on Day 8.
- **Actionable Fix**:
  Add an explicit guard in the transaction:
  ```typescript
  if (userData?.plan === 'premium') {
    throw new HttpsError(
      'failed-precondition',
      'Account already holds an active premium subscription.'
    );
  }
  ```

---

#### [SEC-P1-04] Fragile Subdocument Update in Scheduled Trial Cleanup
- **File / Location**: [`functions/src/index.ts:218-221`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/functions/src/index.ts#L218-L221)
- **Vulnerability**:
  `batch.update(dualRef, { status: 'expired' })` will abort the entire batch commit if any user document returned by the query does not have a pre-existing `/entitlements/dual_bundle` subdocument.
- **Actionable Fix**:
  Use `batch.set` with merge:
  ```typescript
  batch.set(dualRef, { status: 'expired' }, { merge: true });
  ```

---

#### [SEC-P1-05] Missing Test Coverage for Rules Size Limits, Create Validation, and Expiration
- **File / Location**: [`tests/firestore-rules.test.ts:1-270`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/tests/firestore-rules.test.ts#L1-L270)
- **Vulnerability**:
  The rules test suite does not verify that:
  1. A student with an expired entitlement (`expiresAt < request.time`) is blocked from paid steps.
  2. A client attempting to create a `/users/{uid}` document with `plan: 'premium'` or `roles: ['admin']` is rejected.
  3. A progress document update with `completedLessonIds` exceeding 500 items is rejected.
  4. Access to both courses is unlocked with the `dual_bundle` entitlement.
- **Actionable Fix**:
  Add test cases in `tests/firestore-rules.test.ts` covering:
  - `denies access to paid steps when entitlement is expired`
  - `prevents client from creating user profile with sensitive fields`
  - `enforces completedLessonIds array size guard (< 500)`
  - `allows access to both medchem and pharmacology with dual_bundle entitlement`

---

### 6.3 P2 Minor Observations & Hardening Suggestions

---

#### [SEC-P2-01] Spaced Repetition Subcollection Lacks Schema and Size Constraints
- **File / Location**: [`firestore.rules:238-240`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/firestore.rules#L238-L240)
- **Observation**:
  `match /spaced_repetition/{cardId} { allow read, write: if isOwner(userId); }` permits unrestricted document writes without field type or string length checks.
- **Actionable Fix**:
  Add validation ensuring `cardId` matches document ID and basic fields (`box is int`, `intervalDays is int`).

---

#### [SEC-P2-02] Input Whitelist Validation on `createCheckoutSession`
- **File / Location**: [`functions/src/index.ts:89-97`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/functions/src/index.ts#L89-L97)
- **Observation**:
  `courseId`, `planId`, and `currency` are accepted as arbitrary strings without validating against valid course IDs (`'medchem'`, `'pharmacology'`, `'dual_bundle'`) or valid plan IDs.
- **Actionable Fix**:
  Validate inputs against an allowed enum/set before returning the checkout URL.

---

#### [SEC-P2-03] Trial Sybil Abuse Defenses
- **File / Location**: [`functions/src/index.ts:15-78`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/functions/src/index.ts#L15-L78)
- **Observation**:
  The 7-day free trial is currently bounded by Firebase Auth UID. An adversary can register multiple email accounts to obtain perpetual free trials.
- **Actionable Fix**:
  In Phase 3/4, integrate email verification checks (`user.email_verified == true`) and filter out disposable temporary email providers prior to trial activation.

---

## 7. Final Verdict

| Metric | Threshold | Current Result |
| :--- | :--- | :--- |
| **P0 Blockers** | 0 | **4** (Signature bypass, Timing attack, Fallback secret, Event type bypass) |
| **P1 Critical Issues** | 0 | **5** (Raw body HMAC, Idempotency race, Premium overwrite, Batch error, Test gaps) |
| **P2 Minor Observations** | Advisory | **3** (Spaced repetition limits, Input validation, Sybil mitigations) |
| **Final Review Verdict** | **Zero P0 / Zero P1 Required** | **REVISE REQUIRED** |

**Remediation Instructions for Author Agent**:
1. Fix `functions/src/index.ts` to strictly enforce mandatory HMAC signatures, timing-safe equality, raw buffer validation, safe secret retrieval, and event type switching.
2. Guard `startFreeTrial` against overwriting active premium users.
3. Replace `batch.update` with `batch.set(..., { merge: true })` in `cleanupExpiredTrials`.
4. Expand `tests/firestore-rules.test.ts` to test expired entitlements, progress array size guards, profile creation gating, and dual bundle verification.
5. Re-submit for Iteration 2 re-audit once fixes are committed.
