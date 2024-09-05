import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";
import { Link } from "react-router-dom";

export interface DrawerMenuItemProps {
  itemName: string;
  menuIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  path?: string;
  toggleDrawerVisible?: () => void;
  onClickFunction?: () => Promise<void>;
}

const DrawerMenuItem = ({
  itemName,
  menuIcon: MenuIcon,
  path,
  toggleDrawerVisible,
  onClickFunction,
}: DrawerMenuItemProps) => {
  return (
    <Box>
      <ListItem>
        <ListItemButton
          component={path ? Link : ListItemButton}
          to={path}
          onClick={onClickFunction || toggleDrawerVisible}
        >
          <ListItemIcon>{MenuIcon && <MenuIcon />}</ListItemIcon>
          <ListItemText>{itemName}</ListItemText>
          <ListItemIcon sx={{ display: "flex", justifyContent: "flex-end" }}>
            <ChevronRightRoundedIcon />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
      <Divider variant="middle" />
    </Box>
  );
};

export default DrawerMenuItem;
