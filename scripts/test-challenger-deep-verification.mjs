import { chromium } from '@playwright/test';

const BRAVE_PATH = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';
const BASE_URL = 'https://optimusrufus.com';

const TARGET_ROUTES = [
  '/',
  '/reset-password',
  '/dashboard',
  '/tutor/reseptor-etkilesimleri',
  '/catalog'
];

async function runDeepVerification() {
  console.log('=== DEEP EMPIRICAL VERIFICATION OF LIVE PRODUCTION (ITERATION 2) ===\n');

  const browser = await chromium.launch({
    executablePath: BRAVE_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-brave-shields', // Ensure external scripts like cloudflare beacon aren't ad-blocked by browser shields so we test CSP directly
      '--disable-component-update'
    ]
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();

  const failedRequests = [];
  const consoleErrors = [];
  const cspViolations = [];
  const beaconRequests = [];
  const localhostRequests = [];
  const allRequests = [];

  page.on('request', req => {
    const url = req.url();
    allRequests.push(url);
    if (url.includes('cloudflareinsights.com')) {
      beaconRequests.push(url);
    }
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
      localhostRequests.push(url);
    }
  });

  page.on('requestfailed', req => {
    failedRequests.push({
      url: req.url(),
      failure: req.failure()?.errorText || 'unknown'
    });
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push({
        text: msg.text(),
        location: msg.location()
      });
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push({
      text: err.message,
      stack: err.stack
    });
  });

  // Collect CSP violation events from DOM
  await page.exposeFunction('onCspViolation', (violation) => {
    cspViolations.push(violation);
  });

  await page.addInitScript(() => {
    window.addEventListener('securitypolicyviolation', (e) => {
      window.onCspViolation({
        blockedURI: e.blockedURI,
        violatedDirective: e.violatedDirective,
        effectiveDirective: e.effectiveDirective,
        originalPolicy: e.originalPolicy,
        sourceFile: e.sourceFile,
        lineNumber: e.lineNumber
      });
    });
  });

  for (const route of TARGET_ROUTES) {
    const url = `${BASE_URL}${route}`;
    console.log(`Auditing route: ${url}`);
    const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    console.log(`  HTTP status: ${res?.status()}`);
    
    // Wait a brief moment for beacon script execution
    await page.waitForTimeout(2000);
  }

  await browser.close();

  console.log('\n--- VERIFICATION AUDIT RESULTS ---');
  console.log(`Total intercepted requests: ${allRequests.length}`);
  console.log(`Cloudflare beacon related requests: ${beaconRequests.length}`);
  beaconRequests.forEach(b => console.log(`  Beacon URL: ${b}`));
  console.log(`Failed requests count: ${failedRequests.length}`);
  if (failedRequests.length > 0) {
    console.log('Failed requests:', JSON.stringify(failedRequests, null, 2));
  }
  console.log(`Console errors count: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.log('Console errors:', JSON.stringify(consoleErrors, null, 2));
  }
  console.log(`CSP violations count: ${cspViolations.length}`);
  if (cspViolations.length > 0) {
    console.log('CSP violations:', JSON.stringify(cspViolations, null, 2));
  }
  console.log(`Localhost requests count: ${localhostRequests.length}`);
  if (localhostRequests.length > 0) {
    console.log('Localhost requests:', JSON.stringify(localhostRequests, null, 2));
  }

  const pass = 
    consoleErrors.length === 0 &&
    failedRequests.length === 0 &&
    cspViolations.length === 0 &&
    localhostRequests.length === 0 &&
    beaconRequests.length > 0;

  console.log(`\nOVERALL VERIFICATION: ${pass ? 'PASSED' : 'FAILED'}`);
  process.exit(pass ? 0 : 1);
}

runDeepVerification().catch(err => {
  console.error('Test script crashed:', err);
  process.exit(1);
});
