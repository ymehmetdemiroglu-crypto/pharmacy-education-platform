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

async function runMobileAudit() {
  console.log('=== MOBILE VIEWPORT (390x844) LIVE VERIFICATION ===\n');

  const browser = await chromium.launch({
    executablePath: BRAVE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true
  });

  const page = await context.newPage();
  const consoleErrors = [];
  const failedRequests = [];

  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  page.on('requestfailed', req => {
    failedRequests.push({ url: req.url(), err: req.failure()?.errorText });
  });

  for (const r of TARGET_ROUTES) {
    const url = `${BASE_URL}${r}`;
    const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    console.log(`Mobile route ${r}: status ${res?.status()}, title: "${await page.title()}"`);
  }

  await browser.close();

  console.log(`Mobile console errors: ${consoleErrors.length}`);
  console.log(`Mobile failed requests: ${failedRequests.length}`);

  if (consoleErrors.length > 0 || failedRequests.length > 0) {
    process.exit(1);
  } else {
    console.log('Mobile verification: PASSED');
    process.exit(0);
  }
}

runMobileAudit().catch(err => {
  console.error(err);
  process.exit(1);
});
