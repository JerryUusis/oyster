import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

const Profile = () => {
  const theme = useTheme().palette.oysterColors;
  return (
    <Box sx={{ backgroundColor: theme.pink }}>Profile</Box>
  );
};

export default Profile;
