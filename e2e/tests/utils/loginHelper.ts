import { Page, Locator } from "@playwright/test";

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
  async signIn(email: string, password: string): Promise<void> {
    await this.fillLoginForm(email, password);
    await this.getLoginButton().click();
  }
}

export default LoginPage;
