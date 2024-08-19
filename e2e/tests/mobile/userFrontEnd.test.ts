import { test, expect } from "@playwright/test";
const { describe, beforeEach } = test;

describe("user front-end", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  describe("landing page", () => {
    test("logo is visible", async ({ page }) => {
      const header = page.getByTestId("header-logo");
      await expect(header).toBeVisible();
    });

    describe("register", () => {
      beforeEach(async ({ page }) => {
        await page.goto("/register");
      });
      test("elements are visible", async ({ page }) => {
        const header = page.getByTestId("register-header");
        const usernameInput = page.getByTestId("register-username-input");
        const emailInput = page.getByTestId("register-email-input");
        const passwordInput = page.getByTestId("register-password-input");
        const registerButton = page.getByTestId("register-button");

        await expect(header).toBeVisible();
        await expect(usernameInput).toBeVisible();
        await expect(emailInput).toBeVisible();
        await expect(passwordInput).toBeVisible();
        await expect(registerButton).toBeVisible();
      });
    });

    describe("/login", async () => {
      beforeEach(async ({ page }) => {
        await page.goto("login");
      });
      test("elements are visible", async ({ page }) => {
        const header = page.getByTestId("login-header");
        const emailInput = page.getByTestId("login-email-input");
        const passwordInput = page.getByTestId("login-password-input");
        const loginButton = page.getByTestId("login-button");

        await expect(header).toBeVisible();
        await expect(emailInput).toBeVisible();
        await expect(passwordInput).toBeVisible();
        await expect(loginButton).toBeVisible();
      });
    });
  });
});
