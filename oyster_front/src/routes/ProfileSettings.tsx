import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import SettingsMenuItem from "../components/SettingsMenuItem";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ProfileSettings = () => {
  const user = useSelector((state: RootState) => state.user);
  const oysterTheme = useTheme().palette.oysterColors;
  return (
    <Box sx={{}}>
      <Typography variant="h2">Personal Info</Typography>
      <List>
        <SettingsMenuItem
          settingName="Username"
          currentValue={user?.username}
          buttonLabel="edit"
        />
        <SettingsMenuItem
          settingName="Email"
          currentValue={user?.email}
          buttonLabel="edit"
        />
        <SettingsMenuItem
          settingName="Password"
          currentValue={user?.email}
          buttonLabel="edit"
        />
        <SettingsMenuItem
          settingName="Spoken languages"
          currentValue={user?.email}
          buttonLabel="edit"
        />
      </List>
    </Box>
  );
};

export default ProfileSettings;
