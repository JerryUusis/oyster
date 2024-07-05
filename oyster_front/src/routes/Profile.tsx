import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LocationIcon from "../assets/location.svg?react";

const Profile = () => {
  const theme = useTheme().palette.oysterColors;
  return (
    <Box>
      <Box sx={{ backgroundColor: theme.pink, height: "1000px" }}>
        <Box sx={{ backgroundColor: theme.lightOlive, display: "flex" }}>
          <img
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTJ8fGZhY2V8ZW58MHx8MHx8fDI%3D"
            alt="user profile photo"
            style={{
              width: "100%",
              height: "375px",
              borderTopLeftRadius: "100%",
              borderTopRightRadius: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Typography
          variant="h1"
          sx={{ textAlign: "center", color: theme.darkBrown }}
        >
          User Name
        </Typography>
        <LocationIcon />
      </Box>
    </Box>
  );
};

export default Profile;
