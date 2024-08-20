import { Page, Locator, expect } from "@playwright/test";
import AlertHandlerComponent from "../utils/alertHandlerHelper";

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
  // getComputedStyles returns an object containing the values of all CSS properties of an element
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
  const backgroundColor = await alertHandler.evaluate(
    (element) => getComputedStyle(element).backgroundColor
  );
  expect(backgroundColor).toBe(alertColour);
  alertHandler.waitFor({ state: "hidden" });
  await expect(alertHandler).not.toBeVisible();
};

const clearUsers = async () => {
  try {
    const response = await fetch(RESET_URL, { method: "DELETE" });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export { loginUser, clearUsers, testAlertMessageAndColour };
