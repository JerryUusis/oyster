import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";
import { useOysterPalette } from "../utils/theme/theme";

interface SettingsMenuItemProps {
  settingName?: string;
  currentValue?: string;
  buttonLabel?: string;
  onClickFunction?: () => void | Promise<void>;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

const SettingsMenuItem = ({
  settingName,
  currentValue,
  buttonLabel,
  onClickFunction,
  icon: Icon,
}: SettingsMenuItemProps) => {
  const oysterPalette = useOysterPalette();
  return (
    <Box>
      <ListItem>
        {Icon ? (
          <ListItemIcon sx={{ color: oysterPalette.darkBrown }}>
            <Icon />
          </ListItemIcon>
        ) : null}
        <ListItemText primary={settingName} secondary={currentValue} />
        <Button
          variant="text"
          sx={{ textDecoration: "underline", color: oysterPalette.darkBrown }}
          onClick={onClickFunction}
        >
          {buttonLabel}
        </Button>
      </ListItem>
      <Divider variant="middle" />
    </Box>
  );
};

export default SettingsMenuItem;
