import { Resource } from "@modelcontextprotocol/sdk/types.js";

export const DODO_RESOURCES: Resource[] = [
  {
    uri: "dodo://docs/llms.txt",
    name: "Dodo Payments Complete Documentation Index",
    mimeType: "text/plain",
    description: "Full index of all available documentation pages, guides, and API references.",
  },
  {
    uri: "dodo://best-practices",
    name: "Dodo Payments Architectural Best Practices",
    mimeType: "text/markdown",
    description: "Canonical architectural patterns for webhooks, checkout sessions, and subscription lifecycle.",
  },
  {
    uri: "dodo://proration-modes",
    name: "Subscription Proration Modes Guide",
    mimeType: "text/markdown",
    description: "Detailed explanation of difference_immediately, prorated_immediately, full_immediately, and do_not_bill.",
  },
];

export function getResourceContent(uri: string): string {
  switch (uri) {
    case "dodo://docs/llms.txt":
      return `# Dodo Payments LLMs Index
Documentation URL: https://docs.dodopayments.com/llms.txt

Key Integration Guides:
- Checkout Sessions: https://docs.dodopayments.com/developer-resources/checkout-session.md
- Subscriptions: https://docs.dodopayments.com/developer-resources/subscription-integration-guide.md
- Webhooks: https://docs.dodopayments.com/developer-resources/integration-guide.md#webhooks
- Customer Portal: https://docs.dodopayments.com/features/customer-portal.md
- Credit-Based Billing: https://docs.dodopayments.com/features/credit-based-billing.md
- Software License Keys: https://docs.dodopayments.com/features/license-keys.md
- Usage-Based Billing: https://docs.dodopayments.com/features/usage-based-billing/introduction.md
`;

    case "dodo://best-practices":
      return `# Dodo Payments Integration Best Practices

1. Fulfillment Protocol:
   - NEVER fulfill orders or grant entitlements based solely on browser redirects to the return_url.
   - ALWAYS fulfill orders upon receiving the verified 'payment.succeeded' or 'subscription.active' webhook.

2. Webhook Signature Verification:
   - Use the Standard Webhooks specification.
   - Verify signatures using headers: 'webhook-id', 'webhook-timestamp', and 'webhook-signature' with 'DODO_PAYMENTS_WEBHOOK_KEY'.

3. Subscription Periods vs Frequency:
   - If subscription period equals frequency (e.g. 1 month period, 1 month frequency), the subscription expires after 1 cycle instead of renewing.
   - Set a long period (e.g. 20 years) with monthly frequency for ongoing recurring billing.

4. Failure Recovery:
   - 'subscription.failed' is terminal at creation time (requires creating a new subscription).
   - 'subscription.on_hold' is recoverable via Update Payment Method API.
`;

    case "dodo://proration-modes":
      return `# Dodo Payments Proration Modes

1. difference_immediately (Recommended):
   - Customer pays only the price gap immediately.
   - For downgrades, excess is credited to future renewal cycles.

2. prorated_immediately:
   - Credits only the unused time of the current cycle.
   - Charge varies based on exact day of the change.

3. full_immediately:
   - Charges the complete new plan amount from scratch.
   - No credit given for previous cycle.

4. do_not_bill:
   - Applies the plan change immediately with no charge now.
   - Charges full new plan on the next renewal date, preserving the original billing date.
`;

    default:
      throw new Error(`Resource not found: ${uri}`);
  }
}
