# Independent Review Report — Security Reviewer
**Phase**: Phase 3: Vertical Slice A (Medicinal Chemistry Module 1, Lesson 1)  
**Iteration**: 2  
**Commit**: `e2a12749e8bcc43bc6ba839957853d81be1fe7c8`  
**Reviewer Role**: Security Reviewer (Independent Fresh Context Instance)  
**Date**: 2026-09-29  
**Verdict**: **PASS (0 P0 Blockers, 0 P1 Criticals, 0 New P2s, All Iteration 1 P2s Dispositioned)**

---

## 1. Executive Summary

As the independent fresh-context Security Reviewer for **Phase 3: Vertical Slice A (Iteration 2)** on commit `e2a12749e8bcc43bc6ba839957853d81be1fe7c8`, an exhaustive defensive security assessment, rule verification, and adversarial penetration evaluation was conducted.

The audit verified:
1. **Firestore Security Rules**: [`firestore.rules`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/firestore.rules)
2. **Security Rules Test Suite**: [`tests/firestore-rules.test.ts`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/tests/firestore-rules.test.ts) (12 tests)
3. **Backend Cloud Functions**: [`functions/src/index.ts`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/functions/src/index.ts) (`startFreeTrial`, `createCheckoutSession`, `processDodoWebhook`, `executeCleanupExpiredTrials`)
4. **Backend Security & Entitlement Test Suite**: [`tests/functions-and-security.test.ts`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/tests/functions-and-security.test.ts) (17 tests)
5. **Access Control & Progress Isolation**: [`packages/platform/src/access/AccessControl.ts`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/platform/src/access/AccessControl.ts) and [`packages/platform/src/progress/ProgressStore.ts`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/platform/src/progress/ProgressStore.ts)
6. **Freemium Gating & Hint Protection in Web App**: [`apps/web/src/pages/LessonPage.tsx`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/pages/LessonPage.tsx) and [`packages/ui/src/components/HintDrawer/HintDrawer.tsx`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/ui/src/components/HintDrawer/HintDrawer.tsx)

### Verification Summary
- **Test Suite Status**: Ran `npm run test:rules` directly in the shell against the local Firestore emulator. **All 29 tests passed cleanly** (12 in `firestore-rules.test.ts` + 17 in `functions-and-security.test.ts`).
- **Unauthenticated Guest Isolation**: Fully compliant. Guest progress and spaced repetition cards are stored strictly in client `localStorage`. Zero unauthenticated writes or reads to `/users/{userId}` are allowed by Firestore rules (`isOwner(userId)` requires `request.auth != null && request.auth.uid == userId`).
- **Freemium Step Gating**: Fully compliant. Lessons 1 & 2 are free preview (`isFreePreviewLesson`). Navigation to Lesson 3 (`/courses/medchem/lessons/3` / `mc-les-03`) halts step rendering, strictly denies Firestore step reads to unauthenticated/free users (`PERMISSION_DENIED`), and mounts `PaywallModal`.
- **Hint Tier Gating**: Fully compliant. Tier 1 is free to all students. Tiers 2 & 3 are strictly gated behind active premium or trial (`isPremiumOrTrial`). Locked hint copy is never injected into the DOM tree.
- **Single-Use Free Trial**: Fully compliant. Client tampering with `trialUsed` or `plan` is blocked by Firestore rules. Cloud Function `startFreeTrial` executes in an atomic transaction verifying `trialUsed == false` and preventing overwriting active premium accounts.
- **Atomic Concurrency Defense**: Fully compliant. Concurrent `startFreeTrial` calls maintain serializable isolation; race tests confirm exactly 1 success and 1 conflict rejection.
- **Replay Defense & Idempotency**: Fully compliant. Webhook deliveries record `eventId` atomically in `/webhook_events`; replay deliveries detect existing records and return HTTP 200 `{ received: true, status: 'already_processed' }` with zero duplicate mutations.
- **Webhook HMAC Security**: Fully compliant. Constant-time comparison (`crypto.timingSafeEqual`) with strict length matching (`sigBuffer.length === hmacBuffer.length`) prevents timing side-channels and crash exploits. Production mode enforces fail-closed secret configuration.
- **Trial Expiry Downgrade**: Fully compliant. Expired trials are immediately locked out by temporal rules (`expiresAt > request.time`) and gracefully downgraded to `plan: 'free'` by `cleanupExpiredTrials` while preserving 100% of student progress and review cards.

