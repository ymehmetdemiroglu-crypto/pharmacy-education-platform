import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const DODO_TOOLS: Tool[] = [
  // 1. Checkout & Payments
  {
    name: "dodo_create_checkout_session",
    description:
      "Create a secure, hosted Dodo Payments checkout session for one-time purchases or recurring subscriptions. Returns checkout_url valid for 24 hours.",
    inputSchema: {
      type: "object",
      properties: {
        product_cart: {
          type: "array",
          description: "List of products in the checkout cart",
          items: {
            type: "object",
            properties: {
              product_id: { type: "string", description: "Product identifier (pdt_...)" },
              quantity: { type: "number", description: "Quantity of the product", default: 1 },
            },
            required: ["product_id"],
          },
        },
        customer: {
          type: "object",
          description: "Customer information",
          properties: {
            email: { type: "string", description: "Customer email address" },
            name: { type: "string", description: "Customer full name" },
          },
          required: ["email"],
        },
        return_url: {
          type: "string",
          description: "URL customer is redirected to upon successful checkout completion",
        },
        subscription_data: {
          type: "object",
          description: "Optional subscription settings (trial days, on-demand flag)",
          properties: {
            trial_period_days: { type: "number", description: "Number of free trial days" },
            on_demand: { type: "boolean", description: "Whether subscription is on-demand billing" },
          },
        },
        billing_currency: {
          type: "string",
          description: "ISO currency code (USD, EUR, GBP, INR, etc.)",
        },
      },
      required: ["product_cart", "customer", "return_url"],
    },
  },
  {
    name: "dodo_get_payment",
    description: "Retrieve details of a specific payment by its ID (pay_...).",
    inputSchema: {
      type: "object",
      properties: {
        payment_id: { type: "string", description: "Payment ID to retrieve" },
      },
      required: ["payment_id"],
    },
  },
  {
    name: "dodo_list_payments",
    description: "List payments with optional filters for customer, status, and pagination.",
    inputSchema: {
      type: "object",
      properties: {
        customer_id: { type: "string", description: "Filter by customer ID (cus_...)" },
        status: {
          type: "string",
          enum: ["succeeded", "failed", "processing", "cancelled"],
          description: "Filter by payment status",
        },
        limit: { type: "number", description: "Max number of records to return", default: 10 },
        page: { type: "number", description: "Page number", default: 1 },
      },
    },
  },
  {
    name: "dodo_create_refund",
    description: "Issue a full or partial refund for a processed payment.",
    inputSchema: {
      type: "object",
      properties: {
        payment_id: { type: "string", description: "Payment ID to refund" },
        amount: { type: "number", description: "Amount to refund (omit for full refund)" },
        reason: { type: "string", description: "Reason for the refund" },
      },
      required: ["payment_id"],
    },
  },

  // 2. Subscriptions
  {
    name: "dodo_get_subscription",
    description: "Retrieve details and status of an active, paused, or cancelled subscription by ID.",
    inputSchema: {
      type: "object",
      properties: {
        subscription_id: { type: "string", description: "Subscription ID (sub_...)" },
      },
      required: ["subscription_id"],
    },
  },
  {
    name: "dodo_list_subscriptions",
    description: "List subscriptions filtered by status, customer, or product.",
    inputSchema: {
      type: "object",
      properties: {
        customer_id: { type: "string", description: "Filter by customer ID" },
        status: {
          type: "string",
          enum: ["active", "on_hold", "past_due", "paused", "cancelled", "expired", "failed"],
          description: "Filter by subscription status",
        },
        limit: { type: "number", description: "Max records to return", default: 10 },
      },
    },
  },
  {
    name: "dodo_change_subscription_plan",
    description:
      "Upgrade, downgrade, or change a subscription plan with one of Dodo's 4 proration billing modes.",
    inputSchema: {
      type: "object",
      properties: {
        subscription_id: { type: "string", description: "Subscription ID to modify" },
        product_id: { type: "string", description: "Target product ID in the same collection" },
        proration_billing_mode: {
          type: "string",
          enum: ["difference_immediately", "prorated_immediately", "full_immediately", "do_not_bill"],
          description:
            "Proration mode: difference_immediately (pays price gap), prorated_immediately (pro-rated unused cycle time), full_immediately (full new plan price), do_not_bill (defers billing to next renewal)",
          default: "difference_immediately",
        },
        quantity: { type: "number", description: "New quantity/seats", default: 1 },
      },
      required: ["subscription_id", "product_id"],
    },
  },
  {
    name: "dodo_cancel_subscription",
    description:
      "Cancel an active subscription either immediately or scheduled at the end of the current billing cycle.",
    inputSchema: {
      type: "object",
      properties: {
        subscription_id: { type: "string", description: "Subscription ID to cancel" },
        cancel_immediately: {
          type: "boolean",
          description: "If true, cancels now. If false, cancels at current cycle end.",
          default: false,
        },
      },
      required: ["subscription_id"],
    },
  },
  {
    name: "dodo_update_payment_method",
    description:
      "Generate an update payment method link to reactivate a subscription that is currently in 'on_hold' status.",
    inputSchema: {
      type: "object",
      properties: {
        subscription_id: { type: "string", description: "Subscription ID on hold" },
        return_url: { type: "string", description: "Return URL after card update" },
      },
      required: ["subscription_id", "return_url"],
    },
  },

  // 3. Customers & Customer Portal
  {
    name: "dodo_get_customer",
    description: "Retrieve customer record, email, metadata, and payment history.",
    inputSchema: {
      type: "object",
      properties: {
        customer_id: { type: "string", description: "Customer ID (cus_...)" },
      },
      required: ["customer_id"],
    },
  },
  {
    name: "dodo_list_customers",
    description: "List customers in the merchant account with pagination.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max customers to return", default: 10 },
      },
    },
  },
  {
    name: "dodo_create_customer_portal_session",
    description:
      "Generate a signed 24h Customer Portal session URL where a customer can manage subscriptions, payment cards, invoices, and license keys.",
    inputSchema: {
      type: "object",
      properties: {
        customer_id: { type: "string", description: "Customer ID" },
        send_email: { type: "boolean", description: "Whether to email the sign-in link", default: false },
        return_url: { type: "string", description: "URL for the 'Return to business' button" },
      },
      required: ["customer_id"],
    },
  },

  // 4. Products Catalog
  {
    name: "dodo_list_products",
    description: "List all products and prices in your Dodo Payments catalog.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max products to return", default: 20 },
      },
    },
  },
  {
    name: "dodo_get_product",
    description: "Retrieve details of a single product including pricing and attached entitlements.",
    inputSchema: {
      type: "object",
      properties: {
        product_id: { type: "string", description: "Product ID (pdt_...)" },
      },
      required: ["product_id"],
    },
  },

  // 5. Software License Keys
  {
    name: "dodo_validate_license",
    description:
      "Validate a software license key to check if it is active, expired, or disabled. (Public endpoint, safe for client software)",
    inputSchema: {
      type: "object",
      properties: {
        license_key: { type: "string", description: "The license key string" },
      },
      required: ["license_key"],
    },
  },
  {
    name: "dodo_activate_license",
    description:
      "Activate a device/machine instance against a license key. Returns license_key_instance_id (lki_...).",
    inputSchema: {
      type: "object",
      properties: {
        license_key: { type: "string", description: "The license key to activate" },
        name: { type: "string", description: "Identifier name for this device/instance (e.g. 'MacBook M3')" },
      },
      required: ["license_key", "name"],
    },
  },
  {
    name: "dodo_deactivate_license",
    description: "Deactivate a license key instance to free up an activation slot.",
    inputSchema: {
      type: "object",
      properties: {
        license_key: { type: "string", description: "The license key" },
        license_key_instance_id: { type: "string", description: "The instance ID (lki_...) returned during activation" },
      },
      required: ["license_key", "license_key_instance_id"],
    },
  },

  // 6. Credits & Usage Meters
  {
    name: "dodo_get_credit_balance",
    description: "Get the current credit balance (tokens, API calls, compute units) for a customer.",
    inputSchema: {
      type: "object",
      properties: {
        customer_id: { type: "string", description: "Customer ID" },
        credit_entitlement_id: {
          type: "string",
          description: "Optional specific credit entitlement ID. If omitted, lists all balances.",
        },
      },
      required: ["customer_id"],
    },
  },
  {
    name: "dodo_ingest_usage_event",
    description:
      "Ingest real-time usage meter events (e.g. 'ai.generation', 'api.call', compute time) to automatically deduct customer credits or bill overage.",
    inputSchema: {
      type: "object",
      properties: {
        customer_id: { type: "string", description: "Customer consuming the usage" },
        event_name: { type: "string", description: "Meter event name (e.g. 'ai.generation')" },
        units: { type: "number", description: "Quantity of units consumed (e.g. 500 tokens)", default: 1 },
        metadata: {
          type: "object",
          description: "Optional metadata parameters associated with the event",
        },
      },
      required: ["customer_id", "event_name", "units"],
    },
  },
  {
    name: "dodo_adjust_credit_balance",
    description: "Record a manual ledger entry to credit (+) or debit (-) a customer's credit balance.",
    inputSchema: {
      type: "object",
      properties: {
        customer_id: { type: "string", description: "Customer ID" },
        credit_entitlement_id: { type: "string", description: "Credit entitlement ID" },
        amount: { type: "number", description: "Amount of credits to adjust" },
        entry_type: {
          type: "string",
          enum: ["credit", "debit"],
          description: "Whether to add (credit) or deduct (debit)",
          default: "credit",
        },
        description: { type: "string", description: "Reason for the adjustment" },
      },
      required: ["customer_id", "credit_entitlement_id", "amount"],
    },
  },

  // 7. Docs Search
  {
    name: "dodo_search_docs",
    description:
      "Search Dodo Payments documentation, guides, integration checklists, and error recovery recommendations.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query or keyword (e.g. 'webhooks', 'subscriptions', 'trials')" },
      },
      required: ["query"],
    },
  },
];
