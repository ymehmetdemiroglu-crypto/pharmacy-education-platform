import { test, expect } from '@playwright/test';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const AXE_PATH = require.resolve('axe-core/axe.min.js');

test.describe('Automated Axe-Core Accessibility Audit Matrix (A3 Protocol)', () => {
  const routes = ['/gallery', '/catalog', '/pricing'];

  for (const route of routes) {
    test(`audits ${route} in Default Light EN for WCAG 2.1 AA violations`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('networkidle');

      await page.addScriptTag({ path: AXE_PATH });
      const results = await page.evaluate(async () => {
        return await (window as any).axe.run({
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
        });
      });

      const seriousOrCritical = results.violations.filter(
        (v: any) => v.impact === 'serious' || v.impact === 'critical'
      );
      expect(seriousOrCritical).toEqual([]);
    });

    test(`audits ${route} in Dark Mode for WCAG 2.1 AA violations`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: /toggle dark mode/i }).click();

      await page.addScriptTag({ path: AXE_PATH });
      const results = await page.evaluate(async () => {
        return await (window as any).axe.run({
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
        });
      });

      const seriousOrCritical = results.violations.filter(
        (v: any) => v.impact === 'serious' || v.impact === 'critical'
      );
      expect(seriousOrCritical).toEqual([]);
    });

    test(`audits ${route} in Arabic RTL Mode for WCAG 2.1 AA violations`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'AR', exact: true }).click();

      await page.addScriptTag({ path: AXE_PATH });
      const results = await page.evaluate(async () => {
        return await (window as any).axe.run({
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
        });
      });

      const seriousOrCritical = results.violations.filter(
        (v: any) => v.impact === 'serious' || v.impact === 'critical'
      );
      expect(seriousOrCritical).toEqual([]);
    });

    test(`audits ${route} in Turkish TR Locale for WCAG 2.1 AA violations`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'TR', exact: true }).click();

      await page.addScriptTag({ path: AXE_PATH });
      const results = await page.evaluate(async () => {
        return await (window as any).axe.run({
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
        });
      });

      const seriousOrCritical = results.violations.filter(
        (v: any) => v.impact === 'serious' || v.impact === 'critical'
      );
      expect(seriousOrCritical).toEqual([]);
    });
  }

  test('audits Open Paywall Modal across Light, Dark, and RTL for WCAG 2.1 AA violations', async ({ page }) => {
    await page.goto('/gallery');
    await page.waitForLoadState('networkidle');

    // 1. Light Mode Paywall
    await page.getByRole('button', { name: /open paywall/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.addScriptTag({ path: AXE_PATH });
    let results = await page.evaluate(async () => {
      return await (window as any).axe.run({
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
      });
    });
    let seriousOrCritical = results.violations.filter((v: any) => v.impact === 'serious' || v.impact === 'critical');
    expect(seriousOrCritical).toEqual([]);

    await page.keyboard.press('Escape');

    // 2. Dark Mode Paywall
    await page.getByRole('button', { name: /toggle dark mode/i }).click();
    await page.getByRole('button', { name: /open paywall/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.addScriptTag({ path: AXE_PATH });
    results = await page.evaluate(async () => {
      return await (window as any).axe.run({
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
      });
    });
    seriousOrCritical = results.violations.filter((v: any) => v.impact === 'serious' || v.impact === 'critical');
    expect(seriousOrCritical).toEqual([]);

    await page.keyboard.press('Escape');

    // 3. Arabic RTL Paywall
    await page.getByRole('button', { name: 'AR', exact: true }).click();
    await page.getByRole('button', { name: /فتح نافذة الاشتراك/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.addScriptTag({ path: AXE_PATH });
    results = await page.evaluate(async () => {
      return await (window as any).axe.run({
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
      });
    });
    seriousOrCritical = results.violations.filter((v: any) => v.impact === 'serious' || v.impact === 'critical');
    expect(seriousOrCritical).toEqual([]);
  });
});
