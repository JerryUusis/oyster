import { Page } from "@playwright/test";

const RESET_URL =
  "http://localhost:8080/emulator/v1/projects/oyster-b6c36/databases/(default)/documents";

const registerUser = async (page: Page) => {
  await page.goto("/register");
  const usernameInput = page.getByTestId("register-username-input");
  const emailInput = page.getByTestId("register-email-input");
  const passwordInput = page.getByTestId("register-password-input");
  const registerButton = page.getByTestId("register-button");

  await usernameInput.click();
  await page.keyboard.type("testuser");

  await emailInput.click();
  await page.keyboard.type("testuser@gmail.com");

  await passwordInput.click();
  await page.keyboard.type("password1234");

  await registerButton.click();
};

const loginUser = async (page: Page) => {
  await page.goto("/login");
  const emailInput = page.getByTestId("login-email-input");
  const passwordInput = page.getByTestId("login-password-input");
  const loginButton = page.getByTestId("login-button");

  await emailInput.click();
  await page.keyboard.type("testuser");

  await passwordInput.click();
  await page.keyboard.type("password1234");

  await loginButton.click();
};

const clearUsers = async () => {
  await fetch(RESET_URL, { method: "DELETE" });
};

export { registerUser, loginUser, clearUsers };
