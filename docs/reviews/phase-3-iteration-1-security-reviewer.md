# Independent Review Report — Security Reviewer
**Phase**: Phase 3: Vertical Slice A (Medicinal Chemistry Module 1, Lesson 1)  
**Iteration**: 1  
**Reviewer Role**: Security Reviewer (Independent Fresh Context Instance)  
**Date**: 2026-09-28  
**Verdict**: **PASS (0 P0 Blockers, 0 P1 Criticals, 3 P2 Minor Observations)**

---

## 1. Executive Summary

As the independent Security Reviewer for Phase 3 (Vertical Slice A), an exhaustive defensive security audit and adversarial penetration test was conducted. The review evaluated:
1. **Cloud Firestore Security Rules & Test Suite**: [`firestore.rules`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/firestore.rules) and [`tests/firestore-rules.test.ts`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/tests/firestore-rules.test.ts).
2. **Backend Functions & Security Test Suite**: [`tests/functions-and-security.test.ts`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/tests/functions-and-security.test.ts).
3. **Course Access Control**: [`packages/platform/src/access/AccessControl.ts`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/platform/src/access/AccessControl.ts).
4. **Freemium & Hint Gating in Client Application**: [`apps/web/src/pages/LessonPage.tsx`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/pages/LessonPage.tsx) and [`packages/ui/src/components/HintDrawer/HintDrawer.tsx`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/ui/src/components/HintDrawer/HintDrawer.tsx).
5. **Cloud Functions Security Architecture**: [`functions/src/index.ts`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/functions/src/index.ts) (`startFreeTrial`, `createCheckoutSession`, `handleDodoWebhook`, `cleanupExpiredTrials`).

### Core Audit Outcomes
- **Unauthenticated Guest Isolation**: Fully compliant. Guest progress and spaced repetition flashcards are stored purely in client `localStorage`. Zero unauthenticated read/write access to `/users/{userId}` is permitted by Firestore rules (`isOwner` strictly checks `request.auth != null`).
- **Freemium Step Gating**: Fully compliant. Lessons 1 & 2 are permanently free preview. Accessing Lesson 3 (`/courses/medchem/lessons/3`) unconditionally halts step rendering and mounts the `PaywallModal` for free/unauthenticated users. In Firestore, `/courses/{courseId}/lessons/{lessonId}/steps/{stepId}` strictly denies read access without active entitlement.
- **Hint Tier Gating**: Fully compliant. Tier 1 is free to all users. Tiers 2 & 3 are strictly gated behind `isPremiumOrTrial`. The client UI disables progression beyond Tier 1 and does not expose locked hint text in the DOM.
- **Single-Use Free Trial Enforcement**: Fully compliant. In Firestore security rules, client updates to `trialUsed` are rejected via `affectedKeys()`. In Cloud Functions, `startFreeTrial` executes inside an atomic transaction enforcing `trialUsed == false`, preventing concurrency races and protecting active premium accounts from accidental downgrade.
- **Expired Trial Downgrade**: Fully compliant. `cleanupExpiredTrials` safely downgrades expired accounts to `plan: 'free'` while 100% preserving user lesson progress and review history.
- **Webhook HMAC & Idempotency**: Fully compliant. Timing-safe comparison (`crypto.timingSafeEqual`) with length guard, mandatory signature validation, fail-closed production secret enforcement, and atomic `eventRef.create` idempotency locking are all in place.

---

## 2. Verification Matrix vs Security Requirements

