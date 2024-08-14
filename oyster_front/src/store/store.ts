import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    alert: alertReducer,
    user: userReducer,
  },
});

export default store;
