import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";

interface MenuItemProps {
  itemName: string;
  menuIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

const MenuItem = ({ itemName, menuIcon: MenuIcon }: MenuItemProps) => {
  return (
    <Box>
      <ListItem>
        <ListItemButton>
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

export default MenuItem;
