#!/usr/bin/env node
/**
 * Test-Mode Dodo Payments SDK Verification & E2E Script
 *
 * Usage:
 *   node scripts/test-dodo-payments.mjs
 *   $env:RUN_LIVE="1"; node scripts/test-dodo-payments.mjs --action=checkout
 *   $env:RUN_LIVE="1"; node scripts/test-dodo-payments.mjs --action=cancel-immediate --subscription_id=sub_xxx
 *   $env:RUN_LIVE="1"; node scripts/test-dodo-payments.mjs --action=cancel-period-end --subscription_id=sub_xxx
 *   $env:RUN_LIVE="1"; node scripts/test-dodo-payments.mjs --action=change-plan --subscription_id=sub_xxx --product_id=pdt_xxx
 *   $env:RUN_LIVE="1"; node scripts/test-dodo-payments.mjs --action=refund --payment_id=pay_xxx
 *
 * Rules:
 *   - NEVER logs API keys, webhook secrets, or customer PII.
 *   - Strictly operates in Dodo test_mode.
 *   - Uses official dodopayments SDK only.
 */

import fs from 'fs';
import path from 'path';
import DodoPayments from '../functions/node_modules/dodopayments/index.mjs';

console.log('=== Dodo Payments Test Mode Inspection Tool ===');

// Helper to load .env without printing secrets
function loadEnvFile(envPath) {
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        let val = trimmed.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

// Auto-load functions/.env if present
loadEnvFile(path.resolve('functions/.env'));
loadEnvFile(path.resolve('.env'));

const isLiveRun = process.env.RUN_LIVE === '1' || process.env.RUN_LIVE === 'true';

if (!isLiveRun) {
  console.log('[MODE] Offline Simulation (Default)');
  console.log('To run live calls against the Dodo Payments sandbox API, execute with:');
  console.log('  $env:RUN_LIVE="1"; node scripts/test-dodo-payments.mjs --action=<action>\n');
  console.log('Supported actions: checkout, cancel-immediate, cancel-period-end, change-plan, refund');
  console.log('[PASS] SDK verification script loaded successfully.');
  process.exit(0);
}

console.log('[MODE] Live Sandbox Test Mode (RUN_LIVE=1)');

const apiKey =
  process.env.DODO_PAYMENTS_API_KEY_TEST ||
  process.env.DODO_PAYMENTS_API_KEY;

if (!apiKey) {
  console.error('[ERROR] Missing DODO_PAYMENTS_API_KEY_TEST or DODO_PAYMENTS_API_KEY environment variable.');
  console.error('Please configure your test key in functions/.env or your session.');
  process.exit(1);
}

const client = new DodoPayments({
  bearerToken: apiKey,
  environment: 'test_mode',
});

// Parse CLI arguments
const args = process.argv.slice(2);
const options = {};
for (const arg of args) {
  if (arg.startsWith('--')) {
    const [k, v] = arg.slice(2).split('=');
    if (k) options[k] = v || true;
  }
}

const action = options.action || 'checkout';

async function runAction() {
  try {
    switch (action) {
      case 'checkout': {
        console.log('\n1. Creating real Checkout Session via SDK in test_mode...');
        const testProductId = process.env.DODO_PRODUCT_DUAL_SEMESTER || options.product_id || 'p_test_dual_semester';

        const session = await client.checkoutSessions.create({
          product_cart: [{ product_id: testProductId, quantity: 1 }],
          customer: {
            email: 'student-sandbox@pharmacy.internal',
            name: 'Sandbox Test Student',
          },
          return_url: 'http://localhost:5173/catalog?payment=success',
          billing_currency: 'TRY',
          metadata: {
            userId: 'usr_sandbox_test_user_01',
            courseId: 'dual_bundle',
            planId: 'semester_pass',
            dodoEnv: 'test',
          },
        });

        console.log('  -> Status: SUCCESS');
        console.log(`  -> Session ID: ${session.session_id}`);
        console.log(`  -> Checkout Hosted URL: ${session.checkout_url || 'N/A'}`);
        console.log('\n[INSTRUCTION FOR TESTER]:');
        console.log('  1. Open the Checkout Hosted URL in your browser.');
        console.log('  2. Pay using a Dodo test card.');
        console.log('  3. Dodo test webhook will be emitted to your registered endpoint.');
        break;
      }

      case 'cancel-immediate': {
        const subId = options.subscription_id || process.env.TEST_SUBSCRIPTION_ID;
        if (!subId) {
          throw new Error('Missing --subscription_id=sub_xxx for immediate cancellation');
        }
        console.log(`\n2. Executing Immediate Cancellation on Subscription ${subId}...`);
        const result = await client.subscriptions.update(subId, {
          status: 'cancelled',
          cancel_reason: 'cancelled_by_customer',
        });
        console.log('  -> Status: SUCCESS');
        console.log(`  -> Subscription ID: ${result.subscription_id}`);
        console.log(`  -> Resulting Status: ${result.status}`);
        break;
      }

      case 'cancel-period-end': {
        const subId = options.subscription_id || process.env.TEST_SUBSCRIPTION_ID;
        if (!subId) {
          throw new Error('Missing --subscription_id=sub_xxx for period-end cancellation');
        }
        console.log(`\n3. Executing Period-End Cancellation on Subscription ${subId}...`);
        const result = await client.subscriptions.update(subId, {
          cancel_at_next_billing_date: true,
          cancel_reason: 'cancelled_by_customer',
        });
        console.log('  -> Status: SUCCESS');
        console.log(`  -> Subscription ID: ${result.subscription_id}`);
        console.log(`  -> Cancel At Next Billing Date: ${result.cancel_at_next_billing_date}`);
        break;
      }

      case 'change-plan': {
        const subId = options.subscription_id || process.env.TEST_SUBSCRIPTION_ID;
        const newProductId = options.product_id || process.env.TEST_NEW_PRODUCT_ID;
        if (!subId || !newProductId) {
          throw new Error('Missing --subscription_id=sub_xxx or --product_id=pdt_xxx for plan change');
        }
        console.log(`\n4. Executing Change Plan on Subscription ${subId} to Product ${newProductId}...`);
        const result = await client.subscriptions.changePlan(subId, {
          product_id: newProductId,
          proration_billing_mode: 'difference_immediately',
        });
        console.log('  -> Status: SUCCESS');
        console.log(`  -> Subscription ID: ${result.subscription_id}`);
        console.log(`  -> Status: ${result.status}`);
        break;
      }

      case 'refund': {
        const payId = options.payment_id || process.env.TEST_PAYMENT_ID;
        if (!payId) {
          throw new Error('Missing --payment_id=pay_xxx for refund');
        }
        console.log(`\n5. Executing Refund on Payment ${payId}...`);
        const result = await client.refunds.create({
          payment_id: payId,
          reason: 'Test mode smoke test refund',
        });
        console.log('  -> Status: SUCCESS');
        console.log(`  -> Refund ID: ${result.refund_id}`);
        console.log(`  -> Payment ID: ${result.payment_id}`);
        console.log(`  -> Refund Status: ${result.status}`);
        break;
      }

      default: {
        console.error(`[ERROR] Unknown action: ${action}`);
        process.exit(1);
      }
    }
    console.log('\n[PASS] Dodo Payments test_mode API operation executed cleanly.');
  } catch (err) {
    console.error('  -> API Execution Error:', err.message || err);
    process.exit(1);
  }
}

runAction();
