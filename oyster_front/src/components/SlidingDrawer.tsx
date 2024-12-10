import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { useOysterPalette } from "../utils/theme/theme";
import List from "@mui/material/List";
import React from "react";
import { DrawerMenuItemProps } from "./DrawerMenuItem";

interface SlidingDrawerProps {
  drawerVisible: boolean;
  toggleDrawerVisible: () => void;
  children: React.ReactElement<DrawerMenuItemProps>[];
}

const SlidingDrawer = ({
  drawerVisible,
  toggleDrawerVisible,
  children,
}: SlidingDrawerProps) => {
  const oysterPalette = useOysterPalette();
  return (
    <Drawer
      open={drawerVisible}
      onClose={toggleDrawerVisible}
      anchor="right"
      sx={{
        ".MuiDrawer-paper": {
          backgroundColor: oysterPalette.gray,
        },
      }}
    >
      <Box sx={{ width: "280px" }}>
        {/* Pass toggleDrawerVisible to all of the children elements. */}
        <List>
          {React.Children.map(children, (child) =>
            React.cloneElement(child, { toggleDrawerVisible })
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default SlidingDrawer;
