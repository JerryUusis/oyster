import { Page, Locator } from "@playwright/test";

class RegisterPage {
  private page: Page;
  private header: Locator;
  private usernameInput: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
  }
  // Lazy loading of locators
  getHeader(): Locator {
    if (!this.header) {
      this.header = this.page.getByTestId("register-button");
    }
    return this.header;
  }
  getUserNameInput(): Locator {
    if (!this.usernameInput) {
      this.usernameInput = this.page.getByTestId("register-username-input");
    }
    return this.usernameInput;
  }
  getEmailInput(): Locator {
    if (!this.emailInput) {
      this.emailInput = this.page.getByTestId("register-email-input");
    }
    return this.emailInput;
  }
  getPasswordInput(): Locator {
    if (!this.passwordInput) {
      this.passwordInput = this.page.getByTestId("register-password-input");
    }
    return this.passwordInput;
  }
  getRegisterButton(): Locator {
    if (!this.registerButton) {
      this.registerButton = this.page.getByTestId("register-button");
    }
    return this.registerButton;
  }
  async fillRegistrationForm(
    username: string,
    email: string,
    password: string
  ): Promise<void> {
    await this.getUserNameInput().fill(username);
    await this.getEmailInput().fill(email);
    await this.getPasswordInput().fill(password);
  }
}

export default RegisterPage;
