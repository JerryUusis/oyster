import { defineConfig, devices } from "@playwright/test";
import {
  PORT,
  HOST,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
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
    // Use "localhost" for development and 127.0.0.1 for CI
    baseURL: !process.env.CI
      ? "http://localhost:5173"
      : "http://127.0.0.1:5173",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
  timeout: 5000,

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
      command: !process.env.CI
        ? "npx vite --host"
        : "npm run host:ci",
      url: !process.env.CI ? "http://localhost:5173" : "http://127.0.0.1:5173",
      cwd: "../oyster_front",
      reuseExistingServer: !process.env.CI,
      stdout: "pipe",
      timeout: 30000,
    },
    {
      command: "npm run dev",
      port: 3001,
      env: {
        PORT,
        HOST: !process.env.CI ? HOST : "127.0.0.1",
        FIREBASE_PRIVATE_KEY,
        FIREBASE_PROJECT_ID,
        FIREBASE_CLIENT_EMAIL,
      },
      cwd: "../oyster_back",
      stdout: "pipe",
      timeout: 30000,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
