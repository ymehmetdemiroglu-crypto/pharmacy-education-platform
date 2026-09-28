---
name: firebase-rules-testing
description: Develops, verifies, and executes automated Firestore security rules tests against the local Firebase emulator using @firebase/rules-unit-testing.
---

# Firebase Rules Testing Skill

## Purpose
Ensures that all data security boundaries, user data isolation, and paywall access controls in `firestore.rules` are 100% verified by automated test suites before deploying anywhere.

## Security Rules Matrix to Test
1. **Unauthenticated Access Denial**: Block all reads and writes across private user and lesson documents if `request.auth == null`.
2. **Cross-User Data Isolation**: User A cannot read or write `/users/{userB}/**`.
3. **Entitlement Tamper Resistance**: All client writes to `/users/{uid}/entitlements/{courseId}` MUST be rejected (server/admin SDK writes only).
4. **Free Lesson Access**: Any authenticated user can read `/courses/{courseId}/lessons/{lessonId}` where `resource.data.access == 'free'`.
5. **Paid Lesson Paywall**:
   - Denied if user has no entitlement doc.
   - Denied if user entitlement status is `expired` or `refunded`.
   - Allowed if user has active entitlement record (`status == 'active'` and `expiresAt > request.time`).
6. **Progress Payload Validation**:
   - Deny writes containing unexpected fields (`hasOnly(...)`).
   - Deny writes where data types or sizes exceed defined thresholds.

## Testing Execution
Run automated tests with:
```bash
pnpm test:rules
```
Rules test files live in `tests/rules/firestore-rules.test.ts`.
