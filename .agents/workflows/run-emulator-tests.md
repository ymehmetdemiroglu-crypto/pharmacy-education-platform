# /run-emulator-tests Workflow

## Description
Executes the comprehensive Firestore security rules test matrix against the local Firebase emulator suite.

## Execution Steps
1. Verify emulator environment binaries:
   ```bash
   firebase --version
   ```
2. Start emulator in testing mode or execute test script:
   ```bash
   firebase emulators:exec --only firestore "vitest run tests/rules/firestore-rules.test.ts"
   ```
3. Test suite evaluates:
   - Unauthenticated requests blocked.
   - Cross-user reads/writes rejected.
   - Client writes to `/users/{uid}/entitlements/{courseId}` denied.
   - Access to free lessons granted to signed-in users.
   - Access to paid lessons granted only with active entitlement.
   - Progress schema validation rejects foreign fields and oversized payloads.
4. Output structured test report with passing/failing assertions.