---

## 2. Test Execution Output (npm run test:rules)

The complete raw terminal output of `npm run test:rules` executed on frozen commit `e2a12749e8bcc43bc6ba839957853d81be1fe7c8` is pasted below:

```text
> pharmacy-education-platform@0.1.0 test:rules
> node scripts/run-rules-tests.mjs

!  emulators: You are not currently authenticated so some features may not work correctly. Please run firebase login to authenticate the CLI.
i  emulators: Starting emulators: firestore
i  firestore: Firestore Emulator logging to firestore-debug.log
+  firestore: Firestore Emulator UI websocket is running on 9150.
i  Running script: vitest run -c vitest.rules.config.ts

 RUN  v3.2.7 C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup

 ✓ tests/firestore-rules.test.ts (12 tests) 12457ms
   ✓ Firestore Security Rules Testing > allows public unauthenticated read of courses, modules, and lessons  3601ms
   ✓ Firestore Security Rules Testing > allows unauthenticated read of free preview steps (Lessons 1 & 2)  1826ms
   ✓ Firestore Security Rules Testing > strictly rejects unauthenticated client writes to course catalog and lesson steps  1027ms
 ✓ tests/functions-and-security.test.ts (17 tests) 8915ms
   ✓ Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > startTrial Single-Use & Atomic Concurrency > successfully provisions 7-day free trial on first call using real function export  2461ms
   ✓ Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > startTrial Single-Use & Atomic Concurrency > guarantees atomic concurrency: concurrent startTrial calls allow only 1 success  1541ms
   ✓ Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > startTrial Single-Use & Atomic Concurrency > guards against overwriting active paid premium accounts  749ms
   ✓ Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > startTrial Single-Use & Atomic Concurrency > strictly forbids client from resetting trialUsed in Firestore security rules  305ms
   ✓ Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Trial Expiry Downgrade & Student Progress Preservation > downgrades expired trials to free while keeping 100% of student progress intact using real batch logic  477ms
   ✓ Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Cross-User Data Isolation > strictly forbids User A from reading or modifying User B progress or entitlements  1742ms

 Test Files  2 passed (2)
      Tests  29 passed (29)
   Start at  11:57:30
   Duration  19.66s (transform 377ms, setup 0ms, collect 10.11s, tests 21.37s, environment 1ms, prepare 814ms)

+  Script exited successfully (code 0)
i  emulators: Shutting down emulators.
i  firestore: Stopping Firestore Emulator
!  Firestore Emulator has exited upon receiving signal: SIGINT
i  logging: Stopping Logging Emulator
stderr | tests/firestore-rules.test.ts > Firestore Security Rules Testing > allows public unauthenticated read of courses, modules, and lessons
[2026-09-29T08:57:44.998Z]  @firebase/firestore: Firestore (10.14.1): GrpcConnection RPC 'Write' stream 0x2cf93fd8 error. Code: 7 Message: 7 PERMISSION_DENIED: 
false for 'create' @ L181, false for 'update' @ L181

stderr | tests/functions-and-security.test.ts > Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > startTrial Single-Use & Atomic Concurrency > strictly forbids client from resetting trialUsed in Firestore security rules
[2026-09-29T08:57:47.121Z]  @firebase/firestore: Firestore (10.14.1): GrpcConnection RPC 'Write' stream 0x851fce77 error. Code: 7 Message: 7 PERMISSION_DENIED: 
evaluation error at L216:24 for 'update' @ L216, false for 'update' @ L216

stderr | tests/firestore-rules.test.ts > Firestore Security Rules Testing > strictly forbids client writes to entitlements subcollection
[2026-09-29T08:57:47.321Z]  @firebase/firestore: Firestore (10.14.1): GrpcConnection RPC 'Write' stream 0x2cf93fe0 error. Code: 7 Message: 7 PERMISSION_DENIED: 
false for 'create' @ L225, false for 'update' @ L225

stderr | tests/firestore-rules.test.ts > Firestore Security Rules Testing > prevents user from modifying sensitive profile fields (plan, trialUsed, roles)
[2026-09-29T08:57:47.420Z]  @firebase/firestore: Firestore (10.14.1): GrpcConnection RPC 'Write' stream 0x2cf93fe2 error. Code: 7 Message: 7 PERMISSION_DENIED: 
evaluation error at L216:24 for 'update' @ L216, false for 'update' @ L216

stderr | tests/firestore-rules.test.ts > Firestore Security Rules Testing > prevents user from modifying sensitive profile fields (plan, trialUsed, roles)
[2026-09-29T08:57:47.464Z]  @firebase/firestore: Firestore (10.14.1): GrpcConnection RPC 'Write' stream 0x2cf93fe3 error. Code: 7 Message: 7 PERMISSION_DENIED: 
evaluation error at L216:24 for 'update' @ L216, false for 'update' @ L216

stderr | tests/firestore-rules.test.ts > Firestore Security Rules Testing > prevents user from modifying sensitive profile fields (plan, trialUsed, roles)
[2026-09-29T08:57:47.509Z]  @firebase/firestore: Firestore (10.14.1): GrpcConnection RPC 'Write' stream 0x2cf93fe4 error. Code: 7 Message: 7 PERMISSION_DENIED: 
evaluation error at L216:24 for 'update' @ L216, false for 'update' @ L216

stderr | tests/firestore-rules.test.ts > Firestore Security Rules Testing > forbids client from self-creating a profile with sensitive fields (roles, plan, trialUsed)
[2026-09-29T08:57:47.678Z]  @firebase/firestore: Firestore (10.14.1): GrpcConnection RPC 'Write' stream 0x2cf93fe7 error. Code: 7 Message: 7 PERMISSION_DENIED: 
false for 'create' @ L212, evaluation error at L216:24 for 'update' @ L216, false for 'create' @ L212

stderr | tests/firestore-rules.test.ts > Firestore Security Rules Testing > forbids client from self-creating a profile with sensitive fields (roles, plan, trialUsed)
[2026-09-29T08:57:47.757Z]  @firebase/firestore: Firestore (10.14.1): GrpcConnection RPC 'Write' stream 0x2cf93fe8 error. Code: 7 Message: 7 PERMISSION_DENIED: 
false for 'create' @ L212, evaluation error at L216:24 for 'update' @ L216, false for 'create' @ L212

stderr | tests/firestore-rules.test.ts > Firestore Security Rules Testing > strictly rejects unauthenticated client writes to user progress (must use localStorage offline)
[2026-09-29T08:57:48.124Z]  @firebase/firestore: Firestore (10.14.1): GrpcConnection RPC 'Write' stream 0x2cf93fee error. Code: 7 Message: 7 PERMISSION_DENIED: 
false for 'create' @ L231, false for 'update' @ L231

stderr | tests/firestore-rules.test.ts > Firestore Security Rules Testing > strictly rejects unauthenticated client writes to course catalog and lesson steps
[2026-09-29T08:57:48.215Z]  @firebase/firestore: Firestore (10.14.1): GrpcConnection RPC 'Write' stream 0x2cf93fef error. Code: 7 Message: 7 PERMISSION_DENIED: 
false for 'create' @ L181, false for 'update' @ L181

stderr | tests/firestore-rules.test.ts > Firestore Security Rules Testing > strictly rejects unauthenticated client writes to course catalog and lesson steps
[2026-09-29T08:57:49.147Z]  @firebase/firestore: Firestore (10.14.1): GrpcConnection RPC 'Write' stream 0x2cf93ff0 error. Code: 7 Message: 7 PERMISSION_DENIED: 
false for 'create' @ L202, false for 'update' @ L202

stderr | tests/functions-and-security.test.ts > Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Cross-User Data Isolation > strictly forbids User A from reading or modifying User B progress or entitlements
[2026-09-29T08:57:49.881Z]  @firebase/firestore: Firestore (10.14.1): GrpcConnection RPC 'Write' stream 0x851fce8a error. Code: 7 Message: 7 PERMISSION_DENIED: 
false for 'create' @ L231, false for 'update' @ L231

stderr | tests/functions-and-security.test.ts > Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Cross-User Data Isolation > strictly forbids User A from reading or modifying User B progress or entitlements
[2026-09-29T08:57:49.927Z]  @firebase/firestore: Firestore (10.14.1): GrpcConnection RPC 'Write' stream 0x851fce8b error. Code: 7 Message: 7 PERMISSION_DENIED: 
false for 'create' @ L225, false for 'update' @ L225

stderr | tests/functions-and-security.test.ts > Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Progress Write & Unauthenticated Step Access Rules > allows student to update their own lesson progress, but denies writing to entitlements
[2026-09-29T08:57:50.016Z]  @firebase/firestore: Firestore (10.14.1): GrpcConnection RPC 'Write' stream 0x851fce8d error. Code: 7 Message: 7 PERMISSION_DENIED: 
false for 'create' @ L225, false for 'update' @ L225

stderr | tests/functions-and-security.test.ts > Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Progress Write & Unauthenticated Step Access Rules > strictly denies unauthenticated client writes to user progress or profiles
[2026-09-29T08:57:50.076Z]  @firebase/firestore: Firestore (10.14.1): GrpcConnection RPC 'Write' stream 0x851fce8e error. Code: 7 Message: 7 PERMISSION_DENIED: 
false for 'create' @ L231, false for 'update' @ L231

stderr | tests/functions-and-security.test.ts > Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Progress Write & Unauthenticated Step Access Rules > strictly denies unauthenticated client writes to user progress or profiles
[2026-09-29T08:57:50.087Z]  @firebase/firestore: Firestore (10.14.1): GrpcConnection RPC 'Write' stream 0x851fce8f error. Code: 7 Message: 7 PERMISSION_DENIED: 
false for 'create' @ L212, false for 'update' @ L216

stderr | tests/functions-and-security.test.ts > Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Progress Write & Unauthenticated Step Access Rules > strictly rejects unauthenticated writes to course steps or catalog
[2026-09-29T08:57:50.253Z]  @firebase/firestore: Firestore (10.14.1): GrpcConnection RPC 'Write' stream 0x851fce92 error. Code: 7 Message: 7 PERMISSION_DENIED: 
false for 'create' @ L202, false for 'update' @ L202

stderr | tests/functions-and-security.test.ts > Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Progress Write & Unauthenticated Step Access Rules > strictly rejects unauthenticated writes to course steps or catalog
[2026-09-29T08:57:50.268Z]  @firebase/firestore: Firestore (10.14.1): GrpcConnection RPC 'Write' stream 0x851fce93 error. Code: 7 Message: 7 PERMISSION_DENIED: 
false for 'create' @ L181, false for 'update' @ L181
```

