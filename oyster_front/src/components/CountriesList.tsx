import { useEffect } from "react";
import Box from "@mui/material/Box";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { initializeCountries } from "../store/countrySlice";
import CountryBlock from "./CountryBlock";

const CountriesList = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries);

  useEffect(() => {
    if (countries === null) {
      dispatch(initializeCountries());
    }
  }, [countries, dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      {countries?.map((country) => (
        <CountryBlock country={country} key={country.name.common} />
      ))}
    </Box>
  );
};

export default CountriesList;
