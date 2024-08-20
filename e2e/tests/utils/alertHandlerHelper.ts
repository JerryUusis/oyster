import { Page, Locator } from "@playwright/test";

class AlertHandlerComponent {
  private page: Page;
  private alertHandler: Locator;
  constructor(page: Page) {
    this.page = page;
  }

  getAlertHandler(): Locator {
    if (!this.alertHandler) {
      this.alertHandler = this.page.getByTestId("alert-handler");
    }
    return this.alertHandler;
  } 
}

export default AlertHandlerComponent;
