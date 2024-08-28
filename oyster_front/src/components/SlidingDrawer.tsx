import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import PersonIcon from "@mui/icons-material/Person";
import MenuItem from "./MenuItem";

interface SlidingDrawerProps {
  drawerVisible: boolean;
  toggleDrawerVisible: () => void;
}

const SlidingDrawer = ({
  drawerVisible,
  toggleDrawerVisible,
}: SlidingDrawerProps) => {
  const theme = useTheme().palette.oysterColors;
  return (
    <Drawer
      open={drawerVisible}
      onClose={toggleDrawerVisible}
      anchor="right"
      sx={{
        ".MuiDrawer-paper": {
          backgroundColor: theme.gray,
        },
      }}
    >
      <Box sx={{ width: "280px" }}>
        <List>
        <MenuItem itemName="Personal information" menuIcon={PersonIcon}></MenuItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SlidingDrawer;
