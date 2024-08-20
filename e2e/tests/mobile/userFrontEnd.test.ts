import { test, expect } from "@playwright/test";
import { clearUsers } from "./testHelper";
import RegisterPage from "../utils/registerHelper";
const { describe, beforeEach, afterEach } = test;

describe("user front-end", () => {
  describe("/register", () => {
    beforeEach(async ({ page }) => {
      await clearUsers();
      await page.goto("/register");
    });

    afterEach(async () => {
      await clearUsers();
    });

    test("elements are visible", async ({ page }) => {
      const registerPage = new RegisterPage(page);
      const header = registerPage.getHeader();
      const usernameInput = registerPage.getUserNameInput();
      const emailInput = registerPage.getEmailInput();
      const passwordInput = registerPage.getPasswordInput();
      const registerButton = registerPage.getRegisterButton();

      await expect(header).toBeVisible();
      await expect(usernameInput).toBeVisible();
      await expect(emailInput).toBeVisible();
      await expect(passwordInput).toBeVisible();
      await expect(registerButton).toBeVisible();
    });
    test("show <AlertHandler /> on succesful registration with correct background colour", async ({
      page,
    }) => {
      const registerPage = new RegisterPage(page);
      registerPage.registerUser("testuser", "test@gmail.com", "test1234");
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
      expect(backgroundColor).toBe("rgb(46, 125, 50)"); // MUI green[800] success #2E7D3
      await alertHandler.waitFor({ state: "hidden" });
      await expect(alertHandler).not.toBeVisible();
    });

    // TODO: Write this test in testHelper.ts with reusable functions checking the alertHandler
    test("show <AlertHandler /> on failed registration with correct background colour if user already exists", async ({
      page,
    }) => {
      // Create a user and wait for success alertHandler to appear and fade away
      const registerPage = new RegisterPage(page);
      registerPage.registerUser("testuser", "test@gmail.com", "test1234");
      const successAlertHandler = page.getByTestId("alert-handler");
      await expect(successAlertHandler).toBeVisible();
      await expect(successAlertHandler).toHaveText("Registration succesful!");

      const successBackgroundColour = await successAlertHandler.evaluate(
        (element) => getComputedStyle(element).backgroundColor
      );
      expect(successBackgroundColour).toBe("rgb(46, 125, 50)");

      await successAlertHandler.waitFor({ state: "hidden" });
      await expect(successAlertHandler).not.toBeVisible();

      // Wait error AlertHandler to appear and fade away
      registerPage.registerUser("testuser", "test@gmail.com", "test1234");
      const errorAlertHandler = page.getByTestId("alert-handler");
      await errorAlertHandler.waitFor({ state: "visible" });
      await expect(errorAlertHandler).toBeVisible();
      await expect(errorAlertHandler).toHaveText("email already in use");

      const backgroundColor = await errorAlertHandler.evaluate(
        (element) => getComputedStyle(element).backgroundColor
      );
      expect(backgroundColor).toBe("rgb(211, 47, 47)"); // MUI palette.error.dark = #d32f2f
      await errorAlertHandler.waitFor({ state: "hidden" });
      await expect(errorAlertHandler).not.toBeVisible();
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
