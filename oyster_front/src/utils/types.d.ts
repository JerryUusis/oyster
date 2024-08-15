import { AlertColor } from "@mui/material";

interface NewUserObject {
  username: string;
  email: string;
  password: string;
}

interface AlertHandlerState {
  severity: AlertColor;
  message: string;
  isVisible: boolean;
}


interface RootState {
  alert: AlertHandlerState;
  user?: {
    uid: string;
    username: string;
    customToken: string;
    email:string;
  }
}

export { NewUserObject, AlertHandlerState, RootState };
