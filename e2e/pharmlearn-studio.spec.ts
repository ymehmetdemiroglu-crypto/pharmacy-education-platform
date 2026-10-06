import { test, expect } from '@playwright/test';

test.describe('PharmLearn Clean 2-Pane Study Workspace (E2E)', () => {
  test('unauthenticated visitor sees clean minimalist hero with single CTA', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // 1. Minimal brand and hero header
    await expect(page.getByText('PharmLearn').first()).toBeVisible();
    await expect(page.getByText(/Eczacılık Vize Derslerini/i)).toBeVisible();

    // 2. Primary call to action button
    const ctaButton = page.getByRole('button', { name: /Öğrenmeye Başla/i });
    await expect(ctaButton).toBeVisible();

    // 3. Verified 33-slide reference
    await expect(page.getByText(/33 slaytlık/i).first()).toBeVisible();

    // 4. Click CTA opens AuthModal
    await ctaButton.click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // 5. Zero unhandled console errors
    const fatalErrors = consoleErrors.filter((e) => !e.includes('React Router Future Flag'));
    expect(fatalErrors).toHaveLength(0);
  });
});
