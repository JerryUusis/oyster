/// <reference types="vite-plugin-svgr/client" />
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import SlidingDrawer from "./SlidingDrawer";
import Logo from "../assets/logo.svg?react";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

const Header = () => {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const oysterTheme = useTheme().palette.oysterColors;

  const toggleDrawerVisible = () => {
    setDrawerVisible((drawerVisible) => !drawerVisible);
  };

  return (
    <Box sx={{ pt: "56px" }}>
      <AppBar elevation={0}>
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: oysterTheme.gray,
          }}
          data-testid="header"
        >
          <Logo data-testid="header-logo" />
          <Box>
            <IconButton
              sx={{ color: oysterTheme.darkBrown }}
              data-testid="profile-button"
            >
              <PersonIcon />
            </IconButton>
            <IconButton
              onClick={toggleDrawerVisible}
              sx={{ color: oysterTheme.darkBrown }}
              data-testid="menu-button"
            >
              <Menu />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <SlidingDrawer
        drawerVisible={drawerVisible}
        toggleDrawerVisible={toggleDrawerVisible}
      />
    </Box>
  );
};

export default Header;