*(Note: The `PERMISSION_DENIED` stderr output confirms active interception by Firestore Security Rules when executing adversarial assertion tests).*

### Complete Inventory of All 29 Passing Tests

#### Suite 1: `tests/firestore-rules.test.ts` (12 Tests Passed)
1. `Firestore Security Rules Testing > allows public unauthenticated read of courses, modules, and lessons`
2. `Firestore Security Rules Testing > allows unauthenticated read of free preview steps (Lessons 1 & 2)`
3. `Firestore Security Rules Testing > denies unauthenticated and free tier read of paid steps (Lesson 3+)`
4. `Firestore Security Rules Testing > allows access to paid steps when student has active, unexpired entitlement`
5. `Firestore Security Rules Testing > strictly forbids client writes to entitlements subcollection`
6. `Firestore Security Rules Testing > prevents user from modifying sensitive profile fields (plan, trialUsed, roles)`
7. `Firestore Security Rules Testing > denies access to paid steps when entitlement has expired in the past`
8. `Firestore Security Rules Testing > forbids client from self-creating a profile with sensitive fields (roles, plan, trialUsed)`
9. `Firestore Security Rules Testing > allows access to paid steps when user has an active dual_bundle entitlement`
10. `Firestore Security Rules Testing > strictly allows unauthenticated read of Lesson 1 steps (free preview) but rejects Lesson 3 steps (paid)`
11. `Firestore Security Rules Testing > strictly rejects unauthenticated client writes to user progress (must use localStorage offline)`
12. `Firestore Security Rules Testing > strictly rejects unauthenticated client writes to course catalog and lesson steps`

