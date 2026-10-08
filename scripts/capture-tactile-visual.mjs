import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const BRAVE_PATH = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';
const TARGET_URL = 'http://localhost:3000/';
const ARTIFACT_DIR = 'C:\\Users\\hp\\.gemini\\antigravity\\brain\\6ba7b02f-9f30-4af6-bf50-274703b549e3\\screenshots';

async function capture() {
  console.log('Launching Brave Browser via Playwright for Pillar 3 Tactile Mechanism & SAR Capture...');
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

  // 1. Switch to Çizerek Öğren tab in Segmented navigation
  console.log('Switching to Çizerek Öğren tab...');
  const tactileTab = page.locator('span:has-text("Çizerek Öğren"), [title="Çizerek Öğren"]');
  if (await tactileTab.count() > 0) {
    await tactileTab.first().click();
    await page.waitForTimeout(1500);
  } else {
    // Fallback: click from dashboard if on dashboard
    const dashboardBtn = page.locator('[data-testid="dashboard-tactile-btn"]');
    if (await dashboardBtn.count() > 0) {
      await dashboardBtn.first().click();
      await page.waitForTimeout(1500);
    }
  }

  // Capture Screenshot 41: Tactile Mechanism Overview
  const shot41Path = path.join(ARTIFACT_DIR, '41_tactile_mechanism_overview.png');
  await page.screenshot({ path: shot41Path });
  console.log(`Saved screenshot 41: ${shot41Path}`);

  // 2. Switch to Stage 2: Yarı İpucu
  console.log('Switching to Stage 2 (Yarı İpucu)...');
  const stage2Btn = page.locator('button:has-text("2. Yarı İpucu")');
  if (await stage2Btn.count() > 0) {
    await stage2Btn.first().click();
    await page.waitForTimeout(1000);
  }

  // Capture Screenshot 42: Worked Example Fading Stage
  const shot42Path = path.join(ARTIFACT_DIR, '42_tactile_worked_example_fading.png');
  await page.screenshot({ path: shot42Path });
  console.log(`Saved screenshot 42: ${shot42Path}`);

  // 3. Switch to Stage 3: Hedefli (Amber pulsing targets)
  console.log('Switching to Stage 3 (Hedefli)...');
  const stage3Btn = page.locator('button:has-text("3. Hedefli")');
  if (await stage3Btn.count() > 0) {
    await stage3Btn.first().click();
    await page.waitForTimeout(1000);
  }

  // Capture Screenshot 43: Arrow Pushing Canvas with Target Targets
  const shot43Path = path.join(ARTIFACT_DIR, '43_tactile_arrow_pushing_canvas.png');
  await page.screenshot({ path: shot43Path });
  console.log(`Saved screenshot 43: ${shot43Path}`);

  // 4. Trigger validation with single arrow (or incomplete) to show Texas Carbon Feedback
  console.log('Triggering validation to showcase Texas Karbon Octet Violation feedback...');
  const validateBtn = page.locator('button:has-text("Mekanizmayı Doğrula")');
  if (await validateBtn.count() > 0 && await validateBtn.isEnabled()) {
    await validateBtn.click();
    await page.waitForTimeout(1000);
  } else {
    // If disabled in stage 3 without arrows, go back to stage 2 and validate
    const stage2 = page.locator('button:has-text("2. Yarı İpucu")');
    if (await stage2.count() > 0) {
      await stage2.click();
      await page.waitForTimeout(500);
      const val2 = page.locator('button:has-text("Mekanizmayı Doğrula")');
      if (await val2.count() > 0) {
        await val2.click();
        await page.waitForTimeout(1000);
      }
    }
  }

  // Unlock Tier 1 hint
  const unlockHintBtn = page.locator('button:has-text("İpucunu Aç")');
  if (await unlockHintBtn.count() > 0) {
    await unlockHintBtn.first().click();
    await page.waitForTimeout(800);
  }

  // Capture Screenshot 44: Texas Carbon Feedback & Hint Revealed
  const shot44Path = path.join(ARTIFACT_DIR, '44_tactile_texas_carbon_feedback.png');
  await page.screenshot({ path: shot44Path });
  console.log(`Saved screenshot 44: ${shot44Path}`);

  // 5. Switch to Mode 2: Sübstitüent Tak-Çıkar (SAR Snapping)
  console.log('Switching to Mode 2 (SAR Snapping)...');
  const sarTab = page.locator('button:has-text("Sübstitüent Tak-Çıkar")');
  if (await sarTab.count() > 0) {
    await sarTab.first().click();
    await page.waitForTimeout(1500);
  }

  // Capture Screenshot 45: SAR Substituent Snap Palette
  const shot45Path = path.join(ARTIFACT_DIR, '45_tactile_sar_snap_palette.png');
  await page.screenshot({ path: shot45Path });
  console.log(`Saved screenshot 45: ${shot45Path}`);

  // 6. Apply -NO2 (Nitro) substituent to test real-time Hammett/logP recalculation
  console.log('Applying -NO2 (Nitro) substituent...');
  const nitroChip = page.locator('button:has-text("-NO₂")');
  if (await nitroChip.count() > 0) {
    await nitroChip.first().click();
    await page.waitForTimeout(1000);
  }

  // Capture Screenshot 46: Dynamic SAR Gauges with Nitro Applied
  const shot46Path = path.join(ARTIFACT_DIR, '46_tactile_sar_gauges_dynamic.png');
  await page.screenshot({ path: shot46Path });
  console.log(`Saved screenshot 46: ${shot46Path}`);

  console.log('Successfully captured all 6 visual verification screenshots!');
  await browser.close();
}

capture().catch((err) => {
  console.error('Error during tactile visual capture:', err);
  process.exit(1);
});
