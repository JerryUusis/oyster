import Header from "../src/components/Header";
import { cleanup, screen } from "@testing-library/react";
import renderWithTheme from "./utils/renderWithTheme";

describe("<Header />", () => {
  const header = <Header />;
  beforeEach(() => {
    renderWithTheme(header);
  });
  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });
  test("should render", () => {
    const header = screen.getByTestId("header");
    const profileButton = screen.getByTestId("profile-button");
    const menuButton = screen.getByTestId("menu-button");
    
    expect(header).toBeVisible();
    expect(profileButton).toBeVisible();
    expect(menuButton).toBeVisible();
  });
});