#### Suite 2: `tests/functions-and-security.test.ts` (17 Tests Passed)
13. `Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > startTrial Single-Use & Atomic Concurrency > successfully provisions 7-day free trial on first call using real function export`
14. `Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > startTrial Single-Use & Atomic Concurrency > rejects a second startTrial invocation with failed-precondition`
15. `Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > startTrial Single-Use & Atomic Concurrency > guarantees atomic concurrency: concurrent startTrial calls allow only 1 success`
16. `Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > startTrial Single-Use & Atomic Concurrency > guards against overwriting active paid premium accounts`
17. `Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > startTrial Single-Use & Atomic Concurrency > strictly forbids client from resetting trialUsed in Firestore security rules`
18. `Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Trial Expiry Downgrade & Student Progress Preservation > downgrades expired trials to free while keeping 100% of student progress intact using real batch logic`
19. `Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Dodo Webhook HMAC Validation & Idempotency Locking > accepts valid HMAC signature and processes entitlement via real handler`
20. `Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Dodo Webhook HMAC Validation & Idempotency Locking > rejects invalid HMAC signature with HTTP 401`
21. `Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Dodo Webhook HMAC Validation & Idempotency Locking > rejects length-mismatched signature safely without throwing (timingSafeEqual guard)`
22. `Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Dodo Webhook HMAC Validation & Idempotency Locking > enforces atomic event idempotency: duplicate event IDs return already_processed`
23. `Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Dodo Webhook HMAC Validation & Idempotency Locking > handles refund event by downgrading user to free and marking entitlement refunded`
24. `Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Entitlement Temporal Expiration Verification > locks out student from reading paid steps once entitlement has expired`
25. `Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Cross-User Data Isolation > strictly forbids User A from reading or modifying User B progress or entitlements`
26. `Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Progress Write & Unauthenticated Step Access Rules > allows student to update their own lesson progress, but denies writing to entitlements`
27. `Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Progress Write & Unauthenticated Step Access Rules > strictly denies unauthenticated client writes to user progress or profiles`
28. `Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Progress Write & Unauthenticated Step Access Rules > allows unauthenticated read of Lesson 1 steps (free preview) but rejects Lesson 3 steps (paid)`
29. `Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Progress Write & Unauthenticated Step Access Rules > strictly rejects unauthenticated writes to course steps or catalog`

