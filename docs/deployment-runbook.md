# Deployment Runbook & Cloud Operations Guide

## 1. Environment Architecture

The platform operates across three isolated environments:
1. **Local Emulator Suite (Default Development)**: Local Firestore, Auth, and Functions emulators running locally. Zero cloud costs, instant reset.
2. **Staging Environment**: Dedicated Firebase project for pre-production verification, testing preview channels, and verifying security rules in a live cloud setting.
3. **Production Environment**: High-availability, production-grade Firebase/GCP instance. Deployed only upon explicit human approval.

---

## 2. Cost Safety Controls & Budget Limits (Rule 9)

- **Mandatory User Confirmation Gate**: Never run `firebase use <project>`, `firebase deploy`, or `gcloud billing` commands on any billable project without explicit written user signoff.
- **Budget Alerts**: Every staging/production project MUST have a Cloud Billing Budget Alert configured (e.g., threshold set at $25/month with notifications dispatched to user email).
- **Free Tier Utilization**: Development and feature testing are confined strictly to the local emulator suite.

---

## 3. Local Emulator Verification Workflow

```bash
# 1. Install dependencies
pnpm install

# 2. Build local packages and apps
pnpm build

# 3. Start Firebase emulators (Auth on 9099, Firestore on 8080, Functions on 5001, UI on 4000)
pnpm emulators:start

# 4. In a separate terminal, run automated rules tests
pnpm test:rules

# 5. Run content validation linter
pnpm lint:content
```

---

## 4. Staging Deployment Pipeline

### 4.1 Pre-Flight Gate Verification
- [ ] Explicit user confirmation of target staging project ID.
- [ ] Active budget alert verified in Google Cloud Console.
- [ ] `pnpm test` passed (100% green).
- [ ] `pnpm test:rules` passed against emulator.
- [ ] `pnpm lint:content` reported 0 missing sources and 0 unverified structures.
- [ ] `pnpm build` completed with zero warnings.

### 4.2 Staging Deployment Commands
```bash
# Switch to staging project alias
firebase use staging

# Deploy security rules and indexes first
firebase deploy --only firestore:rules,firestore:indexes

# Deploy Cloud Functions
firebase deploy --only functions

# Deploy static web assets to Hosting
firebase deploy --only hosting

# Run seed script to populate course catalog and sample free lessons
pnpm emulators:seed --env=staging
```

### 4.3 Staging Smoke Test Verification
1. Access the deployed staging URL (`https://<staging-project>.web.app`).
2. Verify HTTP response headers:
   - `Content-Security-Policy`
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
3. Verify public course catalog loads without authentication.
4. Verify clicking a paid lesson triggers the Paywall Card with access restrictions enforced.

---

## 5. Rollback & Incident Response

### 5.1 Immediate Rollback
If a defect is identified post-deployment:
```bash
# Roll back Hosting release to previous healthy version
firebase hosting:rollback --project staging

# Redeploy previous verified commit tag
git checkout tags/<last-known-good-tag>
pnpm build && firebase deploy --only hosting,functions
```

### 5.2 Incident Triage Protocol
1. **Security Vulnerability / Rule Bypass**: Immediately deploy restrictive emergency ruleset (`allow read, write: if false;`) to lock compromised collections while investigating.
2. **Billing Spike**: Immediately disable billable Cloud Functions via Cloud Console or scale max instances to 0:
   ```bash
   gcloud functions deploy <function-name> --max-instances=0
   ```
3. **Data Corruption**: Restore Firestore from the latest automated export.
