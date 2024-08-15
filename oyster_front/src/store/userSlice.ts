import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { UserState, UserObject } from "../utils/types";

// State is either UserObject or null

const userSlice = createSlice({
  name: "user",
  initialState: null as UserState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const getUserFromLocalStorage = () => (dispatch: Dispatch) => {
  const userJSONString = localStorage.getItem("loggedUser");
  if (userJSONString) {
    const userObject: UserObject = JSON.parse(userJSONString);
    dispatch(setUser(userObject));
  }
};

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
