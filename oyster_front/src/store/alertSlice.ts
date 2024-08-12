import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertHandlerState } from "../utils/types";

const alertSlice = createSlice({
    name:"alert",
    initialState: {
        isVisible: false,
        message:"",
        severity: "success"
    } as AlertHandlerState,
    reducers: {
        // Expect the payload to be in the correctly typed format
        setAlert: (state, action) => {
            const {message, severity} = action.payload;
            state.isVisible = true;
            state.message = message;
            state.severity = severity;
        },
        setVisibility: (state, action) => {
            state.isVisible = action.payload;
        }
    }
})

export const { setAlert, setVisibility } = alertSlice.actions;
export default alertSlice.reducer;