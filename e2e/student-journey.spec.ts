import { test, expect } from '@playwright/test';

const MOCK_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3Itc3R1ZGVudC0wMDEiLCJlbWFpbCI6ImF5c2UueWlsbWF6QHBoYXJtYWN5LmVkdS50ciIsImV4cCI6OTk5OTk5OTk5OSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQifQ.mockSignature';

test.describe('Student End-to-End Journey & Auth Recovery Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Route Supabase Auth & REST endpoints to keep tests hermetic, deterministic, and fast
    await page.route('**/auth/v1/signup**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: {
            id: 'usr-student-001',
            email: 'ayse.yilmaz@pharmacy.edu.tr',
            aud: 'authenticated',
            role: 'authenticated',
            user_metadata: { display_name: 'Ayşe Yılmaz' },
          },
          session: null,
        }),
      });
    });

    await page.route('**/auth/v1/token?grant_type=password**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          access_token: MOCK_JWT,
          token_type: 'bearer',
          expires_in: 3600,
          expires_at: 9999999999,
          refresh_token: 'mock-refresh-token',
          user: {
            id: 'usr-student-001',
            email: 'ayse.yilmaz@pharmacy.edu.tr',
            aud: 'authenticated',
            role: 'authenticated',
          },
        }),
      });
    });

    await page.route('**/auth/v1/recover**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
      });
    });

    await page.route('**/auth/v1/user**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'usr-student-001',
          email: 'ayse.yilmaz@pharmacy.edu.tr',
          user_metadata: { role: 'student' },
        }),
      });
    });

    await page.route('**/rest/v1/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{ id: 'usr-student-001' }]),
      });
    });
  });

  // =========================================================================
  // Test 1: Student Registration & Login in AuthModal
  // =========================================================================
  test('1. Student Registration & Login via AuthModal.tsx with Turkish Pharmacy Faculty', async ({ page }) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!text.includes('React Router Future Flag')) {
          consoleErrors.push(text);
        }
      }
    });

    page.on('requestfailed', (req) => {
      const failure = req.failure()?.errorText || '';
      if (!failure.includes('ERR_ABORTED')) {
        failedRequests.push(`${req.method()} ${req.url()} (${failure})`);
      }
    });

    await page.goto('/catalog', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');

    // Switch to Turkish
    const trBtn = page.getByRole('button', { name: 'TR', exact: true });
    if (await trBtn.isVisible()) {
      await trBtn.click();
    }

    // Open AuthModal
    const openAuthBtn = page.getByRole('button', { name: /Giriş Yap/i }).first();
    await expect(openAuthBtn).toBeVisible();
    await openAuthBtn.click();

    await expect(page.getByRole('dialog')).toBeVisible();

    // Switch to Register tab
    const signupTabBtn = page.getByRole('button', { name: /Kayıt Ol/i }).first();
    await signupTabBtn.click();

    // Fill form
    await page.locator('input[type="text"]').fill('Ayşe Yılmaz');
    await page.locator('input[type="email"]').fill('ayse.yilmaz@pharmacy.edu.tr');
    await page.locator('input[type="password"]').fill('Eczacilik2026!');

    const facultySelect = page.locator('#faculty-select');
    await expect(facultySelect).toBeVisible();
    await facultySelect.selectOption('İstanbul Üniversitesi');

    // Submit
    const submitSignupBtn = page.getByRole('button', { name: /Kayıt Ol ve Başla/i });
    await submitSignupBtn.click();

    // Verify confirmation
    await expect(page.getByText(/Kayıt başarılı! İstanbul Üniversitesi/i)).toBeVisible();

    expect(consoleErrors).toHaveLength(0);
    expect(failedRequests).toHaveLength(0);
  });

  // =========================================================================
  // Test 2: Password recovery request ("Şifremi unuttum")
  // =========================================================================
  test('2. Password recovery request ("Şifremi unuttum") in AuthModal.tsx', async ({ page }) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!text.includes('React Router Future Flag')) {
          consoleErrors.push(text);
        }
      }
    });

    page.on('requestfailed', (req) => {
      const failure = req.failure()?.errorText || '';
      if (!failure.includes('ERR_ABORTED')) {
        failedRequests.push(`${req.method()} ${req.url()} (${failure})`);
      }
    });

    await page.goto('/catalog', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.clear());

    // Switch to Turkish
    const trBtn = page.getByRole('button', { name: 'TR', exact: true });
    if (await trBtn.isVisible()) {
      await trBtn.click();
    }

    // Open AuthModal
    const openAuthBtn = page.getByRole('button', { name: /Giriş Yap/i }).first();
    await expect(openAuthBtn).toBeVisible();
    await openAuthBtn.click();

    await expect(page.getByRole('dialog')).toBeVisible();

    // Click "Şifremi unuttum"
    const forgotPasswordLink = page.getByRole('button', { name: /Şifremi unuttum/i });
    await expect(forgotPasswordLink).toBeVisible();
    await forgotPasswordLink.click();

    // Verify recovery view
    await expect(page.getByText(/Şifre Sıfırlama/i)).toBeVisible();
    await expect(page.getByText(/Kayıtlı e-posta adresinizi girin/i)).toBeVisible();

    // Fill email and submit
    const recoveryEmailInput = page.locator('input[type="email"]');
    await recoveryEmailInput.fill('ayse.yilmaz@pharmacy.edu.tr');

    const sendResetBtn = page.getByRole('button', { name: /Sıfırlama Bağlantısı Gönder/i });
    await expect(sendResetBtn).toBeVisible();
    await sendResetBtn.click();

    // Verify feedback
    await expect(page.getByText(/Şifre sıfırlama bağlantısı e-posta adresinize gönderildi/i)).toBeVisible();

    // Click return to login button
    const backToLoginBtn = page.getByRole('button', { name: /Giriş Ekranına Dön/i });
    await expect(backToLoginBtn).toBeVisible();
    await backToLoginBtn.click();

    // Verify back on login tab
    await expect(page.getByRole('button', { name: /Şifremi unuttum/i })).toBeVisible();

    expect(consoleErrors).toHaveLength(0);
    expect(failedRequests).toHaveLength(0);
  });

  // =========================================================================
  // Test 3: /reset-password client validations & URL error parameters
  // =========================================================================
  test('3. /reset-password client validations and URL error fragment handling', async ({ page }) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!text.includes('React Router Future Flag')) {
          consoleErrors.push(text);
        }
      }
    });

    page.on('requestfailed', (req) => {
      const failure = req.failure()?.errorText || '';
      if (!failure.includes('ERR_ABORTED')) {
        failedRequests.push(`${req.method()} ${req.url()} (${failure})`);
      }
    });

    // 3a. URL error parameter (expired/invalid link from email)
    await page.goto(
      '/reset-password#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired',
      { waitUntil: 'domcontentloaded' }
    );
    await expect(page.getByText('Email link is invalid or has expired')).toBeVisible();

    // 3b. Clean page navigation
    await page.goto('/reset-password', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1, name: /Yeni Şifre Belirleyin/i })).toBeVisible();

    const newPasswordInput = page.getByPlaceholder(/En az 6 karakter/i);
    const confirmPasswordInput = page.getByPlaceholder(/Şifrenizi tekrar girin/i);
    const updateSubmitBtn = page.getByRole('button', { name: /Şifremi Güncelle/i });

    // 3c. Validation: password < 6 chars
    await newPasswordInput.fill('123');
    await confirmPasswordInput.fill('123');
    await updateSubmitBtn.click();
    await expect(page.getByText(/Şifreniz en az 6 karakter olmalıdır/i)).toBeVisible();

    // 3d. Validation: passwords mismatch
    await newPasswordInput.fill('Password123!');
    await confirmPasswordInput.fill('Mismatch123!');
    await updateSubmitBtn.click();
    await expect(page.getByText(/Girdiğiniz şifreler birbiriyle eşleşmiyor/i)).toBeVisible();

    expect(consoleErrors).toHaveLength(0);
    expect(failedRequests).toHaveLength(0);
  });

  // =========================================================================
  // Test 4: /reset-password valid session update & redirect to dashboard
  // =========================================================================
  test('4. /reset-password valid session update and navigation to /dashboard', async ({ page }) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!text.includes('React Router Future Flag')) {
          consoleErrors.push(text);
        }
      }
    });

    page.on('requestfailed', (req) => {
      const failure = req.failure()?.errorText || '';
      if (!failure.includes('ERR_ABORTED')) {
        failedRequests.push(`${req.method()} ${req.url()} (${failure})`);
      }
    });

    // Navigate with recovery token hash in URL as Supabase Auth produces
    await page.goto(
      `/reset-password#access_token=${MOCK_JWT}&refresh_token=mock-refresh-token&expires_in=3600&token_type=bearer&type=recovery`,
      { waitUntil: 'domcontentloaded' }
    );
    await page.waitForTimeout(600);

    await expect(page.getByRole('heading', { level: 1, name: /Yeni Şifre Belirleyin/i })).toBeVisible();

    const newPasswordInput = page.getByPlaceholder(/En az 6 karakter/i);
    const confirmPasswordInput = page.getByPlaceholder(/Şifrenizi tekrar girin/i);
    const updateSubmitBtn = page.getByRole('button', { name: /Şifremi Güncelle/i });

    await newPasswordInput.fill('ValidStrongPass2026!');
    await confirmPasswordInput.fill('ValidStrongPass2026!');
    await updateSubmitBtn.click();

    // Verify success confirmation
    await expect(page.getByText(/Şifreniz başarıyla güncellendi/i)).toBeVisible();

    // Click "Öğrenci Paneline Git" CTA or wait for automatic navigate
    const goToDashboardBtn = page.getByRole('button', { name: /Öğrenci Paneline Git/i });
    if (await goToDashboardBtn.isVisible()) {
      await goToDashboardBtn.click();
    }

    // Reaches /dashboard
    await page.waitForURL('**/dashboard', { timeout: 15000 });
    expect(page.url()).toContain('/dashboard');

    expect(consoleErrors).toHaveLength(0);
    expect(failedRequests).toHaveLength(0);
  });

  // =========================================================================
  // Test 5: Student Dashboard & AI Whiteboard Tutor Week 1 Lecture
  // =========================================================================
  test('5. Reaching /dashboard and interacting with AI Whiteboard Tutor (/tutor/reseptor-etkilesimleri)', async ({ page }) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!text.includes('React Router Future Flag')) {
          consoleErrors.push(text);
        }
      }
    });

    page.on('requestfailed', (req) => {
      const failure = req.failure()?.errorText || '';
      if (!failure.includes('ERR_ABORTED')) {
        failedRequests.push(`${req.method()} ${req.url()} (${failure})`);
      }
    });

    // Navigate to /dashboard
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // 5a. Header and Midterm badge
    await expect(page.locator('h1')).toContainText(/Çalışma Paneli|Dashboard/i);
    await expect(page.getByText(/Vizeye Hazırlık/i)).toBeVisible();

    // 5b. Exam countdown and Daily 10 review launcher
    await expect(page.getByTestId('exam-countdown')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Günlük 10/i })).toBeVisible();

    // 5c. MedChem Lecture catalog item & Open link
    await expect(page.getByText(/İlaç Reseptör Etkileşimi|Kimyasal Bağlar/i).first()).toBeVisible();
    const openLectureBtn = page.getByRole('link', { name: /Aç/i }).first();
    await expect(openLectureBtn).toBeVisible();
    await openLectureBtn.click();

    // 5d. AI Whiteboard Tutor (/tutor/reseptor-etkilesimleri)
    await page.waitForURL('**/tutor/reseptor-etkilesimleri', { timeout: 15000 });
    expect(page.url()).toContain('/tutor/reseptor-etkilesimleri');

    // Slide citation from Prof. Dr. Bedia Kaymakçıoğlu materials
    await expect(page.getByText(/Slayt/i).first()).toBeVisible();

    // Interactive task container
    const tutorContainer = page.locator('main, section, div').filter({ hasText: /Reseptör/i }).first();
    await expect(tutorContainer).toBeVisible();

    // Zero horizontal overflow (Mobile viewport compliance)
    const horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(horizontalOverflow).toBeLessThanOrEqual(1);

    expect(consoleErrors).toHaveLength(0);
    expect(failedRequests).toHaveLength(0);
  });
});
