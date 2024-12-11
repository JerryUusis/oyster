import { test, expect } from "@playwright/test";
import {
  testAlertMessageAndColour,
  clearUsers,
  generatePassword,
} from "./testHelper";
import { HOST } from "../../config";
import RegisterPage from "../utils/registerHelper";
import LoginPage from "../utils/loginHelper";
import AlertHandlerComponent from "../utils/alertHandlerHelper";
const { describe, beforeEach, afterEach } = test;
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "mock-api-key",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
connectAuthEmulator(auth, `http://${HOST}:9099`, { disableWarnings: true });

describe("/register", () => {
  beforeEach(async ({ page }) => {
    await clearUsers();
    await page.goto("/register");
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

    await registerPage.tryToRegisterExistingUser(username, email, password);

    const errorAlertHandler = new AlertHandlerComponent(page).getAlertHandler();
    await testAlertMessageAndColour(
      errorAlertHandler,
      "email already in use",
      "rgb(255, 110, 52)"
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

    registerPage.tryToRegisterExistingUser(
      username,
      "testmail@gmail.com",
      password
    );

    const errorAlertHandler = new AlertHandlerComponent(page).getAlertHandler();
    await testAlertMessageAndColour(
      errorAlertHandler,
      "username already in use",
      "rgb(255, 110, 52)"
    );
  });
});

describe("/login", () => {
  beforeEach(async () => {
    await clearUsers();
  });

  test("elements are visible", async ({ page }) => {
    await page.goto("login");
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
      const user = await loginPage.signIn(email, password);

      await page.waitForURL(`/profile/${user.uid}`);
      expect(page.url()).toBe(`http://${HOST}:5173/profile/${user.uid}`);
    });
  });
});
