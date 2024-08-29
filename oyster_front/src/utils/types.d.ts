import { AlertColor } from "@mui/material";

interface NewUserObject {
  username: string;
  email: string;
  password: string;
}

// Used with Redux state
interface UserObject {
  uid: string;
  username: string;
  email: string;
  customToken: string;
}

type UserState = UserObject | null

interface AlertHandlerState {
  severity: AlertColor;
  message: string;
  isVisible: boolean;
}

type CountriesState = object[] | null

export { NewUserObject, UserObject, AlertHandlerState, UserState, CountriesState };
