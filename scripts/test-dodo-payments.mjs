#!/usr/bin/env node
/**
 * Test-Mode Dodo Payments SDK Verification Script
 *
 * Usage:
 *   node scripts/test-dodo-payments.mjs              (Dry-run simulation)
 *   RUN_LIVE=1 node scripts/test-dodo-payments.mjs   (Real sandbox API call)
 *
 * Rules:
 *   - NEVER logs API keys or customer PII.
 *   - Strictly operates in Dodo test_mode.
 *   - Uses official dodopayments SDK only (no raw fetch).
 */

import DodoPayments from '../functions/node_modules/dodopayments/index.mjs';

console.log('=== Dodo Payments Test Mode Inspection Tool ===');

const isLiveRun = process.env.RUN_LIVE === '1' || process.env.RUN_LIVE === 'true';

if (!isLiveRun) {
  console.log('[MODE] Offline Simulation (Default)');
  console.log('To run live calls against the Dodo Payments sandbox API, execute with:');
  console.log('  $env:RUN_LIVE="1"; node scripts/test-dodo-payments.mjs\n');
  console.log('[PASS] SDK verification script loaded successfully.');
  process.exit(0);
}

console.log('[MODE] Live Sandbox Test Mode (RUN_LIVE=1)');

const apiKey =
  process.env.DODO_PAYMENTS_API_KEY_TEST ||
  process.env.DODO_PAYMENTS_API_KEY;

if (!apiKey) {
  console.error('[ERROR] Missing DODO_PAYMENTS_API_KEY_TEST or DODO_PAYMENTS_API_KEY environment variable.');
  console.error('Please configure your test key in .env or your session.');
  process.exit(1);
}

const client = new DodoPayments({
  bearerToken: apiKey,
  environment: 'test_mode',
});

async function runLiveTestVerification() {
  try {
    console.log('1. Testing client.checkoutSessions.create() in test_mode...');
    const testProductId = process.env.DODO_PRODUCT_DUAL_SEMESTER || 'pdt_test_dual_semester';

    const session = await client.checkoutSessions.create({
      product_cart: [{ product_id: testProductId, quantity: 1 }],
      customer: {
        email: 'test-student@pharmacy.internal',
        name: 'Sandbox Student',
      },
      return_url: 'http://localhost:5173/catalog?payment=success',
      billing_currency: 'TRY',
      metadata: {
        userId: 'test_user_sandbox_999',
        courseId: 'dual_bundle',
        planId: 'semester_pass',
        dodoEnv: 'test',
      },
    });

    console.log('  -> Checkout Session Created Successfully!');
    console.log(`  -> Session ID: ${session.session_id}`);
    console.log(`  -> Checkout Hosted URL: ${session.checkout_url || 'N/A'}`);
    console.log('\n[SUCCESS] Live Dodo Payments test_mode verification passed.');
  } catch (err) {
    console.error('  -> API Execution Error:', err.message || err);
    process.exit(1);
  }
}

runLiveTestVerification();
