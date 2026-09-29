# Dodo Payments MCP Server

A Model Context Protocol (MCP) Server for **Dodo Payments**, enabling AI assistants (Claude Desktop, Cursor, Codex CLI, Claude Code, Windsurf, Cline, etc.) to securely interact with the Dodo Payments API and documentation.

---

## 🚀 Features & Tools

This MCP server implements **21 tools**, **3 resources**, and **2 prompt templates** covering the entire Dodo Payments platform:

### 1. Checkout & Payments
* `dodo_create_checkout_session`: Create 24-hour hosted checkout sessions for one-time payments or subscriptions (with trial days and custom currencies).
* `dodo_get_payment`: Retrieve payment details, status, card brand, and amount by ID.
* `dodo_list_payments`: List payments with customer, status (`succeeded`, `failed`), and pagination filters.
* `dodo_create_refund`: Issue full or partial refunds for a transaction.

### 2. Subscriptions
* `dodo_get_subscription`: Retrieve subscription status, current plan, and renewal dates.
* `dodo_list_subscriptions`: Filter subscriptions by status (`active`, `on_hold`, `past_due`, `cancelled`).
* `dodo_change_subscription_plan`: Upgrade or downgrade subscriptions with all 4 Dodo proration modes (`difference_immediately`, `prorated_immediately`, `full_immediately`, `do_not_bill`).
* `dodo_cancel_subscription`: Cancel subscription immediately or at period end.
* `dodo_update_payment_method`: Reactivate on-hold subscriptions by generating a payment method update link.

### 3. Customers & Portal
* `dodo_get_customer`: Look up customer details and billing information.
* `dodo_list_customers`: List customer accounts.
* `dodo_create_customer_portal_session`: Generate signed 24h Customer Portal session links for self-service invoices, plan changes, and saved cards.

### 4. Products Catalog
* `dodo_list_products`: List all products and pricing plans in your catalog.
* `dodo_get_product`: Retrieve product details and attached entitlements.

### 5. Software License Keys
* `dodo_validate_license`: Validate license key validity, expiry, and activation count (public endpoint).
* `dodo_activate_license`: Activate a device or machine instance (`lki_...`).
* `dodo_deactivate_license`: Deactivate an instance and free up a license seat.

### 6. Credits & Usage Meters
* `dodo_get_credit_balance`: Query customer balances across custom units (tokens, API calls, compute hours).
* `dodo_ingest_usage_event`: Send real-time meter events (e.g. `ai.generation`, `api.call`) to deduct credits or bill overage.
* `dodo_adjust_credit_balance`: Record manual credit (+) or debit (-) ledger adjustments.

### 7. Documentation Search
* `dodo_search_docs`: Search Dodo Payments guides, integration checklists, and developer resources.

---

## 🛠️ Installation & Setup

### 1. Install Dependencies & Build
```bash
npm install
npm run build
```

### 2. Configure Environment Variables
Create a `.env` file or export your API credentials:
```bash
DODO_PAYMENTS_API_KEY=your_dodo_api_key_here
DODO_PAYMENTS_ENVIRONMENT=test_mode # or live_mode
```

---

## 🔌 Connecting to AI Clients

### Cursor
Add to `~/.cursor/mcp.json` or `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "dodopayments": {
      "command": "node",
      "args": ["<PATH_TO_THIS_REPO>/dist/index.js"],
      "env": {
        "DODO_PAYMENTS_API_KEY": "your_test_key_here",
        "DODO_PAYMENTS_ENVIRONMENT": "test_mode"
      }
    }
  }
}
```

### Claude Desktop
Add to your Claude Desktop config (`%APPDATA%\Claude\claude_desktop_config.json` on Windows):
```json
{
  "mcpServers": {
    "dodopayments": {
      "command": "node",
      "args": ["C:\\Users\\hp\\Documents\\antigravity\\valiant-raman\\dist\\index.js"],
      "env": {
        "DODO_PAYMENTS_API_KEY": "your_test_key_here",
        "DODO_PAYMENTS_ENVIRONMENT": "test_mode"
      }
    }
  }
}
```

### Testing the Server
Run the built-in verification suite:
```bash
npx tsx test/test-server.ts
```

---

## 📜 License
Apache-2.0
