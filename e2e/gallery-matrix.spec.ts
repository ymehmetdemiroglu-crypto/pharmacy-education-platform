import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve(process.cwd(), 'docs/screenshots/phase-2');

test.beforeAll(async () => {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }
});

test.describe('Pharmacy Platform Phase 2 UI Verification Matrix', () => {
  test('verifies Gallery, Catalog, and Pricing pages with zero errors across themes and locales', async ({
    page,
  }, testInfo) => {
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

    // 1. Visit Gallery Page
    await page.goto('/gallery');
    await expect(page.locator('h1')).toContainText('Pharmacy Interactive Gallery');

    // Screenshot: Gallery Initial View
    const projectName = testInfo.project.name;
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${projectName}-gallery-light-en.png`),
      fullPage: true,
    });

    // 2. Test Interactive Widgets
    // A. Dose-Response Curve: Click Competitive Antagonist
    await page.getByRole('button', { name: 'Dose-Response Curve' }).click();
    await expect(page.getByRole('heading', { name: /adrenoceptor agonist vs antagonist/i })).toBeVisible();
    await page.getByRole('button', { name: 'competitive antagonist', exact: true }).click();
    await expect(page.getByText('Agonist Alone')).toBeVisible();

    // B. PK Simulator
    await page.getByRole('button', { name: 'PK Simulator' }).click();
    await expect(page.getByText(/gentamicin pharmacokinetic profile/i)).toBeVisible();
    await page.getByRole('checkbox', { name: /multiple dosing/i }).check({ force: true });
    await expect(page.getByText(/dosing interval/i)).toBeVisible();

    // Verify Trial Banners in Gallery (free preview, active trial, expired trial)
    await expect(page.getByText(/lessons 1 & 2 of all modules are free forever/i)).toBeVisible();
    await expect(page.getByText(/premium free trial active/i)).toBeVisible();
    await expect(page.getByText(/your 7-day trial has ended/i)).toBeVisible();

    // C. SAR Explorer
    await page.getByRole('button', { name: 'SAR Explorer' }).click();
    await expect(page.getByText(/propranolol analogs structure-activity/i)).toBeVisible();
    await page.getByRole('button', { name: /isopropyl/i }).click();

    // D. Structure Identifier
    await page.getByRole('button', { name: 'Structure Identifier' }).click();
    await expect(page.getByText(/essential hydrogen bond donor/i)).toBeVisible();

    // E. Predict-Then-Reveal
    await page.getByRole('button', { name: 'Predict-Then-Reveal' }).click();
    await expect(page.getByText(/predict the effect of tetrazole/i)).toBeVisible();

    // 3. Test Paywall Modal & Currency Switching
    await page.getByRole('button', { name: /open paywall & pass modal/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Unlock Full Pharmacy Mastery')).toBeVisible();

    // Switch to TRY currency
    await page.getByRole('button', { name: 'TRY', exact: true }).click();
    await expect(page.getByRole('button', { name: /Continue with semester Pass — ₺850/i })).toBeVisible();

    // Switch to SAR currency
    await page.getByRole('button', { name: 'SAR', exact: true }).click();
    await expect(page.getByRole('button', { name: /Continue with semester Pass — SAR 190/i })).toBeVisible();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${projectName}-paywall-modal-sar.png`),
    });

    // Close Modal via Escape key
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();

    // 4. Test Dark Mode
    await page.getByRole('button', { name: /toggle dark mode/i }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${projectName}-gallery-dark.png`),
    });

    // Revert to light mode
    await page.getByRole('button', { name: /toggle dark mode/i }).click();

    // 5. Test Arabic Locale (RTL Mirroring)
    await page.getByRole('button', { name: 'AR', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${projectName}-gallery-rtl-ar.png`),
    });

    // Revert to English
    await page.getByRole('button', { name: 'EN', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');

    // 6. Visit Course Catalog Page
    await page.goto('/catalog');
    await expect(page.getByRole('heading', { name: 'Pharmacy Course Catalog' })).toBeVisible();
    await expect(page.getByText('Course A: Medicinal Chemistry')).toBeVisible();
    await expect(page.getByText('Course B: Pharmacology')).toBeVisible();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${projectName}-catalog.png`),
    });

    // 7. Visit Pricing Page
    await page.goto('/pricing');
    await expect(page.getByRole('heading', { name: 'Transparent Academic Passes' })).toBeVisible();
    await expect(page.getByText('Semester Pass', { exact: true })).toBeVisible();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${projectName}-pricing.png`),
    });

    // 8. Invariant Assertions
    expect(consoleErrors).toEqual([]);
    expect(failedRequests).toEqual([]);
  });
});