---

## 3. Security Architecture Verification

| Security Target | Core Invariant | Implementation Mechanism | Audit Status |
| :--- | :--- | :--- | :--- |
| **Guest Progress Isolation** | Guest learning data stored in client storage; 0 unauthorized Firestore writes | `ProgressStore.ts` (`loadLocalProgress`, `saveLocalProgress`) uses `localStorage`. `firestore.rules:208-241` requires `isOwner(userId)` (`request.auth != null && request.auth.uid == userId`) for all reads/writes. | **VERIFIED** |
| **Freemium Access Control** | Lessons 1 & 2 are free preview forever; Lesson 3+ denies unauth/free access | `firestore.rules:198-201` checks `isFreePreview == true` or `hasCourseAccess(courseId)`. `LessonPage.tsx:50,76,224-250` halts step rendering on `!hasAccess && !isFreePreviewLesson` and triggers `PaywallModal`. | **VERIFIED** |
| **Hint Tier Gating** | Tier 1 free; Tiers 2 & 3 gated for free users | `HintDrawer.tsx:39` intercepts advancement from Tier 1 when `!isPremiumOrTrial` and calls `onUpgradeClick`. Lines 180-202 omit locked hint copy from the DOM tree. | **VERIFIED** |
| **Trial Single-Use Enforcement** | `trialUsed` cannot be reset by client; server enforces single activation | `firestore.rules:214,218` forbids modifying `trialUsed` on `create` and `update`. `functions/src/index.ts:38-40` asserts `trialUsed == false` within a transaction. | **VERIFIED** |
| **Atomic Concurrency Defense** | Concurrent `startTrial` calls resolve safely with 1 success, 1 conflict rejection | `functions/src/index.ts:25-78` runs inside `firestoreDb.runTransaction()`. Firestore transaction conflict detection aborts duplicate concurrent activations. | **VERIFIED** |
| **Replay Defense & Idempotency** | Duplicate webhook payloads handled idempotently with zero duplicate side-effects | `functions/src/index.ts:190-220` executes atomic `eventRef.create()`. If document exists, caught and answered with HTTP 200 `{ status: 'already_processed' }`. | **VERIFIED** |
| **Webhook HMAC Security** | Signatures verified with constant-time equality and length validation | `functions/src/index.ts:171-183` enforces `sigBuffer.length === hmacBuffer.length` followed by `crypto.timingSafeEqual()`. Rejects corrupted/tampered payloads with HTTP 401. | **VERIFIED** |
| **Trial Expiry Downgrade** | Expired trials revert to free; 100% of student progress preserved | `firestore.rules:169,173` immediately locks out expired entitlement via `expiresAt > request.time`. `executeCleanupExpiredTrials` updates `plan: 'free'` and entitlement status to `'expired'`; `/progress` subcollection is completely preserved. | **VERIFIED** |

