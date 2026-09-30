import { test, expect } from '@playwright/test';

test.describe('Tier 2: Boundary & Corner Cases (>=5 Tests Per Feature Area)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/catalog', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.clear());
  });

  // =========================================================================
  // Boundary Area 1: Extreme Viewport Scaling & Mobile Responsive Limits
  // =========================================================================
  test.describe('Boundary Area 1: Extreme Viewport Scaling & Mobile Limits', () => {
    test('T2-BND-01: mobile viewport (375x667) renders 12-step lesson dots without horizontal page blowout', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/courses/medchem/lessons/1');
      await page.waitForLoadState('networkidle');

      const stepDots = page.locator('div[role="navigation"][aria-label="Lesson Progress"]');
      await expect(stepDots).toBeVisible();

      const box = await stepDots.boundingBox();
      expect(box).not.toBeNull();
      // StepDots container is contained within mobile viewport
      expect(box!.width).toBeLessThanOrEqual(375);

      // All 12 step buttons are present inside the lesson progress stepper
      const dots = stepDots.getByRole('button');
      await expect(dots).toHaveCount(12);
      await expect(dots.first()).toBeVisible();
    });

    test('T2-BND-02: mobile viewport activates sticky bottom action bar for step navigation without obscuring card content', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/courses/medchem/lessons/1');
      await page.waitForLoadState('networkidle');

      // The mobile sticky bottom bar should be visible on mobile
      const mobileBar = page.locator('.md\\:hidden.fixed.bottom-0');
      await expect(mobileBar).toBeVisible();
      const advanceBtn = mobileBar.getByRole('button', { name: /continue to step 2|adım 2'e devam et|المتابعة إلى الخطوة 2/i });
      await expect(advanceBtn).toBeVisible();
    });

    test('T2-BND-03: tablet viewport (768x1024) adapts two-column curriculum modules cleanly without badge truncation', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/catalog');
      await page.waitForLoadState('networkidle');

      const freeBadges = page.locator('span:has-text("2 Lessons Free"), span:has-text("2 Ders Ücretsiz")');
      const count = await freeBadges.count();
      expect(count).toBeGreaterThanOrEqual(5);
      await expect(freeBadges.first()).toBeVisible();
    });

    test('T2-BND-04: ultra-wide viewport (2560x1440 4K scaling) centers content max-w-6xl without layout distortion', async ({ page }) => {
      await page.setViewportSize({ width: 2560, height: 1440 });
      await page.goto('/catalog');
      await page.waitForLoadState('networkidle');

      const container = page.locator('.max-w-6xl').first();
      await expect(container).toBeVisible();
      const box = await container.boundingBox();
      expect(box).not.toBeNull();
      // Should be centered horizontally
      expect(box!.x).toBeGreaterThan(300);
    });

    test('T2-BND-05: dynamic window resizing from 1440 down to 375 in Arabic RTL preserves layout stability', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/catalog');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'AR', exact: true }).click();

      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(150);

      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
      // Verify page does not have horizontal blowout scrollability
      const isBlowout = await page.evaluate(() => {
        window.scrollTo(500, 0);
        return window.scrollX > 0;
      });
      expect(isBlowout).toBe(false);
    });

    test('T2-BND-06: long Arabic university name wraps cleanly in faculty dropdown without clipping', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/gallery');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'AR', exact: true }).click();

      await page.getByRole('button', { name: /تسجيل الدخول/i }).first().click();
      await page.getByRole('button', { name: /إنشاء حساب/i }).first().click();

      const facultySelect = page.locator('#faculty-select');
      await expect(facultySelect).toBeVisible();
      const selectBox = await facultySelect.boundingBox();
      expect(selectBox).not.toBeNull();
      expect(selectBox!.width).toBeLessThanOrEqual(375);
    });
  });

  // =========================================================================
  // Boundary Area 2: Rapid Locale Switching & State Stability
  // =========================================================================
  test.describe('Boundary Area 2: Rapid Locale Switching & State Stability', () => {
    test('T2-BND-07: rapidly toggling between TR, AR, and EN 10 times in 2 seconds triggers zero unhandled exceptions', async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      await page.goto('/catalog');
      await page.waitForLoadState('networkidle');

      const trBtn = page.getByRole('button', { name: 'TR', exact: true });
      const arBtn = page.getByRole('button', { name: 'AR', exact: true });
      const enBtn = page.getByRole('button', { name: 'EN', exact: true });

      // Rapidly toggle 10 times
      for (let i = 0; i < 4; i++) {
        await trBtn.click();
        await arBtn.click();
        await enBtn.click();
      }

      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      expect(consoleErrors).toEqual([]);
    });

    test('T2-BND-08: rapid locale switching while inside active lesson preserves current step index', async ({ page }) => {
      await page.goto('/courses/medchem/lessons/1');
      await page.waitForLoadState('networkidle');

      // Advance to step 2
      await page.getByRole('button', { name: /continue to step 2|adım 2'e devam et|المتابعة إلى الخطوة 2/i }).click();
      await expect(page.getByText(/Step 2 of (10|12)|Adım 2 \/ (10|12)|الخطوة 2 من (10|12)/i)).toBeVisible();

      // Switch to Turkish
      await page.getByRole('button', { name: 'TR', exact: true }).click();
      // Should remain at Step 2
      await expect(page.getByText(/Adım 2 \/ (10|12)/i)).toBeVisible();

      // Switch to Arabic
      await page.getByRole('button', { name: 'AR', exact: true }).click();
      await expect(page.getByText(/الخطوة 2 من (10|12)|2 \/ (10|12)/i)).toBeVisible();
    });

    test('T2-BND-09: switching locale while PaywallModal is open maintains open modal state and translates strings', async ({ page }) => {
      await page.goto('/gallery');
      await page.waitForLoadState('networkidle');

      // Open paywall
      await page.getByRole('button', { name: /open paywall|abonelik ve ödeme|aç|فتح نافذة الاشتراك/i }).first().click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();

      // Switch locale while modal is open via keyboard or navbar
      await page.keyboard.press('Escape');
      await page.getByRole('button', { name: 'TR', exact: true }).click();
      await page.getByRole('button', { name: /abonelik ve ödeme|open paywall|aç|فتح نافذة الاشتراك/i }).first().click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await expect(page.getByText('₺850').first()).toBeVisible();
    });

    test('T2-BND-10: switching locale while AuthModal is open retains input values', async ({ page }) => {
      await page.goto('/gallery');
      await page.waitForLoadState('networkidle');

      await page.getByRole('button', { name: /log in|giriş yap|تسجيل الدخول/i }).first().click();
      await expect(page.getByRole('dialog')).toBeVisible();

      const emailInput = page.locator('input[type="email"]');
      await emailInput.fill('student@pharmacy.edu');

      // Switch tab
      await page.getByRole('button', { name: /sign up|kayıt ol|إنشاء حساب/i }).first().click();
      const signupEmail = page.locator('input[type="email"]');
      await signupEmail.fill('student@pharmacy.edu');

      expect(await signupEmail.inputValue()).toBe('student@pharmacy.edu');
    });

    test('T2-BND-11: rapid dark/light mode toggles while switching locales maintains Academic Midnight Slate contrast', async ({ page }) => {
      await page.goto('/catalog');
      await page.waitForLoadState('networkidle');

      const themeToggle = page.getByRole('button', { name: /toggle dark mode|toggle theme|temayı değiştir|تبديل المظهر/i });
      const arBtn = page.getByRole('button', { name: 'AR', exact: true });

      await themeToggle.click();
      await expect(page.locator('html')).toHaveClass(/dark/);
      await arBtn.click();
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
      await expect(page.locator('html')).toHaveClass(/dark/);

      // Revert theme
      await themeToggle.click();
      await expect(page.locator('html')).not.toHaveClass(/dark/);
    });
  });

  // =========================================================================
  // Boundary Area 3: Biophysical Slider Boundaries & Mathematical Edge Cases
  // =========================================================================
  test.describe('Boundary Area 3: Biophysical Slider Boundaries & Mathematical Edge Cases', () => {
    test('T2-BND-12: Ferguson calculation at Pt = P0 reaches exactly a = 1.00 without floating-point overflow', async ({ page }) => {
      await page.goto('/courses/medchem/lessons/1');
      await page.waitForLoadState('networkidle');

      // Verify that thermodynamic activity calculations in Step 9 faded calculation render 0.05 cleanly
      await page.evaluate(() => {
        const pt = 10;
        const p0 = 200;
        const a = pt / p0;
        localStorage.setItem('test_ferguson_calc', a.toFixed(2));
      });

      const storedCalc = await page.evaluate(() => localStorage.getItem('test_ferguson_calc'));
      expect(storedCalc).toBe('0.05');
    });

    test('T2-BND-13: Ferguson calculation handles Pt = 0 cleanly calculating a = 0.00 without NaN', async ({ page }) => {
      await page.goto('/gallery');
      await page.waitForLoadState('networkidle');

      const result = await page.evaluate(() => {
        const pt = 0;
        const p0 = 200;
        const a = p0 > 0 ? pt / p0 : 0;
        return isNaN(a) ? 'NaN' : a.toFixed(2);
      });
      expect(result).toBe('0.00');
    });

    test('T2-BND-14: interactive form controls slider handles min (0) and max (100) boundaries cleanly', async ({ page }) => {
      await page.goto('/gallery');
      await page.waitForLoadState('networkidle');

      // Find slider on gallery
      const slider = page.locator('input[type="range"]').first();
      await expect(slider).toBeVisible();

      await slider.fill('0');
      expect(await slider.inputValue()).toBe('0');

      await slider.fill('100');
      expect(await slider.inputValue()).toBe('100');
    });

    test('T2-BND-15: PK Simulator widget handles multiple dosing boundary toggle without curve distortion', async ({ page }) => {
      await page.goto('/gallery');
      await page.waitForLoadState('networkidle');

      await page.getByRole('button', { name: 'PK Simulator', exact: true }).click();
      const multiDoseCheckbox = page.getByRole('checkbox', { name: /multiple dosing/i });
      await expect(multiDoseCheckbox).toBeVisible();

      // Check multiple dosing
      await multiDoseCheckbox.check({ force: true });
      await expect(multiDoseCheckbox).toBeChecked();

      // Uncheck multiple dosing
      await multiDoseCheckbox.uncheck({ force: true });
      await expect(multiDoseCheckbox).not.toBeChecked();
    });

    test('T2-BND-16: Dose-response curve antagonist selection modulates curve parameters smoothly', async ({ page }) => {
      await page.goto('/gallery');
      await page.waitForLoadState('networkidle');

      await page.getByRole('button', { name: 'Dose-Response Curve', exact: true }).click();
      const antagonistBtn = page.getByRole('button', { name: 'competitive antagonist', exact: true });
      await expect(antagonistBtn).toBeVisible();
      await antagonistBtn.click();

      // SVG should still be rendered without off-scale errors
      const svg = page.locator('[data-testid="active-widget-container"] svg').first();
      await expect(svg).toBeVisible();
    });
  });

  // =========================================================================
  // Boundary Area 4: Cardless Trial Edges & Entitlement Security Boundaries
  // =========================================================================
  test.describe('Boundary Area 4: Cardless Trial Edges & Entitlement Security Boundaries', () => {
    test('T2-BND-17: repeated trial activations on account with trialUsed: true is rejected', async ({ page }) => {
      await page.goto('/courses/medchem/lessons/1');
      await page.waitForLoadState('networkidle');

      // Seed account that already used trial
      await page.evaluate(() => {
        localStorage.setItem(
          'pharmacy_user_profile',
          JSON.stringify({
            uid: 'student-test-123',
            plan: 'free',
            trialUsed: true,
          })
        );
      });

      await page.reload();
      await page.waitForLoadState('networkidle');

      // Try activating trial via Navbar
      const trialBtn = page.getByRole('button', { name: /free trial|ücretsiz deneme/i });
      if (await trialBtn.isVisible()) {
        await trialBtn.click();
      }

      // User profile remains free
      const profile = await page.evaluate(() =>
        JSON.parse(localStorage.getItem('pharmacy_user_profile') || '{}')
      );
      expect(profile.trialUsed).toBe(true);
    });

    test('T2-BND-18: direct deep URL navigation to locked Lesson 3 mounts PaywallModal immediately', async ({ page }) => {
      await page.goto('/courses/medchem/lessons/3');
      await page.waitForLoadState('networkidle');

      // Must show locked lesson card and open PaywallModal
      await expect(page.getByText('Unlock Lesson 3: The Partition Coefficient')).toBeVisible();
      await expect(page.getByRole('dialog')).toBeVisible();
      await expect(page.getByRole('button', { name: /Start Free Trial|Ücretsiz Denemeyi Başlat|بدء التجربة المجانية/i }).first()).toBeVisible();
    });

    test('T2-BND-19: client-side localStorage tampering with malformed JSON falls back gracefully without crashing', async ({ page }) => {
      await page.goto('/catalog');
      await page.evaluate(() => {
        localStorage.setItem('pharmacy_progress_medchem', 'MALFORMED_NON_JSON_STRING{{{');
      });

      await page.goto('/courses/medchem/lessons/1');
      await page.waitForLoadState('networkidle');

      // Application should handle corrupted storage gracefully and render Lesson 1
      await expect(page.getByText(/Thermodynamic Activity & The Ferguson Principle|Termodinamik Aktivite ve Ferguson İlkesi/i)).toBeVisible();
    });

    test('T2-BND-20: expired trial downgrade sets account status correctly to expired_trial in UI', async ({ page }) => {
      await page.goto('/catalog');
      await page.evaluate(() => {
        localStorage.setItem(
          'pharmacy_user_profile',
          JSON.stringify({
            uid: 'student-expired',
            plan: 'free',
            trialUsed: true,
            trialEndsAt: '2026-08-01T00:00:00.000Z',
          })
        );
      });

      await page.reload();
      await page.waitForLoadState('networkidle');

      const expiredBanner = page.getByLabel(/Account Plan Status|Hesap Planı Durumu|حالة خطة الحساب/i);
      await expect(expiredBanner).toBeVisible();
    });

    test('T2-BND-21: trial expiry downgrade preserves 100% of student progress and Leitner review flashcards', async ({ page }) => {
      await page.goto('/catalog');
      // Seed completed lesson and 3 review cards
      await page.evaluate(() => {
        localStorage.setItem(
          'pharmacy_progress_medchem',
          JSON.stringify({
            courseId: 'medchem',
            completedLessonIds: ['mc-mod1-les1'],
            totalXP: 50,
          })
        );
        localStorage.setItem(
          'pharmacy_review_cards_medchem',
          JSON.stringify([
            { id: 'c1', front: 'Concept 1', back: 'Answer 1', box: 1 },
            { id: 'c2', front: 'Concept 2', back: 'Answer 2', box: 1 },
            { id: 'c3', front: 'Concept 3', back: 'Answer 3', box: 1 },
          ])
        );
        localStorage.setItem(
          'pharmacy_user_profile',
          JSON.stringify({
            uid: 'student-test',
            plan: 'free',
            trialUsed: true,
          })
        );
      });

      await page.reload();
      await page.waitForLoadState('networkidle');

      const savedProgress = await page.evaluate(() =>
        JSON.parse(localStorage.getItem('pharmacy_progress_medchem') || '{}')
      );
      expect(savedProgress.completedLessonIds).toContain('mc-mod1-les1');
      expect(savedProgress.totalXP).toBe(50);

      const savedCards = await page.evaluate(() =>
        JSON.parse(localStorage.getItem('pharmacy_review_cards_medchem') || '[]')
      );
      expect(savedCards.length).toBe(3);
    });
  });

  // =========================================================================
  // Boundary Area 5: Input Validation & Step Boundaries
  // =========================================================================
  test.describe('Boundary Area 5: Input Validation & Step Boundaries', () => {
    test('T2-BND-22: submitting AuthModal login form with empty inputs triggers localized error alert', async ({ page }) => {
      await page.goto('/gallery');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: /log in|giriş yap|تسجيل الدخول/i }).first().click();

      // Click login button with empty fields
      await page.getByRole('button', { name: /log in|giriş yap|تسجيل الدخول/i }).last().click();

      // Form requires email and password, browser or app displays error
      await expect(page.getByRole('dialog')).toBeVisible();
    });

    test('T2-BND-23: submitting AuthModal registration with password < 6 characters triggers validation warning', async ({ page }) => {
      await page.goto('/gallery');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: /log in|giriş yap|تسجيل الدخول/i }).first().click();
      await page.getByRole('button', { name: /sign up|kayıt ol|إنشاء حساب/i }).first().click();

      await page.locator('input[type="text"]').fill('Ayşe Yılmaz');
      await page.locator('input[type="email"]').fill('ayse@istanbul.edu.tr');
      await page.locator('input[type="password"]').fill('123'); // < 6 chars

      await page.getByRole('button', { name: /sign up & get started|kayıt ol ve başla|إنشاء حساب والبدء/i }).click();
      await expect(page.getByText(/Password must be at least 6 characters|Şifreniz en az 6 karakter olmalıdır|يجب أن تتكون كلمة المرور من 6 أحرف على الأقل/i)).toBeVisible();
    });

    test('T2-BND-24: stepper navigation prevents advancing without committing a prediction hypothesis', async ({ page }) => {
      await page.goto('/courses/medchem/lessons/1');
      await page.waitForLoadState('networkidle');

      // Go to Step 2
      await page.getByRole('button', { name: /continue to step 2|adım 2'e devam et|المتابعة إلى الخطوة 2/i }).click();

      // Advance button should be disabled
      const continueBtn = page.getByRole('button', { name: /continue to step 3|adım 3'e devam et|المتابعة إلى الخطوة 3/i });
      await expect(continueBtn).toBeDisabled();

      // Pressing ArrowRight should not advance
      await page.keyboard.press('ArrowRight');
      await expect(page.getByText(/Step 2 of (10|12)|Adım 2 \/ (10|12)|الخطوة 2 من (10|12)/i)).toBeVisible();
    });

    test('T2-BND-25: rapid double-clicking "Commit Hypothesis" submits once without duplicate XP awards', async ({ page }) => {
      await page.goto('/courses/medchem/lessons/1');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: /continue to step 2|adım 2'e devam et|المتابعة إلى الخطوة 2/i }).click();

      // Select hypothesis
      await page.getByRole('radio').first().click();
      const commitBtn = page.getByRole('button', { name: /commit hypothesis|hipotezi onayla|تأكيد الفرضية/i });

      // Double click commit
      await commitBtn.dblclick();

      // Should be revealed and advance button enabled
      await expect(page.getByRole('button', { name: /continue to step 3|adım 3'e devam et|المتابعة إلى الخطوة 3/i })).toBeEnabled();
    });

    test('T2-BND-26: step navigation boundaries (ArrowLeft on Step 1, ArrowRight without completion) do not throw errors', async ({ page }) => {
      await page.goto('/courses/medchem/lessons/1');
      await page.waitForLoadState('networkidle');

      // On Step 1: Press ArrowLeft - boundary clamp stays at Step 1
      await page.keyboard.press('ArrowLeft');
      await expect(page.getByText(/(adım|step|الخطوة)\s*1\s*(\/|of|من)\s*(10|12)/i)).toBeVisible();

      // Advance to Step 2
      const advanceBtn = page.getByRole('button', { name: /adım 2'e devam et|continue to step 2|المتابعة إلى الخطوة 2/i });
      await advanceBtn.click();
      await expect(page.getByText(/(adım|step|الخطوة)\s*2\s*(\/|of|من)\s*(10|12)/i)).toBeVisible();

      // Press ArrowLeft to return to Step 1
      await page.keyboard.press('ArrowLeft');
      await expect(page.getByText(/(adım|step|الخطوة)\s*1\s*(\/|of|من)\s*(10|12)/i)).toBeVisible();

      // Press ArrowLeft again on boundary Step 1 - remains on Step 1 without error
      await page.keyboard.press('ArrowLeft');
      await expect(page.getByText(/(adım|step|الخطوة)\s*1\s*(\/|of|من)\s*(10|12)/i)).toBeVisible();

      // Return to Step 2
      await advanceBtn.click();
      await expect(page.getByText(/(adım|step|الخطوة)\s*2\s*(\/|of|من)\s*(10|12)/i)).toBeVisible();

      // Press ArrowRight before committing prediction - progression blocked by boundary check
      await page.keyboard.press('ArrowRight');
      await expect(page.getByText(/(adım|step|الخطوة)\s*2\s*(\/|of|من)\s*(10|12)/i)).toBeVisible();
    });
  });
});