| Audit Target | Security Control | Verified Implementation | Status |
| :--- | :--- | :--- | :--- |
| **Guest Progress Isolation** | Zero unauthorized Firestore writes; client storage for guests | `ProgressStore.ts` & `AuthContext.tsx` store progress in `localStorage`; `firestore.rules` lines 208–241 enforce `isOwner(userId)` (`request.auth != null && request.auth.uid == userId`) | **VERIFIED** |
| **Freemium Gating** | Lessons 1 & 2 free forever; Lesson 3+ gated | `firestore.rules` lines 198–201 allow read on `isFreePreview == true` or `hasCourseAccess(courseId)`. `LessonPage.tsx` lines 50, 76, 201 strictly block Lesson 3+ rendering and trigger `PaywallModal` | **VERIFIED** |
| **Hint Tier Gating** | Tier 1 free; Tiers 2 & 3 gated for free tier | `HintDrawer.tsx` line 29 blocks `unlockedTier === 1` advancement if `!isPremiumOrTrial`, triggers `onUpgradeClick`. Locked hint copy is omitted from DOM | **VERIFIED** |
| **Trial Single-Use Enforcement** | `trialUsed` cannot be reset by client; server transaction | `firestore.rules` line 214 & 218 blacklist `trialUsed` from client `create` and `update`. `functions/src/index.ts` lines 45–50 enforce atomic precondition | **VERIFIED** |
| **Expired Trial Downgrade** | Graceful downgrade to free; 100% student progress preserved | `functions/src/index.ts` lines 257–288 updates user `plan: 'free'` and sets entitlement `status: 'expired'`, preserving `/progress` subcollection intact | **VERIFIED** |
| **Webhook HMAC & Replay Defense** | Timing-safe comparison, length guard, atomic idempotency | `functions/src/index.ts` lines 145–163 uses `crypto.timingSafeEqual` with buffer length check. Lines 170–183 use `eventRef.create()` for atomic duplicate locking | **VERIFIED** |
| **Entitlement Access Check** | Temporal check (`expiresAt > request.time`) | `firestore.rules` lines 164–176 check `exists()`, `status == 'active'`, and `expiresAt > request.time` for `courseId` or `dual_bundle` | **VERIFIED** |
| **Client Document Flooding Defense** | Prevent Firestore document size limit exhaustion | `firestore.rules` line 233 enforces `completedLessonIds is list && size() < 500` | **VERIFIED** |

---

## 3. "Attempted to Break" Red-Team Penetration Log

During this review iteration, the following adversarial test cases were evaluated directly against the codebase and the local Firebase emulator environment:

### Attack Vector 1: Client attempts to self-reset `trialUsed` to re-activate free trial
- **Mechanism**: Authenticated student sends Firestore update payload: `db.collection('users').doc(uid).update({ trialUsed: false })`.
- **Defense Tested**: `firestore.rules` line 217–219:
  `!request.resource.data.diff(resource.data).affectedKeys().hasAny(['roles', 'isAdmin', 'userId', 'plan', 'trialUsed', ...])`.
- **Result**: **BLOCKED (PERMISSION_DENIED)**. Verified in `tests/firestore-rules.test.ts` ("prevents user from modifying sensitive profile fields") and `tests/functions-and-security.test.ts` ("strictly forbids client from resetting trialUsed").

### Attack Vector 2: Client self-provisions `plan: 'premium'` during document creation
- **Mechanism**: Attacker sends document create request with payload `{ userId: uid, plan: 'premium', roles: ['admin'] }`.
- **Defense Tested**: `firestore.rules` line 212–214:
  `!request.resource.data.keys().hasAny(['roles', 'isAdmin', 'plan', 'trialUsed', ...])`.
- **Result**: **BLOCKED (PERMISSION_DENIED)**. Verified in `tests/firestore-rules.test.ts` ("forbids client from self-creating a profile with sensitive fields").

### Attack Vector 3: Client writes directly to `/users/{userId}/entitlements`
- **Mechanism**: Student attempts to grant themselves lifetime access via `db.collection('users').doc(uid).collection('entitlements').doc('dual_bundle').set({ status: 'active', ... })`.
- **Defense Tested**: `firestore.rules` line 225: `allow write: if false;`.
- **Result**: **BLOCKED (PERMISSION_DENIED)**. Verified in `tests/firestore-rules.test.ts` ("strictly forbids client writes to entitlements subcollection").

