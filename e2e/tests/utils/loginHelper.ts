import { Page, Locator } from "@playwright/test";
import { HOST, PORT } from "../../config";

class LoginPage {
  private page: Page;
  private header: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
  }

  getHeader(): Locator {
    if (!this.header) {
      this.header = this.page.getByTestId("login-header");
    }
    return this.header;
  }
  getEmailInput(): Locator {
    if (!this.emailInput) {
      this.emailInput = this.page.getByTestId("login-email-input");
    }
    return this.emailInput;
  }
  getPasswordInput(): Locator {
    if (!this.passwordInput) {
      this.passwordInput = this.page.getByTestId("login-password-input");
    }
    return this.passwordInput;
  }
  getLoginButton(): Locator {
    if (!this.loginButton) {
      this.loginButton = this.page.getByTestId("login-button");
    }
    return this.loginButton;
  }
  async fillLoginForm(email: string, password: string): Promise<void> {
    await this.getEmailInput().fill(email);
    await this.getPasswordInput().fill(password);
  }

  // Login with existing user credentials and wait for response from the backend
  async signIn(email: string, password: string): Promise<void> {
    const requestUrl = `http://${HOST}:${PORT}/api/login`;
    await this.fillLoginForm(email, password);

    const requestPromise = this.page.waitForRequest(
      (request) => request.method() === "POST" && request.url() === requestUrl
    );
    // https://playwright.dev/docs/api/class-page#page-wait-for-response
    const responsePromise = this.page.waitForResponse(
      (response) => response.status() === 200 && response.url() === requestUrl
    );
    await this.getLoginButton().click();
    await Promise.all([requestPromise, responsePromise]);
  }
}

export default LoginPage;
