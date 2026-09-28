# Payments & Monetization Plan: Commercial Strategy & Technical Integration

## 1. Executive Summary

This document specifies the commercial payment architecture, provider selection, billing mechanics, purchasing power parity (PPP) localization, and technical integration pipeline for the Pharmacy Education Platform.

The platform employs a **Merchant of Record (MoR)** model to eliminate tax complexity, enable frictionless international compliance (global VAT/sales taxes), and accept regional debit/credit cards across Turkey, North America, Europe, and the Middle East.

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

All prices are established in accordance with the **20% to 30% premium above Brilliant baseline** benchmark documented in [`/docs/pricing-analysis.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/pricing-analysis.md).

### 3.1 Tier Structure

#### Product 1: Course A (Medicinal Chemistry) — Single Course Pass
- **Monthly Recurring**: **$39 / month**
- **Semester Pass (6 Months, One-Time)**: **$169** ($28.16 / month effective — aligned with university semester duration)
- **Annual Pass (12 Months Recurring)**: **$288 / year** ($24.00 / month effective)

#### Product 2: Course B (Pharmacology) — Single Course Pass
- **Monthly Recurring**: **$39 / month**
- **Semester Pass (6 Months, One-Time)**: **$169** ($28.16 / month effective)
- **Annual Pass (12 Months Recurring)**: **$288 / year** ($24.00 / month effective)

#### Product 3: Dual Course Bundle (All-Access Pass: MedChem + Pharmacology)
- **Monthly Recurring**: **$49 / month**
- **Semester Pass (6 Months, One-Time)**: **$229** ($38.16 / month effective)
- **Annual Pass (12 Months Recurring)**: **$348 / year** ($29.00 / month effective)

---

### 3.2 Regional Purchasing Power Parity (PPP) Matrix

To maximize adoption and avoid prohibitive currency barrier pricing in key pharmacy student markets, the platform provides localized pricing:

| Market | Currency | Single Monthly | Single Semester | Single Annual | Bundle Monthly | Bundle Semester | Bundle Annual |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Global / US (Baseline)** | `USD ($)` | $39 | $169 | $288 | $49 | $229 | $348 |
| **Turkey (Domestic)** | `TRY (₺)` | ₺650 | ₺2,750 | ₺4,800 | ₺850 | ₺3,600 | ₺5,900 |
| **Gulf / Saudi Arabia** | `SAR` | 145 SAR | 630 SAR | 1,080 SAR | 185 SAR | 850 SAR | 1,300 SAR |
| **European Union** | `EUR (€)` | €36 | €155 | €265 | €45 | €210 | €320 |

#### PPP Enforcement & Anti-Abuse Rules:
1. **IP Geolocation**: Client requests determine initial country via Cloudflare/Firebase request headers (`x-country-code`).
2. **Card BIN Country Match**: At checkout, the issuing country of the payment method is validated. Discrepancies between IP and billing card require step-up verification.
3. **No VPN Bypass**: If a user switches to a high-PPP currency after initial registration, their account is locked to their verified payment method country.

---

## 4. Freemium Funnel & Conversion Mechanics

### 4.1 Free Preview Rules
1. **Permanent Free Access**: Lessons 1 and 2 of both Medicinal Chemistry and Pharmacology are completely free forever.
2. **Zero Friction Onboarding**: Free preview lessons can be accessed immediately after standard email/Google authentication. No credit card or trial authorization required.
3. **Completion CTA**: At the final step of Lesson 2, the user encounters a completion celebration card with a high-intent prompt to continue into Lesson 3.

### 4.2 Paywall Trigger & User Experience
1. When a user clicks Lesson 3 or attempts to query a restricted step, the UI displays the **Neo-Brutalist Paywall Modal**:
   - High-contrast visual summary of course modules and interactive widgets.
   - Transparent price options (Monthly vs Semester vs Annual) with clear highlighting of the **Semester Pass (Best Value for Students)**.
   - Guaranteed **14-day money-back guarantee** badge.
2. Clicking "Upgrade to Full Access" invokes the `createCheckoutSession` Cloud Function.

### 4.3 Refund Policy
- **14-Day Money-Back Guarantee**: Full refund granted within 14 calendar days of purchase if the user has completed fewer than 3 paid lessons.
- **Automated Processing**: Users can initiate refund requests via their settings page; if eligible under the threshold, the refund is executed automatically via Dodo API.

---

## 5. Technical Integration Architecture

```
User App (Client)          Firebase Functions         Dodo Payments API        Firestore DB
      |                            |                         |                      |
      | 1. createCheckoutSession   |                         |                      |
      |--------------------------->|                         |                      |
      |                            | 2. Create Checkout      |                      |
      |                            |------------------------>|                      |
      |                            |<------------------------|                      |
      |<---------------------------|  Returns Checkout URL   |                      |
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
      | 10. Instant Unlock Confetti|                                                |
```

### 5.1 Cloud Function: `createCheckoutSession`
- **Type**: Firebase HTTPS Callable Function (`functions.https.onCall`).
- **Input Parameters**:
  - `courseId`: `"medchem"` | `"pharmacology"` | `"dual_bundle"`
  - `planId`: `"monthly"` | `"semester"` | `"annual"`
  - `currency`: `"USD"` | `"TRY"` | `"SAR"` | `"EUR"`
- **Execution Steps**:
  1. Validates user authentication context (`request.auth.uid`).
  2. Resolves price and product IDs from `/courses/{courseId}/pricing.json`.
  3. Retrieves `DODO_PAYMENTS_API_KEY` securely from Google Cloud Secret Manager.
  4. Calls `https://api.dodopayments.com/v1/checkouts` passing:
     - `customer`: `{ email: user.email, name: user.displayName }`
     - `client_reference_id`: `request.auth.uid`
     - `metadata`: `{ userId, courseId, planId }`
     - `return_url`: `https://<domain>/checkout/success?session_id={CHECKOUT_SESSION_ID}`
     - `cancel_url`: `https://<domain>/pricing?canceled=true`
  5. Returns `{ checkoutUrl: response.data.url }`.

---

### 5.2 Webhook Handling & Signature Verification

- **Endpoint**: `https://<region>-<project-id>.cloudfunctions.net/handleDodoWebhook`
- **Security Check**:
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

### 5.3 Webhook Events & State Machine

| Event Type | Action Taken | Entitlement State |
| :--- | :--- | :--- |
| `payment.succeeded` | Provisions entitlement; records order document | `status: "active"`, updates `expiresAt` |
| `subscription.renewed` | Extends `expiresAt` date; updates last billing timestamp | `status: "active"`, extends `expiresAt` |
| `subscription.cancelled` | Sets `autoRenew: false`; user retains access until current period ends | `status: "active"` (until `expiresAt`), then `"expired"` |
| `payment.failed` | Logs billing failure; triggers in-app warning banner; grants 3-day grace period | `status: "past_due"` |
| `refund.processed` | Immediately invalidates access; logs refund audit trail | `status: "revoked"` |

### 5.4 Idempotency Protection
Every incoming webhook is tracked in Firestore `/webhook_events/{eventId}`:
```typescript
const eventRef = db.collection('webhook_events').doc(event.id);
await db.runTransaction(async (transaction) => {
  const doc = await transaction.get(eventRef);
  if (doc.exists) {
    // Already processed this exact event
    return;
  }
  transaction.set(eventRef, {
    eventId: event.id,
    type: event.type,
    processedAt: admin.firestore.FieldValue.serverTimestamp(),
    status: 'success'
  });
  // Execute entitlement updates inside the same transaction
});
```

---

## 6. Testing & Sandbox Verification Checklist

- [ ] **Webhook Signature Verification**: Verify 401 response on spoofed headers.
- [ ] **Duplicate Webhook Delivery**: Send identical `event_id` twice; ensure entitlement is only updated once.
- [ ] **Free-to-Paid Transition**: Complete Lesson 2 -> Attempt Lesson 3 -> Pay via Dodo Sandbox -> Real-time Firestore snapshot unlocks Lesson 3 with 0 page reloads.
- [ ] **Refund Revocation**: Trigger test refund in Dodo dashboard; ensure Lesson 3 steps are locked immediately by Firestore rules.
- [ ] **PPP Localization Display**: Verify that a Turkish IP correctly sees `₺650/mo` and not `$39/mo`.
