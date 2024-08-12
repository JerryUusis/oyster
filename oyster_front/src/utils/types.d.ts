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

interface AlertHandlerStateSelector {
  alert: AlertHandlerState;
}

export { NewUserObject, AlertHandlerState, AlertHandlerStateSelector };
