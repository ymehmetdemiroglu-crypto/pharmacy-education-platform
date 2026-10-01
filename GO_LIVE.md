# Production Go-Live Runbook: Dodo Payments & Firebase Backend

This runbook provides the exact, ordered checklist to transition the Pharmacy Education Platform from **TEST MODE** to **LIVE PRODUCTION**.

Thanks to the single-switch environment architecture (`config.ts`), **zero code changes** are required to go live. Transitioning to production only requires setting production environment variables and dashboard secrets.

---

## 1. Prerequisites & Merchant Approval
Before flipping the live switch:
- [ ] Dodo Payments merchant onboarding is approved.
- [ ] Verified public accessibility of legal compliance pages on your production domain:
  - Terms of Service: `https://<your-domain>/terms`
  - Privacy Policy (KVKK & GDPR compliant): `https://<your-domain>/privacy`
  - Refund Policy: `https://<your-domain>/refund`
- [ ] Firebase CLI is installed and logged in (`firebase login`).

---

## 2. Step 1: Create Live Products in Dodo Dashboard
1. Log in to the [Dodo Payments Dashboard](https://app.dodopayments.com) and switch to **Live Mode** in the top navigation.
2. Navigate to **Products** > **New Product**.
3. Create the 9 subscription and lifetime catalog products:

| Course | Plan Tier | Suggested Product Name | Billing Model |
|---|---|---|---|
| Pharmacology | Monthly | Pharmacology - Monthly Access | Recurring (1 Month) |
| Pharmacology | Annual | Pharmacology - Annual Access | Recurring (1 Year) |
| Pharmacology | Lifetime | Pharmacology - Lifetime Access | One-time Payment |
| Pharmacognosy | Monthly | Pharmacognosy - Monthly Access | Recurring (1 Month) |
| Pharmacognosy | Annual | Pharmacognosy - Annual Access | Recurring (1 Year) |
| Pharmacognosy | Lifetime | Pharmacognosy - Lifetime Access | One-time Payment |
| Dual Bundle | Monthly | Complete Pharmacy Mastery - Monthly | Recurring (1 Month) |
| Dual Bundle | Annual | Complete Pharmacy Mastery - Annual | Recurring (1 Year) |
| Dual Bundle | Lifetime | Complete Pharmacy Mastery - Lifetime | One-time Payment |

4. Configure localized currencies and PPP (Purchasing Power Parity) if desired (e.g. TRY, SAR, AED, USD, EUR).
5. Copy the generated `p_...` product IDs for Step 4.

---

## 3. Step 2: Register Live Webhook Endpoint in Dodo Dashboard
1. In the Dodo Dashboard (Live Mode), navigate to **Developers** > **Webhooks** > **Add Endpoint**.
2. Set **Endpoint URL**:
   ```
   https://<region>-<firebase-project-id>.cloudfunctions.net/dodoWebhook
   ```
   *(e.g., `https://us-central1-pharmacy-platform-prod.cloudfunctions.net/dodoWebhook`)*
3. Select **Events to Send** (Enable all 11 lifecycle events):
   - `payment.succeeded`
   - `payment.failed`
   - `subscription.active`
   - `subscription.renewed`
   - `subscription.past_due`
   - `subscription.on_hold`
   - `subscription.cancelled`
   - `subscription.plan_changed`
   - `subscription.expired`
   - `refund.succeeded`
   - `refund.failed`
4. Click **Save Endpoint**.
5. Copy the generated **Webhook Signing Secret** (starts with `whsec_`).

---

## 4. Step 3: Configure Cloud Functions Production Secrets
Using Firebase CLI and Google Cloud Secret Manager, set the live credentials securely.

> [!CAUTION]
> Never commit live API keys or webhook secrets to Git. Only store them in Google Cloud Secret Manager.

Run the following commands in PowerShell:

```powershell
# 1. Set the Live Dodo Payments API Key (starts with dodo_live_)
firebase functions:secrets:set DODO_PAYMENTS_API_KEY

# 2. Set the Live Webhook Secret (starts with whsec_)
firebase functions:secrets:set DODO_PAYMENTS_WEBHOOK_KEY
```

---

## 5. Step 4: Configure Production Environment Variables
Set the production environment variables in your Cloud Functions deployment configuration (or Firebase App Hosting / Cloud Functions environment):

```properties
# Flip environment switch to live
DODO_ENV=live

# Production Application Base URL
APP_URL=https://<your-production-domain>.com

# Live Dodo Product ID Mappings (from Step 1)
DODO_PROD_PHARM_MONTHLY=p_live_pharm_monthly_id
DODO_PROD_PHARM_ANNUAL=p_live_pharm_annual_id
DODO_PROD_PHARM_LIFETIME=p_live_pharm_lifetime_id

DODO_PROD_COG_MONTHLY=p_live_cog_monthly_id
DODO_PROD_COG_ANNUAL=p_live_cog_annual_id
DODO_PROD_COG_LIFETIME=p_live_cog_lifetime_id

DODO_PROD_BUNDLE_MONTHLY=p_live_bundle_monthly_id
DODO_PROD_BUNDLE_ANNUAL=p_live_bundle_annual_id
DODO_PROD_BUNDLE_LIFETIME=p_live_bundle_lifetime_id
```

---

## 6. Step 5: Deploy Functions & Security Rules
Deploy all backend services to your production Firebase project:

```powershell
# Switch to production project
firebase use production

# Build functions
cd functions
npm run build
cd ..

# Deploy Cloud Functions and Firestore Security Rules
firebase deploy --only functions,firestore:rules
```

---

## 7. Step 6: First Real-Card Smoke Test with Immediate Refund
Verify live billing end-to-end with a personal card, followed by an immediate refund:

1. **Sign Up**:
   Open a private/incognito browser window and sign up at `https://<your-production-domain>/signup` with a personal test email.
2. **Purchase**:
   Navigate to the Pricing page, select the monthly plan, and click **Upgrade**.
3. **Checkout**:
   Enter a real credit or debit card on the Dodo hosted checkout page and submit payment.
4. **Instant Verification**:
   - Verify browser redirects back to `https://<your-production-domain>/learn`.
   - Verify Lesson 3 (gated) is immediately unlocked and interactive.
   - Open Firebase Console > Firestore > `users/{your_uid}/entitlements/dual_bundle`:
     - `status`: `'active'`
     - `source`: `'dodo_payments'`
     - `currentPeriodEnd`: Timestamp 30 days ahead.
5. **Issue Immediate Refund**:
   - Open Dodo Payments Dashboard (Live Mode) > **Payments**.
   - Locate the transaction just completed.
   - Click **Refund** > Select **Full Refund** > Confirm.
6. **Verify Access Revocation**:
   - Within 5–10 seconds, inspect the Firestore entitlement document.
   - `status` updates to `'free'`.
   - In the browser, navigate to Lesson 3: the paywall modal promptly appears, confirming access is revoked.
   - Verify refund confirmation email from Dodo Payments.

---

## 8. Rollback Plan
If any unforeseen issue occurs during live operation:

### Instant Rollback (Zero Code Changes)
1. Switch `DODO_ENV` back to `test`:
   ```powershell
   # Update environment setting in Cloud Functions
   firebase functions:secrets:set DODO_ENV # or update in Google Cloud Console
   ```
2. Redeploy or restart functions:
   ```powershell
   firebase deploy --only functions
   ```

### Data Integrity Guarantee
- Entitlement checks derive access purely from Firestore `expiresAt` timestamps.
- Any legitimate users who purchased prior to rollback will **retain complete access** until their `currentPeriodEnd` timestamp naturally lapses, preventing customer service disruption.