### Attack Vector 4: Unauthenticated or free student attempts to read paid step data
- **Mechanism**: Direct query to `/courses/medchem/lessons/mc-les-03/steps/step-paid`.
- **Defense Tested**: `firestore.rules` lines 198–201: `allow read: if resource.data.get('isFreePreview', false) == true || ... || hasCourseAccess(courseId);`.
- **Result**: **BLOCKED (PERMISSION_DENIED)**. Both unauthenticated and free authenticated users fail `hasCourseAccess`. Verified in `tests/firestore-rules.test.ts`.

### Attack Vector 5: Accessing paid steps using an expired entitlement
- **Mechanism**: Student with an entitlement whose `expiresAt` is in the past attempts to read paid step.
- **Defense Tested**: `firestore.rules` line 169 & 173: `...data.expiresAt > request.time`.
- **Result**: **BLOCKED (PERMISSION_DENIED)**. Verified in `tests/firestore-rules.test.ts` ("denies access to paid steps when entitlement has expired in the past").

### Attack Vector 6: Forged or missing Webhook HMAC signature
- **Mechanism**: Sending webhook payload without `x-dodo-signature` or with an invalid signature string.
- **Defense Tested**: `functions/src/index.ts` lines 145–163:
  1. Missing header returns 401.
  2. Length check `sigBuffer.length !== hmacBuffer.length` returns 401.
  3. Constant-time comparison `crypto.timingSafeEqual(sigBuffer, hmacBuffer)` returns 401 on mismatch.
- **Result**: **BLOCKED (HTTP 401)**. Verified in `tests/functions-and-security.test.ts` ("rejects invalid HMAC signature with HTTP 401" & "rejects length-mismatched signature safely without throwing").

### Attack Vector 7: Webhook replay attack (duplicate event delivery)
- **Mechanism**: Adversary replays identical webhook payload `evt_duplicate_idempotent_01`.
- **Defense Tested**: `functions/src/index.ts` lines 170–183: `await eventRef.create(...)`. In Firestore, `create()` fails atomically if the document ID already exists.
- **Result**: **SAFELY HANDLED**. Second invocation caught by exception handler, responds `{ received: true, status: 'already_processed' }` with zero duplicate mutations. Verified in `tests/functions-and-security.test.ts`.

### Attack Vector 8: Concurrent `startFreeTrial` race condition
- **Mechanism**: Client fires two simultaneous `startFreeTrial` calls to exploit latency windows.
- **Defense Tested**: `functions/src/index.ts` line 29: `db.runTransaction(...)`. Firestore transactions maintain serializable isolation.
- **Result**: **DEFENDED**. Exactly 1 transaction commits; the concurrent transaction encounters `userData.trialUsed === true` and is rejected with `failed-precondition`. Verified in `tests/functions-and-security.test.ts`.

### Attack Vector 9: DOM inspection of locked Tier 2 & Tier 3 hints
- **Mechanism**: Free student inspects browser DOM elements hoping hidden hint text is rendered with CSS `display: none` or opacity 0.
- **Defense Tested**: `HintDrawer.tsx` lines 123–143. When `isLockedPremium` is true and `!isRevealed`, the actual `{hint}` string is completely omitted from the React virtual DOM tree and rendered output.
- **Result**: **DEFENDED**. Zero secret leakage in client DOM tree.

### Attack Vector 10: Client array explosion / storage denial of service
- **Mechanism**: User sends an array with 1,000 entries in `completedLessonIds`.
- **Defense Tested**: `firestore.rules` line 233: `request.resource.data.completedLessonIds.size() < 500`.
- **Result**: **BLOCKED (PERMISSION_DENIED)**.

---

## 4. Test Execution Output (Rule E3 Compliance)

Below is the verbatim terminal output from running the Firestore rules and security test suite against the local Firebase emulator via `npm run test:rules`:

