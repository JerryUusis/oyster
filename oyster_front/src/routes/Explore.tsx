import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CountriesList from "../components/CountriesList";
import { useOysterPalette } from "../utils/theme/theme";
import { useEffect } from "react";
import { auth } from "../services/firebaseAuthentication";
import { initializeFavourites } from "../store/favouritesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { CountryObject } from "../utils/types";
import AlertHandler from "../components/AlertHandler";

const Explore = () => {
  const oysterPalette = useOysterPalette();
  const countries = useAppSelector(
    (state) => state.countries
  ) as CountryObject[];
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth.currentUser) {
      const asyncWrapper = async () => {
        return await dispatch(
          initializeFavourites(auth.currentUser?.uid as string)
        );
      };
      asyncWrapper();
    }
  }, []);

  return (
    <Box
      pt={"56px"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        backgroundColor: oysterPalette.lightPink,
        width: "100vw",
      }}
    >
      <AlertHandler />
      <Typography variant="h2">Explore</Typography>
      <CountriesList countriesArray={countries} />
    </Box>
  );
};

export default Explore;
