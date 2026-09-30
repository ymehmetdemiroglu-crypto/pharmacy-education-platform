import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve(process.cwd(), 'docs/screenshots/phase-2');

test.beforeAll(async () => {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }
});

test.describe('Pharmacy Platform Phase 2 UI & State Matrix Verification (A3 Protocol)', () => {
  test('comprehensive screenshot state matrix, multi-locale, dark/RTL, and keyboard navigation', async ({
    page,
  }, testInfo) => {
    test.setTimeout(90000);
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('requestfailed', (req) => {
      failedRequests.push(`${req.url()} (${req.failure()?.errorText})`);
    });

    const prefix = testInfo.project.name;

    // 1. Visit Gallery Page (Default Light EN)
    await page.goto('/gallery');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toBeVisible();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-gallery-light-en.png`),
      fullPage: true,
    });

    // 2. Turkish Locale (TR LTR) on Gallery
    await page.getByRole('button', { name: 'TR', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
    await expect(page.getByText('Eczacılık Etkileşimli Galerisi')).toBeVisible();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-gallery-tr.png`),
    });

    // 3. Dark + RTL (Arabic) on Gallery
    await page.getByRole('button', { name: 'AR', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await page.getByRole('button', { name: /toggle dark mode|toggle theme|temayı değiştir|تبديل المظهر/i }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-gallery-dark-rtl-ar.png`),
    });

    // Revert to English and Light Mode for matrix captures
    await page.getByRole('button', { name: /toggle dark mode|toggle theme|temayı değiştir|تبديل المظهر/i }).click();
    await page.getByRole('button', { name: 'EN', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');

    // 4. Component State Matrix Snapshots
    // Buttons (default, hover, focus, disabled, loading)
    const btnDefault = page.locator('[data-testid="btn-default"]');
    await btnDefault.hover();
    await page.locator('[data-testid="btn-secondary"]').focus();
    await page.locator('[data-testid="section-buttons"]').screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-components-buttons.png`),
    });

    // Cards (default, highlight, misconception, success)
    await page.locator('[data-testid="section-cards"]').screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-components-cards.png`),
    });

    // StepDots & ProgressBars (interactive, completed, small)
    await page.locator('[data-testid="section-steppers"]').screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-components-steppers.png`),
    });
    await page.locator('[data-testid="section-progress"]').screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-components-progress.png`),
    });

    // Form Controls (Input default, error, disabled; Slider default, disabled; Toggle checked, unchecked, disabled)
    await page.locator('[data-testid="input-default"]').focus();
    await page.locator('[data-testid="section-form-controls"]').screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-components-form-controls.png`),
    });

    // Empty State and Skeleton Loader (Zero CLS)
    await page.locator('[data-testid="section-empty-skeleton"]').screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-components-empty-and-skeleton.png`),
    });

    // Trial Banners (free_preview, active_trial, expired_trial)
    await page.locator('[data-testid="section-trial-banners"]').screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-components-trial-banners.png`),
    });

    // 5. All 9 Widgets State Snapshots
    // Widget 1: SAR Explorer (Default and Analog state)
    const widgetContainer = page.locator('[data-testid="active-widget-container"]');
    await page.getByRole('button', { name: 'SAR Explorer', exact: true }).click();
    await expect(page.getByText(/propranolol analogs structure-activity/i)).toBeVisible();
    await widgetContainer.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-widget-1-sar-default.png`) });
    await page.getByRole('button', { name: /isopropyl/i }).click();
    await widgetContainer.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-widget-1-sar-analog.png`) });

    // Widget 2: Structure Identifier (Default, Correct, Incorrect)
    await page.getByRole('button', { name: 'Structure Identifier', exact: true }).click();
    await expect(page.getByText(/essential hydrogen bond donor/i)).toBeVisible();
    await widgetContainer.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-widget-2-structure-default.png`) });

    // Widget 3: Dose-Response Curve (Agonist alone vs Competitive Antagonist)
    await page.getByRole('button', { name: 'Dose-Response Curve', exact: true }).click();
    await expect(page.getByText(/adrenoceptor agonist vs antagonist/i)).toBeVisible();
    await widgetContainer.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-widget-3-dose-response-default.png`) });
    await page.getByRole('button', { name: 'competitive antagonist', exact: true }).click();
    await widgetContainer.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-widget-3-dose-response-antagonist.png`) });

    // Widget 4: PK Simulator (Single dose vs Multi-dose)
    await page.getByRole('button', { name: 'PK Simulator', exact: true }).click();
    await expect(page.getByText(/gentamicin pharmacokinetic profile/i)).toBeVisible();
    await widgetContainer.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-widget-4-pk-single-dose.png`) });
    await page.getByRole('checkbox', { name: /multiple dosing/i }).check({ force: true });
    await widgetContainer.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-widget-4-pk-multi-dose.png`) });

    // Widget 5: Predict-Then-Reveal (Default, Correct Hypothesis, Revealed)
    await page.getByRole('button', { name: 'Predict-Then-Reveal', exact: true }).click();
    await expect(page.getByText(/predict the effect of tetrazole/i)).toBeVisible();
    await widgetContainer.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-widget-5-predict-default.png`) });
    await page.getByRole('button', { name: /mimics the carboxylate anion/i }).click();
    await page.getByRole('button', { name: /reveal experimental outcome/i }).click();
    await widgetContainer.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-widget-5-predict-correct-revealed.png`) });

    // Widget 6: Multiple Choice (MCQ)
    await page.getByRole('button', { name: 'Multiple Choice (MCQ)', exact: true }).click();
    await expect(page.getByText(/which thermodynamic force provides/i)).toBeVisible();
    await widgetContainer.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-widget-6-mcq-default.png`) });

    // Widget 7: Receptor Matcher
    await page.getByRole('button', { name: 'Receptor Matcher', exact: true }).click();
    await expect(page.getByText(/match each chemical moiety/i)).toBeVisible();
    await widgetContainer.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-widget-7-receptor-matcher-default.png`) });

    // Widget 8: Metabolism Map
    await page.getByRole('button', { name: 'Metabolism Map', exact: true }).click();
    await expect(page.getByText(/identify which metabolic pathway/i)).toBeVisible();
    await widgetContainer.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-widget-8-metabolism-map-default.png`) });

    // Widget 9: Hint Ladder
    await page.getByRole('button', { name: 'Hint Ladder', exact: true }).click();
    await expect(page.getByText(/predict which functional modification/i)).toBeVisible();
    await widgetContainer.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-widget-9-hint-ladder-tier1.png`) });
    await page.getByRole('button', { name: /need a hint/i }).click();
    await widgetContainer.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-widget-9-hint-ladder-tier2.png`) });

    // 6. Paywall Modal Matrix (TRY only and Dark+RTL)
    await page.getByRole('button', { name: /open paywall|abonelik ve ödeme|فتح نافذة الاشتراك/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('₺850', { exact: true })).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-paywall-modal-try.png`) });

    // Close modal
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();

    // Dark + RTL Paywall Modal
    await page.getByRole('button', { name: 'AR', exact: true }).click();
    await page.getByRole('button', { name: /toggle dark mode|toggle theme|temayı değiştir|تبديل المظهر/i }).click();
    await page.getByRole('button', { name: /فتح نافذة الاشتراك/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-paywall-modal-dark-rtl.png`) });
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();

    // Revert to EN Light
    await page.getByRole('button', { name: /toggle dark mode|toggle theme|temayı değiştir|تبديل المظهر/i }).click();
    await page.getByRole('button', { name: 'EN', exact: true }).click();

    // 7. Catalog Page (EN, TR, Dark+RTL)
    await page.goto('/catalog');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-catalog-light-en.png`), fullPage: true });

    await page.getByRole('button', { name: 'TR', exact: true }).click();
    await expect(page.getByText('Eczacılık Ders Kataloğu')).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-catalog-tr.png`), fullPage: true });

    await page.getByRole('button', { name: 'AR', exact: true }).click();
    await page.getByRole('button', { name: /toggle dark mode|toggle theme|temayı değiştir|تبديل المظهر/i }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-catalog-dark-rtl-ar.png`), fullPage: true });

    // Revert to EN Light
    await page.getByRole('button', { name: /toggle dark mode|toggle theme|temayı değiştir|تبديل المظهر/i }).click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
    await page.getByRole('button', { name: 'EN', exact: true }).click();
    await page.waitForTimeout(200);

    // 8. Pricing Page (EN, TR, Dark+RTL)
    await page.goto('/pricing');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-pricing-light-en.png`), fullPage: true });

    await page.getByRole('button', { name: 'TR', exact: true }).click();
    await expect(page.getByText('Şeffaf Akademik Abonelikler')).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-pricing-tr.png`), fullPage: true });

    await page.getByRole('button', { name: 'AR', exact: true }).click();
    await page.getByRole('button', { name: /toggle dark mode|toggle theme|temayı değiştir|تبديل المظهر/i }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-pricing-dark-rtl-ar.png`), fullPage: true });

    // 9. Keyboard-Only Navigation Test (WCAG 2.1 AA Compliance)
    if (!testInfo.project.name.includes('mobile')) {
      await page.goto('/catalog');
      await page.waitForLoadState('networkidle');
      await page.keyboard.press('Tab'); // Brand Rx logo
      await page.keyboard.press('Tab'); // Gallery link
      await page.keyboard.press('Tab'); // Courses link
      await page.keyboard.press('Tab'); // Pricing link
      await page.keyboard.press('Enter'); // Navigate via keyboard
      await page.waitForURL('**/pricing');
      expect(page.url()).toContain('/pricing');
    }

    // Invariant assertions
    expect(consoleErrors).toEqual([]);
    expect(failedRequests).toEqual([]);
  });
});
