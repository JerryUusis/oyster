import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../utils/types";

// State is either UserObject or null

const userSlice = createSlice({
  name: "user",
  initialState: null as UserState,
  reducers: {
    setUser: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
