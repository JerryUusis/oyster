import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setVisibility } from "../store/alertSlice";
import { RootState } from "../store/store";

const AlertHandler = () => {
  const alert = useSelector((state: RootState) => state.alert);
  const { isVisible, message, severity } = alert;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isVisible) {
      const timeOutId = setTimeout(() => {
        dispatch(setVisibility(false));
      }, 3500);
      return () => clearTimeout(timeOutId);
    }
  }, [isVisible]);

  return (
    <Fade in={isVisible} timeout={250}>
      <Alert
        severity={severity}
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "5",
        }}
        onClick={() => dispatch(setVisibility(false))}
        variant="filled"
        data-testid="alert-handler"
      >
        {message}
      </Alert>
    </Fade>
  );
};

export default AlertHandler;
