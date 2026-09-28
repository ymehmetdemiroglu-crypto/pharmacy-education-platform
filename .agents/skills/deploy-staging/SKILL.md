---
name: deploy-staging
description: Executes verified, safe staging deployments to Firebase Hosting and Cloud Functions after verifying billing safety, budgets, build outputs, and test passes.
---

# Deploy Staging Skill

## Purpose
Deploys web application assets and Cloud Functions to the staging environment cleanly, following automated pre-flight checks and strict cost controls.

## Pre-flight Checklist (Mandatory Gates)
1. **User Authorization Gate**: Staging project ID must be explicitly approved by user in writing.
2. **Budget Alert Verification**: Project must have an active GCP budget alert configured.
3. **Clean Build**: `pnpm build` completes with zero TypeScript or bundling errors.
4. **Linter & Source Check**: Content linter reports 0 missing source citations and 0 unverified publishable structures.
5. **Test Suite Green**:
   - `pnpm test` (all unit/widget tests pass)
   - `pnpm test:rules` (all Firestore security rules pass on emulator)
6. **No Dev Backdoors**: Ensure `grantDevEntitlement` function is omitted or strictly guarded by `NODE_ENV !== 'production' && STAGING_DEV_BYPASS === 'false'`.

## Deployment Command
```bash
firebase deploy --only hosting,functions,firestore:rules,firestore:indexes --project <staging-project-id>
```
Post-deployment: Run automated smoke test validating staging health endpoint and HTTPS response headers.
