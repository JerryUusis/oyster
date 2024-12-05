import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";
import { useTheme } from "@mui/material";

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
  const oysterColors = useTheme().palette.oysterColors;
  return (
    <Box>
      <ListItem>
        {Icon ? (
          <ListItemIcon sx={{ color: oysterColors.darkBrown }}>
            <Icon />
          </ListItemIcon>
        ) : null}
        <ListItemText primary={settingName} secondary={currentValue} />
        <Button
          variant="text"
          sx={{ textDecoration: "underline", color: oysterColors.darkBrown }}
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
