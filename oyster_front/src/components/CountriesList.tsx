import { Box } from "@mui/material";
import CountryBlock from "./CountryBlock";
import { useOysterPalette } from "../utils/theme/theme";
import { CountryObject } from "../utils/types";

interface CountriesListProps {
  countriesArray: CountryObject[];
}

const CountriesList = ({ countriesArray }: CountriesListProps) => {
  const oysterPalette = useOysterPalette();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        width: "100vw",
        backgroundColor: oysterPalette.lightPink,
        pb: "2rem",
      }}
    >
      {countriesArray?.map((country) => (
        <CountryBlock country={country} key={country.name.common} />
      ))}
    </Box>
  );
};

export default CountriesList;
