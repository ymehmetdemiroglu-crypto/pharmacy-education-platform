import { defineConfig, devices } from '@playwright/test';

const BRAVE_PATH = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';

export default defineConfig({
  testDir: './e2e',
  timeout: 75000,
  expect: {
    timeout: 10000,
  },
  workers: 1,
  fullyParallel: false,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
    video: 'on',
    screenshot: 'on',
  },
  webServer: {
    command: 'pnpm --filter @pharmacy/web preview --port 4173',
    port: 4173,
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
  projects: [
    // 1. Desktop Brave - Shields Default
    {
      name: 'desktop-brave-shields-default',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
        launchOptions: {
          executablePath: BRAVE_PATH,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
      },
    },
    // 2. Desktop Brave - Shields Down (Parity verification)
    {
      name: 'desktop-brave-shields-down',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
        launchOptions: {
          executablePath: BRAVE_PATH,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-brave-shields',
            '--disable-component-update',
          ],
        },
      },
    },
    // 3. Tablet Viewport (768x1024)
    {
      name: 'tablet-brave',
      use: {
        viewport: { width: 768, height: 1024 },
        launchOptions: {
          executablePath: BRAVE_PATH,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
      },
    },
    // 4. Mobile Viewport (375x667)
    {
      name: 'mobile-brave',
      use: {
        viewport: { width: 375, height: 667 },
        isMobile: true,
        launchOptions: {
          executablePath: BRAVE_PATH,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
      },
    },
  ],
});
