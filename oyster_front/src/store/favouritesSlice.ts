import { createSlice } from "@reduxjs/toolkit";
import { getFavourites } from "../services/favouritesService";
import { AppDispatch } from "./store";

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: [] as string[],
  reducers: {
    setFavourites: (_state, action) => {
      if (!action.payload) {
        return [];
      } else {
        return action.payload;
      }
    },
  },
});

export const initializeFavourites = (uid: string) => {
  return async (dispatch: AppDispatch) => {
    const favourites = await getFavourites(uid);
    if (!favourites?.data) {
      dispatch(setFavourites([]));
    } else {
      dispatch(setFavourites(favourites?.data));
    }
  };
};

export const { setFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
