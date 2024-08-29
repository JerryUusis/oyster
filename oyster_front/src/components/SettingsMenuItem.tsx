import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

interface SettingsMenuItemProps {
  settingName: string;
  currentValue?: string;
  buttonLabel: "add" | "edit";
}

const SettingsMenuItem = ({
  settingName,
  currentValue,
  buttonLabel,
}: SettingsMenuItemProps) => {
  return (
    <Box>
      <ListItem>
        <ListItemText primary={settingName} secondary={currentValue} />
        <Button variant="text" sx={{ textDecoration: "underline" }}>
          {buttonLabel}
        </Button>
      </ListItem>
      <Divider variant="middle" />
    </Box>
  );
};

export default SettingsMenuItem;
