import { test, expect } from "@playwright/test";
const { describe, beforeEach } = test;

describe("user front-end", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5174");
  });
  describe("landing page", () => {
    test("logo is visible", async ({ page }) => {
      const header = page.getByTestId("header-logo");
      await expect(header).toBeVisible();
    });
  });
});
