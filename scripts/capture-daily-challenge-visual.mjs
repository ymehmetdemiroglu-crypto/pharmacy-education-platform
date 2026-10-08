import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const BRAVE_PATH = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';
const TARGET_URL = 'http://localhost:5173/';
const ARTIFACT_DIR = 'C:\\Users\\hp\\.gemini\\antigravity\\brain\\6ba7b02f-9f30-4af6-bf50-274703b549e3\\screenshots';

async function capture() {
  console.log('Launching Brave Browser via Playwright...');
  const browser = await chromium.launch({
    executablePath: BRAVE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  const page = await context.newPage();

  console.log(`Navigating to ${TARGET_URL}...`);
  await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 30000 });

  // If on landing hero, click explore as guest
  const guestBtn = page.locator('button:has-text("Öğrenmeye Başla"), button:has-text("Keşfetmeye Başla")');
  if (await guestBtn.count() > 0) {
    console.log('Clicking landing hero explore button...');
    await guestBtn.first().click();
    await page.waitForTimeout(1500);
  }

  // Switch to Dashboard view
  const dashboardTab = page.locator('span:has-text("Ders Panosu"), [title="Ders Panosu"]');
  if (await dashboardTab.count() > 0) {
    console.log('Switching to Ders Panosu tab...');
    await dashboardTab.first().click();
    await page.waitForTimeout(1500);
  }

  // Capture Screenshot 24: Dashboard with Günün 10'u CTA
  const shot24Path = path.join(ARTIFACT_DIR, '24_course_dashboard_with_daily_cta.png');
  await page.screenshot({ path: shot24Path });
  console.log(`Saved screenshot 24: ${shot24Path}`);

  // Click "Günün 10 Sorusuna Başla ⚡" button
  const dailyBtn = page.locator('button:has-text("Günün 10 Sorusuna Başla")');
  console.log('Clicking Günün 10 Sorusuna Başla button...');
  await dailyBtn.first().click();
  await page.waitForTimeout(1000);

  // Capture Screenshot 25: Daily Challenge Modal Step 1
  const shot25Path = path.join(ARTIFACT_DIR, '25_daily_challenge_modal_step1.png');
  await page.screenshot({ path: shot25Path });
  console.log(`Saved screenshot 25: ${shot25Path}`);

  // Reveal Hint 1
  const hintBtn = page.locator('text=1. Basamağı Aç (Nudge)');
  if (await hintBtn.count() > 0) {
    console.log('Clicking 1. Basamağı Aç...');
    await hintBtn.first().click();
    await page.waitForTimeout(500);
  }

  // Capture Screenshot 26: Hint Revealed
  const shot26Path = path.join(ARTIFACT_DIR, '26_daily_challenge_modal_hint_revealed.png');
  await page.screenshot({ path: shot26Path });
  console.log(`Saved screenshot 26: ${shot26Path}`);

  // Select Option A and Confirm
  const optionA = page.locator('text=İdrarı sodyum bikarbonat ile bazikleştirmek');
  if (await optionA.count() > 0) {
    console.log('Selecting Option A...');
    await optionA.first().click();
    await page.waitForTimeout(500);

    const submitBtn = page.locator('button:has-text("Cevabı Onayla")');
    if (await submitBtn.count() > 0) {
      console.log('Submitting answer...');
      await submitBtn.first().click();
      await page.waitForTimeout(1000);
    }
  }

  // Capture Screenshot 27: Solved with Diagnostic Feedback
  const shot27Path = path.join(ARTIFACT_DIR, '27_daily_challenge_modal_feedback.png');
  await page.screenshot({ path: shot27Path });
  console.log(`Saved screenshot 27: ${shot27Path}`);

  await browser.close();
  console.log('All visual verification screenshots captured successfully!');
}

capture().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
