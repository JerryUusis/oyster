import { test, expect } from "@playwright/test";
import { registerUser, clearUsers } from "./testHelper";
const { describe, beforeEach, afterEach } = test;

describe("user front-end", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  describe("landing page", () => {
    test("logo is visible", async ({ page }) => {
      const header = page.getByTestId("header-logo");
      await expect(header).toBeVisible();
    });

    describe("/register", () => {
      beforeEach(async ({ page }) => {
        await clearUsers();
        await page.goto("/register");
      });
      afterEach(async () => {
        await clearUsers();
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
      test("show <AlertHandler /> on succesful registration with correct background colour", async ({
        page,
      }) => {
        await registerUser(page);
        const alertHandler = page.getByTestId("alert-handler");
        await alertHandler.waitFor({ state: "visible" });
        await expect(alertHandler).toBeVisible();
        await expect(alertHandler).toHaveText("Registration succesful!");

        // Returns the return value of pageFunction.
        // https://playwright.dev/docs/api/class-jshandle#js-handle-evaluate
        // getComputedStyles returns an object containing the values of all CSS properties of an element
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
        const backgroundColor = await alertHandler.evaluate(
          (element) => getComputedStyle(element).backgroundColor
        );
        expect(backgroundColor).toBe("rgb(46, 125, 50)"); // MUI green[800] success #2E7D32
      });
    });

    describe("/login", () => {
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