---

## 4. "Attempted to Break" Penetration Audit Log

During Iteration 2, the following 13 adversarial attack vectors and boundary cases were tested against the Firestore security rules and backend handlers:

```text
+---------------------------------------------------------------------------------------------------------------+
| #  | Attack Vector                       | Probe Action                      | Result          | Severity     |
+----+-------------------------------------+-----------------------------------+-----------------+--------------+
| 01 | Client self-resets trialUsed flag   | update({ trialUsed: false })      | PERMISSION_DENIED| PASS (SEC-01)|
| 02 | Client self-grants premium on create| set({ plan: 'premium' })          | PERMISSION_DENIED| PASS (SEC-02)|
| 03 | Client self-grants admin role       | update({ roles: ['admin'] })      | PERMISSION_DENIED| PASS (SEC-03)|
| 04 | Client direct writes to entitlements| entitlements.doc('dual').set(...) | PERMISSION_DENIED| PASS (SEC-04)|
| 05 | Free/Guest reads paid steps (L3)    | steps.doc('step-paid').get()      | PERMISSION_DENIED| PASS (SEC-05)|
| 06 | Reads paid step with expired trial  | get() where expiresAt < now       | PERMISSION_DENIED| PASS (SEC-06)|
| 07 | Forged HMAC webhook signature       | POST with bogus x-dodo-signature  | HTTP 401        | PASS (SEC-07)|
| 08 | Short / length-mismatched signature | POST with truncated signature     | HTTP 401        | PASS (SEC-08)|
| 09 | Webhook duplicate event replay      | Replay identical eventId payload  | already_processed| PASS (SEC-09)|
| 10 | Concurrent startTrial race probe    | Promise.all(2 simultaneous calls) | 1 OK, 1 Error   | PASS (SEC-10)|
| 11 | Overwrite active Premium with trial | executeStartFreeTrial on premium  | rejected (Error)| PASS (SEC-11)|
| 12 | User A reads/writes User B progress | Cross-user Firestore query        | PERMISSION_DENIED| PASS (SEC-12)|
| 13 | Unauthenticated write to progress   | Guest client Firestore set        | PERMISSION_DENIED| PASS (SEC-13)|
+---------------------------------------------------------------------------------------------------------------+
```

### Detailed Breakdown of Key Attack Probes:

1. **Trial Reuse Attack (Probe 01)**:
   - *Target*: Student attempts to bypass the 7-day limit by writing `{ trialUsed: false }` to their user profile.
   - *Defense*: `firestore.rules` line 217-219 evaluates `request.resource.data.diff(resource.data).affectedKeys().hasAny(['roles', 'isAdmin', 'userId', 'plan', 'trialUsed', ...])`.
   - *Outcome*: Denied at rule evaluation with `PERMISSION_DENIED`.

2. **Concurrency Double-Spend Race (Probe 10)**:
   - *Target*: Client fires two simultaneous `startTrial` RPCs to create dual overlapping trial periods or generate duplicate entitlement documents.
   - *Defense*: `functions/src/index.ts` lines 25-78 executes the entire check-and-set sequence inside `firestoreDb.runTransaction()`.
   - *Outcome*: Exactly 1 transaction successfully commits; the second encounters `userData.trialUsed === true` and throws `failed-precondition: You have already activated your 7-day free trial on this account.`

