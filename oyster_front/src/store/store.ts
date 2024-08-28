import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlice";
import userReducer from "./userSlice";
import countriesReducer from "./countrySlice"

const store = configureStore({
  reducer: {
    alert: alertReducer,
    user: userReducer,
    countries: countriesReducer
  },
});

// Types of the store dispatch actions
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
