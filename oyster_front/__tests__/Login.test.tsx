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
    expect(header).toHaveTextContent("Login");
  });
  test("should render email input", () => {
    const emailInput = screen.getByTestId("login-email-input");
    const emailLabel = screen.getByLabelText("Email");

    expect(emailInput).toBeVisible();
    expect(emailLabel).toBeVisible();
    expect(emailLabel).toHaveRole("textbox");
  });
  test("should render password input", () => {
    const passwordInput = screen.getByTestId("login-password-input");
    const passwordLabel = screen.getByLabelText("Password");

    expect(passwordInput).toBeVisible();
    expect(passwordLabel).toBeVisible();
  });
  test("should render login button", () => {
    const loginButton = screen.getByRole("button");

    expect(loginButton).toBeVisible();
    expect(loginButton).toHaveTextContent("Login");
  });
});
