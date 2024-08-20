import { Page, Locator, expect } from "@playwright/test";

const FIRESTORE_RESET_URL =
  "http://localhost:8080/emulator/v1/projects/oyster-b6c36/databases/(default)/documents";
const AUTH_RESET_URL =
  "http://localhost:9099/emulator/v1/projects/oyster-b6c36/accounts";

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

const testAlertMessageAndColour = async (
  alertHandler: Locator,
  message: string,
  alertColour: string
) => {
  await alertHandler.waitFor({ state: "visible" });
  await expect(alertHandler).toBeVisible();
  await expect(alertHandler).toHaveText(message);
  // Returns the return value of pageFunction.
  // https://playwright.dev/docs/api/class-jshandle#js-handle-evaluate
  const backgroundColor = await alertHandler.evaluate(
    // getComputedStyles returns an object containing the values of all CSS properties of an element
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
    (element) => getComputedStyle(element).backgroundColor
  );
  expect(backgroundColor).toBe(alertColour);
};

const clearUsers = async () => {
  try {
    await fetch(FIRESTORE_RESET_URL, { method: "DELETE" });
    await fetch(AUTH_RESET_URL, { method: "DELETE" });
  } catch (error) {
    console.error(error);
  }
};

export { loginUser, clearUsers, testAlertMessageAndColour };
