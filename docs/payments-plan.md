# Payments & Monetization Plan: Commercial Strategy & Technical Integration (Phase 0 Amendment)

## 1. Executive Summary

This document specifies the commercial payment architecture, provider selection, billing mechanics, purchasing power parity (PPP) localization, and technical integration pipeline for the Pharmacy Education Platform.

The platform employs a **Merchant of Record (MoR)** model to eliminate tax complexity, enable frictionless international compliance (global VAT/sales taxes), and accept regional debit/credit cards across Turkey, North America, Europe, and the Middle East.

Following the Phase 0 Amendment:
- **Freemium Tier**: Permanent free access to the first 2 lessons of **every single module**, core widgets, and Tier 1 hints.
- **7-Day Free Trial of Full Premium**: Frictionless 1-click trial without upfront credit card requirements. Server-side auto-downgrade to Free on Day 8 with 100% student progress preserved. Trial activation is limited to once per account and strictly enforced server-side.
- **Materially Cheaper Paid Passes**: Substantially lowered pricing (Option A Recommended: $14/mo, $49/semester, $89/yr; Turkey PPP: ₺250/mo, ₺850/sem, ₺1,450/yr), reducing student financial friction while sustaining >93% gross margins.
- **Ethical Upgrade UX**: Transparent paywalls with zero dark patterns, no false countdowns, and equally weighted dismissal actions.

---

## 2. Payment Gateway Evaluation & Selection

### 2.1 Provider Comparison

| Evaluation Metric | Dodo Payments (Selected MoR) | Stripe (Standard Gateway) | Lemon Squeezy (MoR) |
| :--- | :--- | :--- | :--- |
| **Operating Model** | **Merchant of Record (MoR)** | Payment Processor | Merchant of Record (MoR) |
| **Global Tax & VAT Handling** | Fully automated across 100+ countries | Requires Stripe Tax setup & separate registrations | Fully automated |
| **Turkish Card Acceptance & 3D Secure** | Native support with high acceptance rates | Variable acceptance without local entity | Standard 3D Secure |
| **Transaction Fees** | **~3.5% + $0.30** | 2.9% + $0.30 (standard) + foreign fees | 5% + $0.50 |
| **Payout Methods** | Direct wire / local bank transfers globally | Local bank transfers | Stripe Connect / PayPal |
| **Developer API & Webhooks** | Modern REST API + Signed webhooks | Industry standard | REST API + Webhooks |
| **Licensing Justification** | Low overhead, MoR protections for early-stage | High administrative and tax compliance overhead | Higher transaction fee structure |

### 2.2 Decision Rationale: Why Dodo Payments?
1. **Tax Exemption & Liability Shift**: As a Merchant of Record, Dodo Payments is the legal reseller. They collect, report, and remit digital service sales taxes in all jurisdictions (including EU VAT and US state sales taxes), freeing the engineering team from international tax compliance.
2. **Turkish Student Conversion**: Traditional US Stripe accounts frequently fail Turkish bank debit cards without domestic BIN routing and 3D Secure. Dodo Payments provides high transaction approval rates for Turkish and Gulf banking networks.
3. **Competitive Pricing Structure**: At 3.5% + $0.30, transaction costs are less than half of typical enterprise MoR fees (which range from 7% to 9%).

---

## 3. Product Catalog & Pricing Architecture

