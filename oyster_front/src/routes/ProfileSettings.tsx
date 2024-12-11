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
import { signUserOut } from "../utils/library";
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
        />
        <SettingsMenuItem
          settingName="Email"
          currentValue={user?.email}
          buttonLabel="edit"
          icon={EmailIcon}
        />
        <SettingsMenuItem
          settingName="Location"
          currentValue={"Helsinki"}
          buttonLabel="edit"
          icon={LocationOnIcon}
        />
        <SettingsMenuItem
          settingName="Password"
          buttonLabel="edit"
          icon={KeyIcon}
        />
        <SettingsMenuItem
          settingName="Spoken languages"
          currentValue={user?.email}
          buttonLabel="edit"
          icon={LanguageIcon}
        />
        <SettingsMenuItem
          settingName="Theme colour"
          currentValue={user?.email}
          buttonLabel="edit"
          icon={PaletteIcon}
        />
        <SettingsMenuItem
          settingName="Sign out"
          buttonLabel="Sign out"
          onClickFunction={handleSignOut}
          icon={LogoutIcon}
        />
      </List>
    </Box>
  );
};

export default ProfileSettings;
