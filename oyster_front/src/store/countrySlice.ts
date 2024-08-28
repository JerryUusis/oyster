import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { getCountries } from "../services/countriesService";
import { CountriesState } from "../utils/types";

const countrySlice = createSlice({
  name: "countries",
  initialState: null as CountriesState,
  reducers: {
    setCountries: (state, action) => action.payload,
  },
});

export const initializeCountries = () => {
  return async (dispatch: AppDispatch) => {
    const countries = await getCountries();
    dispatch(setCountries(countries));
  };
};

export const { setCountries } = countrySlice.actions;

export default countrySlice.reducer;