All prices are established in accordance with the revised accessible pricing models documented in [`/docs/pricing-analysis.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/pricing-analysis.md).

### 3.1 Plan Tiers (Option A — Recommended Baseline)

#### Product 1: Course A (Medicinal Chemistry) — Single Course Pass
- **Monthly Recurring**: **$14.00 / month** (billed monthly, cancel anytime)
- **Semester Pass (6 Months, One-Time)**: **$49.00** ($8.17 / month effective — aligned with university semester duration, no auto-renew)
- **Annual Pass (12 Months Recurring)**: **$89.00 / year** ($7.42 / month effective — save 47% vs monthly)

#### Product 2: Course B (Pharmacology) — Single Course Pass
- **Monthly Recurring**: **$14.00 / month**
- **Semester Pass (6 Months, One-Time)**: **$49.00** ($8.17 / month effective)
- **Annual Pass (12 Months Recurring)**: **$89.00 / year** ($7.42 / month effective)

#### Product 3: Dual Course Bundle (All-Access Pass: MedChem + Pharmacology)
- **Monthly Recurring**: **$19.00 / month**
- **Semester Pass (6 Months, One-Time)**: **$69.00** ($11.50 / month effective)
- **Annual Pass (12 Months Recurring)**: **$129.00 / year** ($10.75 / month effective)

---

### 3.2 Regional Purchasing Power Parity (PPP) Matrix (Option A)

| Market | Currency | Single Monthly | Single Semester | Single Annual | Bundle Monthly | Bundle Semester | Bundle Annual |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Global / US (Baseline)** | `USD ($)` | $14.00 | $49.00 | $89.00 | $19.00 | $69.00 | $129.00 |
| **Turkey (Domestic)** | `TRY (₺)` | ₺250 | ₺850 | ₺1,450 | ₺350 | ₺1,150 | ₺2,100 |
| **Gulf / Saudi Arabia** | `SAR` | 55 SAR | 190 SAR | 340 SAR | 75 SAR | 265 SAR | 490 SAR |
| **European Union** | `EUR (€)` | €13 | €45 | €82 | €18 | €64 | €119 |

#### PPP Enforcement & Anti-Abuse Rules:
1. **IP Geolocation**: Client requests determine initial country via Cloudflare/Firebase request headers (`x-country-code`).
2. **Card BIN Country Match**: At checkout, the issuing country of the payment method is validated. Discrepancies between IP and billing card require step-up verification.
3. **No VPN Bypass**: If a user switches to a high-PPP currency after initial registration, their account is locked to their verified payment method country.

---

## 4. Freemium Funnel, 7-Day Trial & Conversion Lifecycle

### 4.1 Freemium Scope & Permanent Utility
1. **Scope**: Lessons 1 and 2 of **every module** across both Medicinal Chemistry and Pharmacology are permanently accessible without payment.
2. **No Upfront Hurdles**: Users sign in with standard email/Google authentication. No credit card required.
3. **Included Features**:
   - Step prompts and interactive exercises for Lessons 1 & 2 of all modules.
   - Core widgets (SMILES editor, PK compartment sliders, dose-response curves).
   - Tier 1 hints (conceptual orientation / gentle nudges).
4. **Gated Features**:
   - Lessons 3 through N in each module.
   - Tier 2 structural clues and Tier 3 full worked solutions.
   - Real-time Gemini AI misconception analysis and conversational diagnostic coaching.
   - Cross-device cloud progress synchronization (free tier stored locally in IndexedDB).
   - Course completion certificates and licensure board diagnostic sets.

---

### 4.2 7-Day Free Trial Architecture & Server-Side Enforcement

```
User App (Client)          Firebase Cloud Function           Firestore Database
      |                                |                                   |
      | 1. Click "Start Free Trial"    |                                   |
      |------------------------------->|                                   |
      |                                | 2. Verify Auth & trialUsed flag   |
      |                                |---------------------------------->|
      |                                |<----------------------------------|
      |                                |    doc.data().trialUsed == false  |
      |                                |                                   |
      |                                | 3. Atomic Transaction:            |
      |                                |    - user.trialUsed = true        |
      |                                |    - user.plan = "trial"          |
      |                                |    - user.trialStartedAt = now    |
      |                                |    - user.trialEndsAt = now + 7d  |
      |                                |    - entitlements: create "trial" |
      |                                |---------------------------------->|
      | 4. Snapshot Listener Updates   |<----------------------------------|
      |<-------------------------------|                                   |
      | 5. Immediate Full Unlock       |                                   |
      |                                |                                   |
      |                                | === DAY 8: AUTO-DOWNGRADE ===     |
      |                                | Scheduled Check OR On-Read Rule:  |
      |                                | now > trialEndsAt                 |
      |                                | -> Entitlement status = "expired" |
      |                                | -> user.plan = "free"             |
      | 6. Graceful Banner Displayed   | -> All Progress 100% Preserved!   |
      |<-------------------------------------------------------------------|
```

#### Server-Side Enforcement Details:
1. **Zero Client Authority**: The client cannot initiate or renew a trial by writing to Firestore. Firestore Security Rules forbid client creation or modification of `trialStartedAt`, `trialEndsAt`, `trialUsed`, or `/entitlements/{courseId}`.
2. **One-Time Account Guarantee**: The `startFreeTrial` Cloud Function verifies `trialUsed == false`. If `trialUsed == true`, the request is rejected with `PERMISSION_DENIED ("Free trial has already been used for this account")`.
3. **No Card Upfront**: The trial is provisioned entirely within Firebase without contacting Dodo Payments. No payment token or authorization hold is created.
4. **Day 8 Auto-Downgrade State Machine**:
   - At `trialEndsAt = trialStartedAt + 7 days`, access expires automatically.
   - Firestore security rules evaluate `request.time < entitlement.expiresAt`. Once `trialEndsAt` passes, rule evaluation immediately revokes access to Lessons 3+ and advanced hints.
   - A background Cloud Function (`cleanupExpiredTrials`) sweeps expired trials daily and updates `user.plan = "free"` and `entitlement.status = "expired"`.
   - **Student Progress Retained**: All lesson completions, XP, and spaced review records remain intact. The user is greeted on Day 8 with a non-intrusive notification: *"Your 7-day trial has finished. Your progress is completely safe. Continue on the Free plan or select an academic pass."*

---

### 4.3 Upgrade-Prompt UX Specification (Zero Dark Patterns)

1. **Trigger Locations**:
   - Free user attempts to access Lesson 3 of any module.
   - Free user requests Tier 2 or Tier 3 hints.
   - Free user clicks "Analyze Misconception with AI".
   - Free trial concludes on Day 8.
2. **Design Standards**:
   - **Equally Sized Dismissal**: The "Continue with Free" button has equal optical weight and hit area as the upgrade action.
   - **No Guilt Tripping**: No manipulative negative copy (e.g. *"I don't care about my career"*).
   - **Clear Pricing Breakdown**: Clearly display monthly vs semester vs annual prices with exact monthly equivalents.
   - **14-Day Money-Back Guarantee**: Clearly badge the 14-day guarantee for paid passes.

---

## 5. Technical Integration Architecture: Dodo Payments

```
User App (Client)          Firebase Functions         Dodo Payments API        Firestore DB
      |                            |                         |                      |
      | 1. createCheckoutSession   |                         |                      |
      |--------------------------->|                         |                      |
      |                            | 2. Create Checkout      |                      |
      |                            |------------------------>|                      |
      |                            |<------------------------|                      |
      |                            |  Returns Checkout URL   |                      |
      |<---------------------------|                         |                      |
      | 3. Redirect to Dodo Hosted |                         |                      |
      |    Checkout Page           |                         |                      |
      |                            |                         |                      |
      |                            |    4. Customer Pays     |                      |
      |                            |       & 3D Secure       |                      |
      |                            |                         |                      |
      |                            | 5. Webhook:             |                      |
      |                            |    payment.succeeded    |                      |
      |                            |<------------------------|                      |
      |                            |                         |                      |
      |                            | 6. Verify HMAC Sig      |                      |
      |                            | 7. Check Idempotency    |                      |
      |                            |    in /webhook_events   |                      |
      |                            | 8. Update Entitlement   |                      |
      |                            |----------------------------------------------->|
      |                            |                                                |
      | 9. Real-time Snapshot fires|                                                |
      |<----------------------------------------------------------------------------|
      | 10. Instant Unlock Feedback|                                                |
```

### 5.1 Cloud Functions Specifications

#### Function 1: `startFreeTrial`
- **Trigger**: `onCall` (HTTPS Callable)
- **Auth**: User must be authenticated (`request.auth.uid`).
- **Logic**:
  1. Transactionally read `/users/{uid}`.
  2. If `user.trialUsed === true`, throw `https.HttpsError('failed-precondition', 'Trial already redeemed')`.
  3. Set `user.trialUsed = true`, `user.plan = 'trial'`, `user.trialStartedAt = now`, `user.trialEndsAt = now + 7 days`.
  4. Write `/users/{uid}/entitlements/medchem` and `/users/{uid}/entitlements/pharmacology` with:
     ```json
     {
       "plan": "trial",
       "status": "active",
       "startedAt": "timestamp",
       "expiresAt": "timestamp (now + 7 days)",
       "entitlements": ["all_lessons", "ai_feedback", "tier2_3_hints", "cross_device_sync", "certificates"]
     }
     ```
  5. Return `{ success: true, trialEndsAt }`.

#### Function 2: `createCheckoutSession`
- **Trigger**: `onCall` (HTTPS Callable)
- **Input Parameters**:
  - `courseId`: `"medchem"` | `"pharmacology"` | `"dual_bundle"`
  - `planId`: `"single_monthly"` | `"single_semester"` | `"single_annual"` | `"bundle_monthly"` | `"bundle_semester"` | `"bundle_annual"`
  - `currency`: `"USD"` | `"TRY"` | `"SAR"` | `"EUR"`
- **Logic**:
  1. Validates auth.
  2. Resolves price and product IDs from `/courses/{courseId}/pricing.json`.
  3. Invocates Dodo Payments API to create checkout session.
  4. Returns checkout URL.

#### Function 3: `handleDodoWebhook`
- **Trigger**: `onRequest` (HTTP)
- **HMAC Verification**:
  ```typescript
  const signature = req.headers['x-dodo-signature'];
  const expectedSignature = crypto
    .createHmac('sha256', process.env.DODO_WEBHOOK_SECRET!)
    .update(req.rawBody)
    .digest('hex');

  if (signature !== expectedSignature) {
    res.status(401).send('Invalid signature');
    return;
  }
  ```
- **Idempotency**: Firestore transaction on `/webhook_events/{eventId}` ensures duplicate deliveries are acknowledged with 200 OK without re-provisioning.
- **Entitlement Provisioning**: Writes `/users/{uid}/entitlements/{courseId}` with `plan: "premium"`, `status: "active"`, and appropriate `expiresAt`.

---

## 6. Testing & Sandbox Verification Checklist

- [ ] **7-Day Trial Single Use**: Attempt second trial invocation via Admin SDK; assert rejection.
- [ ] **Day 8 Auto-Downgrade**: Advance clock past 7 days; verify Firestore rules block Lesson 3 reads and Tier 2/3 hints while preserving user progress documents.
- [ ] **Webhook Signature Verification**: Verify 401 response on invalid/missing HMAC signature.
- [ ] **Duplicate Webhook Delivery**: Dispatch identical `event_id` twice; assert single idempotent entitlement write.
- [ ] **PPP Localization Display**: Assert Turkish client receives `₺250/mo` and `₺850/sem` without currency mismatch.
- [ ] **Upgrade Flow**: Complete Lesson 2 -> View ethical modal -> Activate trial or complete Dodo checkout -> Verify real-time reactive unlock with zero full page reload.
