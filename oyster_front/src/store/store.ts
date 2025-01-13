import { configureStore, combineReducers } from "@reduxjs/toolkit";
import alertReducer from "./alertSlice";
import userReducer from "./userSlice";
import countriesReducer from "./countrySlice";
import favouritesReducer from "./favouritesSlice";

const rootReducer = combineReducers({
  alert: alertReducer,
  user: userReducer,
  countries: countriesReducer,
  favourites: favouritesReducer,
});

const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

// Types of the store dispatch actions
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export default setupStore;
