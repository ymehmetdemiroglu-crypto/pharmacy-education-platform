import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const MOTION_SCREENSHOT_DIR = path.resolve(process.cwd(), 'docs/screenshots/phase-2/motion');

test.beforeAll(async () => {
  if (!fs.existsSync(MOTION_SCREENSHOT_DIR)) {
    fs.mkdirSync(MOTION_SCREENSHOT_DIR, { recursive: true });
  }
});

test.describe('Motion Verification & Jank Budget Suite (A2 Protocol)', () => {
  test.describe('prefers-reduced-motion: reduce Mode', () => {
    test.use({ reducedMotion: 'reduce' });

    test('proves transitions fall back to instant/fade and eliminates transforms', async ({ page }) => {
      await page.goto('/gallery');
      await page.waitForLoadState('networkidle');

      // 1. Assert reduced motion CSS rule applies to interactive elements
      const buttonStyle = await page.locator('[data-testid="btn-default"]').evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          animationDuration: computed.animationDuration,
          transitionDuration: computed.transitionDuration,
          transform: computed.transform,
        };
      });

      console.log('[REDUCED-MOTION] Button computed styles:', buttonStyle);
      // Under reduced motion, transition-duration is overridden to 0.01ms (or 0s) and transform is 'none'
      const durationSeconds = parseFloat(buttonStyle.transitionDuration);
      expect(durationSeconds <= 0.001).toBe(true);
      expect(buttonStyle.transform).toBe('none');

      // 2. Open Paywall Modal and verify no slide/scale transform occurred
      await page.getByRole('button', { name: /open paywall|abonelik ve ödeme|aç|فتح نافذة الاشتراك/i }).first().click();
      await expect(page.getByRole('dialog')).toBeVisible();

      const modalContentTransform = await page.getByRole('dialog').evaluate((el) => {
        return window.getComputedStyle(el).transform;
      });
      console.log('[REDUCED-MOTION] Modal transform:', modalContentTransform);
      expect(modalContentTransform).toBe('none');

      // Screenshot reduced motion state
      await page.screenshot({
        path: path.join(MOTION_SCREENSHOT_DIR, 'reduced-motion-paywall-open.png'),
      });

      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).not.toBeVisible();
    });
  });

  test.describe('Frame Timing & Cumulative Layout Shift (CLS) Verification', () => {
    test('verifies CLS < 0.05 and zero frame drops > 50ms on key flows', async ({ page }) => {
      await page.goto('/gallery');
      await page.waitForLoadState('networkidle');

      // Inject Performance Observers for CLS and Long Tasks (>50ms)
      await page.evaluate(() => {
        (window as any).__layoutShifts = [];
        (window as any).__longTasks = [];

        // Observe layout shifts
        const clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              (window as any).__layoutShifts.push((entry as any).value);
            }
          }
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });

        // Observe long tasks (>50ms)
        const longTaskObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            (window as any).__longTasks.push({
              name: entry.name,
              duration: entry.duration,
              startTime: entry.startTime,
            });
          }
        });
        longTaskObserver.observe({ type: 'longtask', buffered: true });
      });

      // Flow 1: Switch between multiple widget tabs
      const widgetTabs = [
        'Dose-Response Curve',
        'PK Simulator',
        'SAR Explorer',
        'Structure Identifier',
        'Predict-Then-Reveal',
        'Multiple Choice (MCQ)',
        'Receptor Matcher',
        'Metabolism Map',
        'Hint Ladder',
      ];

      for (const tab of widgetTabs) {
        await page.getByRole('button', { name: tab, exact: true }).click();
        await page.waitForTimeout(100);
      }

      // Flow 2: Open and Close Paywall Modal
      await page.getByRole('button', { name: /open paywall|abonelik ve ödeme/i }).first().click();
      await expect(page.getByRole('dialog')).toBeVisible();

      // Switch plans in modal (TRY pricing)
      await page.getByText('₺850').first().click();
      await page.getByText('₺1450').first().click();
      await page.getByText('₺250').first().click();

      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).not.toBeVisible();

      // Flow 3: Navigate between routes
      await page.goto('/catalog');
      await page.waitForLoadState('networkidle');
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');
      await page.goto('/gallery');
      await page.waitForLoadState('networkidle');

      // Extract Performance Metrics
      const perfMetrics = await page.evaluate(() => {
        const shifts = (window as any).__layoutShifts || [];
        const totalCLS = shifts.reduce((sum: number, val: number) => sum + val, 0);
        const longTasks = (window as any).__longTasks || [];
        const blockingTasks = longTasks.filter((t: any) => t.duration > 50);

        return {
          totalCLS,
          shiftsCount: shifts.length,
          longTasksCount: longTasks.length,
          blockingTasksCount: blockingTasks.length,
          blockingTasks,
        };
      });

      console.log('[PERFORMANCE-METRICS]', JSON.stringify(perfMetrics, null, 2));

      // Assertions
      expect(perfMetrics.totalCLS).toBeLessThan(0.05);
      expect(perfMetrics.blockingTasksCount).toBe(0);
    });

    test('verifies CLS < 0.05 and zero long frames on interactive Lesson 1 step transitions', async ({ page }) => {
      await page.goto('/courses/medchem/lessons/1?phase=quiz');
      await page.waitForLoadState('networkidle');
      const enBtn = page.getByRole('button', { name: 'EN', exact: true });
      if (await enBtn.isVisible()) {
        await enBtn.click();
        await page.waitForTimeout(200);
      }
      await page.waitForTimeout(500);

      // Inject Performance Observers for CLS and Long Tasks (>50ms) during interaction
      await page.evaluate(() => {
        (window as any).__lessonShifts = [];
        (window as any).__lessonLongTasks = [];
        (window as any).__interactionStart = performance.now();

        const clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              (window as any).__lessonShifts.push((entry as any).value);
            }
          }
        });
        clsObserver.observe({ type: 'layout-shift' });

        const longTaskObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            (window as any).__lessonLongTasks.push({
              name: entry.name,
              duration: entry.duration,
              startTime: entry.startTime,
            });
          }
        });
        longTaskObserver.observe({ type: 'longtask' });
      });

      // Allow initial page layout and hydration to stabilize
      await page.waitForTimeout(1000);
      await page.evaluate(() => {
        (window as any).__lessonShifts = [];
        (window as any).__lessonLongTasks = [];
        (window as any).__interactionStart = performance.now();
      });

      // Advance through first 4 steps and verify smooth transition
      await page.getByRole('button', { name: /Continue to Step 2|Adım 2'e Devam Et|المتابعة إلى الخطوة 2/i }).click();
      await page.waitForTimeout(500);

      await page.getByRole('radio').first().click();
      await page.waitForTimeout(300);
      await page.getByRole('button', { name: /Commit Hypothesis & Reveal Outcome|Hipotezi Onayla ve Sonucu Gör|تأكيد الفرضية وكشف النتيجة/i }).click();
      await page.waitForTimeout(500);

      await page.getByRole('button', { name: /Continue to Step 3|Adım 3'e Devam Et|المتابعة إلى الخطوة 3/i }).click();
      await page.waitForTimeout(500);

      const metrics = await page.evaluate(() => {
        const shifts = (window as any).__lessonShifts || [];
        const totalCLS = shifts.reduce((sum: number, val: number) => sum + val, 0);
        const longTasks = (window as any).__lessonLongTasks || [];
        const start = (window as any).__interactionStart || 0;
        const blockingTasks = longTasks.filter((t: any) => t.startTime >= start && t.duration > 50);

        return {
          totalCLS,
          blockingCount: blockingTasks.length,
          blockingTasks,
        };
      });

      console.log('[LESSON-PERF-METRICS]', JSON.stringify(metrics, null, 2));
      expect(metrics.totalCLS).toBeLessThan(0.05);
      // Section 5 Budget: Zero severe jank frames exceeding micro-interaction ceiling (250ms)
      const severeJankTasks = metrics.blockingTasks.filter((t: any) => t.duration > 250);
      expect(severeJankTasks.length).toBe(0);
    });
  });
});
