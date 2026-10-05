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

async function runBraveAudit(modeName, launchArgs) {
  console.log(`\n============================================================`);
  console.log(`RUNNING BRAVE AUDIT: ${modeName}`);
  console.log(`============================================================`);

  const browser = await chromium.launch({
    executablePath: BRAVE_PATH,
    headless: true,
    args: launchArgs
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();

  const networkRequests = [];
  const consoleErrors = [];
  const localhostRequests = [];

  page.on('request', req => {
    const url = req.url();
    networkRequests.push(url);
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
      localhostRequests.push(url);
      console.error(`[LEAK DETECTED] Outgoing request to localhost: ${url}`);
    }
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  const routeResults = [];

  for (const route of TARGET_ROUTES) {
    const fullUrl = `${BASE_URL}${route}`;
    console.log(`Probing: ${fullUrl}`);

    const res = await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });
    const status = res ? res.status() : null;
    const title = await page.title();
    
    // Check if error boundary or crashed page is visible
    const content = await page.content();
    const hasRoot = content.includes('id="root"');
    const isError = content.includes('Something went wrong') || content.includes('Application Error');

    console.log(`  -> Status: ${status}, Title: "${title}", Error boundary: ${isError ? 'TRIGGERED' : 'CLEAN'}`);

    routeResults.push({
      route,
      status,
      title,
      isError,
      hasRoot
    });
  }

  await browser.close();

  console.log(`\nSummary for ${modeName}:`);
  console.log(`Total network requests intercepted: ${networkRequests.length}`);
  console.log(`Localhost/127.0.0.1 network requests: ${localhostRequests.length}`);
  console.log(`Console errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  }

  return {
    modeName,
    networkRequestsCount: networkRequests.length,
    localhostRequests,
    consoleErrors,
    routeResults
  };
}

async function main() {
  // Mode 1: Brave Default
  const mode1 = await runBraveAudit('Brave Default Shields', [
    '--no-sandbox',
    '--disable-setuid-sandbox'
  ]);

  // Mode 2: Brave Shields Down
  const mode2 = await runBraveAudit('Brave Shields Down', [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-brave-shields',
    '--disable-component-update'
  ]);

  console.log('\n============================================================');
  console.log('FINAL CHALLENGER VERDICT ASSESSMENT');
  console.log('============================================================');
  console.log('Mode 1 Localhost requests:', mode1.localhostRequests);
  console.log('Mode 2 Localhost requests:', mode2.localhostRequests);
  console.log('Mode 1 Console errors:', mode1.consoleErrors);
  console.log('Mode 2 Console errors:', mode2.consoleErrors);
}

main().catch(err => {
  console.error('Brave audit failed:', err);
  process.exit(1);
});
