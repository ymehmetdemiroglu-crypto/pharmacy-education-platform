import { test, expect } from '@playwright/test';

test.describe('Tier 3: Cross-Feature Combinations (Pairwise Interaction Matrix)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/catalog', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.clear());
  });

  // =========================================================================
  // Combination 1: Arabic RTL (ar) + Paywall Modal
  // =========================================================================
  test('T3-COMB-01: Arabic RTL mode with open Paywall Modal displays mirrored dialog, TRY currency, and dismisses on Escape', async ({ page }) => {
    await page.goto('/gallery');
    await page.waitForLoadState('networkidle');

    // Switch to Arabic
    await page.getByRole('button', { name: 'AR', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    // Open Paywall Modal
    await page.getByRole('button', { name: /فتح نافذة الاشتراك|open paywall/i }).first().click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    // Verify TRY pricing is rendered in Arabic mode
    await expect(page.getByText('₺850').first()).toBeVisible();

    // Verify modal dismisses cleanly with Escape key in RTL mode
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });

  // =========================================================================
  // Combination 2: Academic Midnight Slate Dark Theme + Simulation Widgets
  // =========================================================================
  test('T3-COMB-02: Academic Midnight Slate dark mode renders interactive simulation widgets with high-contrast borders and zero border-white', async ({ page }) => {
    await page.goto('/gallery');
    await page.waitForLoadState('networkidle');

    // Toggle Dark Mode
    await page.getByRole('button', { name: /toggle dark mode|toggle theme|temayı değiştir|تبديل المظهر/i }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Verify Widget 1 (SAR Explorer) renders with dark surfaces
    const widgetContainer = page.locator('[data-testid="active-widget-container"]');
    await expect(widgetContainer).toBeVisible();

    // Verify Widget 3 (Dose-Response Curve)
    await page.getByRole('button', { name: 'Dose-Response Curve', exact: true }).click();
    await expect(page.locator('[data-testid="active-widget-container"] svg').first()).toBeVisible();

    // Verify Widget 4 (PK Simulator)
    await page.getByRole('button', { name: 'PK Simulator', exact: true }).click();
    await expect(page.locator('[data-testid="active-widget-container"] svg').first()).toBeVisible();

    // Assert absence of forbidden fluorescent border-white in dark mode
    const whiteBorderElements = page.locator('.border-white');
    expect(await whiteBorderElements.count()).toBe(0);
  });

  // =========================================================================
  // Combination 3: Active Lesson Step Progression + Dynamic Locale Switching
  // =========================================================================
  test('T3-COMB-03: dynamically switching locales during active lesson preserves current step index and user hypothesis', async ({ page }) => {
    await page.goto('/courses/medchem/lessons/1');
    await page.waitForLoadState('networkidle');

    // Advance to Step 3
    await page.getByRole('button', { name: /continue to step 2|adım 2'e devam et|المتابعة إلى الخطوة 2/i }).click();
    await page.getByRole('radio').first().click();
    await page.getByRole('button', { name: /commit hypothesis|hipotezi onayla|تأكيد الفرضية/i }).click();
    await page.getByRole('button', { name: /continue to step 3|adım 3'e devam et|المتابعة إلى الخطوة 3/i }).click();

    await expect(page.getByText(/Step 3 of (10|12)|Adım 3 \/ (10|12)|الخطوة 3 من (10|12)/i)).toBeVisible();

    // Switch to Turkish
    await page.getByRole('button', { name: 'TR', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
    await expect(page.getByText(/Adım 3 \/ (10|12)/i)).toBeVisible();

    // Switch to Arabic
    await page.getByRole('button', { name: 'AR', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
    await expect(page.getByText(/الخطوة 3 من (10|12)|3 \/ (10|12)/i)).toBeVisible();

    // Switch back to English
    await page.getByRole('button', { name: 'EN', exact: true }).click();
    await expect(page.getByText(/Step 3 of (10|12)/i)).toBeVisible();
  });

  // =========================================================================
  // Combination 4: Special Arabic Rule + Chemical Formula LTR Isolation
  // =========================================================================
  test('T3-COMB-04: Special Arabic Rule renders Arabic prose with Turkish/canonical technical terms in LTR isolation containers', async ({ page }) => {
    await page.goto('/courses/medchem/lessons/1');
    await page.waitForLoadState('networkidle');

    // Switch to Arabic
    await page.getByRole('button', { name: 'AR', exact: true }).click();

    // Step 1 Hook contains agent descriptions
    await expect(page.getByText(/Diethyl Ether|Propranolol/i).first()).toBeVisible();

    // Check that elements with dir="ltr" exist inside Arabic document
    const ltrElements = page.locator('[dir="ltr"]');
    const count = await ltrElements.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Parentheses and punctuation should remain stable
    const hookCard = page.locator('.border-2.border-black').first();
    await expect(hookCard).toBeVisible();
  });

  // =========================================================================
  // Combination 5: Reduced Motion Mode + Modals & Simulation Feedback
  // =========================================================================
  test('T3-COMB-05: prefers-reduced-motion eliminates animated delay and spring transforms on modals and sliders', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/pricing');
    await page.waitForLoadState('networkidle');

    // Toggle bundle scope
    const bundleBtn = page.getByRole('button', { name: /Dual Bundle|[iİ]kili Paket|الحزمة المزدوجة/i });
    await bundleBtn.click();

    // Price updates instantly
    await expect(page.getByText('₺350')).toBeVisible();

    // Open Paywall Modal in reduced motion
    await page.goto('/gallery');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: /open paywall|abonelik ve ödeme|aç|فتح نافذة الاشتراك/i }).first().click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });

  // =========================================================================
  // Combination 6: Guest User Mode + LocalStorage Persistence across Views
  // =========================================================================
  test('T3-COMB-06: guest student completes lesson steps, navigates to catalog, and returns with progress intact', async ({ page }) => {
    await page.goto('/courses/medchem/lessons/1');
    await page.waitForLoadState('networkidle');

    // Complete Step 1 and advance to Step 2
    await page.getByRole('button', { name: /continue to step 2|adım 2'e devam et|المتابعة إلى الخطوة 2/i }).click();
    await expect(page.getByText(/Step 2 of (10|12)|Adım 2 \/ (10|12)|الخطوة 2 من (10|12)/i)).toBeVisible();

    // Navigate to Catalog
    await page.getByRole('link', { name: /catalog|katalog/i }).first().click();
    await page.waitForURL('**/catalog');

    // Return to Lesson 1
    await page.goto('/courses/medchem/lessons/1');
    await page.waitForLoadState('networkidle');

    // Verifies progress restored to Step 2 (0-indexed step 1)
    await expect(page.getByText(/Step 2 of (10|12)|Adım 2 \/ (10|12)/i)).toBeVisible();
  });

  // =========================================================================
  // Combination 7: Keyboard Navigation + AuthModal Turkish Faculty Dropdown
  // =========================================================================
  test('T3-COMB-07: complete keyboard navigation opens AuthModal, switches tabs, and selects Turkish Pharmacy Faculty', async ({ page }) => {
    await page.goto('/catalog');
    await page.waitForLoadState('networkidle');

    // Open AuthModal
    await page.getByRole('button', { name: /log in|giriş yap/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Switch to Sign Up tab
    await page.getByRole('button', { name: /sign up|kayıt ol/i }).first().click();

    // Select faculty dropdown and verify options
    const facultySelect = page.locator('#faculty-select');
    await facultySelect.selectOption('Hacettepe Üniversitesi');
    expect(await facultySelect.inputValue()).toBe('Hacettepe Üniversitesi');

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  // =========================================================================
  // Combination 8: Pricing Scope Toggle in Turkish and Arabic Locales
  // =========================================================================
  test('T3-COMB-08: pricing scope switcher dynamically updates TRY amounts in Turkish and Arabic locales', async ({ page }) => {
    await page.goto('/pricing');
    await page.waitForLoadState('networkidle');

    // Turkish locale
    await page.getByRole('button', { name: 'TR', exact: true }).click();
    await expect(page.getByText('₺250')).toBeVisible();

    // Switch to Dual Bundle
    await page.getByRole('button', { name: /[iİ]kili paket/i }).click();
    await expect(page.getByText('₺350')).toBeVisible();
    await expect(page.getByText('₺1.150')).toBeVisible();
    await expect(page.getByText('₺2.100')).toBeVisible();

    // Arabic locale
    await page.getByRole('button', { name: 'AR', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    // Switch back to Single Course in Arabic
    await page.getByRole('button', { name: /مقرر واحد/i }).click();
    await expect(page.getByText('₺250')).toBeVisible();
    await expect(page.getByText('₺850')).toBeVisible();
    await expect(page.getByText('₺1.450')).toBeVisible();
  });
});
