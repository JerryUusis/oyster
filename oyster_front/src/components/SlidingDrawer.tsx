import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

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
          backgroundColor: theme.lightOlive,
        },
      }}
    >
      <Box sx={{width:"200px"}}>Menu will be here</Box>
    </Drawer>
  );
};

export default SlidingDrawer;