3. **Active Premium Overwrite Guard (Probe 11)**:
   - *Target*: A paying premium subscriber accidentally or maliciously invokes `startTrial`, potentially overriding their paid semester/annual entitlement.
   - *Defense*: Line 34-36 of `functions/src/index.ts`: `if (userData?.plan === 'premium') throw new Error('failed-precondition: Account already holds active Premium access.')`.
   - *Outcome*: Transaction halts immediately, preserving existing subscription state.

4. **DOM Extraction of Locked Hints (Probe DOM-01)**:
   - *Target*: Unauthenticated or free student inspects browser DOM elements looking for hidden CSS (`display: none`, `opacity: 0`) to read Tier 2 and Tier 3 hints.
   - *Defense*: In `packages/ui/src/components/HintDrawer/HintDrawer.tsx`, line 180-202 conditionally renders the hint text:
     ```tsx
     {isRevealed ? (
       <p className="text-sm font-body leading-relaxed">{hint}</p>
     ) : isLockedPremium ? (
       <div className="flex items-center justify-between text-xs py-1">
         ...
       </div>
     ) : ( ... )}
     ```
   - *Outcome*: When `!isRevealed && isLockedPremium`, the actual `{hint}` text string is completely absent from the React virtual DOM and output HTML.

---

## 5. Disposition of Open P2 Observations

All open observations from Iteration 1 have been audited and assigned formal written dispositions:

### 1. `SEC-P2-01`: Dynamic Module Free Preview Check in `LessonPage.tsx`
- **Location**: [`apps/web/src/pages/LessonPage.tsx:50`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/pages/LessonPage.tsx#L50)
- **Iteration 1 Observation**: `const isFreePreviewLesson = lessonId === '1' || lessonId === '2' || lessonId === 'mc-mod1-les1' || lessonId === 'mc-mod1-les2';` was statically mapped for Phase 3 Module 1.
- **Iteration 2 Written Disposition**: **TRACKED FOR PHASE 4 CURRICULUM EXPANSION**.
  - In Phase 3 (Vertical Slice A), only Course A Module 1 Lesson 1 is built and active, with Lesson 3 tested as paywalled. The static mapping is non-bypassable and secure.
  - In Phase 4, as multi-module navigation is introduced, this logic will be generalized to derive from lesson metadata (`lesson.orderIndexInModule <= 2` or `lesson.isFreePreview`). This is a planned scaling task and poses zero security risk to Phase 3.

### 2. `SEC-P2-02`: Production Secret Provisioning Runbook Requirement
- **Location**: [`functions/src/index.ts:157-161`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/functions/src/index.ts#L157-L161)
- **Iteration 1 Observation**: `processDodoWebhook` requires `DODO_WEBHOOK_SECRET` in production.
- **Iteration 2 Written Disposition**: **RESOLVED & OPERATIONALIZED**.
  - Verified that `functions/src/index.ts` enforces fail-closed behavior in `process.env.NODE_ENV === 'production'` (`res.status(500).send('Webhook signing secret not configured')`).
  - [`docs/deployment-runbook.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/deployment-runbook.md) explicitly documents provisioning the secret via `firebase functions:secrets:set DODO_WEBHOOK_SECRET` prior to any production deployment.

### 3. `SEC-P2-03`: Windows Host Emulator JVM Configuration Optimization
- **Location**: [`scripts/run-rules-tests.mjs:5`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/scripts/run-rules-tests.mjs#L5)
- **Iteration 1 Observation**: Windows hosts with committed memory constraints could encounter JVM commit memory failures.
- **Iteration 2 Written Disposition**: **CLOSED / VERIFIED RESOLVED**.
  - Setting `JAVA_TOOL_OPTIONS: '-XX:+UseSerialGC -Xmx256m -Xms32m'` resulted in completely stable emulator execution during `npm run test:rules`, completing in 19.66s without errors.

---

## 6. Final Verdict & Sign-Off

**VERDICT: PASS**

- **P0 Blockers**: **0**
- **P1 Critical Issues**: **0**
- **New P2 Issues**: **0**
- **Iteration 1 P2 Dispositions**: **All 3 Addressed / Operationalized**

The security architecture of Phase 3 (Vertical Slice A) on commit `e2a12749e8bcc43bc6ba839957853d81be1fe7c8` is robust, defensive, and fully compliant with all commercial gating, student privacy, and platform integrity requirements.
