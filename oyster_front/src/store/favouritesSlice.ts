import { createSlice } from "@reduxjs/toolkit";
import { getFavourites } from "../services/favouritesService";
import { AppDispatch } from "./store";

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: [],
  reducers: {
    setFavourites: (state, action) => action.payload,
  },
});

export const initializeFavourites = (uid: string) => {
  return async (dispatch: AppDispatch) => {
    const favourites = await getFavourites(uid);
    if (!favourites.data) {
      dispatch(setFavourites([]));
    } else {
      dispatch(setFavourites(favourites.data));
    }
  };
};

export const { setFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
