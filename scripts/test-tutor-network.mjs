import { chromium } from '@playwright/test';

const BRAVE_PATH = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';

async function testTutor() {
  const browser = await chromium.launch({
    executablePath: BRAVE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const requests = [];
  page.on('request', req => requests.push({ url: req.url(), method: req.method() }));
  
  await page.goto('https://optimusrufus.com/tutor/reseptor-etkilesimleri', { waitUntil: 'networkidle' });

  console.log('Tutor Page Title:', await page.title());
  
  const buttons = await page.locator('button').count();
  console.log('Buttons count on Tutor page:', buttons);

  console.log('Total Requests on /tutor/reseptor-etkilesimleri:', requests.length);
  let leaks = 0;
  for (const r of requests) {
    if (r.url.includes('localhost') || r.url.includes('127.0.0.1')) {
      console.error('LEAK ON TUTOR:', r.url);
      leaks++;
    }
  }
  console.log('Localhost leaks on Tutor page:', leaks);

  await browser.close();
}

testTutor().catch(console.error);
