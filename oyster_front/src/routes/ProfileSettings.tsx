import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import SettingsMenuItem from "../components/SettingsMenuItem";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { signUserOut } from "../utils/library";
import { setUser } from "../store/userSlice";

const ProfileSettings = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const handleSignOut = async () => {
    await signUserOut();
    dispatch(setUser(null));
  };

  return (
    <Box>
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
        <SettingsMenuItem settingName="Password" buttonLabel="edit" />
        <SettingsMenuItem
          settingName="Spoken languages"
          currentValue={user?.email}
          buttonLabel="edit"
        />
        <SettingsMenuItem
          settingName="Theme colour"
          currentValue={user?.email}
          buttonLabel="edit"
        />
        <SettingsMenuItem
          buttonLabel="Sign out"
          onClickFunction={handleSignOut}
        />
      </List>
    </Box>
  );
};

export default ProfileSettings;
