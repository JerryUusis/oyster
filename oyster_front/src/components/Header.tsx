import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuBarButton from "./MenuBarButton";
import { useOysterPalette } from "../utils/theme/theme";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { UserObject } from "../utils/types";

const Header = () => {
  const oysterPalette = useOysterPalette();
  const user = useAppSelector((state: RootState) => state.user) as UserObject;

  return (
    <AppBar elevation={0} sx={{ top: "auto", bottom: 0 }}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: oysterPalette.gray,
        }}
        data-testid="header"
      >
        <MenuBarButton
          icon={LanguageOutlinedIcon}
          dataTestId="explore-button"
        />
        <MenuBarButton
          icon={FavoriteBorderOutlinedIcon}
          dataTestId="favourite-button"
        />
        <MenuBarButton
          icon={PersonOutlineOutlinedIcon}
          path={`profile/${user.uid}`}
          dataTestId="profile-button"
        />
        <MenuBarButton
          icon={SettingsOutlinedIcon}
          path="/profile_settings"
          dataTestId="settings-button"
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
