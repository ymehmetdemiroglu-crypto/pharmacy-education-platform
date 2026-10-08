import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const BRAVE_PATH = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';
const TARGET_URL = 'http://localhost:3000/';
const ARTIFACT_DIR = 'C:\\Users\\hp\\.gemini\\antigravity\\brain\\6ba7b02f-9f30-4af6-bf50-274703b549e3\\screenshots';

async function capture() {
  console.log('Launching Brave Browser via Playwright for Pillar 2 Slide Re-Animator Capture...');
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

  // 1. Switch to Slayt Canlandır tab in Segmented navigation
  console.log('Switching to Slayt Canlandır tab...');
  const reanimatorTab = page.locator('span:has-text("Slayt Canlandır"), [title="Slayt Canlandır"]');
  if (await reanimatorTab.count() > 0) {
    await reanimatorTab.first().click();
    await page.waitForTimeout(1500);
  } else {
    // Fallback: click from dashboard if on dashboard
    const dashboardBtn = page.locator('[data-testid="dashboard-reanimator-btn"]');
    if (await dashboardBtn.count() > 0) {
      await dashboardBtn.first().click();
      await page.waitForTimeout(1500);
    }
  }

  // Capture Screenshot 35: Slide Re-Animator Overview
  const shot35Path = path.join(ARTIFACT_DIR, '35_slide_reanimator_overview.png');
  await page.screenshot({ path: shot35Path });
  console.log(`Saved screenshot 35: ${shot35Path}`);

  // Capture Screenshot 36: Live SAR Matrix Simulator
  const shot36Path = path.join(ARTIFACT_DIR, '36_slide_reanimator_widget_sar.png');
  await page.screenshot({ path: shot36Path });
  console.log(`Saved screenshot 36: ${shot36Path}`);

  // Switch to Exemplar 3: Salicylic Acid Ionization slide
  console.log('Switching to Salicylic Acid slide...');
  const salAcBtn = page.locator('button:has-text("Salisilik Asit"), button:has-text("İntramoleküler")');
  if (await salAcBtn.count() > 0) {
    await salAcBtn.first().click();
    await page.waitForTimeout(1500);
  }

  // Capture Screenshot 37: Ionization Chamber widget
  const shot37Path = path.join(ARTIFACT_DIR, '37_slide_reanimator_widget_ionization.png');
  await page.screenshot({ path: shot37Path });
  console.log(`Saved screenshot 37: ${shot37Path}`);

  // Switch back to Dibucaine slide
  console.log('Switching back to Dibucaine SAR slide...');
  const dibucaineBtn = page.locator('button:has-text("Dibukain"), button:has-text("Lokal Anestezik")');
  if (await dibucaineBtn.count() > 0) {
    await dibucaineBtn.first().click();
    await page.waitForTimeout(1000);
  }

  // Switch to Quiz Tab (Vize Meydan Okuma)
  console.log('Switching to Quiz Tab...');
  const quizTab = page.locator('span:has-text("Vize Meydan Okuma")');
  if (await quizTab.count() > 0) {
    await quizTab.first().click();
    await page.waitForTimeout(1000);
  }

  // Capture Screenshot 38: Predict-then-Reveal step
  const shot38Path = path.join(ARTIFACT_DIR, '38_slide_reanimator_predict_step.png');
  await page.screenshot({ path: shot38Path });
  console.log(`Saved screenshot 38: ${shot38Path}`);

  // Fill hypothesis and unlock
  console.log('Submitting hypothesis and answering question...');
  const hypothesisArea = page.locator('[data-testid="reanim-hypothesis-input"]');
  if (await hypothesisArea.count() > 0) {
    await hypothesisArea.first().fill('Amit bağı plazma psödokolinesterazından etkilenmez, karaciğer mikrozomal enzimleri ile yavaş hidroliz olur; dolayısıyla esterlere göre belirgin uzun etki süresi sağlar.');
    await page.waitForTimeout(500);
  }

  const unlockBtn = page.locator('[data-testid="reanim-unlock-hypothesis-btn"]');
  if (await unlockBtn.count() > 0) {
    await unlockBtn.first().click();
    await page.waitForTimeout(1000);
  }

  // Reveal Hints
  const hintBtn = page.locator('[data-testid="reanim-hint-btn"]');
  if (await hintBtn.count() > 0) {
    await hintBtn.first().click();
    await page.waitForTimeout(400);
    await hintBtn.first().click();
    await page.waitForTimeout(400);
  }

  // Select Option A (opt-01-a)
  const optionA = page.locator('[data-testid="reanim-option-opt-01-a"]');
  if (await optionA.count() > 0) {
    await optionA.first().click();
    await page.waitForTimeout(500);
  } else {
    const firstOption = page.locator('div[data-testid^="reanim-option-"]').first();
    if (await firstOption.count() > 0) {
      await firstOption.click();
      await page.waitForTimeout(500);
    }
  }

  // Confirm Answer
  const confirmBtn = page.locator('[data-testid="reanim-submit-quiz-btn"]');
  if (await confirmBtn.count() > 0) {
    await confirmBtn.first().click();
    await page.waitForTimeout(1000);
  }

  // Capture Screenshot 39: Quiz feedback verdict
  const shot39Path = path.join(ARTIFACT_DIR, '39_slide_reanimator_quiz_feedback.png');
  await page.screenshot({ path: shot39Path });
  console.log(`Saved screenshot 39: ${shot39Path}`);

  // Switch to Anki Tab
  console.log('Switching to Anki Tab...');
  const ankiTab = page.locator('span:has-text("Anki (")');
  if (await ankiTab.count() > 0) {
    await ankiTab.first().click();
    await page.waitForTimeout(1000);
  }

  // Capture Screenshot 40: Anki cards preview & export
  const shot40Path = path.join(ARTIFACT_DIR, '40_slide_reanimator_anki_export.png');
  await page.screenshot({ path: shot40Path });
  console.log(`Saved screenshot 40: ${shot40Path}`);

  await browser.close();
  console.log('Visual capture completed successfully!');
}

capture().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