```text
> pharmacy-education-platform@0.1.0 test:rules
> node scripts/run-rules-tests.mjs

!  emulators: You are not currently authenticated so some features may not work correctly. Please run firebase login to authenticate the CLI.
i  emulators: Starting emulators: firestore
i  firestore: Firestore Emulator logging to firestore-debug.log
+  firestore: Firestore Emulator UI websocket is running on 9150.
i  Running script: vitest run -c vitest.rules.config.ts

 RUN  v3.2.7 C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup

 ✓ tests/functions-and-security.test.ts (12 tests) 10018ms
   ✓ Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > startTrial Single-Use & Atomic Concurrency > successfully provisions 7-day free trial on first call  3228ms
   ✓ Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > startTrial Single-Use & Atomic Concurrency > rejects a second startTrial invocation with failed-precondition  5ms
   ✓ Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > startTrial Single-Use & Atomic Concurrency > guarantees atomic concurrency: concurrent startTrial calls allow only 1 success  1085ms
   ✓ Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > startTrial Single-Use & Atomic Concurrency > strictly forbids client from resetting trialUsed in Firestore security rules  488ms
   ✓ Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Trial Expiry Downgrade & Student Progress Preservation > downgrades expired trials to free while keeping 100% of student progress intact  420ms
   ✓ Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Dodo Webhook HMAC Validation & Idempotency Locking > accepts valid HMAC signature and processes entitlement  15ms
   ✓ Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Dodo Webhook HMAC Validation & Idempotency Locking > rejects invalid HMAC signature with HTTP 401  5ms
   ✓ Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Dodo Webhook HMAC Validation & Idempotency Locking > rejects length-mismatched signature safely without throwing  4ms
   ✓ Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Dodo Webhook HMAC Validation & Idempotency Locking > enforces atomic event idempotency: duplicate event IDs return already_processed  120ms
   ✓ Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Entitlement Temporal Expiration Verification > locks out student from reading paid steps once entitlement has expired  320ms
   ✓ Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Cross-User Data Isolation > strictly forbids User A from reading or modifying User B progress or entitlements  650ms
   ✓ Cloud Functions & Backend Entitlement Security Tests (A4 Suite) > Progress Write Isolation > allows student to update their own lesson progress, but denies writing to entitlements  480ms
 ✓ tests/firestore-rules.test.ts (9 tests) 10397ms
   ✓ Firestore Security Rules Testing > allows public unauthenticated read of courses, modules, and lessons  4284ms
   ✓ Firestore Security Rules Testing > allows unauthenticated read of free preview steps (Lessons 1 & 2)  430ms
   ✓ Firestore Security Rules Testing > denies unauthenticated and free tier read of paid steps (Lesson 3+)  380ms
   ✓ Firestore Security Rules Testing > allows access to paid steps when student has active, unexpired entitlement  360ms
   ✓ Firestore Security Rules Testing > strictly forbids client writes to entitlements subcollection  310ms
   ✓ Firestore Security Rules Testing > prevents user from modifying sensitive profile fields (plan, trialUsed, roles)  520ms
   ✓ Firestore Security Rules Testing > denies access to paid steps when entitlement has expired in the past  310ms
   ✓ Firestore Security Rules Testing > forbids client from self-creating a profile with sensitive fields (roles, plan, trialUsed)  490ms
   ✓ Firestore Security Rules Testing > allows access to paid steps when user has an active dual_bundle entitlement  350ms

 Test Files  2 passed (2)
      Tests  21 passed (21)
   Start at  22:05:14
   Duration  12.64s (transform 199ms, setup 0ms, collect 2.40s, tests 20.42s, environment 1ms, prepare 560ms)

+  Script exited successfully (code 0)
i  emulators: Shutting down emulators.
i  firestore: Stopping Firestore Emulator
!  Firestore Emulator has exited upon receiving signal: SIGINT
i  logging: Stopping Logging Emulator
```

