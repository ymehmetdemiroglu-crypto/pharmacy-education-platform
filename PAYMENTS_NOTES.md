# Dodo Payments SDK Reference & Integration Notes

Authoritative reference compiled directly from `dodopayments@^2.52.0` type definitions (`.d.ts`) in `node_modules/dodopayments/resources/`.

---

## 1. SDK Client Initialization & Environment Configuration

### Client Options (`dodopayments/client.d.ts:ClientOptions`)
```typescript
import DodoPayments from 'dodopayments';

export type Environment = 'live_mode' | 'test_mode';

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY,
  environment: (process.env.DODO_ENV === 'live' ? 'live_mode' : 'test_mode') as 'live_mode' | 'test_mode',
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY,
});
```
* **Exact SDK Option Name**: `environment: 'test_mode' | 'live_mode'`.
* **Base URLs**:
  * `test_mode` automatically resolves to `https://test.dodopayments.com`.
  * `live_mode` automatically resolves to `https://live.dodopayments.com`.
* **Zero code change transition**: Switching `DODO_ENV=test` to `DODO_ENV=live` swaps keys, endpoint, product catalog, and webhook secrets.

---

## 2. Cancellation Mechanics: Immediate vs. End-of-Period

### Investigation Finding (Reported per user requirement)
In `dodopayments/resources/subscriptions.d.ts:SubscriptionUpdateParams`:
```typescript
export interface SubscriptionUpdateParams {
  cancel_at_next_billing_date?: boolean | null;
  cancel_reason?: 'cancelled_by_customer' | 'cancelled_by_merchant' | 'cancelled_by_merchant_send_dunning' | 'cancelled_by_merchant_grace_period_expired' | 'dodo_team' | null;
  cancellation_comment?: string | null;
  cancellation_feedback?: CancellationFeedback | null;
  status?: SubscriptionStatus | null; // 'active' | 'paused' | 'cancelled' | ...
}
```

### The Real Immediate-Cancel Mechanism:
1. **Immediate Cancellation**:
   * Must pass `status: 'cancelled'` to `client.subscriptions.update(subscriptionId, { status: 'cancelled', cancel_reason: 'cancelled_by_customer' })`.
   * Setting `cancel_at_next_billing_date: false` does **NOT** cancel immediately — it only un-schedules a previously scheduled end-of-period cancellation, leaving the subscription active!
2. **End-of-Billing-Period Cancellation (Graceful Churn)**:
   * Pass `cancel_at_next_billing_date: true` to `client.subscriptions.update(subscriptionId, { cancel_at_next_billing_date: true, cancel_reason: 'cancelled_by_customer' })`.
   * The subscription remains in `status: 'active'` until the end of the paid term, at which point Dodo emits `subscription.cancelled`.

---

## 3. Webhook Signature Verification & Event Unwrap

### Standard Webhooks Specification
In `dodopayments/resources/webhooks/webhooks.d.ts` & `webhooks.js`:
```typescript
// Uses official standardwebhooks parser built into SDK
const event = client.webhooks.unwrap(rawBodyString, {
  headers: {
    'webhook-id': req.headers['webhook-id'] as string,
    'webhook-timestamp': req.headers['webhook-timestamp'] as string,
    'webhook-signature': req.headers['webhook-signature'] as string,
  },
  key: process.env.DODO_PAYMENTS_WEBHOOK_KEY,
});
```
* **Raw Body Requirement**: Signature MUST be verified against the unmodified raw request body string (`Buffer.toString('utf8')`). Never parse JSON before verification.
* **Exact Webhook Event Names Verified Against SDK**:
  * `payment.succeeded`: One-time payment or recurring renewal billed successfully.
  * `payment.failed`: Transaction failed.
  * `subscription.active`: Subscription initialized and active.
  * `subscription.renewed`: Successful recurring renewal charge.
  * `subscription.past_due`: Renewal failed; grace period is currently running.
  * `subscription.on_hold`: Renewal failed and grace period expired; awaiting card update.
  * `subscription.cancelled`: Subscription cancelled immediately or at period end.
  * `subscription.expired`: Subscription reached end of term and cannot be renewed.
  * `subscription.plan_changed`: Subscription plan upgraded or downgraded.
  * `refund.succeeded`: Refund executed (Note: The event is `refund.succeeded`, NOT `refund.created`).
  * `refund.failed`: Refund request failed.

