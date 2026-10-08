import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const BRAVE_PATH = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';
const TARGET_URL = 'http://localhost:3000/';
const ARTIFACT_DIR = 'C:\\Users\\hp\\.gemini\\antigravity\\brain\\6ba7b02f-9f30-4af6-bf50-274703b549e3\\screenshots';

async function capture() {
  console.log('Launching Brave Browser via Playwright for Pillar 1 Vize Triage Capture...');
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

  // 1. Switch to Dashboard tab and capture Dashboard with Vize Kampı CTA
  console.log('Switching to Ders Panosu tab...');
  const dashboardTab = page.locator('span:has-text("Ders Panosu"), [title="Ders Panosu"]');
  if (await dashboardTab.count() > 0) {
    await dashboardTab.first().click();
    await page.waitForTimeout(1500);
  }

  const shot34Path = path.join(ARTIFACT_DIR, '34_dashboard_vize_cram_cta.png');
  await page.screenshot({ path: shot34Path });
  console.log(`Saved screenshot 34: ${shot34Path}`);

  // 2. Switch to Vize Triage Tab
  console.log('Switching to Vize Triage tab...');
  const triageTab = page.locator('span:has-text("Vize Triage"), [title="Vize Isı Haritası"]');
  if (await triageTab.count() > 0) {
    await triageTab.first().click();
    await page.waitForTimeout(1500);
  } else {
    // Fallback: click Vize Kampı button from dashboard
    const cramLaunchBtn = page.locator('[data-testid="dashboard-vize-cram-btn"]');
    if (await cramLaunchBtn.count() > 0) {
      await cramLaunchBtn.first().click();
      await page.waitForTimeout(1500);
    }
  }

  // Capture Screenshot 28: MedChem Slide Heatmap
  const shot28Path = path.join(ARTIFACT_DIR, '28_slide_heatmap_medchem.png');
  await page.screenshot({ path: shot28Path });
  console.log(`Saved screenshot 28: ${shot28Path}`);

  // Switch to Pharmacology
  const pharmSegment = page.locator('[data-testid="segment-pharmacology"]');
  if (await pharmSegment.count() > 0) {
    console.log('Switching to Farmakoloji course...');
    await pharmSegment.first().click();
    await page.waitForTimeout(1500);
  }

  // Capture Screenshot 29: Pharmacology Slide Heatmap
  const shot29Path = path.join(ARTIFACT_DIR, '29_slide_heatmap_pharmacology.png');
  await page.screenshot({ path: shot29Path });
  console.log(`Saved screenshot 29: ${shot29Path}`);

  // Switch back to MedChem for Cram modal walkthrough
  const medchemSegment = page.locator('[data-testid="segment-medchem"]');
  if (await medchemSegment.count() > 0) {
    console.log('Switching back to Farmasötik Kimya...');
    await medchemSegment.first().click();
    await page.waitForTimeout(1000);
  }

  // Click Hero 1-Click Vize Kampı button
  const heroCramBtn = page.locator('[data-testid="hero-start-cram-btn"]');
  console.log('Clicking 1-Tıkla Vize Kampına Başla button...');
  await heroCramBtn.first().click();
  await page.waitForTimeout(1500);

  // Capture Screenshot 30: Cram Modal Step 1 Spotlight
  const shot30Path = path.join(ARTIFACT_DIR, '30_vize_cram_modal_spotlight.png');
  await page.screenshot({ path: shot30Path });
  console.log(`Saved screenshot 30: ${shot30Path}`);

  // Advance to Step 2: Predict
  const advanceToPredictBtn = page.locator('[data-testid="advance-to-predict-btn"]');
  if (await advanceToPredictBtn.count() > 0) {
    console.log('Advancing to Predict Step...');
    await advanceToPredictBtn.first().click();
    await page.waitForTimeout(1000);

    // Fill hypothesis
    const hypothesisInput = page.locator('[data-testid="hypothesis-input"]');
    if (await hypothesisInput.count() > 0) {
      await hypothesisInput.fill('AChE serin hidroksilinin organofosfatla irreversibl fosforilasyonu ve alkil grubunun ayrılmasıyla yaşlanma (aging) reaksiyonu.');
      await page.waitForTimeout(500);
    }
  }

  // Capture Screenshot 31: Cram Modal Step 2 Predict
  const shot31Path = path.join(ARTIFACT_DIR, '31_vize_cram_modal_predict.png');
  await page.screenshot({ path: shot31Path });
  console.log(`Saved screenshot 31: ${shot31Path}`);

  // Unlock Challenge
  const unlockBtn = page.locator('[data-testid="unlock-challenge-btn"]');
  if (await unlockBtn.count() > 0) {
    console.log('Unlocking Challenge Step...');
    await unlockBtn.first().click();
    await page.waitForTimeout(1000);

    // Reveal hints progressively
    const hintBtn = page.locator('[data-testid="reveal-hint-btn"]');
    if (await hintBtn.count() > 0) {
      console.log('Revealing Hint 1...');
      await hintBtn.first().click();
      await page.waitForTimeout(500);
      console.log('Revealing Hint 2...');
      await hintBtn.first().click();
      await page.waitForTimeout(500);
    }
  }

  // Capture Screenshot 32: Cram Modal Step 3 Challenge with Hints
  const shot32Path = path.join(ARTIFACT_DIR, '32_vize_cram_modal_challenge_hints.png');
  await page.screenshot({ path: shot32Path });
  console.log(`Saved screenshot 32: ${shot32Path}`);

  // Submit correct option (opt-1)
  const optionBtn = page.locator('[data-testid="cram-option-opt-1"]');
  if (await optionBtn.count() > 0) {
    console.log('Submitting answer...');
    await optionBtn.first().click();
    await page.waitForTimeout(1200);
  }

  // Capture Screenshot 33: Cram Modal Step 4 Diagnostic Verdict
  const shot33Path = path.join(ARTIFACT_DIR, '33_vize_cram_modal_verdict.png');
  await page.screenshot({ path: shot33Path });
  console.log(`Saved screenshot 33: ${shot33Path}`);

  await browser.close();
  console.log('All Pillar 1 visual verification screenshots captured successfully!');
}

capture().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
