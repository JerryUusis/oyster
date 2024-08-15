import Login from "../src/routes/Login";
import { cleanup, screen } from "@testing-library/react";
import renderWithTheme from "./utils/renderWithTheme";

describe("<Login />", () => {
  const login = <Login />;
  beforeEach(() => {
    renderWithTheme(login);
  });
  afterEach(() => {
    cleanup();
  });
  test("should render header", () => {
    const header = screen.getByTestId("login-header");
    expect(header).toBeVisible();
  });
  test("should render email input", () => {
    const emailInput = screen.getByTestId("login-email-input");
    expect(emailInput).toBeVisible();
  });
  test("should render password input", () => {
    const passwordInput = screen.getByTestId("login-password-input");
    expect(passwordInput).toBeVisible();
  });
});
