# SHIP-TODAY EXECUTION PLAN: Dodo Payments MCP Server

**Target Timeframe**: ~3.0 Hours (+ 0.6h / 20% buffer = ~3.6 Hours Total)  
**Status**: Ready for approval. No code edits have been made.

---

## 1. BLOCKERS (Must fix to ship)

### Task B1: Fix Test Suite & Libuv Async Shutdown Crash
* **Files Touched**: `test/test-server.ts`, `package.json`
* **Evidence**:
  * `package.json:14`: `"test": "node --test"` fails with `ERR_MODULE_NOT_FOUND` searching for `src/tools/definitions.js` because Node native runner does not resolve TypeScript ESM source paths.
  * `test/test-server.ts:68-72`: Calling `await client.close()`, `await server.close()`, and `process.exit(0)` concurrently causes a libuv assertion crash: `Assertion failed: !(handle->flags & UV_HANDLE_CLOSING), file src\win\async.c, line 94` exiting with status code 1.
* **Concrete Acceptance Criterion**:
  * Running `npm test` runs the test suite cleanly via `node --test --import tsx` (or testing compiled `dist`), does not crash on libuv cleanup, and exits with code 0.
* **Dependencies**: None.
* **Time Estimate**: 25 minutes.

### Task B2: Fix Broken & Non-Existent API Endpoints in Handlers
* **Files Touched**: `src/tools/handlers.ts`
* **Evidence**:
  * `src/tools/handlers.ts:232`: `dodo_ingest_usage_event` uses raw `fetch(`${baseUrl}/usage_events`)`. The actual Dodo Payments endpoint is `/events/ingest` (available natively via `client.usageEvents.ingest`).
  * `src/tools/handlers.ts:247`: `dodo_adjust_credit_balance` calls `${baseUrl}/credit-entitlements/ledger-entries`. The real API endpoint is `/credit-entitlements/${credit_entitlement_id}/balances/${customer_id}/ledger-entries` (available natively via `client.creditEntitlements.balances.createLedgerEntry`).
  * `src/tools/handlers.ts:203`: `dodo_get_credit_balance` calls `${baseUrl}/customers/${customer_id}/balances` when no entitlement is specified. The real endpoint is `/customers/${customer_id}/credit-entitlements` (available via `client.customers.listCreditEntitlements`).
* **Concrete Acceptance Criterion**:
  * Replace the 3 faulty raw fetch calls with the verified SDK methods (`client.usageEvents.ingest`, `client.creditEntitlements.balances.createLedgerEntry`, and `client.customers.listCreditEntitlements`/`client.creditEntitlements.balances.retrieve`).
  * All 3 tools format their payloads according to the OpenAPI spec.
* **Dependencies**: None.
* **Time Estimate**: 35 minutes.

### Task B3: Fix Broken Parameter Mappings in Subscriptions & Refunds
* **Files Touched**: `src/tools/handlers.ts`, `src/tools/definitions.ts`
* **Evidence**:
  * `src/tools/handlers.ts:96`: `dodo_cancel_subscription` passes `cancel_immediately`. The Dodo Payments API expects `cancel_at_next_billing_date` on `PATCH /subscriptions/{id}` (`client.subscriptions.update`).
  * `src/tools/handlers.ts:47`: `dodo_create_refund` passes `params.amount = args.amount`. In the Dodo API, `RefundCreateParams` only accepts `payment_id`, `reason`, `metadata`, and `items: [{ item_id, amount, tax_inclusive }]`. Top-level `amount` causes a 422 Unprocessable Entity error.
* **Concrete Acceptance Criterion**:
  * `dodo_cancel_subscription` correctly maps `cancel_immediately` to `cancel_at_next_billing_date: !args.cancel_immediately` using `client.subscriptions.update`.
  * `dodo_create_refund` supports itemized partial refunds (`items: [{ item_id, amount }]`) or full refunds when amount/items are omitted.
* **Dependencies**: B2.
* **Time Estimate**: 25 minutes.

### Task B4: Clean Up Potential Secret Ingestion in `.mcp.json`
* **Files Touched**: `.mcp.json`
* **Evidence**:
  * `.mcp.json:10`: The working tree contains an uncommitted modification replacing `${DODO_PAYMENTS_API_KEY}` with a raw string token `${GntgO7B4AgV4b1Y_.lnqWZdf1nJzvV80tNSDQZpjL12q9GMs3M43rXm9xTgCdzDy-}`.
* **Concrete Acceptance Criterion**:
  * `.mcp.json` restored to template variable `${DODO_PAYMENTS_API_KEY}` so secrets are not committed or exposed.
* **Dependencies**: None.
* **Time Estimate**: 5 minutes.

---

## 2. CORE (Needed for main flow to feel complete & robust)

### Task C1: Migrate Remaining Raw Fetch Handlers to Official Typed SDK
* **Files Touched**: `src/tools/handlers.ts`
* **Evidence**:
  * `src/tools/handlers.ts:73`: `dodo_change_subscription_plan` manually fetches instead of calling `client.subscriptions.changePlan`.
  * `src/tools/handlers.ts:135`: `dodo_create_customer_portal_session` manually fetches instead of calling `client.customers.customerPortal.create`.
  * `src/tools/handlers.ts:163-191`: `dodo_validate_license`, `dodo_activate_license`, `dodo_deactivate_license` manually fetch and call `await res.json()` on deactivation (which returns empty body, throwing JSON parse errors) instead of `client.licenses.*`.
