import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const BRAVE_PATH = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';
const TARGET_URL = 'http://localhost:3000/';
const ARTIFACT_DIR = 'C:\\Users\\hp\\.gemini\\antigravity\\brain\\6ba7b02f-9f30-4af6-bf50-274703b549e3\\screenshots';

async function capture() {
  console.log('Launching Brave Browser via Playwright for Pillar 5 Metrobüs Modu Capture...');
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

  // 1. Switch to Metrobüs Modu tab in Segmented navigation or via dashboard button
  console.log('Switching to Metrobüs Modu tab...');
  const metrobusTab = page.locator('span:has-text("Metrobüs Modu"), [title="Metrobüs Sesli Mod"]');
  if (await metrobusTab.count() > 0) {
    await metrobusTab.first().click();
    await page.waitForTimeout(1500);
  } else {
    // Fallback: switch to dashboard first then click Metrobüs button
    const dashboardTab = page.locator('span:has-text("Ders Panosu")');
    if (await dashboardTab.count() > 0) {
      await dashboardTab.first().click();
      await page.waitForTimeout(1000);
    }
    const metrobusBtn = page.locator('[data-testid="dashboard-metrobus-btn"]');
    if (await metrobusBtn.count() > 0) {
      await metrobusBtn.first().click();
      await page.waitForTimeout(1500);
    }
  }

  if (!fs.existsSync(ARTIFACT_DIR)) {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  }

  // --- Screenshot 53: Metrobüs Modu Overview ---
  console.log('Capturing 53_metrobus_overview.png...');
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, '53_metrobus_overview.png'),
    fullPage: false,
  });

  // --- Screenshot 54: Acoustic Filter Details & DSP EQ Curve ---
  console.log('Toggling DSP EQ curve and capturing 54_metrobus_acoustic_filter.png...');
  const eqToggleBtn = page.locator('button:has-text("DSP EQ Eğrisi")');
  if (await eqToggleBtn.count() > 0) {
    await eqToggleBtn.first().click();
    await page.waitForTimeout(1000);
  }
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, '54_metrobus_acoustic_filter.png'),
    fullPage: false,
  });

  // Switch back to spectrum bars for cleaner waveform
  const spectrumToggleBtn = page.locator('button:has-text("Spektrum Çubukları")');
  if (await spectrumToggleBtn.count() > 0) {
    await spectrumToggleBtn.first().click();
    await page.waitForTimeout(500);
  }

  // --- Screenshot 55: Question Prompt Playback / Speaking State ---
  console.log('Triggering prompt replay and capturing 55_metrobus_speaking_prompt.png...');
  const repeatBtn = page.locator('[data-testid="metrobus-repeat-btn"]');
  if (await repeatBtn.count() > 0) {
    await repeatBtn.first().click();
    await page.waitForTimeout(1000);
  }
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, '55_metrobus_speaking_prompt.png'),
    fullPage: false,
  });

  // --- Screenshot 56: Verbal Nudge / Hint Ladder Unlocked ---
  console.log('Unlocking verbal nudge and capturing 56_metrobus_hint_ladder.png...');
  const hintBtn = page.locator('[data-testid="metrobus-hint-btn"]');
  if (await hintBtn.count() > 0) {
    await hintBtn.first().click();
    await page.waitForTimeout(1000);
  }
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, '56_metrobus_hint_ladder.png'),
    fullPage: false,
  });

  // --- Screenshot 57: Voice Listening Orb ---
  console.log('Capturing 57_metrobus_voice_listening.png...');
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, '57_metrobus_voice_listening.png'),
    fullPage: false,
  });

  // --- Screenshot 58: Feedback Verdict & Affirmation ---
  console.log('Selecting correct answer option and capturing 58_metrobus_feedback_verdict.png...');
  const correctOption = page.locator('button:has-text("Enzim yaşlanır (alkil kopar, kalıcı blokaj)")');
  if (await correctOption.count() > 0) {
    await correctOption.first().click();
    await page.waitForTimeout(1200);
  }
  const verdictBox = page.locator('[data-testid="metrobus-verdict-box"]');
  if (await verdictBox.count() > 0) {
    await verdictBox.first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
  }
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, '58_metrobus_feedback_verdict.png'),
    fullPage: false,
  });

  await browser.close();
  console.log('Successfully captured screenshots 53 to 58 for Metrobüs Modu!');
}

capture().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
