import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuBarButton from "./MenuBarButton";
import { useTheme } from "@mui/material/styles";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { UserObject } from "../utils/types";

const Header = () => {
  const oysterTheme = useTheme().palette.oysterColors;
  const user = useAppSelector((state: RootState) => state.user) as UserObject;

  return (
    <AppBar elevation={0} sx={{ top: "auto", bottom: 0 }}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: oysterTheme.gray,
        }}
        data-testid="header"
      >
        <MenuBarButton icon={LanguageOutlinedIcon} />
        <MenuBarButton icon={FavoriteBorderOutlinedIcon} />
        <MenuBarButton
          icon={PersonOutlineOutlinedIcon}
          path={`profile/${user.uid}`}
        />
        <MenuBarButton icon={SettingsOutlinedIcon} path="/profile_settings" />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
