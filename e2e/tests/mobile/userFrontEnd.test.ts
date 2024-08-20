import { test, expect } from "@playwright/test";
import { clearUsers, testAlertMessageAndColour } from "./testHelper";
import RegisterPage from "../utils/registerHelper";
import AlertHandlerComponent from "../utils/alertHandlerHelper";
const { describe, beforeEach, afterEach } = test;
import { registerNewUser } from "../../../oyster_front/src/services/registerService";
import { generatePassword } from "../../../oyster_back/src/__tests__/testHelper";

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
      const alertHandler = new AlertHandlerComponent(page).getAlertHandler();
      await testAlertMessageAndColour(
        alertHandler,
        "Registration succesful!",
        "rgb(46, 125, 50)"
      );
    });
    test("show <AlertHandler /> on failed registration with correct background colour if email is already in use", async ({
      page,
    }) => {
      const registerPage = new RegisterPage(page);

      const newUser = {
        username: "testuser",
        email: "test@gmail.com",
        password: generatePassword(),
      };

      await registerNewUser({ ...newUser });

      registerPage.registerUser(
        newUser.username,
        newUser.email,
        newUser.password
      );
      const errorAlertHandler = new AlertHandlerComponent(
        page
      ).getAlertHandler();
      await testAlertMessageAndColour(
        errorAlertHandler,
        "email already in use",
        "rgb(211, 47, 47)"
      );
    });
    test("show <AlertHandler /> on failed registration with correct background colour if username is already in use", async ({
      page,
    }) => {
      const registerPage = new RegisterPage(page);

      const newUser = {
        username: "testuser",
        email: "testuser@gmail.com",
        password: generatePassword(),
      };

      await registerNewUser({ ...newUser });

      registerPage.registerUser(
        newUser.username,
        "testmail@gmail.com",
        newUser.password
      );
      const errorAlertHandler = new AlertHandlerComponent(
        page
      ).getAlertHandler();
      await testAlertMessageAndColour(
        errorAlertHandler,
        "username already in use",
        "rgb(211, 47, 47)"
      );
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