* **Concrete Acceptance Criterion**:
  * All handlers use the official `dodopayments` SDK methods, giving automatic retry logic, proper error types, and header management.
* **Dependencies**: B2, B3.
* **Time Estimate**: 30 minutes.

### Task C2: Implement Zod Input Validation & Clean Error Responses
* **Files Touched**: `src/tools/handlers.ts`, `src/index.ts`
* **Evidence**:
  * `package.json:31`: `zod` is installed in `dependencies` but unused anywhere in `src/`.
  * Calling tools with missing required parameters (e.g. `dodo_get_payment` with `{}`) results in raw SDK crashes (`Value of type Undefined is not a valid path parameter /payments/undefined`).
* **Concrete Acceptance Criterion**:
  * Validate required arguments before SDK calls. If validation fails, return a readable MCP error (`isError: true`, message: "Missing required parameter 'payment_id'") without throwing unhandled internal exceptions.
* **Dependencies**: C1.
* **Time Estimate**: 35 minutes.

### Task C3: Purge Untracked Foreign Artifacts
* **Files Touched**: `.gitignore`, `.agents/` (untracked)
* **Evidence**:
  * `.agents/`: Leftover directory from a separate project (`pharmacy_education_platform_setup`), containing 4 untracked files (`ORIGINAL_REQUEST.md`, `context.md`, `BRIEFING.md`, `handoff.md`).
* **Concrete Acceptance Criterion**:
  * Delete the orphaned `.agents/` folder and ensure `.gitignore` excludes temporary agent scratch spaces if desired.
* **Dependencies**: None.
* **Time Estimate**: 5 minutes.

---

## 3. POLISH (Quality of Life & Release Readiness)

### Task P1: Add Offline Mocked Unit Tests for All 21 Tools
* **Files Touched**: `test/test-server.ts`, `test/mocks.ts` (or inline mocks)
* **Evidence**:
  * Current `test/test-server.ts:58-62` makes live network calls to `dodo_validate_license`. In an offline CI environment or when keys are missing, tests could fail unpredictably.
* **Concrete Acceptance Criterion**:
  * Unit test verifies all 21 tool registrations, schema validation, and tool dispatch without requiring live network access or real API credentials.
* **Dependencies**: B1, C2.
* **Time Estimate**: 25 minutes.

### Task P2: Build Verification & Package Verification
* **Files Touched**: `package.json`, `dist/*`
* **Evidence**:
  * `package.json:7-9`: Specifies `"bin": { "dodopayments-mcp": "./dist/index.js" }`.
* **Concrete Acceptance Criterion**:
  * `npm run build` succeeds cleanly.
  * Executable check: `node ./dist/index.js` starts, connects via stdio, and responds to `initialize` and `tools/list`.
* **Dependencies**: All previous tasks.
* **Time Estimate**: 10 minutes.

---

## 4. CUT (Deferred beyond today's release)

1. **Disputes, Invoices & Payouts MCP Tools**:
   * *Reason*: The Dodo Payments platform supports disputes and payouts, but the initial scope defined in `README.md` focuses on Payments, Subscriptions, Customers, Products, Licenses, and Credits. Expanding to 35+ tools will exceed today's timebox.
2. **Interactive Local HTTP Webhook Server / Tunnel**:
   * *Reason*: MCP stdio servers are designed for AI client integrations (Cursor, Claude Desktop) communicating over standard I/O. Receiving incoming webhooks requires an active HTTP daemon/reverse tunnel (ngrok/Cloudflare), which belongs in a separate webhook listener utility or user application.
3. **Full Documentation Vector Embedding Search**:
   * *Reason*: `dodo_search_docs` works well as an indexed keyword & topic guide with direct links to `llms.txt`. Adding a local embedding model would add unnecessary heavy dependencies and build complexity.

---

## Time Budget Summary

| Category | Tasks | Estimate |
|---|---|---|
| **Blockers** | B1, B2, B3, B4 | 90 min (1.5h) |
| **Core** | C1, C2, C3 | 70 min (1.17h) |
| **Polish** | P1, P2 | 35 min (0.58h) |
| **Subtotal** | | **195 min (3.25h)** |
| **20% Buffer** | | **39 min (0.65h)** |
| **Total Target** | | **234 min (~3.9h)** |

---

## Deploy Checklist

- [ ] 1. Clean working tree: `git status` shows 0 untracked rogue files and no committed secrets in `.mcp.json`.
- [ ] 2. TypeScript compilation: `npm run build` compiles `src/` to `dist/` with 0 warnings/errors.
- [ ] 3. Test verification: `npm test` passes cleanly with 0 assertion failures or libuv errors.
- [ ] 4. Executable permissions: `dist/index.js` contains `#!/usr/bin/env node`.
- [ ] 5. Packaging readiness: `package.json` contains valid name, version, bin, license, and repository metadata.

---

## 5-Minute "Definition of Done" Verification

1. Run `npm test`  
   *Expected*: Passes with exit code 0.
2. Run `npm run build`  
   *Expected*: Successfully compiles to `dist/index.js` and `.d.ts` definitions.
3. Test MCP stdio handshake:  
   *Run*: `node -e 'const {spawn}=require("child_process"); const p=spawn("node",["dist/index.js"]); p.stdout.on("data",d=>console.log("OUT:",d.toString())); p.stdin.write(JSON.stringify({jsonrpc:"2.0",id:1,method:"tools/list",params:{}})+"\n"); setTimeout(()=>p.kill(),1000);'`  
   *Expected*: Receives JSON-RPC response with exactly 21 registered tools and valid schemas.
