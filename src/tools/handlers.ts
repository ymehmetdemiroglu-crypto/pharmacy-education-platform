import { getDodoClient, getBaseUrl, getAuthHeaders } from "../client.js";

export async function handleToolCall(name: string, args: Record<string, any>): Promise<any> {
  switch (name) {
    // 1. Checkout & Payments
    case "dodo_create_checkout_session": {
      const client = getDodoClient();
      const params: any = {
        product_cart: args.product_cart,
        customer: args.customer,
        return_url: args.return_url,
      };
      if (args.subscription_data) {
        params.subscription_data = args.subscription_data;
      }
      if (args.billing_currency) {
        params.billing_currency = args.billing_currency;
      }
      const session = await client.checkoutSessions.create(params);
      return {
        session_id: session.session_id,
        checkout_url: session.checkout_url,
        message: "Checkout session created successfully. Valid for 24 hours.",
      };
    }

    case "dodo_get_payment": {
      const client = getDodoClient();
      const payment = await client.payments.retrieve(args.payment_id);
      return payment;
    }

    case "dodo_list_payments": {
      const client = getDodoClient();
      const params: any = {};
      if (args.customer_id) params.customer_id = args.customer_id;
      if (args.status) params.status = args.status;
      if (args.limit) params.page_size = args.limit;
      if (args.page) params.page_number = args.page;
      const list = await client.payments.list(params);
      return list;
    }

    case "dodo_create_refund": {
      const client = getDodoClient();
      const params: any = { payment_id: args.payment_id };
      if (args.amount) params.amount = args.amount;
      if (args.reason) params.reason = args.reason;
      const refund = await client.refunds.create(params);
      return refund;
    }

    // 2. Subscriptions
    case "dodo_get_subscription": {
      const client = getDodoClient();
      const sub = await client.subscriptions.retrieve(args.subscription_id);
      return sub;
    }

    case "dodo_list_subscriptions": {
      const client = getDodoClient();
      const params: any = {};
      if (args.customer_id) params.customer_id = args.customer_id;
      if (args.status) params.status = args.status;
      if (args.limit) params.page_size = args.limit;
      const list = await client.subscriptions.list(params);
      return list;
    }

    case "dodo_change_subscription_plan": {
      const baseUrl = getBaseUrl();
      const headers = getAuthHeaders();
      const res = await fetch(`${baseUrl}/subscriptions/${encodeURIComponent(args.subscription_id)}/change-plan`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          product_id: args.product_id,
          proration_billing_mode: args.proration_billing_mode || "difference_immediately",
          quantity: args.quantity || 1,
        }),
      });
      if (!res.ok) {
        throw new Error(`Dodo API Error (${res.status}): ${await res.text()}`);
      }
      return await res.json();
    }

    case "dodo_cancel_subscription": {
      const baseUrl = getBaseUrl();
      const headers = getAuthHeaders();
      const res = await fetch(`${baseUrl}/subscriptions/${encodeURIComponent(args.subscription_id)}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          status: "cancelled",
          cancel_immediately: args.cancel_immediately ?? false,
        }),
      });
      if (!res.ok) {
        throw new Error(`Dodo API Error (${res.status}): ${await res.text()}`);
      }
      return await res.json();
    }

    case "dodo_update_payment_method": {
      const client = getDodoClient();
      const res = await client.subscriptions.updatePaymentMethod(args.subscription_id, {
        payment_method: { type: "new", return_url: args.return_url },
      });
      return res;
    }

    // 3. Customers & Customer Portal
    case "dodo_get_customer": {
      const client = getDodoClient();
      const customer = await client.customers.retrieve(args.customer_id);
      return customer;
    }

    case "dodo_list_customers": {
      const client = getDodoClient();
      const params: any = {};
      if (args.limit) params.page_size = args.limit;
      const list = await client.customers.list(params);
      return list;
    }

    case "dodo_create_customer_portal_session": {
      const baseUrl = getBaseUrl();
      const headers = getAuthHeaders();
      const url = new URL(`${baseUrl}/customers/${encodeURIComponent(args.customer_id)}/customer-portal/session`);
      if (args.send_email) url.searchParams.set("send_email", "true");
      if (args.return_url) url.searchParams.set("return_url", args.return_url);

      const res = await fetch(url.toString(), {
        method: "POST",
        headers,
      });
      if (!res.ok) {
        throw new Error(`Dodo API Error (${res.status}): ${await res.text()}`);
      }
      return await res.json();
    }

    // 4. Products
    case "dodo_list_products": {
      const client = getDodoClient();
      const params: any = {};
      if (args.limit) params.page_size = args.limit;
      const list = await client.products.list(params);
      return list;
    }

    case "dodo_get_product": {
      const client = getDodoClient();
      const product = await client.products.retrieve(args.product_id);
      return product;
    }

    // 5. License Keys (Public API)
    case "dodo_validate_license": {
      const baseUrl = getBaseUrl();
      const res = await fetch(`${baseUrl}/licenses/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ license_key: args.license_key }),
      });
      return await res.json();
    }

    case "dodo_activate_license": {
      const baseUrl = getBaseUrl();
      const res = await fetch(`${baseUrl}/licenses/activate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ license_key: args.license_key, name: args.name }),
      });
      return await res.json();
    }

    case "dodo_deactivate_license": {
      const baseUrl = getBaseUrl();
      const res = await fetch(`${baseUrl}/licenses/deactivate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          license_key: args.license_key,
          license_key_instance_id: args.license_key_instance_id,
        }),
      });
      return await res.json();
    }

    // 6. Credits & Usage Meters
    case "dodo_get_credit_balance": {
      const baseUrl = getBaseUrl();
      const headers = getAuthHeaders();
      const endpoint = args.credit_entitlement_id
        ? `${baseUrl}/customers/${encodeURIComponent(args.customer_id)}/credit-entitlements/${encodeURIComponent(
            args.credit_entitlement_id
          )}/balance`
        : `${baseUrl}/customers/${encodeURIComponent(args.customer_id)}/balances`;

      const res = await fetch(endpoint, {
        method: "GET",
        headers,
      });
      if (!res.ok) {
        throw new Error(`Dodo API Error (${res.status}): ${await res.text()}`);
      }
      return await res.json();
    }

    case "dodo_ingest_usage_event": {
      const baseUrl = getBaseUrl();
      const headers = getAuthHeaders();
      const eventId = `evt_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      const payload = {
        events: [
          {
            event_id: eventId,
            customer_id: args.customer_id,
            event_name: args.event_name,
            timestamp: new Date().toISOString(),
            metadata: {
              ...(args.metadata || {}),
              units: args.units,
            },
          },
        ],
      };
      const res = await fetch(`${baseUrl}/usage_events`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(`Dodo API Error (${res.status}): ${await res.text()}`);
      }
      const data = (await res.json()) as Record<string, any>;
      return { success: true, event_id: eventId, ...data };
    }

    case "dodo_adjust_credit_balance": {
      const baseUrl = getBaseUrl();
      const headers = getAuthHeaders();
      const res = await fetch(`${baseUrl}/credit-entitlements/ledger-entries`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          customer_id: args.customer_id,
          credit_entitlement_id: args.credit_entitlement_id,
          amount: args.amount,
          entry_type: args.entry_type || "credit",
          description: args.description || "Manual adjustment via MCP",
        }),
      });
      if (!res.ok) {
        throw new Error(`Dodo API Error (${res.status}): ${await res.text()}`);
      }
      return await res.json();
    }

    // 7. Docs Search
    case "dodo_search_docs": {
      const query = (args.query || "").toLowerCase();
      const topics = [
        {
          title: "Integration Guide",
          url: "https://docs.dodopayments.com/developer-resources/integration-guide.md",
          keywords: ["checkout", "payment", "session", "quickstart", "sdk", "return_url"],
          summary: "Create checkout sessions, payment links, and handle webhooks to accept payments.",
        },
        {
          title: "Subscription Integration Guide",
          url: "https://docs.dodopayments.com/developer-resources/subscription-integration-guide.md",
          keywords: ["subscription", "recurring", "trial", "proration", "upgrade", "downgrade", "on_hold", "cancel"],
          summary: "Charge customers on a recurring schedule, handle trials, proration, and payment recovery.",
        },
        {
          title: "Customer Portal",
          url: "https://docs.dodopayments.com/features/customer-portal.md",
          keywords: ["portal", "invoices", "cards", "payment method", "self-service", "magic link"],
          summary: "Self-service portal where customers update cards, download invoices, and change plans.",
        },
        {
          title: "Standard Webhooks",
          url: "https://docs.dodopayments.com/developer-resources/integration-guide.md#webhooks",
          keywords: ["webhook", "standardwebhooks", "signature", "payment.succeeded", "webhook-id"],
          summary: "Verifying incoming signatures using standardwebhooks with webhook-id, webhook-signature.",
        },
        {
          title: "Credit-Based Billing",
          url: "https://docs.dodopayments.com/features/credit-based-billing.md",
          keywords: ["credits", "tokens", "meters", "entitlements", "balance", "ledger", "rollover"],
          summary: "Grant credit entitlements (tokens, compute) and deduct consumption automatically via meters.",
        },
        {
          title: "Software License Keys",
          url: "https://docs.dodopayments.com/features/license-keys.md",
          keywords: ["license", "activation", "validation", "devices", "instances", "lki_"],
          summary: "Issue license keys with activation limits and validate/activate them directly from software.",
        },
        {
          title: "Handle Payment Failures & Dunning",
          url: "https://docs.dodopayments.com/developer-resources/handle-payment-failures.md",
          keywords: ["declined", "failures", "on_hold", "past_due", "retry", "dunning"],
          summary: "Distinguish between terminal subscription.failed and recoverable subscription.on_hold.",
        },
      ];

      const matches = topics.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.summary.toLowerCase().includes(query) ||
          t.keywords.some((k) => query.includes(k) || k.includes(query))
      );

      return {
        query: args.query,
        count: matches.length > 0 ? matches.length : topics.length,
        results: matches.length > 0 ? matches : topics.slice(0, 4),
        index_url: "https://docs.dodopayments.com/llms.txt",
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
