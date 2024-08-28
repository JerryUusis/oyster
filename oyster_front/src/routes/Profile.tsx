import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LocationIcon from "../assets/location.svg?react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user);
  const oysterTheme = useTheme().palette.oysterColors;
  const languagesArray = [
    "Finnish",
    "Swedish",
    "English",
    "German",
    "Estonian",
  ];

  return (
    <Box>
      <Box sx={{ backgroundColor: oysterTheme.pink, height: "1000px" }}>
        <Box
          sx={{
            backgroundColor: oysterTheme.gray,
            display: "flex",
          }}
        >
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box p="1rem">
            <Typography variant="h1" sx={{ textAlign: "center" }}>
              {user?.username}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "0.5rem", p: "1rem" }}>
            <LocationIcon />
            <Typography>City, Country</Typography>
          </Box>
          <Box>
            {languagesArray.map((language) => (
              <Typography sx={{ display: "inline" }}>{language}, </Typography>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "10rem" }}>15</Typography>
            <Typography variant="h3">Countries visited</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
