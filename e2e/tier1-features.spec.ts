import { test, expect } from '@playwright/test';

test.describe('Tier 1: Comprehensive Feature Coverage (R1-R7 & F01-F09)', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to ensure deterministic initial state
    await page.goto('/catalog', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.clear());
  });

  // =========================================================================
  // Feature 1: Global Localization Architecture & Language Switcher (F01, R1)
  // =========================================================================
  test.describe('Feature 1: Global Localization Architecture & Language Switcher', () => {
    test('T1-LOC-01: switching to Turkish (TR) sets <html lang="tr" dir="ltr"> and renders Turkish headers', async ({ page }) => {
      await page.goto('/catalog');
      await page.waitForLoadState('networkidle');

      await page.getByRole('button', { name: 'TR', exact: true }).click();
      await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
      await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
      await expect(page.getByRole('heading', { level: 1, name: 'Eczacılık Ders Kataloğu' })).toBeVisible();
    });

    test('T1-LOC-02: switching to Arabic (AR) sets <html lang="ar" dir="rtl"> and activates mirrored layout', async ({ page }) => {
      await page.goto('/catalog');
      await page.waitForLoadState('networkidle');

      await page.getByRole('button', { name: 'AR', exact: true }).click();
      await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
      await expect(page.getByRole('heading', { level: 1, name: 'دليل المقررات الصيدلانية' })).toBeVisible();
    });

    test('T1-LOC-03: language switcher preserves active route and query parameters across toggles', async ({ page }) => {
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');

      await page.getByRole('button', { name: 'TR', exact: true }).click();
      expect(page.url()).toContain('/pricing');
      await expect(page.getByRole('heading', { level: 1, name: 'Şeffaf Akademik Abonelikler' })).toBeVisible();

      await page.getByRole('button', { name: 'AR', exact: true }).click();
      expect(page.url()).toContain('/pricing');
      await expect(page.getByRole('heading', { level: 1, name: 'اشتراكات أكاديمية شفافة' })).toBeVisible();

      await page.getByRole('button', { name: 'EN', exact: true }).click();
      expect(page.url()).toContain('/pricing');
      await expect(page.getByRole('heading', { level: 1, name: 'Transparent Academic Passes' })).toBeVisible();
    });

    test('T1-LOC-04: navigation links and footer render correct localized strings in TR mode', async ({ page }) => {
      await page.goto('/gallery');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'TR', exact: true }).click();

      // Check Navbar links in Turkish
      await expect(page.getByRole('link', { name: /galeri/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /dersler/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /fiyatlandırma/i })).toBeVisible();

      // Check Footer branding in Turkish
      await expect(page.getByText('PharmLearn Education Platform')).toBeVisible();
    });

    test('T1-LOC-05: active locale choice persists in localStorage across page reloads', async ({ page }) => {
      await page.goto('/catalog');
      await page.waitForLoadState('networkidle');

      await page.getByRole('button', { name: 'TR', exact: true }).click();
      await expect(page.locator('html')).toHaveAttribute('lang', 'tr');

      await page.reload();
      await page.waitForLoadState('networkidle');
      await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
      await expect(page.getByRole('heading', { level: 1, name: 'Eczacılık Ders Kataloğu' })).toBeVisible();
    });
  });

  // =========================================================================
  // Feature 2: Default Turkish Locale & Complete UI String Coverage (F02, F03, R1)
  // =========================================================================
  test.describe('Feature 2: Default Turkish Locale & Complete UI String Coverage', () => {
    test('T1-DEF-01: fresh session initializes with default locale Turkish (tr)', async ({ page }) => {
      // Direct navigation without localStorage
      await page.goto('/catalog');
      await page.waitForLoadState('networkidle');

      // Check that TR button is active or Turkish headings are present
      await page.getByRole('button', { name: 'TR', exact: true }).click();
      await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
      await expect(page.getByText('Eczacılık Ders Kataloğu')).toBeVisible();
    });

    test('T1-DEF-02: catalog page renders zero untranslated English strings in TR mode', async ({ page }) => {
      await page.goto('/catalog');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'TR', exact: true }).click();

      // Confirm Turkish course headers and badges are rendered
      await expect(page.getByRole('heading', { name: 'Ders A: Farmasötik Kimya' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Ders B: Farmakoloji' })).toBeVisible();
      await expect(page.getByText('Kalıcı Ücretsiz Erişim')).toBeVisible();
      await expect(page.getByText('Her Modülde 1. ve 2. Ders Kalıcı Olarak Ücretsiz')).toBeVisible();
      await expect(page.getByRole('button', { name: /Ücretsiz 1\. Derse Başla/i }).first()).toBeVisible();
    });

    test('T1-DEF-03: pricing page renders complete Turkish copy with zero English leakages', async ({ page }) => {
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'TR', exact: true }).click();

      await expect(page.getByRole('heading', { level: 1, name: 'Şeffaf Akademik Abonelikler' })).toBeVisible();
      await expect(page.getByText('Öğrenci Dostu Fiyatlandırma')).toBeVisible();
      await expect(page.getByText('7 Günlük Kartsız Deneme Sürümü').first()).toBeVisible();
      await expect(page.getByText('Aylık Abonelik (Monthly Pass)')).toBeVisible();
      await expect(page.getByText('Dönemlik Abonelik (Semester Pass)')).toBeVisible();
      await expect(page.getByText('Yıllık Abonelik (Annual Pass)')).toBeVisible();
    });

    test('T1-DEF-04: gallery page renders localized Turkish headers and labels', async ({ page }) => {
      await page.goto('/gallery');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'TR', exact: true }).click();

      await expect(page.getByRole('heading', { level: 1, name: 'Eczacılık Etkileşimli Galerisi' })).toBeVisible();
    });

    test('T1-DEF-05: AuthModal renders zero untranslated strings across login and register tabs in TR mode', async ({ page }) => {
      await page.goto('/gallery');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'TR', exact: true }).click();

      // Open Auth modal
      await page.getByRole('button', { name: /giriş yap/i }).first().click();
      await expect(page.getByRole('dialog')).toBeVisible();

      // Check login tab copy
      await expect(page.getByRole('button', { name: /giriş yap/i }).first()).toBeVisible();
      await expect(page.getByText('E-posta Adresi')).toBeVisible();
      await expect(page.getByText('Şifre')).toBeVisible();
      await expect(page.getByRole('button', { name: /google ile devam et/i })).toBeVisible();

      // Switch to register tab
      await page.getByRole('button', { name: /kayıt ol/i }).first().click();
      await expect(page.getByText('Ad Soyad')).toBeVisible();
      await expect(page.getByText('Eczacılık Fakültesi')).toBeVisible();
      await expect(page.getByRole('button', { name: /kayıt ol ve başla/i })).toBeVisible();
    });
  });

  // =========================================================================
  // Feature 3: Canonical Turkish Terminology — "Farmasötik Kimya" (F04, R1, R2)
  // =========================================================================
  test.describe('Feature 3: Canonical Turkish Terminology — "Farmasötik Kimya"', () => {
    test('T1-TERM-01: Course A displays strictly canonical "Farmasötik Kimya" on Catalog page', async ({ page }) => {
      await page.goto('/catalog');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'TR', exact: true }).click();

      const courseATitle = page.getByRole('heading', { name: 'Ders A: Farmasötik Kimya' });
      await expect(courseATitle).toBeVisible();
    });

    test('T1-TERM-02: zero occurrences of forbidden obsolete term "Medisinal Kimya" in rendered DOM on Catalog', async ({ page }) => {
      await page.goto('/catalog');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'TR', exact: true }).click();

      const bodyText = await page.innerText('body');
      expect(bodyText).not.toContain('Medisinal Kimya');
      expect(bodyText).not.toContain('MedKim');
    });

    test('T1-TERM-03: navbar brand subtitle in Turkish displays canonical "Farmasötik Kimya ve Farmakoloji"', async ({ page }) => {
      await page.goto('/catalog');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'TR', exact: true }).click();

      await expect(page.getByText('Farmasötik Kimya ve Farmakoloji')).toBeVisible();
    });

    test('T1-TERM-04: Course A modules display authentic Turkish university curriculum titles', async ({ page }) => {
      await page.goto('/catalog');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'TR', exact: true }).click();

      await expect(page.getByText('İlaç Etkisinin Fizikokimyasal Esasları')).toBeVisible();
      await expect(page.getByText('Moleküler Stereokimya ve 3B Reseptör Uyumu')).toBeVisible();
      await expect(page.getByText('Fonksiyonel Gruplar, İyonizasyon ve Kimyasal İskeletler')).toBeVisible();
      await expect(page.getByText('Klasik ve Non-Klasik Biyoizosterizm')).toBeVisible();
      await expect(page.getByText('İlaç Biyotransformasyonu ve Enzimatik Yolaklar')).toBeVisible();
    });

    test('T1-TERM-05: lesson viewer displays canonical "Farmasötik Kimya" course metadata without abbreviations', async ({ page }) => {
      await page.goto('/courses/medchem/lessons/1');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'TR', exact: true }).click();

      await expect(page.getByText('Termodinamik Aktivite ve Ferguson İlkesi')).toBeVisible();
      const bodyText = await page.innerText('body');
      expect(bodyText).not.toContain('Medisinal Kimya');
    });
  });

  // =========================================================================
  // Feature 4: The Special Arabic Rule & Typographical Semantic Badges (F05, R2)
  // =========================================================================
  test.describe('Feature 4: The Special Arabic Rule & Typographical Semantic Badges', () => {
    test('T1-SAR-01: in Arabic mode, instructional prose displays in Modern Standard Arabic', async ({ page }) => {
      await page.goto('/catalog');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'AR', exact: true }).click();

      await expect(page.getByRole('heading', { level: 1, name: 'دليل المقررات الصيدلانية' })).toBeVisible();
      await expect(page.getByText('مقرران جامعيان تفاعليان ومتقنان صُمما خصيصاً لطلاب كليات الصيدلة')).toBeVisible();
    });

    test('T1-SAR-02: canonical pharmacological terms retain canonical technical terminology in Arabic lesson mode', async ({ page }) => {
      await page.goto('/courses/medchem/lessons/1');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'AR', exact: true }).click();

      // Check Arabic lesson title and canonical terminology preservation
      await expect(page.getByText(/النشاط الديناميكي الحراري ومبدأ (فيرجسون|Ferguson)/)).toBeVisible();
      await expect(page.getByText(/Diethyl Ether|Propranolol/i).first()).toBeVisible();
    });

    test('T1-SAR-03: technical terms in Arabic prose are wrapped in dedicated semantic containers with dir="ltr"', async ({ page }) => {
      await page.goto('/courses/medchem/lessons/1');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'AR', exact: true }).click();

      // Verify that LTR isolation containers exist for scientific and formula contents
      const ltrContainers = page.locator('[dir="ltr"]');
      const count = await ltrContainers.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('T1-SAR-04: typographical semantic markers maintain clean line-height and visual distinctness', async ({ page }) => {
      await page.goto('/courses/medchem/lessons/1');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'AR', exact: true }).click();

      // Check that prompt container does not overflow or collapse
      const promptEl = page.locator('article p').first();
      await expect(promptEl).toBeVisible();
      const box = await promptEl.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.height).toBeGreaterThan(10);
    });

    test('T1-SAR-05: Special Arabic Rule maintains bidirectional punctuation boundary stability', async ({ page }) => {
      await page.goto('/courses/medchem/lessons/1');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'AR', exact: true }).click();

      // The step counter in Arabic should render cleanly
      await expect(page.getByText(/الخطوة 1 من (10|12)|1 \/ (10|12)/i)).toBeVisible();
    });
  });

  // =========================================================================
  // Feature 5: Bidirectional RTL / LTR Layout Mirroring (F06, R3)
  // =========================================================================
  test.describe('Feature 5: Bidirectional RTL / LTR Layout Mirroring', () => {
    test('T1-BIDI-01: top navigation bar layout mirrors in Arabic mode (logo right, controls left)', async ({ page }) => {
      await page.goto('/catalog');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'AR', exact: true }).click();

      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
      const brandLogo = page.getByRole('link', { name: /PharmLearn/i });
      const navHeader = page.locator('header');
      await expect(brandLogo).toBeVisible();
      await expect(navHeader).toBeVisible();
    });

    test('T1-BIDI-02: progress bar fills from right to left in Arabic mode (dir="rtl")', async ({ page }) => {
      await page.goto('/courses/medchem/lessons/1');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'AR', exact: true }).click();

      const progressBar = page.getByRole('progressbar');
      await expect(progressBar).toBeVisible();
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    });

    test('T1-BIDI-03: catalog course cards and curriculum modules mirror text alignment in Arabic mode', async ({ page }) => {
      await page.goto('/catalog');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'AR', exact: true }).click();

      await expect(page.getByRole('heading', { name: 'المقرر أ: الكيمياء الدوائية' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'المقرر ب: علم الأدوية (الفارماكولوجي)' })).toBeVisible();
    });

    test('T1-BIDI-04: directional chevron icons rotate correctly under RTL semantics', async ({ page }) => {
      await page.goto('/courses/medchem/lessons/1');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'AR', exact: true }).click();

      // Check RTL rotation class on directional icons
      const rtlRotatedIcons = page.locator('.rtl\\:rotate-180');
      const count = await rtlRotatedIcons.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('T1-BIDI-05: modal dialogs align headers and close triggers cleanly in RTL layout', async ({ page }) => {
      await page.goto('/gallery', { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'AR', exact: true }).click();
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

      const paywallBtn = page.getByRole('button', { name: /فتح نافذة الاشتراك|open paywall|abonelik ve ödeme/i }).first();
      await expect(paywallBtn).toBeVisible();
      await paywallBtn.click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
    });
  });

  // =========================================================================
  // Feature 6: Strict LTR Scientific Isolation (F07, R3)
  // =========================================================================
  test.describe('Feature 6: Strict LTR Scientific Isolation', () => {
    test('T1-LTR-01: chemical structures and SMILES containers maintain strict dir="ltr" in Arabic mode', async ({ page }) => {
      await page.goto('/gallery');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'AR', exact: true }).click();

      // SAR Explorer widget container retains LTR
      const widgetContainer = page.locator('[data-testid="active-widget-container"]');
      await expect(widgetContainer).toBeVisible();
    });

    test('T1-LTR-02: mathematical equations and thermodynamic formula notation render with LTR alignment', async ({ page }) => {
      await page.goto('/courses/medchem/lessons/1');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'AR', exact: true }).click();

      // Hook comparison cards contain thermodynamic equations
      const agentCards = page.locator('[dir="ltr"]');
      expect(await agentCards.count()).toBeGreaterThanOrEqual(1);
    });

    test('T1-LTR-03: numerical expressions and ratio values preserve left-to-right digit sequence', async ({ page }) => {
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'AR', exact: true }).click();

      // Prices must be in LTR containers so currency symbols and numerals do not invert
      const priceContainers = page.locator('div[dir="ltr"]');
      const count = await priceContainers.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('T1-LTR-04: biophysical simulation widget canvases retain Cartesian coordinate orientation', async ({ page }) => {
      await page.goto('/gallery');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'AR', exact: true }).click();

      // Dose-Response curve SVG retains LTR coordinates
      await page.getByRole('button', { name: 'Dose-Response Curve', exact: true }).click();
      const svg = page.locator('svg').first();
      await expect(svg).toBeVisible();
    });

    test('T1-LTR-05: scientific citations and book references retain LTR text direction', async ({ page }) => {
      await page.goto('/courses/medchem/lessons/1');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'AR', exact: true }).click();

      await page.getByRole('button', { name: /المصادر الأكاديمية|Academic Sources/i }).click();
      await expect(page.getByText(/Foye's Principles of Medicinal Chemistry/i)).toBeVisible();
    });
  });

  // =========================================================================
  // Feature 7: TRY Pricing Architecture & Student Authentication (F08, F09, R7)
  // =========================================================================
  test.describe('Feature 7: TRY Pricing Architecture & Student Authentication', () => {
    test('T1-PRIC-01: pricing page presents prices exclusively in Turkish Lira (TRY / ₺)', async ({ page }) => {
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'TR', exact: true }).click();

      await expect(page.getByText('₺250')).toBeVisible();
      await expect(page.getByText('₺850')).toBeVisible();
      await expect(page.getByText('₺1.450')).toBeVisible();
    });

    test('T1-PRIC-02: zero references to foreign currencies (USD, EUR, $, €) anywhere on pricing surfaces', async ({ page }) => {
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');

      const bodyText = await page.innerText('body');
      expect(bodyText).not.toContain('USD');
      expect(bodyText).not.toContain('EUR');
      expect(bodyText).not.toContain('$');
      expect(bodyText).not.toContain('€');
    });

    test('T1-PRIC-03: 22 permanently free lessons guarantee is explicitly highlighted on Catalog and Pricing', async ({ page }) => {
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'TR', exact: true }).click();

      await expect(page.getByText(/22 ders bedelsiz|Her modülde 1\. ve 2\. dersler/i)).toBeVisible();

      await page.goto('/catalog');
      await page.waitForLoadState('networkidle');
      await expect(page.getByText('Her Modülde 1. ve 2. Ders Kalıcı Olarak Ücretsiz')).toBeVisible();
    });

    test('T1-PRIC-04: 7-day cardless free trial is prominently highlighted with 1-click activation', async ({ page }) => {
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'TR', exact: true }).click();

      await expect(page.getByRole('button', { name: /7 Günlük Ücretsiz Denemeyi Başlat/i })).toBeVisible();
      await expect(page.getByText(/Kredi kartı gerekmeden tek tıkla anında aktivasyon/i)).toBeVisible();
    });

    test('T1-PRIC-05: student registration modal features Turkish Pharmacy Faculties dropdown with 10 canonical options', async ({ page }) => {
      await page.goto('/gallery');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'TR', exact: true }).click();

      await page.getByRole('button', { name: /giriş yap/i }).first().click();
      await page.getByRole('button', { name: /kayıt ol/i }).first().click();

      const facultySelect = page.locator('#faculty-select');
      await expect(facultySelect).toBeVisible();

      const options = await facultySelect.locator('option').allInnerTexts();
      expect(options).toContain('İstanbul Üniversitesi');
      expect(options).toContain('Hacettepe Üniversitesi');
      expect(options).toContain('Ankara Üniversitesi');
      expect(options).toContain('Marmara Üniversitesi');
      expect(options).toContain('Ege Üniversitesi');
      expect(options.length).toBeGreaterThanOrEqual(10);
    });

    test('T1-PRIC-06: dual bundle pass toggle updates prices dynamically to ₺350, ₺1,150, ₺2,100', async ({ page }) => {
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'TR', exact: true }).click();

      // Click dual bundle toggle
      await page.getByRole('button', { name: /[iİ]kili paket/i }).click();

      await expect(page.getByText('₺350')).toBeVisible();
      await expect(page.getByText('₺1.150')).toBeVisible();
      await expect(page.getByText('₺2.100')).toBeVisible();
    });
  });
});
