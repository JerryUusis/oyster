import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsMenuItem from "../components/SettingsMenuItem";
import LanguageIcon from "@mui/icons-material/Language";
import KeyIcon from "@mui/icons-material/Key";
import PaletteIcon from "@mui/icons-material/Palette";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { signUserOut, updateUserObject } from "../utils/library";
import { setUser } from "../store/userSlice";
import { useOysterPalette } from "../utils/theme/theme";
import ProfilePicUpload from "../components/ProfilePicUpload";

const ProfileSettings = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const oysterPalette = useOysterPalette();

  const handleSignOut = async () => {
    await signUserOut();
    dispatch(setUser(null));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: oysterPalette.lightPink,
        pt: "56px",
        height: `calc(100vh - 56px)`,
      }}
    >
      <ProfilePicUpload />
      <Typography variant="h2">{user ? user?.username : null}</Typography>
      <List sx={{ width: "100%" }} dense={true} disablePadding={true}>
        <SettingsMenuItem
          settingName="Username"
          currentValue={user?.username}
          buttonLabel="edit"
          icon={PersonIcon}
          editFunction={updateUserObject}
        />
        <SettingsMenuItem
          settingName="Email"
          currentValue={user?.email}
          buttonLabel="edit"
          icon={EmailIcon}
          editFunction={updateUserObject}
        />
        <SettingsMenuItem
          settingName="Location"
          currentValue={user?.location}
          buttonLabel="edit"
          icon={LocationOnIcon}
          editFunction={updateUserObject}
        />
        <SettingsMenuItem
          settingName="Password"
          buttonLabel="edit"
          icon={KeyIcon}
          editFunction={updateUserObject}
        />
        <SettingsMenuItem
          settingName="Spoken languages"
          currentValue={user?.languages}
          buttonLabel="edit"
          icon={LanguageIcon}
          editFunction={updateUserObject}
        />
        <SettingsMenuItem
          settingName="Theme colour"
          currentValue={user?.theme}
          buttonLabel="edit"
          icon={PaletteIcon}
          editFunction={updateUserObject}
        />
        <SettingsMenuItem
          settingName="Sign out"
          buttonLabel="Sign out"
          logoutFunction={handleSignOut}
          icon={LogoutIcon}
        />
      </List>
    </Box>
  );
};

export default ProfileSettings;
