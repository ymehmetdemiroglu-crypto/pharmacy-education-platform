import { test, expect } from '@playwright/test';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const AXE_PATH = require.resolve('axe-core/axe.min.js');

test.describe('Automated Axe-Core Accessibility Audit Matrix (A3 Protocol)', () => {
  // User-facing routes covering Catalog, Pricing, Gallery, and Lesson
  const routes = [
    { path: '/gallery', name: 'Interactive Gallery (/gallery)' },
    { path: '/catalog', name: 'Course Catalog (/catalog)' },
    { path: '/pricing', name: 'Pricing Passes (/pricing)' },
    { path: '/courses/medchem/lessons/1', name: 'Interactive Lesson 1 (/courses/medchem/lessons/1)' },
  ];

  for (const { path: route, name } of routes) {
    test(`audits ${name} in Default Light EN for WCAG 2.1 AA violations`, async ({ page }) => {
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

    test(`audits ${name} in Dark Mode for WCAG 2.1 AA violations`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: /toggle dark mode|toggle theme|temayı değiştir|تبديل المظهر/i }).first().click();

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

    test(`audits ${name} in Arabic RTL Mode for WCAG 2.1 AA violations`, async ({ page }) => {
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

    test(`audits ${name} in Turkish TR Locale for WCAG 2.1 AA violations`, async ({ page }) => {
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
    await page.getByRole('button', { name: /open paywall|abonelik ve ödeme|فتح نافذة الاشتراك/i }).first().click();
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
    await page.getByRole('button', { name: /toggle dark mode|toggle theme|temayı değiştir|تبديل المظهر/i }).first().click();
    await page.getByRole('button', { name: /open paywall|abonelik ve ödeme|فتح نافذة الاشتراك/i }).first().click();
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
    await page.getByRole('button', { name: /open paywall|abonelik ve ödeme|فتح نافذة الاشتراك/i }).first().click();
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

  test('audits Open Auth Modal across Light, Dark, and RTL for WCAG 2.1 AA violations', async ({ page }) => {
    await page.goto('/gallery');
    await page.waitForLoadState('networkidle');

    // 1. Light Mode AuthModal
    await page.getByRole('button', { name: /log in|giriş yap|تسجيل الدخول/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.addScriptTag({ path: AXE_PATH });
    let results = await page.evaluate(async () => {
      return await (window as any).axe.run({
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
      });
    });
    let seriousOrCritical = results.violations.filter((v: any) => v.impact === 'serious' || v.impact === 'critical');
    expect(seriousOrCritical).toEqual([]);

    // Check Signup tab inside modal
    await page.getByRole('button', { name: /sign up|kayıt ol|إنشاء حساب/i }).click();
    await page.addScriptTag({ path: AXE_PATH });
    results = await page.evaluate(async () => {
      return await (window as any).axe.run({
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
      });
    });
    seriousOrCritical = results.violations.filter((v: any) => v.impact === 'serious' || v.impact === 'critical');
    expect(seriousOrCritical).toEqual([]);

    await page.keyboard.press('Escape');

    // 2. Dark Mode AuthModal
    await page.getByRole('button', { name: /toggle dark mode|toggle theme|temayı değiştir|تبديل المظهر/i }).first().click();
    await page.getByRole('button', { name: /log in|giriş yap|تسجيل الدخول/i }).first().click();
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

    // 3. Arabic RTL AuthModal
    await page.getByRole('button', { name: 'AR', exact: true }).click();
    await page.getByRole('button', { name: /تسجيل الدخول/i }).first().click();
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
