import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import PersonIcon from "@mui/icons-material/Person";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

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
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText>Personal Information</ListItemText>
              <ListItemIcon
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <ChevronRightRoundedIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </Box>
    </Drawer>
  );
};

export default SlidingDrawer;
