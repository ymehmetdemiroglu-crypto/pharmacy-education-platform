import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const AXE_PATH = require.resolve('axe-core/axe.min.js');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCREENSHOT_DIR = path.resolve(__dirname, '../docs/screenshots/phase-3/iteration-3');

test.beforeAll(() => {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }
});

test.describe('Phase 3: Vertical Slice A — Interactive Lesson 1 & Freemium Gating E2E', () => {
  test('executes end-to-end Lesson 1 flow, axe scan on all 10 steps, hints, and paywall gating', async ({
    page,
  }, testInfo) => {
    const prefix = testInfo.project.name;

    // Track console errors, failed network requests, and any unauthorized remote Firestore writes
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];
    const remoteFirestoreWrites: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('requestfailed', (req) => {
      failedRequests.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText}`);
    });
    page.on('request', (req) => {
      const url = req.url();
      if (
        (url.includes('firestore.googleapis.com') || url.includes(':8080')) &&
        (req.method() === 'POST' || req.method() === 'PUT' || req.method() === 'PATCH')
      ) {
        remoteFirestoreWrites.push(`${req.method()} ${url}`);
      }
    });

    const runAxeAudit = async (stepIdentifier: string) => {
      await page.addScriptTag({ path: AXE_PATH });
      const axeResults = await page.evaluate(async () => {
        return await (window as any).axe.run({
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
        });
      });
      const seriousOrCritical = axeResults.violations.filter(
        (v: any) => v.impact === 'serious' || v.impact === 'critical'
      );
      expect(
        seriousOrCritical,
        `Axe violations detected on ${stepIdentifier} in ${prefix}`
      ).toEqual([]);
    };

    // -------------------------------------------------------------
    // 1. Lesson 1 Initial Load & Step 1 Hook
    // -------------------------------------------------------------
    await page.goto('/courses/medchem/lessons/1');
    await page.waitForLoadState('networkidle');

    // Verify title and hook
    await expect(page.getByText('Thermodynamic Activity & The Ferguson Principle')).toBeVisible();
    await expect(page.getByText('Two Drugs, Vastly Different Quantities')).toBeVisible();
    await expect(page.getByText('Agent A: Diethyl Ether (Anesthetic)')).toBeVisible();
    await expect(page.getByText('Agent B: Propranolol (Beta-Blocker)')).toBeVisible();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-01-hook.png`),
      fullPage: true,
    });
    await runAxeAudit('Step 1 Hook');

    // -------------------------------------------------------------
    // 2. Advance to Step 2 (Predict-Then-Reveal: Relative Saturation)
    // -------------------------------------------------------------
    await page.getByRole('button', { name: /Continue to Step 2/i }).click();
    await expect(page.getByRole('heading', { name: 'Thermodynamic Activity of Vapors' })).toBeVisible();

    // Verify Advance is disabled prior to prediction commit
    await expect(page.getByRole('button', { name: /Continue to Step 3/i })).toBeDisabled();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-02-predict-unselected.png`),
    });

    // Test Hint Ladder (Tier 1 Free, Tiers 2 & 3 Gated)
    await page.getByRole('button', { name: /Need a hint\?/i }).click();
    await expect(page.getByText('Tier 1: Guiding Nudge')).toBeVisible();
    await expect(page.getByText(/Tier 2 & 3 hints unlock with 7-Day Free Trial or Pass/i).first()).toBeVisible();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-02-hint-drawer.png`),
    });

    // Click locked Next Tier (triggers upgrade paywall)
    await page.getByRole('button', { name: /Next Tier/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('button', { name: /Start Free Trial/i })).toBeVisible();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-02-locked-tier2-paywall.png`),
    });

    // Close paywall modal with Escape
    await page.keyboard.press('Escape');

    // Collapse hint drawer
    await page.getByRole('button', { name: /Collapse hints/i }).click();

    // Test Wrong Answer Prediction (Diagnostic Misconception Feedback)
    await page
      .getByRole('radio', { name: /a drops to 0, because saturated vapors cannot dissolve into membranes/i })
      .click();
    await expect(page.getByRole('button', { name: /Commit Hypothesis & Reveal Outcome/i })).toBeEnabled();

    // Commit wrong prediction to verify misconception feedback
    await page.getByRole('button', { name: /Commit Hypothesis & Reveal Outcome/i }).click();
    await expect(page.getByText(/Diagnostic Feedback: Misconception Identified/i)).toBeVisible();
    await expect(
      page.getByText(/Saturation maximizes escaping tendency; it does not stop dissolution/i)
    ).toBeVisible();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-02-predict-wrong.png`),
    });
    await runAxeAudit('Step 2 Predict Wrong');

    // -------------------------------------------------------------
    // 3. Step 3 (Predict: The Non-Specific Activity Threshold)
    // -------------------------------------------------------------
    await page.getByRole('button', { name: /Continue to Step 3/i }).click();
    await expect(page.getByRole('heading', { name: 'The Non-Specific Activity Threshold' })).toBeVisible();

    // Select correct hypothesis
    await page.getByRole('radio', { name: /High relative saturation/i }).click();
    await page.getByRole('button', { name: /Commit Hypothesis & Reveal Outcome/i }).click();
    await expect(page.getByText(/Hypothesis Confirmed/i)).toBeVisible();
    await expect(page.getByText(/Non-specific depressants act within a high relative saturation range/i)).toBeVisible();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-03-predict-revealed.png`),
    });
    await runAxeAudit('Step 3 Predict Revealed');

    // -------------------------------------------------------------
    // 4. Step 4 (Predict: Exobiophase to Endobiophase Equilibrium)
    // -------------------------------------------------------------
    await page.getByRole('button', { name: /Continue to Step 4/i }).click();
    await expect(page.getByRole('heading', { name: 'Exobiophase to Endobiophase Equilibrium' })).toBeVisible();

    // Select correct hypothesis
    await page
      .getByRole('radio', { name: /Equal: thermodynamic activity a is identical in both phases at equilibrium/i })
      .click();
    await page.getByRole('button', { name: /Commit Hypothesis & Reveal Outcome/i }).click();
    await expect(page.getByText(/Hypothesis Confirmed/i)).toBeVisible();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-04-predict-revealed.png`),
    });
    await runAxeAudit('Step 4 Equilibrium');

    // -------------------------------------------------------------
    // 5. Step 5 (Mid-Lesson Concept Checkpoint)
    // -------------------------------------------------------------
    await page.getByRole('button', { name: /Continue to Step 5/i }).click();
    await expect(page.getByRole('heading', { name: 'Classify Mystery Compounds' })).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 0));

    // Select correct option and commit answer
    await page
      .getByRole('radio', {
        name: /Compound X: Active at a = 0.15; activity persists despite replacing alkyl branches with rings/i,
      })
      .click();
    await page.getByRole('button', { name: /Check Answer/i }).click();
    await expect(page.getByText(/Correct! High thermodynamic activity/i)).toBeVisible();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-05-checkpoint.png`),
    });
    await runAxeAudit('Step 5 Checkpoint');

    // -------------------------------------------------------------
    // 6. Steps 6 to 9 (Structural Specificity & Faded Calculation)
    // -------------------------------------------------------------
    // Step 6: Core Structural Sensitivity
    await page.getByRole('button', { name: /Continue to Step 6/i }).click();
    await expect(page.getByRole('heading', { name: 'Core Structural Sensitivity' })).toBeVisible();

    // Select correct hypothesis
    await page
      .getByRole('radio', { name: /Biological activity is drastically reduced or completely abolished/i })
      .click();
    await page.getByRole('button', { name: /Commit Hypothesis & Reveal Outcome/i }).click();
    await expect(page.getByText(/Hypothesis Confirmed/i)).toBeVisible();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-06-predict-revealed.png`),
    });
    await runAxeAudit('Step 6 Sensitivity');

    // Step 7: Chemical Diversity in Anesthesia
    await page.getByRole('button', { name: /Continue to Step 7/i }).click();
    await expect(page.getByRole('heading', { name: 'Chemical Diversity in Anesthesia' })).toBeVisible();

    // Select correct hypothesis
    await page
      .getByRole('radio', {
        name: /They act non-specifically by physically accumulating into lipid membranes/i,
      })
      .click();
    await page.getByRole('button', { name: /Commit Hypothesis & Reveal Outcome/i }).click();
    await expect(page.getByText(/Hypothesis Confirmed/i)).toBeVisible();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-07-predict-revealed.png`),
    });
    await runAxeAudit('Step 7 Chemical Diversity');

    // Step 8: Differentiating Affinity from Saturation
    await page.getByRole('button', { name: /Continue to Step 8/i }).click();
    await expect(page.getByRole('heading', { name: 'Differentiating Affinity from Saturation' })).toBeVisible();

    // Select correct hypothesis
    await page
      .getByRole('radio', {
        name: /Drug A is structurally specific \(high-affinity receptor ligand\); Drug B is structurally non-specific/i,
      })
      .click();
    await page.getByRole('button', { name: /Commit Hypothesis & Reveal Outcome/i }).click();
    await expect(page.getByText(/Hypothesis Confirmed/i)).toBeVisible();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-08-predict-revealed.png`),
    });
    await runAxeAudit('Step 8 Differentiating Affinity');

    // Step 9: Calculate Thermodynamic Activity (Faded Calculation)
    await page.getByRole('button', { name: /Continue to Step 9/i }).click();
    await expect(page.getByRole('heading', { name: 'Calculate Thermodynamic Activity' })).toBeVisible();

    // Select correct calculation
    await page
      .getByRole('radio', { name: /a = 0\.05 \(5% relative saturation\)/i })
      .click();
    await page.getByRole('button', { name: /Commit Hypothesis & Reveal Outcome/i }).click();
    await expect(page.getByText(/Hypothesis Confirmed/i)).toBeVisible();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-09-predict-revealed.png`),
    });
    await runAxeAudit('Step 9 Calculation');

    // -------------------------------------------------------------
    // 7. Step 10 (Recap, Progress Persistence & Leitner Enqueue)
    // -------------------------------------------------------------
    await page.getByRole('button', { name: /Continue to Step 10/i }).click();
    await expect(page.getByText('Lesson 1 Mastered!')).toBeVisible();
    await expect(page.getByText('+50 XP Earned')).toBeVisible();
    await expect(page.getByText(/Enqueued Leitner Spaced Review Cards/i)).toBeVisible();
    await expect(page.getByText(/Box 1 \(Interval: 1 Day\)/i).first()).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-10-recap-complete.png`),
      fullPage: true,
    });
    await runAxeAudit('Step 10 Mastered');

    // Verify ZERO remote Firestore writes occurred for unauthenticated guest
    expect(remoteFirestoreWrites).toEqual([]);

    // Verify localStorage progress saved
    const savedProgress = await page.evaluate(() => localStorage.getItem('pharmacy_progress_medchem'));
    expect(savedProgress).not.toBeNull();
    const parsedProgress = JSON.parse(savedProgress!);
    expect(parsedProgress.completedLessonIds).toContain('mc-mod1-les1');
    expect(parsedProgress.totalXP).toBeGreaterThanOrEqual(50);

    // Verify Leitner cards saved in localStorage
    const savedCards = await page.evaluate(() => localStorage.getItem('pharmacy_review_cards_medchem'));
    expect(savedCards).not.toBeNull();
    const parsedCards = JSON.parse(savedCards!);
    expect(parsedCards.length).toBe(3);

    // -------------------------------------------------------------
    // 8. Citations Accordion Verification
    // -------------------------------------------------------------
    await page.getByRole('button', { name: /Academic Sources & Textbook Verification/i }).click();
    await expect(page.getByText(/Foye's Principles of Medicinal Chemistry/i)).toBeVisible();
    await expect(page.getByText(/^References:/i)).toBeVisible();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-citations-accordion.png`),
    });

    // -------------------------------------------------------------
    // 9. Freemium Paywall Lockout on Lesson 3 (Light, Dark, and RTL)
    // -------------------------------------------------------------
    await page.goto('/courses/medchem/lessons/3');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('Unlock Lesson 3: The Partition Coefficient')).toBeVisible();
    // PaywallModal opens automatically on locked lessons
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('radio', { name: /Semester Pass|Dönemlik Paket|باقة الفصل الدراسي/i })).toBeVisible();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-lesson-03-paywall-light-en.png`),
      fullPage: false,
    });
    if (prefix.includes('mobile')) {
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, `${prefix}-lesson-03-paywall-viewport-375.png`),
        fullPage: false,
      });
    }

    // Test Paywall in Dark Mode
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: /toggle dark mode|toggle theme|temayı değiştir|تبديل المظهر/i }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await page.getByRole('button', { name: /View Student Passes/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-lesson-03-paywall-dark.png`),
      fullPage: false,
    });

    // Test Paywall in Arabic RTL + Dark
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'AR', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await page.getByRole('button', { name: /View Student Passes/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-lesson-03-paywall-dark-rtl-ar.png`),
      fullPage: false,
    });

    await page.keyboard.press('Escape');

    // -------------------------------------------------------------
    // 10. Multi-Locale (TR, AR RTL) & Dark Mode Parity
    // -------------------------------------------------------------
    await page.goto('/courses/medchem/lessons/1');
    await page.waitForLoadState('networkidle');

    // Turkish TR
    await page.getByRole('button', { name: 'TR', exact: true }).click();
    await expect(page.getByText('Termodinamik Aktivite ve Ferguson İlkesi')).toBeVisible();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-lesson-tr.png`),
    });

    // Reset to English Light for next tests
    await page.getByRole('button', { name: 'EN', exact: true }).click();
    if (await page.locator('html').evaluate((el) => el.classList.contains('dark'))) {
      await page.getByRole('button', { name: /toggle dark mode|toggle theme|temayı değiştir|تبديل المظهر/i }).click();
    }

    // Assert zero console errors & zero failed network requests
    expect(consoleErrors).toEqual([]);
    expect(failedRequests).toEqual([]);
  });

  test('verifies keyboard-only completion through all 10 steps and reduced-motion fallback', async ({
    page,
  }, testInfo) => {
    // Emulate reduced motion
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // Ensure clean state starting from Step 1
    await page.goto('/courses/medchem/lessons/1');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');

    // -------------------------------------------------------------
    // Step 1: Hook Clinical Vignette -> ArrowRight
    // -------------------------------------------------------------
    await expect(page.getByText('Step 1 of 10')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Two Drugs, Vastly Different Quantities' })
    ).toBeVisible();
    await page.keyboard.press('ArrowRight');

    // -------------------------------------------------------------
    // Step 2: Predict Thermodynamic Activity of Vapors
    // -------------------------------------------------------------
    await expect(page.getByText('Step 2 of 10')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Thermodynamic Activity of Vapors' })
    ).toBeVisible();
    await page.keyboard.press('2');
    await page.keyboard.press('Enter');
    await expect(page.getByText(/Diagnostic Feedback: Misconception Identified|Hypothesis Confirmed/i)).toBeVisible();
    await page.keyboard.press('ArrowRight');

    // -------------------------------------------------------------
    // Step 3: Predict The Non-Specific Activity Threshold
    // -------------------------------------------------------------
    await expect(page.getByText('Step 3 of 10')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'The Non-Specific Activity Threshold' })
    ).toBeVisible();
    await page.keyboard.press('1');
    await page.keyboard.press('Enter');
    await expect(page.getByText(/Hypothesis Confirmed/i)).toBeVisible();
    await expect(
      page.getByText(/Non-specific depressants act within a high relative saturation range/i)
    ).toBeVisible();
    await page.keyboard.press('ArrowRight');

    // -------------------------------------------------------------
    // Step 4: Predict Exobiophase to Endobiophase Equilibrium
    // -------------------------------------------------------------
    await expect(page.getByText('Step 4 of 10')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Exobiophase to Endobiophase Equilibrium' })
    ).toBeVisible();
    await page.keyboard.press('3');
    await page.keyboard.press('Enter');
    await expect(page.getByText(/Hypothesis Confirmed/i)).toBeVisible();
    await expect(
      page.getByText(/Chemical potential and thermodynamic activity a are identical across all phases/i)
    ).toBeVisible();
    await page.keyboard.press('ArrowRight');

    // -------------------------------------------------------------
    // Step 5: Checkpoint Classify Mystery Compounds
    // -------------------------------------------------------------
    await expect(page.getByText('Step 5 of 10')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Classify Mystery Compounds' })
    ).toBeVisible();
    await page.keyboard.press('2');
    await page.keyboard.press('Enter');
    await expect(page.getByText(/Correct! High thermodynamic activity/i)).toBeVisible();
    await page.keyboard.press('ArrowRight');

    // -------------------------------------------------------------
    // Step 6: Predict Core Structural Sensitivity
    // -------------------------------------------------------------
    await expect(page.getByText('Step 6 of 10')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Core Structural Sensitivity' })
    ).toBeVisible();
    await page.keyboard.press('1');
    await page.keyboard.press('Enter');
    await expect(page.getByText(/Hypothesis Confirmed/i)).toBeVisible();
    await expect(
      page.getByText(/Activity drops sharply or converts into antagonism when key binding groups are altered/i)
    ).toBeVisible();
    await page.keyboard.press('ArrowRight');

    // -------------------------------------------------------------
    // Step 7: Predict Chemical Diversity in Anesthesia
    // -------------------------------------------------------------
    await expect(page.getByText('Step 7 of 10')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Chemical Diversity in Anesthesia' })
    ).toBeVisible();
    await page.keyboard.press('3');
    await page.keyboard.press('Enter');
    await expect(page.getByText(/Hypothesis Confirmed/i)).toBeVisible();
    await expect(
      page.getByText(/Non-specific depressants produce equal biological effects at equal thermodynamic activities/i)
    ).toBeVisible();
    await page.keyboard.press('ArrowRight');

    // -------------------------------------------------------------
    // Step 8: Predict Differentiating Affinity from Saturation
    // -------------------------------------------------------------
    await expect(page.getByText('Step 8 of 10')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Differentiating Affinity from Saturation' })
    ).toBeVisible();
    await page.keyboard.press('2');
    await page.keyboard.press('Enter');
    await expect(page.getByText(/Hypothesis Confirmed/i)).toBeVisible();
    await expect(
      page.getByText(/Drug A is structurally specific \(low thermodynamic activity\); Drug B is structurally non-specific/i)
    ).toBeVisible();
    await page.keyboard.press('ArrowRight');

    // -------------------------------------------------------------
    // Step 9: Faded Calculation Calculate Thermodynamic Activity
    // -------------------------------------------------------------
    await expect(page.getByText('Step 9 of 10')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Calculate Thermodynamic Activity' })
    ).toBeVisible();
    await page.keyboard.press('3');
    await page.keyboard.press('Enter');
    await expect(page.getByText(/Hypothesis Confirmed/i)).toBeVisible();
    await expect(
      page.getByText(/a = 10 \/ 200 = 0\.05|5% of its saturation limit/i)
    ).toBeVisible();
    await page.keyboard.press('ArrowRight');

    // -------------------------------------------------------------
    // Step 10: Lesson 1 Recap Mastered & XP Celebration
    // -------------------------------------------------------------
    await expect(page.getByText('Step 10 of 10')).toBeVisible();
    await expect(page.getByText('Lesson 1 Mastered!')).toBeVisible();
    await expect(page.getByText('+50 XP Earned')).toBeVisible();
    await expect(page.getByText(/Enqueued Leitner Spaced Review Cards/i)).toBeVisible();

    await page.screenshot({
      path: path.join(
        SCREENSHOT_DIR,
        `${testInfo.project.name}-keyboard-nav-reduced-motion-step-10.png`
      ),
    });
  });

  test('verifies free trial start and expiry banner state in UI', async ({ page }, testInfo) => {
    const prefix = testInfo.project.name;

    // 1. Seed initial guest student progress and review cards
    await page.goto('/courses/medchem/lessons/1');
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem(
        'pharmacy_progress_medchem',
        JSON.stringify({
          courseId: 'medchem',
          completedLessonIds: ['mc-mod1-les1'],
          currentModuleId: 'mc-mod-01',
          currentLessonId: 'mc-mod1-les1',
          currentStepIndex: 9,
          streakDays: 1,
          lastStreakDate: '2026-09-29',
          totalXP: 50,
          accuracyRate: 100,
        })
      );
      localStorage.setItem(
        'pharmacy_review_cards_medchem',
        JSON.stringify([
          {
            id: 'card-1',
            front: 'What is thermodynamic activity (a) for an ideal gas or vapor?',
            back: 'a = p / p0 (partial pressure divided by saturation vapor pressure)',
            box: 1,
            nextDueDate: '2026-09-30T00:00:00.000Z',
            intervalDays: 1,
          },
          {
            id: 'card-2',
            front: 'Ferguson rule for structurally non-specific drugs:',
            back: 'They achieve cellular effect at roughly equal thermodynamic activities (a = [pending-human-review]).',
            box: 1,
            nextDueDate: '2026-09-30T00:00:00.000Z',
            intervalDays: 1,
          },
          {
            id: 'card-3',
            front: 'Ferguson rule for structurally specific drugs:',
            back: 'They act at much lower thermodynamic activities because specific target binding provides high affinity.',
            box: 1,
            nextDueDate: '2026-09-30T00:00:00.000Z',
            intervalDays: 1,
          },
        ])
      );
    });

    // 2. Navigate to locked Lesson 3
    await page.goto('/courses/medchem/lessons/3');
    await page.waitForLoadState('networkidle');

    // PaywallModal is open
    await expect(page.getByRole('dialog')).toBeVisible();

    // 3. Click "Start 7-Day Free Trial"
    await page.getByRole('dialog').getByRole('button', { name: /Start Free Trial|Ücretsiz Denemeyi Başlat|بدء التجربة المجانية/i }).click();

    // 4. Trial activated: Dialog closes and trial banner appears
    await expect(page.getByRole('dialog')).not.toBeVisible();
    await expect(page.getByLabel(/Account Plan Status|Hesap Planı Durumu|حالة خطة الحساب/i)).toBeVisible();
    await expect(page.getByText(/7 days remaining|7 gün kaldı|متبقي 7 أيام/i).first()).toBeVisible();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-trial-started-ui.png`),
    });

    // 5. Expire the trial: Simulate backend expiration downgrade
    await page.evaluate(() => {
      const user = JSON.parse(localStorage.getItem('pharmacy_user_profile') || '{}');
      user.plan = 'free';
      user.trialEndsAt = '2026-09-01T00:00:00.000Z';
      localStorage.setItem('pharmacy_user_profile', JSON.stringify(user));

      const ents = JSON.parse(localStorage.getItem('pharmacy_entitlements') || '[]');
      const updatedEnts = ents.map((e: any) => ({ ...e, status: 'expired' }));
      localStorage.setItem('pharmacy_entitlements', JSON.stringify(updatedEnts));
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    // 6. Verify downgraded to Free & Lesson 3 locked again
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText(/Your 7-day trial has ended|TRIAL EXPIRED|7 günlük deneme süreniz sona erdi|انتهت فترتك التجريبية/i).first()).toBeVisible();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-trial-expired-downgrade.png`),
    });

    // 7. Verify 100% of student progress and review cards remain completely intact
    const progressData = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('pharmacy_progress_medchem') || '{}')
    );
    expect(progressData.completedLessonIds).toContain('mc-mod1-les1');
    expect(progressData.totalXP).toBeGreaterThanOrEqual(50);

    const reviewCards = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('pharmacy_review_cards_medchem') || '[]')
    );
    expect(reviewCards.length).toBeGreaterThanOrEqual(3);
    expect(reviewCards[0].front).toContain('thermodynamic activity');
  });

  test('captures interactive lesson steps across Dark Mode, Turkish (TR), and Arabic (AR RTL)', async ({
    page,
  }, testInfo) => {
    const prefix = testInfo.project.name;

    const setStepAndScreenshot = async (stepIdx: number, screenshotName: string) => {
      await page.evaluate((idx) => {
        localStorage.setItem(
          'pharmacy_progress_medchem',
          JSON.stringify({
            courseId: 'medchem',
            completedLessonIds: idx === 9 ? ['mc-mod1-les1'] : [],
            currentLessonId: 'mc-mod1-les1',
            currentStepIndex: idx,
            totalXP: idx === 9 ? 50 : 20,
          })
        );
      }, stepIdx);
      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, screenshotName) });
    };

    // 1. Dark Mode Walkthrough
    await page.goto('/courses/medchem/lessons/1');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: /toggle dark mode|toggle theme|temayı değiştir|تبديل المظهر/i }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-step-01-dark.png`) });

    await setStepAndScreenshot(1, `${prefix}-step-02-dark.png`);
    await setStepAndScreenshot(4, `${prefix}-step-05-dark.png`);
    await setStepAndScreenshot(9, `${prefix}-step-10-dark.png`);

    // 2. Turkish (TR) Walkthrough
    await page.goto('/courses/medchem/lessons/1');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'TR', exact: true }).click();
    await expect(page.getByText(/Termodinamik Aktivite ve Ferguson İlkesi/i)).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-step-01-tr.png`) });

    await setStepAndScreenshot(1, `${prefix}-step-02-tr.png`);
    await setStepAndScreenshot(4, `${prefix}-step-05-tr.png`);
    await setStepAndScreenshot(9, `${prefix}-step-10-tr.png`);

    // 3. Arabic (AR RTL) Walkthrough
    await page.goto('/courses/medchem/lessons/1');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'AR', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.getByText(/النشاط الديناميكي الحراري ومبدأ فيرجسون/i)).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-step-01-ar.png`) });

    await setStepAndScreenshot(1, `${prefix}-step-02-ar.png`);
    await setStepAndScreenshot(4, `${prefix}-step-05-ar.png`);
    await setStepAndScreenshot(9, `${prefix}-step-10-ar.png`);
  });

  test('captures diagnostic misconception feedback and axe audits on incorrect predictions (Steps 3-9)', async ({
    page,
  }, testInfo) => {
    const prefix = testInfo.project.name;

    const runAxeAudit = async (stepIdentifier: string) => {
      await page.addScriptTag({ path: AXE_PATH });
      const axeResults = await page.evaluate(async () => {
        return await (window as any).axe.run({
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
        });
      });
      const seriousOrCritical = axeResults.violations.filter(
        (v: any) => v.impact === 'serious' || v.impact === 'critical'
      );
      expect(
        seriousOrCritical,
        `Axe violations detected on ${stepIdentifier} in ${prefix}`
      ).toEqual([]);
    };

    const goToStep = async (stepIndex: number) => {
      await page.goto('/courses/medchem/lessons/1');
      await page.waitForLoadState('networkidle');
      await page.evaluate((idx) => {
        localStorage.setItem(
          'pharmacy_progress_medchem',
          JSON.stringify({
            courseId: 'medchem',
            completedLessonIds: [],
            currentLessonId: 'mc-mod1-les1',
            currentStepIndex: idx,
            totalXP: 10,
          })
        );
      }, stepIndex);
      await page.reload();
      await page.waitForLoadState('networkidle');
    };

    // Step 3: Wrong prediction
    await goToStep(2);
    await page.getByRole('radio', { name: /a < 0\.0001/i }).click();
    await page.getByRole('button', { name: /Commit Hypothesis & Reveal Outcome/i }).click();
    await expect(page.getByText(/Diagnostic Feedback: Misconception Identified/i)).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-step-03-predict-wrong.png`) });
    await runAxeAudit('Step 3 Predict Wrong');

    // Step 4: Wrong prediction
    await goToStep(3);
    await page.getByRole('radio', { name: /Much higher in blood/i }).click();
    await page.getByRole('button', { name: /Commit Hypothesis & Reveal Outcome/i }).click();
    await expect(page.getByText(/Diagnostic Feedback: Misconception Identified/i)).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-step-04-predict-wrong.png`) });
    await runAxeAudit('Step 4 Predict Wrong');

    // Step 5: Wrong distractor
    await goToStep(4);
    await page.getByRole('radio', { name: /Compound Y/i }).click();
    await page.getByRole('button', { name: /Check Answer/i }).click();
    await expect(page.getByText(/Extreme stereoselectivity/i)).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-step-05-checkpoint-wrong.png`) });
    await runAxeAudit('Step 5 Checkpoint Wrong');

    // Step 6: Wrong prediction
    await goToStep(5);
    await page.getByRole('radio', { name: /Activity increases invariably/i }).click();
    await page.getByRole('button', { name: /Commit Hypothesis & Reveal Outcome/i }).click();
    await expect(page.getByText(/Diagnostic Feedback: Misconception Identified/i)).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-step-06-predict-wrong.png`) });
    await runAxeAudit('Step 6 Predict Wrong');

    // Step 7: Wrong prediction
    await goToStep(6);
    await page.getByRole('radio', { name: /All three bind the identical/i }).click();
    await page.getByRole('button', { name: /Commit Hypothesis & Reveal Outcome/i }).click();
    await expect(page.getByText(/Diagnostic Feedback: Misconception Identified/i)).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-step-07-predict-wrong.png`) });
    await runAxeAudit('Step 7 Predict Wrong');

    // Step 8: Wrong prediction
    await goToStep(7);
    await page.getByRole('radio', { name: /Drug B is more potent/i }).click();
    await page.getByRole('button', { name: /Commit Hypothesis & Reveal Outcome/i }).click();
    await expect(page.getByText(/Diagnostic Feedback: Misconception Identified/i)).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-step-08-predict-wrong.png`) });
    await runAxeAudit('Step 8 Predict Wrong');

    // Step 9: Wrong calculation
    await goToStep(8);
    await page.getByRole('radio', { name: /a = 20\.0/i }).click();
    await page.getByRole('button', { name: /Commit Hypothesis & Reveal Outcome/i }).click();
    await expect(page.getByText(/Diagnostic Feedback: Misconception Identified/i)).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-step-09-predict-wrong.png`) });
    await runAxeAudit('Step 9 Predict Wrong');
  });
});
