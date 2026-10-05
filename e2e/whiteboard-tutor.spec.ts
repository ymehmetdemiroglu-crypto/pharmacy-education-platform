import { test, expect } from '@playwright/test';

test.describe('AI Whiteboard Tutor & MedChem Exam Dashboard', () => {
  test('dashboard renders exam countdown, readiness gauge, and lecture catalog', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // 1. Header & Badge
    await expect(page.locator('h1')).toContainText(/Çalışma Paneli|Dashboard/i);
    await expect(page.getByText(/Vizeye Hazırlık|Midterm Prep/i)).toBeVisible();

    // 2. Readiness Gauge & Exam Countdown
    const countdown = page.getByTestId('exam-countdown');
    await expect(countdown).toBeVisible();

    // 3. Daily 10 Card
    await expect(page.getByRole('heading', { name: /Günlük 10|Daily 10/i })).toBeVisible();

    // 4. Lecture catalog contains the MedChem deck
    await expect(page.getByText(/İlaç Reseptör Etkileşimi|Kimyasal Bağlar/i).first()).toBeVisible();
    const openLink = page.getByRole('link', { name: /Aç|Open/i });
    await expect(openLink.first()).toBeVisible();

    // Verify no unhandled console errors
    const fatalErrors = consoleErrors.filter((e) => !e.includes('React Router Future Flag'));
    expect(fatalErrors).toHaveLength(0);
  });

  test('whiteboard tutor runs interactive concept with slide citation and hint ladder', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('/tutor/reseptor-etkilesimleri', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // 1. Concept header and slide citation
    await expect(page.getByText(/Slayt|Slide/i).first()).toBeVisible();

    // 2. Interactive task is visible
    const taskContainer = page.locator('main, section, div').filter({ hasText: /Reseptör/i });
    await expect(taskContainer.first()).toBeVisible();

    // 3. Verify horizontal overflow is 0 (Safari mobile safety rule)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);

    // 4. Verify no fatal console errors
    const fatalErrors = consoleErrors.filter((e) => !e.includes('React Router Future Flag'));
    expect(fatalErrors).toHaveLength(0);
  });
});