In addition, running `pnpm -r --workspace-concurrency=1 run test` across workspace packages executed 76 unit tests with 100% pass rate:
- `@pharmacy/platform`: 4 test files, 30 tests passed (`AccessControl.test.ts`, `ProgressStore.test.ts`, `LeitnerEngine.test.ts`, `lesson01.test.ts`).
- `@pharmacy/ui`: 14 test files, 27 tests passed (`HintDrawer.test.tsx`, `PaywallModal.test.tsx`, etc.).
- `@pharmacy/widgets`: 9 test files, 19 tests passed (`SarExplorer.test.tsx`, `PkSimulator.test.tsx`, etc.).

---

## 5. Security Findings & Recommendations

### P0 Issues (Blockers)
**None**. All access controls, rule barriers, and backend security validations operate as specified.

### P1 Issues (Critical)
**None**. No critical vulnerabilities or entitlement leakages exist in Phase 3.

### P2 Issues (Minor Observations & Hardening Suggestions)

#### [P2-01] Dynamic Module Free Preview Check in `LessonPage.tsx`
- **Location**: [`apps/web/src/pages/LessonPage.tsx:50`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/apps/web/src/pages/LessonPage.tsx#L50)
- **Finding**: The client currently determines free preview status via:
  ```typescript
  const isFreePreviewLesson = lessonId === '1' || lessonId === '2' || lessonId === 'mc-mod1-les1' || lessonId === 'mc-mod1-les2';
  ```
- **Context**: For Phase 3 (which only implements Module 1 Lesson 1 and tests Lesson 3 as paywalled), this is effective and safe. However, as the curriculum expands to multiple modules in Phase 4+, this check should dynamically inspect lesson metadata (e.g., `lesson.orderIndexInModule <= 2` or `lesson.isFreePreview`) to automatically handle all modules uniformly.
- **Action**: Add an enhancement ticket for Phase 4 to derive `isFreePreview` from lesson schema attributes.

#### [P2-02] Production Secret Provisioning Runbook Reminder
- **Location**: [`functions/src/index.ts:135-143`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/functions/src/index.ts#L135-L143)
- **Finding**: In production mode (`process.env.NODE_ENV === 'production'`), `handleDodoWebhook` correctly fails closed (HTTP 500) if `DODO_WEBHOOK_SECRET` is unset. In local development/emulator mode, it defaults to a local test secret.
- **Action**: Ensure the deployment runbook ([`docs/deployment-runbook.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/deployment-runbook.md)) explicitly highlights running `firebase functions:secrets:set DODO_WEBHOOK_SECRET` before any production release.

#### [P2-03] Windows Host Emulator JVM Configuration Optimization
- **Location**: [`scripts/run-rules-tests.mjs:5`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/scripts/run-rules-tests.mjs#L5)
- **Finding**: On Windows developer workstations with constrained paging/commit memory limits, default G1 GC can fail during `commit_memory` when allocating 64MB address blocks.
- **Action Taken**: Configured `JAVA_TOOL_OPTIONS: '-XX:+UseSerialGC -Xmx256m -Xms32m'`, ensuring rock-solid test execution across all Windows and POSIX host configurations.

---

## 6. Final Verdict

**VERDICT: PASS**

The Phase 3 Vertical Slice A implementation satisfies all security criteria mandated by the architecture and quality protocols:
1. Client and Firestore rules guarantee strict unauthenticated guest isolation with 0 unauthorized Firestore writes.
2. Freemium gating correctly permits Lessons 1 & 2 while strictly denying access to Lesson 3 and rendering the `PaywallModal`.
3. Hint tier gating gives free access to Tier 1 while strictly gating Tiers 2 & 3 behind premium/trial without leaking copy into the DOM.
4. Server-enforced single-use trial rules prevent client resets and avoid race hazards.
5. Expired trial downgrades run safely and preserve 100% of student progress.
6. Webhook HMAC validation uses timing-safe equality, handles length mismatches cleanly, and prevents replay attacks through atomic idempotency locking.
7. All 21 Firestore security rules and backend functions tests pass cleanly.

Phase 3 Vertical Slice A is **APPROVED** from a security perspective.
