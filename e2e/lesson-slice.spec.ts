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
  test('executes end-to-end Lesson 1 flow, axe scan on all 12 steps, hints, and paywall gating', async ({
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
    // 1. Lesson 1 Initial Load & Phase 1 Biophysical Simulation Lab
    // -------------------------------------------------------------
    await page.goto('/courses/medchem/lessons/1');
    await page.waitForLoadState('networkidle');

    // Ensure English locale for Lesson 1 flow assertions
    const enButton = page.getByRole('button', { name: 'EN', exact: true });
    if (await enButton.isVisible()) {
      await enButton.click();
    }

    // Verify Title and 3-Phase Navigation Bar
    await expect(page.getByText('Thermodynamic Activity & The Ferguson Principle')).toBeVisible();
    await expect(page.getByRole('button', { name: /Explore & Understand|Keşfet ve Anla/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Guided Missions|Uygulamalı Görevler/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Concept Quiz|Kavram Testi/i })).toBeVisible();

    // Verify Phase 1: Biophysical Simulation Lab
    await expect(page.getByText(/Biophysical Simulation Lab/i)).toBeVisible();
    await expect(page.getByText(/Clinical & Faculty Presets|Hazır Ayarlar/i)).toBeVisible();
    await expect(page.getByText(/Live Biophysical Status HUD|Durum Monitörü/i)).toBeVisible();

    // Transition to Phase 3: Concept Quiz & 12-Stage Mastery Progression
    await page.getByRole('button', { name: /Concept Quiz|Kavram Testi/i }).click();
    await page.waitForLoadState('networkidle');

    // -------------------------------------------------------------
    // Step 1: Hook Clinical Vignette
    // -------------------------------------------------------------
    await expect(page.getByText('Two Drugs, Vastly Different Quantities')).toBeVisible();
    await expect(page.getByText(/Agent A:|Madde A:/i)).toBeVisible();
    await expect(page.getByText('Diethyl Ether').first()).toBeVisible();
    await expect(page.getByText(/Agent B:|Madde B:/i)).toBeVisible();
    await expect(page.getByText('Propranolol').first()).toBeVisible();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-01-hook.png`),
      fullPage: true,
    });
    await runAxeAudit('Step 1 Hook');

    // -------------------------------------------------------------
    // Step 2: Prediction: Anesthesia at Equal Saturation
    // -------------------------------------------------------------
    await page.getByRole('button', { name: /Continue to Step 2/i }).click();
    await expect(page.getByRole('heading', { name: 'Prediction: Anesthesia at Equal Saturation' })).toBeVisible();

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
      .getByRole('radio', { name: /They exhibit completely different effects based on differing chemical structures/i })
      .click();
    await expect(page.getByRole('button', { name: /Commit Hypothesis & Reveal Outcome/i })).toBeEnabled();

    // Commit wrong prediction to verify misconception feedback
    await page.getByRole('button', { name: /Commit Hypothesis & Reveal Outcome/i }).click();
    await expect(page.getByText(/Diagnostic Feedback: Misconception Identified/i)).toBeVisible();
    await expect(
      page.getByText(/According to Ferguson's principle, thermodynamic activity governs biological depression/i)
    ).toBeVisible();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-02-predict-wrong.png`),
    });
    await runAxeAudit('Step 2 Predict Wrong');

    // -------------------------------------------------------------
    // Step 3: Intuitive Model: Escaping Tendency from Membrane
    // -------------------------------------------------------------
    await page.getByRole('button', { name: /Continue to Step 3/i }).click();
    await expect(page.getByRole('heading', { name: 'Intuitive Model: Escaping Tendency from Membrane' })).toBeVisible();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-03-predict-revealed.png`),
    });
    await runAxeAudit('Step 3 Intuition');

    // -------------------------------------------------------------
    // Step 4: Visualization: Lipid Bilayer Expansion
    // -------------------------------------------------------------
    await page.getByRole('button', { name: /Continue to Step 4/i }).click();
    await expect(page.getByRole('heading', { name: 'Visualization: Lipid Bilayer Expansion' })).toBeVisible();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-04-predict-revealed.png`),
    });
    await runAxeAudit('Step 4 Visualization');

    // -------------------------------------------------------------
    // Step 5: Interactive Simulation: Ferguson Slider
    // -------------------------------------------------------------
    await page.getByRole('button', { name: /Continue to Step 5/i }).click();
    await expect(page.getByRole('heading', { name: 'Interactive Simulation: Ferguson Slider' })).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-05-checkpoint.png`),
    });
    await runAxeAudit('Step 5 Interactive Artifact');

    // -------------------------------------------------------------
    // Step 6: Guided Discovery: Nitrous Oxide vs Chloroform
    // -------------------------------------------------------------
    await page.getByRole('button', { name: /Continue to Step 6/i }).click();
    await expect(page.getByRole('heading', { name: 'Guided Discovery: Nitrous Oxide vs Chloroform' })).toBeVisible();
    await page
      .getByRole('radio', { name: /In the same narrow relative saturation window for both gases/i })
      .click();
    await page.getByRole('button', { name: /Commit Hypothesis & Reveal Outcome/i }).click();
    await expect(page.getByText(/Hypothesis Confirmed/i)).toBeVisible();
    await expect(page.getByText(/The relative saturation rule is independent of chemical structure/i)).toBeVisible();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-06-predict-revealed.png`),
    });
    await runAxeAudit('Step 6 Guided Discovery');

    // -------------------------------------------------------------
    // Step 7: Formal Formulation: Ferguson's Principle
    // -------------------------------------------------------------
    await page.getByRole('button', { name: /Continue to Step 7/i }).click();
    await expect(page.getByRole('heading', { name: "Formal Formulation: Ferguson's Principle" })).toBeVisible();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-07-predict-revealed.png`),
    });
    await runAxeAudit('Step 7 Formal Principle');

    // -------------------------------------------------------------
    // Step 8: Concept Check: Classifying Mystery Compounds
    // -------------------------------------------------------------
    await page.getByRole('button', { name: /Continue to Step 8/i }).click();
    await expect(page.getByRole('heading', { name: 'Concept Check: Classifying Mystery Compounds' })).toBeVisible();
    await page
      .getByRole('radio', { name: /Compound Y is structurally specific because it acts at extreme dilution/i })
      .click();
    await page.getByRole('button', { name: /Check Answer|Commit Hypothesis/i }).click();
    await expect(page.getByText(/Hypothesis Confirmed/i)).toBeVisible();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-08-predict-revealed.png`),
    });
    await runAxeAudit('Step 8 Concept Check');

    // -------------------------------------------------------------
    // Step 9: Application: Volatile Inhalation Dose Calculation
    // -------------------------------------------------------------
    await page.getByRole('button', { name: /Continue to Step 9/i }).click();
    await expect(page.getByRole('heading', { name: 'Application: Volatile Inhalation Dose Calculation' })).toBeVisible();
    await page
      .getByRole('radio', { name: /a = 0\.05; falls within the surgical anesthesia window/i })
      .click();
    await page.getByRole('button', { name: /Commit Hypothesis & Reveal Outcome/i }).click();
    await expect(page.getByText(/Hypothesis Confirmed/i)).toBeVisible();
    await expect(page.getByText(/a = Pt \/ P0 = 10 \/ 200 = 0\.05/i).first()).toBeVisible();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-09-predict-revealed.png`),
    });
    await runAxeAudit('Step 9 Application');

    // -------------------------------------------------------------
    // Step 10: Retrieval: Raoult's Law from General Chemistry
    // -------------------------------------------------------------
    await page.getByRole('button', { name: /Continue to Step 10/i }).click();
    await expect(page.getByRole('heading', { name: "Retrieval: Raoult's Law from General Chemistry" })).toBeVisible();
    await runAxeAudit('Step 10 Retrieval');

    // -------------------------------------------------------------
    // Step 11: Connection: Solubility and Ionization (Lesson 2)
    // -------------------------------------------------------------
    await page.getByRole('button', { name: /Continue to Step 11/i }).click();
    await expect(page.getByRole('heading', { name: 'Connection: Solubility and Ionization' })).toBeVisible();
    await runAxeAudit('Step 11 Connection');

    // -------------------------------------------------------------
    // Step 12: Mastery Assessment & Flashcard Enqueue
    // -------------------------------------------------------------
    await page.getByRole('button', { name: /Continue to Step 12/i }).click();
    await expect(page.getByRole('heading', { name: 'Mastery Assessment: Ferguson Principle Summary' })).toBeVisible();
    await page
      .getByRole('radio', { name: /Their relative thermodynamic saturation in the biophase, independent of chemical structure/i })
      .click();
    await page.getByRole('button', { name: /Check Answer|Commit Hypothesis/i }).click();
    await expect(page.getByText(/Hypothesis Confirmed/i)).toBeVisible();

    // Verify Lesson Mastered UI and XP Award
    await expect(page.getByRole('heading', { name: /Lesson Mastered!|Ders Başarıyla Tamamlandı!/i })).toBeVisible();
    await expect(page.getByText('+50 XP', { exact: true })).toBeVisible();
    await expect(page.getByText(/Enqueued Leitner Spaced Review Cards/i)).toBeVisible();
    await expect(page.getByText(/Box 1 \(Interval: 1 Day\)/i).first()).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-step-10-recap-complete.png`),
      fullPage: true,
    });
    await runAxeAudit('Step 12 Mastered');

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
    await page.getByRole('button', { name: /Academic Sources & Textbook Verification|Akademik Kaynaklar/i }).click();
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

    await expect(page.getByText('Unlock Full Course Modules & Lab Tools')).toBeVisible();
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
    await page.getByRole('button', { name: /View Student Passes|Öğrenci Aboneliklerini İncele|عرض الاشتراكات الطلابية/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${prefix}-lesson-03-paywall-dark.png`),
      fullPage: false,
    });

    // Test Paywall in Arabic RTL + Dark
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'AR', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await page.getByRole('button', { name: /View Student Passes|Öğrenci Aboneliklerini İncele|عرض الاشتراكات الطلابية/i }).first().click();
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

  test('verifies keyboard-only completion through all 12 steps and reduced-motion fallback', async ({
    page,
  }, testInfo) => {
    // Emulate reduced motion
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // Clean state starting at Lesson 1 in Quiz mode
    await page.goto('/courses/medchem/lessons/1?phase=quiz');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Ensure English locale for keyboard assertions
    const enButton = page.getByRole('button', { name: 'EN', exact: true });
    if (await enButton.isVisible()) {
      await enButton.click();
    }

    // -------------------------------------------------------------
    // Step 1: Hook Clinical Vignette -> ArrowRight
    // -------------------------------------------------------------
    await expect(page.getByText('Step 1 of 12')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Two Drugs, Vastly Different Quantities' })
    ).toBeVisible();
    await page.keyboard.press('ArrowRight');

    // -------------------------------------------------------------
    // Step 2: Prediction: Anesthesia at Equal Saturation
    // -------------------------------------------------------------
    await expect(page.getByText('Step 2 of 12')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Prediction: Anesthesia at Equal Saturation' })
    ).toBeVisible();
    await page.keyboard.press('3');
    await page.keyboard.press('Enter');
    await expect(page.getByText(/Diagnostic Feedback: Misconception Identified|Hypothesis Confirmed/i)).toBeVisible();
    await page.keyboard.press('ArrowRight');

    // -------------------------------------------------------------
    // Step 3: Intuitive Model: Escaping Tendency from Membrane
    // -------------------------------------------------------------
    await expect(page.getByText('Step 3 of 12')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Intuitive Model: Escaping Tendency from Membrane' })
    ).toBeVisible();
    await page.keyboard.press('ArrowRight');

    // -------------------------------------------------------------
    // Step 4: Visualization: Lipid Bilayer Expansion
    // -------------------------------------------------------------
    await expect(page.getByText('Step 4 of 12')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Visualization: Lipid Bilayer Expansion' })
    ).toBeVisible();
    await page.keyboard.press('ArrowRight');

    // -------------------------------------------------------------
    // Step 5: Interactive Simulation: Ferguson Slider
    // -------------------------------------------------------------
    await expect(page.getByText('Step 5 of 12')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Interactive Simulation: Ferguson Slider' })
    ).toBeVisible();
    await page.keyboard.press('ArrowRight');

    // -------------------------------------------------------------
    // Step 6: Guided Discovery: Nitrous Oxide vs Chloroform
    // -------------------------------------------------------------
    await expect(page.getByText('Step 6 of 12')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Guided Discovery: Nitrous Oxide vs Chloroform' })
    ).toBeVisible();
    await page.keyboard.press('1');
    await page.keyboard.press('Enter');
    await expect(page.getByText(/Hypothesis Confirmed/i)).toBeVisible();
    await page.keyboard.press('ArrowRight');

    // -------------------------------------------------------------
    // Step 7: Formal Formulation: Ferguson's Principle
    // -------------------------------------------------------------
    await expect(page.getByText('Step 7 of 12')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: "Formal Formulation: Ferguson's Principle" })
    ).toBeVisible();
    await page.keyboard.press('ArrowRight');

    // -------------------------------------------------------------
    // Step 8: Concept Check: Classifying Mystery Compounds
    // -------------------------------------------------------------
    await expect(page.getByText('Step 8 of 12')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Concept Check: Classifying Mystery Compounds' })
    ).toBeVisible();
    await page.keyboard.press('1');
    await page.keyboard.press('Enter');
    await expect(page.getByText(/Hypothesis Confirmed/i)).toBeVisible();
    await page.keyboard.press('ArrowRight');

    // -------------------------------------------------------------
    // Step 9: Application: Volatile Inhalation Dose Calculation
    // -------------------------------------------------------------
    await expect(page.getByText('Step 9 of 12')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Application: Volatile Inhalation Dose Calculation' })
    ).toBeVisible();
    await page.keyboard.press('2');
    await page.keyboard.press('Enter');
    await expect(page.getByText(/Hypothesis Confirmed/i)).toBeVisible();
    await page.keyboard.press('ArrowRight');

    // -------------------------------------------------------------
    // Step 10: Retrieval: Raoult's Law from General Chemistry
    // -------------------------------------------------------------
    await expect(page.getByText('Step 10 of 12')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: "Retrieval: Raoult's Law from General Chemistry" })
    ).toBeVisible();
    await page.keyboard.press('ArrowRight');

    // -------------------------------------------------------------
    // Step 11: Connection: Solubility and Ionization
    // -------------------------------------------------------------
    await expect(page.getByText('Step 11 of 12')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Connection: Solubility and Ionization' })
    ).toBeVisible();
    await page.keyboard.press('ArrowRight');

    // -------------------------------------------------------------
    // Step 12: Mastery Assessment: Ferguson Principle Summary
    // -------------------------------------------------------------
    await expect(page.getByText('Step 12 of 12')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Mastery Assessment: Ferguson Principle Summary' })
    ).toBeVisible();
    await page.keyboard.press('2');
    await page.keyboard.press('Enter');
    await expect(page.getByText(/Hypothesis Confirmed/i)).toBeVisible();

    // Verify Mastered State
    await expect(page.getByRole('heading', { name: /Lesson Mastered!|Ders Başarıyla Tamamlandı!/i })).toBeVisible();
    await expect(page.getByText('+50 XP', { exact: true })).toBeVisible();
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
          currentStepIndex: 11,
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
            back: 'They achieve cellular effect at roughly equal thermodynamic activities.',
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
    await expect(
      page.getByTestId('trial-banner')
        .or(page.getByRole('region', { name: /Account Plan Status|Hesap Planı Durumu|حالة خطة الحساب/i }))
        .or(page.locator('aside[aria-label]'))
    ).toBeVisible();
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
            completedLessonIds: idx >= 11 ? ['mc-mod1-les1'] : [],
            currentLessonId: 'mc-mod1-les1',
            currentStepIndex: idx,
            totalXP: idx >= 11 ? 50 : 20,
          })
        );
      }, stepIdx);
      await page.goto('/courses/medchem/lessons/1?phase=quiz');
      await page.waitForLoadState('networkidle');
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, screenshotName) });
    };

    // 1. Dark Mode Walkthrough
    await page.goto('/courses/medchem/lessons/1?phase=quiz');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: /toggle dark mode|toggle theme|temayı değiştir|تبديل المظهر/i }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-step-01-dark.png`) });

    await setStepAndScreenshot(1, `${prefix}-step-02-dark.png`);
    await setStepAndScreenshot(4, `${prefix}-step-05-dark.png`);
    await setStepAndScreenshot(11, `${prefix}-step-10-dark.png`);

    // 2. Turkish (TR) Walkthrough
    await page.goto('/courses/medchem/lessons/1?phase=quiz');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'TR', exact: true }).click();
    await expect(page.getByText(/Termodinamik Aktivite ve Ferguson İlkesi/i)).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-step-01-tr.png`) });

    await setStepAndScreenshot(1, `${prefix}-step-02-tr.png`);
    await setStepAndScreenshot(4, `${prefix}-step-05-tr.png`);
    await setStepAndScreenshot(11, `${prefix}-step-10-tr.png`);

    // 3. Arabic (AR RTL) Walkthrough
    await page.goto('/courses/medchem/lessons/1?phase=quiz');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'AR', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.getByText(/النشاط الديناميكي الحراري ومبدأ (فيرجسون|Ferguson)/i)).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-step-01-ar.png`) });

    await setStepAndScreenshot(1, `${prefix}-step-02-ar.png`);
    await setStepAndScreenshot(4, `${prefix}-step-05-ar.png`);
    await setStepAndScreenshot(11, `${prefix}-step-10-ar.png`);
  });

  test('captures diagnostic misconception feedback and axe audits on incorrect predictions (Steps 2, 6, 8, 9, 12)', async ({
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
      await page.goto('/courses/medchem/lessons/1?phase=quiz');
      await page.waitForLoadState('networkidle');
      await page.evaluate((idx) => {
        localStorage.setItem('pharmacy_locale', 'en');
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
      await page.goto('/courses/medchem/lessons/1?phase=quiz');
      await page.waitForLoadState('networkidle');
    };

    // Step 2: Prediction wrong distractor
    await goToStep(1);
    await page.getByRole('radio', { name: /They exhibit completely different effects based on differing chemical structures/i }).click();
    const commitBtn2 = page.getByRole('button', { name: /Commit Hypothesis|Check Answer/i });
    await expect(commitBtn2).toBeEnabled();
    await commitBtn2.click();
    await expect(page.getByText(/Diagnostic Feedback: Misconception Identified/i)).toBeVisible();
    await expect(page.getByText(/According to Ferguson's principle/i)).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-step-02-predict-wrong.png`) });
    await runAxeAudit('Step 2 Predict Wrong');

    // Step 6: Guided Discovery wrong distractor
    await goToStep(5);
    await page.getByRole('radio', { name: /At completely different activity values due to differing molecular weights/i }).click();
    const commitBtn6 = page.getByRole('button', { name: /Commit Hypothesis|Check Answer/i });
    await expect(commitBtn6).toBeEnabled();
    await commitBtn6.click();
    await expect(page.getByText(/Diagnostic Feedback: Misconception Identified/i)).toBeVisible();
    await expect(page.getByText(/Even with different molecular weights/i)).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-step-06-predict-wrong.png`) });
    await runAxeAudit('Step 6 Predict Wrong');

    // Step 8: Concept Check wrong distractor
    await goToStep(7);
    await page.getByRole('radio', { name: /Compound X is structurally specific because its effective dose is larger/i }).click();
    const commitBtn8 = page.getByRole('button', { name: /Commit Hypothesis|Check Answer/i });
    await expect(commitBtn8).toBeEnabled();
    await commitBtn8.click();
    await expect(page.getByText(/Diagnostic Feedback: Misconception Identified/i)).toBeVisible();
    await expect(page.getByText(/High saturation requirements define structurally non-specific/i)).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-step-08-predict-wrong.png`) });
    await runAxeAudit('Step 8 Concept Check Wrong');

    // Step 9: Application wrong calculation
    await goToStep(8);
    await page.getByRole('radio', { name: /a = 20\.0; represents a fatal massive overdose/i }).click();
    const commitBtn9 = page.getByRole('button', { name: /Commit Hypothesis|Check Answer/i });
    await expect(commitBtn9).toBeEnabled();
    await commitBtn9.click();
    await expect(page.getByText(/Diagnostic Feedback: Misconception Identified/i)).toBeVisible();
    await expect(page.getByText(/relative saturation cannot exceed standard limits/i)).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-step-09-predict-wrong.png`) });
    await runAxeAudit('Step 9 Predict Wrong');

    // Step 12: Mastery check wrong distractor
    await goToStep(11);
    await page.getByRole('radio', { name: /Their chemical core structures and ability to form specific covalent bonds/i }).click();
    const commitBtn12 = page.getByRole('button', { name: /Commit Hypothesis|Check Answer/i });
    await expect(commitBtn12).toBeEnabled();
    await commitBtn12.click();
    await expect(page.getByText(/Diagnostic Feedback: Misconception Identified/i)).toBeVisible();
    await expect(page.getByText(/Non-specific drugs do not form stereospecific covalent bonds/i)).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-step-12-predict-wrong.png`) });
    await runAxeAudit('Step 12 Mastery Check Wrong');
  });
});
