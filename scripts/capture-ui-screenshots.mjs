import { chromium } from '@playwright/test';
import path from 'path';

const BRAVE_PATH = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';
const OUTPUT_DIR = 'C:\\Users\\hp\\.gemini\\antigravity\\brain\\33e95f3d-5b4d-4363-a44d-b2b0e8953cfc\\screenshots';
const BASE_URL = 'http://localhost:3000';

async function capture() {
  console.log('Launching Brave Browser...');
  const browser = await chromium.launch({
    executablePath: BRAVE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    // 1. Unauthenticated Landing Page (Desktop 1440x900)
    console.log('Capturing 01_landing_hero.png...');
    const context1 = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const page1 = await context1.newPage();
    await page1.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page1.waitForTimeout(1000);
    await page1.screenshot({
      path: path.join(OUTPUT_DIR, '01_landing_hero.png'),
      fullPage: false,
    });
    await context1.close();

    // 2. Authenticated Study Workspace (Desktop Light Mode 1440x900)
    console.log('Capturing 02_study_workspace_desktop.png...');
    const context2 = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    await context2.addInitScript(() => {
      localStorage.setItem(
        'pharmacy_user_profile',
        JSON.stringify({
          userId: 'usr-demo-student',
          email: 'ogrenci@marmara.edu.tr',
          displayName: 'Marmara Eczacılık Öğrencisi',
          plan: 'free',
          preferredLanguage: 'tr',
        })
      );
    });
    const page2 = await context2.newPage();
    await page2.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page2.waitForTimeout(1500);
    await page2.screenshot({
      path: path.join(OUTPUT_DIR, '02_study_workspace_desktop.png'),
      fullPage: false,
    });

    // 3. Authenticated Study Workspace (Desktop Dark Mode 1440x900)
    console.log('Capturing 03_study_workspace_dark.png...');
    await page2.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page2.waitForTimeout(500);
    await page2.screenshot({
      path: path.join(OUTPUT_DIR, '03_study_workspace_dark.png'),
      fullPage: false,
    });

    // 4. Focus on 3D Molecular Viewer & SAR Matrix
    console.log('Capturing 04_molecule_viewer_sar.png...');
    await page2.evaluate(() => {
      document.documentElement.classList.remove('dark');
      window.scrollTo({ top: 350, behavior: 'instant' });
    });
    await page2.waitForTimeout(500);
    await page2.screenshot({
      path: path.join(OUTPUT_DIR, '04_molecule_viewer_sar.png'),
      fullPage: false,
    });

    // 5. Send a prompt to AI Tutor and capture the response
    console.log('Capturing 05_socratic_ai_tutor.png...');
    await page2.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    // Click prompt chip if visible
    const chip = page2.locator(':has-text("Dibukain molekülünün çoklu reseptör bağları")').first();
    if (await chip.isVisible()) {
      await chip.click();
      await page2.waitForTimeout(2000);
    }
    await page2.screenshot({
      path: path.join(OUTPUT_DIR, '05_socratic_ai_tutor.png'),
      fullPage: false,
    });
    await context2.close();

    // 6. Mobile Viewport (390x844 iPhone 14 / modern smartphone)
    console.log('Capturing 06_mobile_study_workspace.png...');
    const context3 = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    await context3.addInitScript(() => {
      localStorage.setItem(
        'pharmacy_user_profile',
        JSON.stringify({
          userId: 'usr-demo-student',
          email: 'ogrenci@marmara.edu.tr',
          displayName: 'Marmara Eczacılık Öğrencisi',
          plan: 'free',
          preferredLanguage: 'tr',
        })
      );
    });
    const page3 = await context3.newPage();
    await page3.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page3.waitForTimeout(1500);
    await page3.screenshot({
      path: path.join(OUTPUT_DIR, '06_mobile_study_workspace.png'),
      fullPage: false,
    });

    // 7. Mobile Viewport with AI Tutor Drawer Open
    console.log('Capturing 07_mobile_tutor_drawer.png...');
    const mobileTutorBtn = page3.locator('button').filter({ hasText: "AI Tutor'a Sor" }).first();
    if (await mobileTutorBtn.isVisible()) {
      await mobileTutorBtn.click();
      await page3.waitForTimeout(800);
      await page3.screenshot({
        path: path.join(OUTPUT_DIR, '07_mobile_tutor_drawer.png'),
        fullPage: false,
      });
    }

    // 8. 2D Molecule Structure View
    console.log('Capturing 08_2d_molecule_view.png...');
    const context4 = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    await context4.addInitScript(() => {
      localStorage.setItem(
        'pharmacy_user_profile',
        JSON.stringify({
          userId: 'usr-demo-student',
          email: 'ogrenci@marmara.edu.tr',
          displayName: 'Marmara Eczacılık Öğrencisi',
          plan: 'free',
          preferredLanguage: 'tr',
        })
      );
    });
    const page4 = await context4.newPage();
    await page4.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page4.waitForTimeout(1000);
    const tab2D = page4.locator(':has-text("2D Yapı")').first();
    if (await tab2D.isVisible()) {
      await tab2D.click();
      await page4.waitForTimeout(600);
      await page4.screenshot({
        path: path.join(OUTPUT_DIR, '08_2d_molecule_view.png'),
        fullPage: false,
      });
    }

    // 9. Dynamic SAR Matrix with Expandable Row
    console.log('Capturing 09_sar_matrix_widget.png...');
    const sarHeading = page4.locator('h3').filter({ hasText: 'Dinamik SAR Matrisi' }).first();
    if (await sarHeading.isVisible()) {
      await sarHeading.scrollIntoViewIfNeeded();
      await page4.waitForTimeout(500);
      // Click first table row expand icon if available
      const expandBtn = page4.locator('.ant-table-row-expand-icon').first();
      if (await expandBtn.isVisible()) {
        await expandBtn.click();
        await page4.waitForTimeout(400);
      }
      await page4.screenshot({
        path: path.join(OUTPUT_DIR, '09_sar_matrix_widget.png'),
        fullPage: false,
      });
    }

    // 10. Concept Quiz Widget with 3-Tier Steps Scaffolding Ladder
    console.log('Capturing 10_concept_quiz_hints.png...');
    const quizHeading = page4.locator('span').filter({ hasText: 'Konsept Kontrolü' }).first();
    if (await quizHeading.isVisible()) {
      await quizHeading.scrollIntoViewIfNeeded();
      await page4.waitForTimeout(500);
      // Click Hint button twice to reveal 2 steps of scaffolding
      const hintBtn = page4.locator('button').filter({ hasText: 'İpucu İste' }).first();
      if (await hintBtn.isVisible()) {
        await hintBtn.click();
        await page4.waitForTimeout(300);
        if (await hintBtn.isVisible()) {
          await hintBtn.click();
          await page4.waitForTimeout(300);
        }
      }
      await page4.screenshot({
        path: path.join(OUTPUT_DIR, '10_concept_quiz_hints.png'),
        fullPage: false,
      });
    }

    // 11. PK Curve Simulator with Presets
    console.log('Capturing 11_pk_curve_simulator.png...');
    const pkHeading = page4.locator('h3').filter({ hasText: 'İlaç Konsantrasyonu' }).first();
    if (await pkHeading.isVisible()) {
      await pkHeading.scrollIntoViewIfNeeded();
      await page4.waitForTimeout(500);
      await page4.screenshot({
        path: path.join(OUTPUT_DIR, '11_pk_curve_simulator.png'),
        fullPage: false,
      });
    }

    // 12. Flagship GPCR Signaling Visualizer (Gs, Gi, Gq Cascades)
    console.log('Capturing 12_gpcr_signaling_cascade.png...');
    const gpcrHeading = page4.locator('h3').filter({ hasText: 'Reseptör Sinyal Yolağı' }).first();
    if (await gpcrHeading.isVisible()) {
      await gpcrHeading.scrollIntoViewIfNeeded();
      await page4.waitForTimeout(600);

      // Select Gq subtype in Segmented control
      const gqSegment = page4.locator('.ant-segmented-item').filter({ hasText: 'Gq' }).first();
      if (await gqSegment.isVisible()) {
        await gqSegment.click();
        await page4.waitForTimeout(600);
      }

      await page4.screenshot({
        path: path.join(OUTPUT_DIR, '12_gpcr_signaling_cascade.png'),
        fullPage: false,
      });
    }

    // 13. Realtime Telemetry & Proactive Socratic Nudge Pill ("Tutor bir şey fark etti 💡")
    console.log('Capturing 13_realtime_socratic_nudge.png...');
    // Switch back to Gs
    const gsSegment = page4.locator('.ant-segmented-item').filter({ hasText: 'Gs' }).first();
    if (await gsSegment.isVisible()) {
      await gsSegment.click();
      await page4.waitForTimeout(500);
    }

    // Click incorrect choice in GPCR challenge (endositoz)
    const wrongChoiceBtn = page4.locator('button').filter({ hasText: 'endositoz' }).first();
    if (await wrongChoiceBtn.isVisible()) {
      await wrongChoiceBtn.click();
      await page4.waitForTimeout(400);

      // Click "Tahmini Doğrula" to trigger evaluation and misconception alert
      const verifyBtn = page4.locator('button').filter({ hasText: 'Tahmini Doğrula' }).first();
      if (await verifyBtn.isVisible()) {
        await verifyBtn.click();
        await page4.waitForTimeout(800);
      }
    }

    // Scroll to focus on the active Socratic Nudge in TutorChatPane
    await page4.evaluate(() => {
      window.scrollTo({ top: 300, behavior: 'instant' });
    });
    await page4.waitForTimeout(600);
    await page4.screenshot({
      path: path.join(OUTPUT_DIR, '13_realtime_socratic_nudge.png'),
      fullPage: false,
    });

    await context4.close();

    console.log('All screenshots successfully captured in:', OUTPUT_DIR);
  } finally {
    await browser.close();
  }
}

capture().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
