import { test, expect } from "@playwright/test";
import {
  testAlertMessageAndColour,
  clearUsers,
  generatePassword,
} from "./testHelper";
import RegisterPage from "../utils/registerHelper";
import LoginPage from "../utils/loginHelper";
import AlertHandlerComponent from "../utils/alertHandlerHelper";
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
      await registerPage.registerUser("testuser", "test@gmail.com", "test1234");

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
      const { username, email, password } = newUser;

      await registerPage.registerUser(username, email, password);

      const successAlert = new AlertHandlerComponent(page).getAlertHandler();
      await successAlert.waitFor({ state: "visible" });

      await registerPage.registerUser(username, email, password);

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
      const { username, email, password } = newUser;
      await registerPage.registerUser(username, email, password);

      const successAlert = new AlertHandlerComponent(page).getAlertHandler();
      await successAlert.waitFor({ state: "visible" });

      registerPage.registerUser(username, "testmail@gmail.com", password);

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
      await clearUsers();
      await page.goto("login");
    });
    afterEach(async () => {
      await clearUsers();
    });
    test("elements are visible", async ({ page }) => {
      const loginPage = new LoginPage(page);
      const header = loginPage.getHeader();
      const emailInput = loginPage.getEmailInput();
      const passwordInput = loginPage.getPasswordInput();
      const loginButton = loginPage.getLoginButton();

      await expect(header).toBeVisible();
      await expect(emailInput).toBeVisible();
      await expect(passwordInput).toBeVisible();
      await expect(loginButton).toBeVisible();
    });
    describe("login operations", () => {
      const newUser = {
        username: "testuser",
        email: "testuser@gmail.com",
        password: generatePassword(),
      };

      const { username, email, password } = newUser;

      beforeEach(async ({ page }) => {
        await page.goto("/register");
        const registerPage = new RegisterPage(page);
        await registerPage.registerUser(username, email, password);
        await page.goto("/login");
      });

      afterEach(async () => {
        await clearUsers();
      });

      test("succesful login redirects to user's profile page", async ({
        page,
      }) => {
        const loginPage = new LoginPage(page);
        await loginPage.signIn(email, password);

        // Wait 500ms for the auth object to be stored on login
        await page.waitForTimeout(1500);
        // Get user auth object from localstorage during succesful login
        const authObject = await page.evaluate(() =>
          JSON.parse(localStorage.getItem("loggedUser"))
        );

        await page.waitForURL(`/profile/${authObject.uid}`);
        expect(page.url()).toBe(
          `http://localhost:5173/profile/${authObject.uid}`
        );
      });
    });
  });
});
