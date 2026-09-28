import { test, expect } from '@playwright/test';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const AXE_PATH = require.resolve('axe-core/axe.min.js');

test.describe('Automated Axe-Core Accessibility Audit Matrix', () => {
  const routes = ['/gallery', '/catalog', '/pricing'];

  for (const route of routes) {
    test(`audits ${route} for WCAG 2.1 AA violations`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('networkidle');

      // Inject axe-core
      await page.addScriptTag({ path: AXE_PATH });

      // Run axe evaluation
      const results = await page.evaluate(async () => {
        return await (window as any).axe.run({
          runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa', 'wcag21aa'],
          },
        });
      });

      const seriousOrCritical = results.violations.filter(
        (v: any) => v.impact === 'serious' || v.impact === 'critical'
      );

      console.log(`[A11Y-AUDIT] Route ${route}: ${results.violations.length} total violations, ${seriousOrCritical.length} serious/critical`);

      if (seriousOrCritical.length > 0) {
        console.error(`Serious/critical violations on ${route}:`, JSON.stringify(seriousOrCritical, null, 2));
      }

      expect(seriousOrCritical).toEqual([]);
    });
  }
});
