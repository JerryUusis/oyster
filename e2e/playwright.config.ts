import { defineConfig, devices } from "@playwright/test";
import {
  PORT,
  HOST,
  GOOGLE_APPLICATION_CREDENTIALS,
  FIREBASE_TOKEN,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  TEST_FIREBASE_API_KEY,
} from "./config";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:5173",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      testDir: "tests/desktop",
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      testDir: "tests/desktop",
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
      testDir: "tests/desktop",
    },

    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
      testDir: "tests/mobile",
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
      testDir: "tests/mobile",
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // Launch Firebase emulators manually or run the script
  webServer: [
    {
      command: "cd ../oyster_front && npx vite --host",
      url: "http://localhost:5173",
      reuseExistingServer: true,
    },
    {
      command: "cd ../oyster_back && npm run dev",
      port: parseInt(PORT),
      env: {
        PORT,
        HOST,
        GOOGLE_APPLICATION_CREDENTIALS,
        FIREBASE_TOKEN,
        FIREBASE_PRIVATE_KEY,
        FIREBASE_PROJECT_ID: `demo-${FIREBASE_PROJECT_ID}`,
        FIREBASE_CLIENT_EMAIL,
        TEST_FIREBASE_API_KEY,
      },
    },
  ],
});
