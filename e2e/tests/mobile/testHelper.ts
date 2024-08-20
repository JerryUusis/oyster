import { Page } from "@playwright/test";

const RESET_URL =
  "http://localhost:8080/emulator/v1/projects/oyster-b6c36/databases/(default)/documents";

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
  try {
    const response = await fetch(RESET_URL, { method: "DELETE" });
    return response;
  } catch (error) {
    console.error(error);
  }
};



export { loginUser, clearUsers };
