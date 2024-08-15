import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    alert: alertReducer,
    user: userReducer,
  },
});

// Types of the store dispatch actions
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