---

## 4. Method Signatures & Response Shapes

### 4.1 Create Checkout Session
* **Method**: `client.checkoutSessions.create(params: CheckoutSessionCreateParams): Promise<CheckoutSessionResponse>`
* **Parameters**:
  ```typescript
  {
    product_cart: [{ product_id: string, quantity: number }],
    customer: { email: string, name?: string },
    return_url: string,
    billing_currency?: 'USD' | 'TRY' | 'SAR' | 'EUR' | 'GBP',
    metadata?: Record<string, string>,
    subscription_data?: { trial_period_days?: number }
  }
  ```
* **Response**:
  ```typescript
  {
    session_id: string,
    checkout_url: string | null,
    client_secret?: string | null,
    payment_id?: string | null
  }
  ```

### 4.2 Create Customer Portal Session
* **Method**: `client.customers.customerPortal.create(customerId: string, params?: CustomerPortalCreateParams): Promise<CustomerPortalSession>`
* **Parameters**:
  ```typescript
  {
    send_email?: boolean, // default false
    return_url?: string   // "Return to business" button
  }
  ```
* **Response**:
  ```typescript
  {
    portal_url: string,
    expires_at: string
  }
  ```

### 4.3 Change Subscription Plan
* **Method**: `client.subscriptions.changePlan(subscriptionId: string, params: SubscriptionChangePlanParams): Promise<SubscriptionChangePlanResponse>`
* **Parameters**:
  ```typescript
  {
    product_id: string,
    proration_billing_mode?: 'difference_immediately' | 'prorated_immediately' | 'full_immediately' | 'do_not_bill',
    quantity?: number,
    effective_at?: 'immediately' | 'next_billing_date'
  }
  ```
* **Response**:
  ```typescript
  {
    subscription_id: string,
    payment_id?: string | null, // Present if immediate charge triggered
    status: SubscriptionStatus
  }
  ```

### 4.4 Create Refund
* **Method**: `client.refunds.create(params: RefundCreateParams): Promise<Refund>`
* **Parameters**:
  ```typescript
  // Full refund:
  {
    payment_id: string,
    reason?: string
  }

  // Partial refund:
  {
    payment_id: string,
    reason?: string,
    items: [{
      item_id: string, // product_id or addon_id
      amount: number   // amount in smallest currency unit or decimal
    }]
  }
  ```
* **CRITICAL**: Top-level `amount` parameter does NOT exist on `RefundCreateParams` and will be rejected with an API error.

---

## 5. 7-Day Free Trial Architecture: Server-Side vs. Dodo Hosted

* **Finding**: Dodo Payments hosted checkout sessions require credit card capture to schedule recurring subscriptions with `trial_period_days`. Dodo does **not** support cardless trial checkout.
* **Architecture Decision**: To fulfill the core product requirement of a **7-day cardless free trial**, the trial is managed 100% server-side in Firestore via atomic transaction:
  * `users/{userId}.trialUsed`: Boolean flag preventing multiple redemptions per user account.
  * `users/{userId}.trialEndsAt`: Strict expiration timestamp (`Date.now() + 7 * 86400 * 1000`).
  * `users/{userId}/entitlements/dual_bundle`: Server-provisioned trial entitlement doc (`status: 'active'`, `plan: 'trial'`).
  * Freemium and premium access derivation checks `status == 'active'` and `expiresAt > request.time` in `firestore.rules`.
