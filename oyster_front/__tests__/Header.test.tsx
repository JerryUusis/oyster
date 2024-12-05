import Header from "../src/components/Header";
import { cleanup, screen } from "@testing-library/react";
import { renderWithThemeAndProviders } from "./utils/reduxRenderTestUtils";
import { UserObject } from "../src/utils/types";

describe("<Header />", () => {
  const mockUser: UserObject = {
    uid: "12345",
    username: "Test User",
    email: "test@user.com",
    customToken: "1234567890",
  };

  beforeEach(() => {
    renderWithThemeAndProviders(<Header />, {
      preloadedState: {
        user: mockUser,
      },
    });
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });
  describe("should render", () => {
    test("header menu", () => {
      const header = screen.getByTestId("header");
      expect(header).toBeVisible();
    });
    test("explore button", () => {
      const profileButton = screen.getByTestId("explore-button");
      expect(profileButton).toBeVisible();
    });
    test("favorite button", () => {
      const favoriteButton = screen.getByTestId("favourite-button");
      expect(favoriteButton).toBeVisible();
    });
    test("explore button", () => {
      const profileButton = screen.getByTestId("profile-button");
      expect(profileButton).toBeVisible();
    });
    test("settings button", () => {
      const settingsButton = screen.getByTestId("settings-button");
      expect(settingsButton).toBeVisible();
    });
  });
});
