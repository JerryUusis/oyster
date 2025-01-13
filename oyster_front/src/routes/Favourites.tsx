import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useOysterPalette } from "../utils/theme/theme";
import { useAppSelector } from "../store/hooks";
import { CountryObject } from "../utils/types";
import CountriesList from "../components/CountriesList";
import AlertHandler from "../components/AlertHandler";

const Favourites = () => {
  const oysterPalette = useOysterPalette();
  const favourites = useAppSelector((state) => state.favourites);
  const countries = useAppSelector(
    (state) => state.countries
  ) as CountryObject[];

  // Return favourites as a set of CountryObjects and use with <CountriesList /> country prop
  const getFavouriteCountriesData = (
    countriesArray: CountryObject[],
    favouritesArray: string[]
  ) => {
    const favouritesSet = new Set(favouritesArray);
    return countriesArray.filter((country) =>
      favouritesSet.has(country.name.common)
    );
  };

  const favouriteCountriesData: CountryObject[] = getFavouriteCountriesData(
    countries,
    favourites
  );

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
        minHeight: "calc(100vh - 56px)",
      }}
    >
      <AlertHandler />
      <Typography variant="h2">Favourites</Typography>
      <CountriesList countriesArray={favouriteCountriesData} />
    </Box>
  );
};

export default Favourites;
