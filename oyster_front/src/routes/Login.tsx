import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../services/firebaseAuthentication";
import { loginWithEmailAndPassword } from "../services/loginService";
import AlertHandler from "../components/AlertHandler";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../store/alertSlice";
import { RootState } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!email || !password) {
        return dispatch(
          setAlert({
            severity: "error",
            message: "Missing password or email",
          })
        );
      }
      const response = await loginWithEmailAndPassword(email, password);

      // Sign in with the custom token received from the backend
      const loginResult = await signInWithCustomToken(
        auth,
        response.customToken
      );

      // If custom token sign-in was succesful, store signed in user data and custom token in local storage
      if (loginResult.user) {
        const currentUser = { ...response };
        localStorage.setItem("loggedUser", JSON.stringify(currentUser));
        dispatch(setUser(currentUser));
      } else {
        throw new Error("Custom token sign-in failed");
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setAlert({ severity: "error", message: error.message }));
      }
      setPassword("");
    }
  };

  // Check if user is authenticated in Redux or local storage and redirect to user's profile page if uid exists
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      navigate(`../profile/${userObject.uid}`, { relative: "path" });
    } else if (user.uid) {
      navigate(`../profile/${user.uid}`, { relative: "path" });
    }
  }, [user]);

  return (
    <Box sx={{ display: "flex" }}>
      <AlertHandler />
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          height: "calc(100vh - 56px)",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Typography variant="h2">Login</Typography>
        <TextField
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button type="submit">Login</Button>
      </Box>
    </Box>
  );
};

export default Login;
