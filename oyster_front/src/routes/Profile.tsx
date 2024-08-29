import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LocationIcon from "../assets/location.svg?react";
import CountryBlock from "../components/CountryBlock";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { initializeCountries } from "../store/countrySlice";

const Profile = () => {
  const dispatch: AppDispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.countries);

  useEffect(() => {
    if (countries === null) {
      dispatch(initializeCountries());
    }
  }, [countries, dispatch]);

  const user = useSelector((state: RootState) => state.user);
  const oysterTheme = useTheme().palette.oysterColors;
  const languagesArray = [
    "Finnish",
    "Swedish",
    "English",
    "German",
    "Estonian",
  ];

  const visitedCountries = [
    "Italy",
    "New Zealand",
    "Germany",
    "Austria",
    "Switzerland",
  ];

  return (
    <Box sx={{ backgroundColor: oysterTheme.gray, py: "1rem" }}>
      <Box
        sx={{
          backgroundColor: oysterTheme.pink,
          width: "100%",
        }}
      >
        <Box
          sx={{
            backgroundColor: oysterTheme.gray,
            display: "flex",
            pt: "1rem",
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
              <Typography sx={{ display: "inline" }} key={language}>
                {language},{" "}
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography sx={{ fontSize: "10rem" }}>15</Typography>
            <Typography variant="h3" textAlign={"center"}>
              Countries visited
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "0.5rem",
                flexDirection: "column",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {visitedCountries.map((country) => (
                <CountryBlock country={country} key={country}/>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: oysterTheme.pink,
          height: "175px",
          borderBottomLeftRadius: "175px",
          borderBottomRightRadius: "175px",
        }}
      ></Box>
    </Box>
  );
};

export default Profile;
