import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const BRAVE_PATH = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';
const TARGET_URL = 'http://localhost:3000/';
const ARTIFACT_DIR = 'C:\\Users\\hp\\.gemini\\antigravity\\brain\\6ba7b02f-9f30-4af6-bf50-274703b549e3\\screenshots';

async function capture() {
  console.log('Launching Brave Browser via Playwright for Pillar 4 Sanal Amfi & Fakülte Masası Capture...');
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
  await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Wait for loading fallback to disappear if present
  try {
    const loadingScreen = page.locator('text=PharmLearn Studio Yükleniyor');
    if (await loadingScreen.isVisible()) {
      console.log('Waiting for initial chunk loading to complete...');
      await loadingScreen.waitFor({ state: 'detached', timeout: 15000 });
    }
  } catch (e) {
    // Ignore if not present
  }

  await page.waitForTimeout(2000);

  // If on landing hero, click explore as guest
  const guestBtn = page.locator('button:has-text("Öğrenmeye Başla"), button:has-text("Keşfetmeye Başla")');
  if (await guestBtn.count() > 0 && await guestBtn.first().isVisible()) {
    console.log('Clicking landing hero explore button...');
    await guestBtn.first().click();
    await page.waitForTimeout(2000);
  }

  // 1. Switch to Sanal Amfi tab in Segmented navigation or via top button
  console.log('Switching to Sanal Amfi tab...');
  const amfiTab = page.locator('span:has-text("Sanal Amfi"), [title="Sanal Amfi & Fakülte Masası"]');
  if (await amfiTab.count() > 0) {
    await amfiTab.first().click();
    await page.waitForTimeout(1500);
  } else {
    // Fallback: click from dashboard button if present
    const amfiBtn = page.locator('[data-testid="dashboard-amfi-btn"]');
    if (await amfiBtn.count() > 0) {
      await amfiBtn.first().click();
      await page.waitForTimeout(1500);
    }
  }

  // Capture Screenshot 47: Amfi Overview (Marmara Eczacılık)
  const shot47Path = path.join(ARTIFACT_DIR, '47_amfi_overview.png');
  await page.screenshot({ path: shot47Path });
  console.log(`Saved screenshot 47: ${shot47Path}`);

  // 2. Switch to Hacettepe Eczacılık
  console.log('Switching to Hacettepe Eczacılık room...');
  const hacettepeBtn = page.locator('button:has-text("Hacettepe Eczacılık")');
  if (await hacettepeBtn.count() > 0) {
    await hacettepeBtn.first().click();
    await page.waitForTimeout(1200);
  }

  // Capture Screenshot 48: Hacettepe Room Switch
  const shot48Path = path.join(ARTIFACT_DIR, '48_amfi_faculty_switch.png');
  await page.screenshot({ path: shot48Path });
  console.log(`Saved screenshot 48: ${shot48Path}`);

  // 3. Switch to Ankara Eczacılık (k < 10 fallback trigger)
  console.log('Switching to Ankara Eczacılık room (k < 10 fallback)...');
  const ankaraBtn = page.locator('button:has-text("Ankara Eczacılık")');
  if (await ankaraBtn.count() > 0) {
    await ankaraBtn.first().click();
    await page.waitForTimeout(1200);
  }

  // Capture Screenshot 49: k < 10 Anonymity Fallback Notice
  const shot49Path = path.join(ARTIFACT_DIR, '49_amfi_k_anonymity_fallback.png');
  await page.screenshot({ path: shot49Path });
  console.log(`Saved screenshot 49: ${shot49Path}`);

  // 4. Switch back to Marmara Eczacılık to showcase Misconception Surge Alert Banner
  console.log('Switching back to Marmara Eczacılık to inspect Surge Banner...');
  const marmaraBtn = page.locator('button:has-text("Marmara Eczacılık")');
  if (await marmaraBtn.count() > 0) {
    await marmaraBtn.first().click();
    await page.waitForTimeout(1200);
  }

  // Capture Screenshot 50: Misconception Surge Banner
  const shot50Path = path.join(ARTIFACT_DIR, '50_amfi_surge_banner.png');
  await page.screenshot({ path: shot50Path });
  console.log(`Saved screenshot 50: ${shot50Path}`);

  // 5. Open Misconception Challenge Modal
  console.log('Opening Socratic Misconception Challenge Modal...');
  const challengeBtn = page.locator('button:has-text("Tuzak Mücadelesine Katıl")');
  if (await challengeBtn.count() > 0) {
    await challengeBtn.first().click();
    await page.waitForTimeout(1000);
  } else {
    // Fallback: click Tuzağı Gör from table
    const trapBtn = page.locator('button:has-text("Tuzağı Gör")').first();
    if (await trapBtn.count() > 0) {
      await trapBtn.click();
      await page.waitForTimeout(1000);
    }
  }

  // Expand hints
  console.log('Expanding hint ladder in challenge modal...');
  const hintBtn = page.locator('button:has-text("İpucu Al")');
  if (await hintBtn.count() > 0) {
    await hintBtn.click();
    await page.waitForTimeout(500);
  }

  // Capture Screenshot 51: Challenge Modal with Predict Step and Hints
  const shot51Path = path.join(ARTIFACT_DIR, '51_amfi_challenge_predict.png');
  await page.screenshot({ path: shot51Path });
  console.log(`Saved screenshot 51: ${shot51Path}`);

  // 6. Select Option B (the correct option) and submit to lock hypothesis
  console.log('Selecting option and submitting to lock hypothesis...');
  const optB = page.locator('button:has-text("dihidropteroat sentaz")');
  if (await optB.count() > 0) {
    await optB.first().click();
    await page.waitForTimeout(500);
  }

  const submitBtn = page.locator('button:has-text("Cevabı Kilitle & Amfi İstatistiğini Gör")');
  if (await submitBtn.count() > 0 && await submitBtn.isEnabled()) {
    await submitBtn.click();
    await page.waitForTimeout(1200);
  }

  // Capture Screenshot 52: Verdict and Cohort Breakdown
  const shot52Path = path.join(ARTIFACT_DIR, '52_amfi_challenge_verdict.png');
  await page.screenshot({ path: shot52Path });
  console.log(`Saved screenshot 52: ${shot52Path}`);

  await browser.close();
  console.log('Pillar 4 Sanal Amfi visual capture completed successfully!');
}

capture().catch((err) => {
  console.error('Capture failed:', err);
  process.exit(1);
});
