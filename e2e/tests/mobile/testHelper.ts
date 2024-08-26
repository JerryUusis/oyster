import { Locator, expect } from "@playwright/test";
import { getRandomValues } from "crypto";
import { HOST } from "../../config";

// Define host by environment

const FIRESTORE_RESET_URL = `http://${HOST}:8080/emulator/v1/projects/${process.env.FIREBASE_PROJECT_ID}/databases/(default)/documents`;
const AUTH_RESET_URL = `http://${HOST}:9099/emulator/v1/projects/${process.env.FIREBASE_PROJECT_ID}/accounts`;

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

// Generate random password with default length of 12
const generatePassword = (length = 12) => {
  let password = "";
  const chars =
    "0123456789abcdefghijklmnopqrstuwxyzåäöABCDEFGHIJKLMNOPQRSTUWXYZÅÄÖ!@#$%^&*()-_=+[]{}|;:',.<>?/";
  const array = new Uint32Array(length); // Create array of 32-bit unsigned integers (integer ranging from 0 to 4,294,967,295)
  getRandomValues(array); // Fill the array with cryptographically secure random 32-bit unsigned integers

  // The remainder of "array[i] % chars.length" will always be shorter than the length of chars
  // Therefore it will always return a character from the chars string and append it to the password
  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }
  return password;
};

export { clearUsers, testAlertMessageAndColour, generatePassword };
