import { test, expect } from '@playwright/test';

test.describe('Tier 4: Real-World Clinical Pharmacy Student Application Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/catalog', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.clear());
  });

  // =========================================================================
  // Scenario 1: First-Year Turkish Student Discovers Ferguson's Principle
  // =========================================================================
  test('Scenario 1: First-Year Turkish Student (Deniz) Discovers Ferguson Principle in Course A Lesson 1', async ({ page }) => {
    // 1. Deniz visits Catalog in Turkish
    await page.goto('/catalog');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'TR', exact: true }).click();

    // 2. Deniz reviews Course A (Farmasötik Kimya)
    await expect(page.getByRole('heading', { name: 'Ders A: Farmasötik Kimya' })).toBeVisible();
    await expect(page.getByText('Yapı-Etki İlişkileri (SAR), Biyoizosterizm ve İlaç Tasarımı')).toBeVisible();

    // 3. Clicks "Ücretsiz 1. Derse Başla"
    await page.getByRole('button', { name: /Ücretsiz 1\. Derse Başla/i }).first().click();
    await page.waitForURL('**/courses/medchem/lessons/1');

    // 4. Step 1 (Hook): Compares Diethyl Ether vs Propranolol
    await expect(page.getByText('Termodinamik Aktivite ve Ferguson İlkesi')).toBeVisible();
    await expect(page.getByText(/Agent A|Madde A|المادة أ/i).first()).toBeVisible();
    await expect(page.getByText(/Diethyl Ether/i).first()).toBeVisible();
    await expect(page.getByText(/Agent B|Madde B|المادة ب/i).first()).toBeVisible();
    await expect(page.getByText(/Propranolol/i).first()).toBeVisible();

    // 5. Advances to Step 2
    await page.getByRole('button', { name: /Adım 2'e Devam Et|Continue to Step 2/i }).click();
    await expect(page.getByText(/Adım 2 \/ \d+|Step 2 of \d+|الخطوة 2 من \d+/i)).toBeVisible();

    // 6. Commits a prediction hypothesis
    await page.getByRole('radio').first().click();
    await page.getByRole('button', { name: /Hipotezi Onayla|Commit Hypothesis/i }).click();

    // 7. Diagnostic feedback is displayed
    await expect(page.getByText(/Hipotez Doğrulandı|Hypothesis Confirmed|Yanılgı Belirlendi|Misconception Identified/i)).toBeVisible();

    // 8. Advances through Lesson steps to the final recap step
    for (let step = 3; step <= 12; step++) {
      const continueBtn = page.getByRole('button', { name: new RegExp(`Adım ${step}'e Devam Et|Continue to Step ${step}`, 'i') });
      if (await continueBtn.isVisible()) {
        await continueBtn.click();
      }
      const radio = page.getByRole('radio').first();
      if (await radio.isVisible()) {
        await radio.click();
        const commit = page.getByRole('button', { name: /Hipotezi Onayla|Commit Hypothesis|Cevabı Kontrol Et|Check Answer/i });
        if (await commit.isVisible()) {
          await commit.click();
        }
      }
    }

    await expect(page.getByText(/Ders (?:1 )?Başarıyla Tamamlandı|Lesson (?:1 )?Mastered/i)).toBeVisible();
    await expect(page.getByText('+50 XP', { exact: true })).toBeVisible();

    // Verify 3 Leitner cards enqueued to Box 1 in localStorage
    const savedCards = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('pharmacy_review_cards_medchem') || '[]')
    );
    expect(savedCards.length).toBe(3);

    // 10. Expands Academic Sources & Textbook Citations
    await page.getByRole('button', { name: /Akademik Kaynaklar|Academic Sources|المصادر الأكاديمية/i }).click();
    await expect(page.getByText(/Foye's Principles of Medicinal Chemistry/i)).toBeVisible();
  });

  // =========================================================================
  // Scenario 2: Arabic-Speaking Student Analyzes Receptor Binding
  // =========================================================================
  test('Scenario 2: Arabic-Speaking Student (Tariq) Analyzes Receptor Binding with Special Arabic Rule', async ({ page }) => {
    // 1. Tariq clicks "AR" in navbar
    await page.goto('/catalog');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'AR', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    // 2. Reads catalog in Arabic
    await expect(page.getByRole('heading', { name: 'المقرر أ: الكيمياء الدوائية' })).toBeVisible();

    // 3. Enters Lesson 1
    await page.goto('/courses/medchem/lessons/1');
    await page.waitForLoadState('networkidle');

    // 4. Verifies Arabic instructional prose with canonical scientific terminology
    await expect(page.getByText(/النشاط الديناميكي الحراري ومبدأ (?:Ferguson|فيرجسون)/i)).toBeVisible();
    await expect(page.getByText(/Diethyl Ether/i).first()).toBeVisible();

    // 5. Verifies LTR isolation for chemical formula containers
    const ltrContainers = page.locator('[dir="ltr"]');
    expect(await ltrContainers.count()).toBeGreaterThanOrEqual(1);

    // 6. Tariq interacts with predict step
    await page.getByRole('button', { name: /المتابعة إلى الخطوة 2|Continue to Step 2/i }).click();
    await page.getByRole('radio').first().click();
    await page.getByRole('button', { name: /تأكيد الفرضية|Commit Hypothesis/i }).click();
    await expect(page.getByText(/تم تأكيد الفرضية|ملاحظة تشخيصية|Hypothesis Confirmed/i)).toBeVisible();
  });

  // =========================================================================
  // Scenario 3: Freemium Lifecycle & Non-Destructive Freemium Downgrade
  // =========================================================================
  test('Scenario 3: Freemium Lifecycle & Non-Destructive Downgrade (Ayşe)', async ({ page }) => {
    // 1. Ayşe completes Lesson 1
    await page.goto('/courses/medchem/lessons/1');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => {
      localStorage.setItem(
        'pharmacy_progress_medchem',
        JSON.stringify({
          courseId: 'medchem',
          completedLessonIds: ['mc-mod1-les1'],
          currentModuleId: 'mc-mod-01',
          currentLessonId: 'mc-mod1-les1',
          currentStepIndex: 9,
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
    });

    // 2. Navigates to paid Lesson 3
    await page.goto('/courses/medchem/lessons/3');
    await page.waitForLoadState('networkidle');

    // 3. PaywallModal opens automatically
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText(/Unlock Full Pharmacy Mastery|Tüm Eczacılık Müfredatını Aç|Unlock Lesson/i)).toBeVisible();

    // 4. Clicks "Start 7-Day Free Trial"
    await page.getByRole('dialog').getByRole('button', { name: /Start Free Trial|Ücretsiz Denemeyi Başlat|بدء التجربة المجانية/i }).click();

    // 5. Trial activated: Dialog closes and trial banner appears
    await expect(page.getByRole('dialog')).not.toBeVisible();
    await expect(page.getByLabel(/Account Plan Status|Hesap Planı Durumu|حالة خطة الحساب/i)).toBeVisible();

    // 6. Simulate Day 8 backend trial expiration downgrade
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

    // 7. Lesson 3 is locked again
    await expect(page.getByRole('dialog')).toBeVisible();

    // 8. Progress and review cards remain 100% intact
    const progressData = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('pharmacy_progress_medchem') || '{}')
    );
    expect(progressData.completedLessonIds).toContain('mc-mod1-les1');
    expect(progressData.totalXP).toBeGreaterThanOrEqual(50);

    const reviewCards = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('pharmacy_review_cards_medchem') || '[]')
    );
    expect(reviewCards.length).toBeGreaterThanOrEqual(3);
  });

  // =========================================================================
  // Scenario 4: Student Registration with Pharmacy Faculty Affiliation
  // =========================================================================
  test('Scenario 4: Student Registration with Turkish Pharmacy Faculty Affiliation (Zeynep)', async ({ page }) => {
    await page.goto('/catalog');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'TR', exact: true }).click();

    // 1. Opens AuthModal
    await page.getByRole('button', { name: /giriş yap/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // 2. Switches to "Kayıt Ol" tab
    await page.getByRole('button', { name: /kayıt ol/i }).first().click();

    // 3. Fills registration form
    await page.locator('input[type="text"]').fill('Zeynep Kaya');
    await page.locator('input[type="email"]').fill('zeynep@hacettepe.edu.tr');
    await page.locator('input[type="password"]').fill('Eczacilik2026!');

    // 4. Selects faculty
    const facultySelect = page.locator('#faculty-select');
    await facultySelect.selectOption('Hacettepe Üniversitesi');

    // 5. Submits registration
    await page.getByRole('button', { name: /kayıt ol ve başla/i }).click();

    // 6. Confirms success message
    await expect(page.getByText(/Kayıt başarılı! Hacettepe Üniversitesi/i)).toBeVisible();
  });

  // =========================================================================
  // Scenario 5: Academic Midnight Slate Accessibility & Keyboard Audit
  // =========================================================================
  test('Scenario 5: Academic Midnight Slate Dark Mode & Keyboard-Only Audit (Zeynep)', async ({ page }) => {
    await page.goto('/catalog');
    await page.waitForLoadState('networkidle');

    // 1. Toggles Dark Mode
    await page.getByRole('button', { name: /toggle dark mode|toggle theme|temayı değiştir|تبديل المظهر/i }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Refresh page to reset tab focus to top of document while keeping dark mode
    await page.goto('/catalog');
    await page.waitForLoadState('networkidle');

    // 2. Navigates entire catalog using keyboard Tab and Enter
    await page.keyboard.press('Tab'); // Logo
    await page.keyboard.press('Tab'); // Gallery link
    await page.keyboard.press('Tab'); // Courses link
    await page.keyboard.press('Tab'); // Review link
    await page.keyboard.press('Tab'); // Pricing link
    await page.keyboard.press('Enter');

    await page.waitForURL('**/pricing');
    expect(page.url()).toContain('/pricing');

    // 3. Verifies Academic Midnight Slate styling
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const whiteBorderCount = await page.locator('.border-white').count();
    expect(whiteBorderCount).toBe(0);
  });
});
