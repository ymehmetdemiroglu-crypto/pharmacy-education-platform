# Deployment Runbook & Cloud Operations Guide

## 1. Environment Architecture

The platform operates across three isolated environments:
1. **Local Emulator Suite (Default Development)**: Local Firestore, Auth, and Functions emulators running locally. Zero cloud costs, instant reset.
2. **Staging Environment**: Dedicated Firebase project for pre-production verification, testing preview channels, and verifying security rules in a live cloud setting.
3. **Production Environment**: High-availability, production-grade Firebase/GCP instance. Deployed only upon explicit human approval.

---

## 2. Cost Safety Controls & Budget Limits (Rule 9)

- **Mandatory User Confirmation Gate**: Never run `firebase use <project>`, `firebase deploy`, or `gcloud billing` commands on any billable project without explicit written user signoff.
- **Dedicated Staging Isolation**: As decided at the Phase 1 Stop Gate, legacy project `scientific-coil-24dh4` MUST NOT be reused. A dedicated staging project (e.g. `pharmacy-platform-staging`) is created with an isolated budget alert.
- **Budget Alerts**: Every staging/production project MUST have a Cloud Billing Budget Alert configured at **$25/month** with 50%, 80%, and 100% notification thresholds dispatched to the user.
- **Free Tier Utilization**: Development and feature testing are confined strictly to the local emulator suite. No cloud resources are touched during routine coding.

---

## 3. Dedicated Staging Project Setup Protocol (Step-by-Step CLI Commands)

> [!CAUTION] **GATED BILLING STEPS (USER ONLY)**
> Subagents and autonomous processes are strictly forbidden from running billing link commands autonomously. Steps marked `[USER ACTION]` must be run directly by the user or executed only after the user explicitly types the billing account ID.

### Step 1: Create Dedicated Google Cloud Project (Agent / User)
```bash
# Bash:
export STAGING_PROJECT_ID="pharmacy-platform-staging"
export STAGING_PROJECT_NAME="Pharmacy Platform Staging"
gcloud projects create ${STAGING_PROJECT_ID} --name="${STAGING_PROJECT_NAME}"
```
```powershell
# Windows PowerShell:
$STAGING_PROJECT_ID = "pharmacy-platform-staging"
$STAGING_PROJECT_NAME = "Pharmacy Platform Staging"
gcloud projects create $STAGING_PROJECT_ID --name="$STAGING_PROJECT_NAME"
```

### Step 2: Identify Billing Account & Link Project [USER ACTION — GATED]
```bash
# List available billing accounts to obtain your BILLING_ACCOUNT_ID
gcloud billing accounts list

# Link billing account to staging project (USER MUST EXECUTE THIS COMMAND DIRECTLY):
# Example: gcloud billing projects link pharmacy-platform-staging --billing-account=012345-6789AB-CDEF01
gcloud billing projects link ${STAGING_PROJECT_ID} --billing-account=YOUR_BILLING_ACCOUNT_ID
```
```powershell
# Windows PowerShell:
gcloud billing projects link $STAGING_PROJECT_ID --billing-account=YOUR_BILLING_ACCOUNT_ID
```

### Step 3: Create $25/mo Cloud Billing Budget Alert [USER / AGENT UPON CONFIRMATION]
```bash
# Bash:
gcloud billing budgets create \
  --billing-account=YOUR_BILLING_ACCOUNT_ID \
  --display-name="Pharmacy Platform Staging Budget Safety Alert" \
  --budget-amount=25.00USD \
  --threshold-rule=percent=0.50,basis=current-spend \
  --threshold-rule=percent=0.80,basis=current-spend \
  --threshold-rule=percent=1.00,basis=current-spend \
  --filter-projects="projects/${STAGING_PROJECT_ID}"
```
```powershell
# Windows PowerShell:
gcloud billing budgets create `
  --billing-account="YOUR_BILLING_ACCOUNT_ID" `
  --display-name="Pharmacy Platform Staging Budget Safety Alert" `
  --budget-amount="25.00USD" `
  --threshold-rule="percent=0.50,basis=current-spend" `
  --threshold-rule="percent=0.80,basis=current-spend" `
  --threshold-rule="percent=1.00,basis=current-spend" `
  --filter-projects="projects/$STAGING_PROJECT_ID"
```

### Step 4: Enable Required Google Cloud & Firebase APIs
```bash
gcloud services enable \
  firebase.googleapis.com \
  firestore.googleapis.com \
  cloudfunctions.googleapis.com \
  secretmanager.googleapis.com \
  cloudbuild.googleapis.com \
  identitytoolkit.googleapis.com \
  --project=${STAGING_PROJECT_ID}
```

### Step 5: Provision Firebase in the GCP Project
```bash
# Add Firebase services to the GCP project
firebase projects:addfirebase ${STAGING_PROJECT_ID}
```

### Step 6: Create Cloud Firestore Database (Native Mode)
```bash
# Provision Firestore in europe-west1 (Frankfurt) or europe-west3 (Frankfurt/Belgium)
gcloud firestore databases create \
  --project=${STAGING_PROJECT_ID} \
  --location=europe-west1 \
  --type=firestore-native
```

### Step 7: Configure Local CLI Alias in `.firebaserc`
```bash
# Associate staging alias with the newly created project
firebase use --add ${STAGING_PROJECT_ID} --alias staging

# Verify active project alias
firebase use
```

## 4. Local Emulator Verification Workflow

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

## 5. Staging Deployment Pipeline

### 5.1 Pre-Flight Gate Verification
- [ ] Explicit user confirmation of target staging project ID.
- [ ] Active budget alert verified in Google Cloud Console.
- [ ] `pnpm test` passed (100% green).
- [ ] `pnpm test:rules` passed against emulator.
- [ ] `pnpm lint:content` reported 0 missing sources and 0 unverified structures.
- [ ] `pnpm build` completed with zero warnings.

### 5.2 Staging Deployment Commands
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

### 5.3 Staging Smoke Test Verification
1. Access the deployed staging URL (`https://<staging-project>.web.app`).
2. Verify HTTP response headers:
   - `Content-Security-Policy`
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
3. Verify public course catalog loads without authentication.
4. Verify clicking a paid lesson triggers the Paywall Card with access restrictions enforced.

---

## 6. Rollback & Incident Response

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
