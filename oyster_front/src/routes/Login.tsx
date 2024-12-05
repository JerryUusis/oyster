import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
import { auth } from "../services/firebaseAuthentication";
import {
  loginWithEmailAndPassword,
  verifyIdTokenInBackend,
} from "../services/loginService";
import AlertHandler from "../components/AlertHandler";
import { useAppDispatch } from "../store/hooks";
import { setAlert } from "../store/alertSlice";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/userSlice";
import { UserObject } from "../utils/types";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // If user is authenticated then redirect to profile page
  useEffect(() => {
    const getAuthState = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        navigate(`../profile/${firebaseUser.uid}`, { relative: "path" });
      }
    });
    return () => getAuthState();
  }, [navigate]);

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
      await signInWithCustomToken(auth, response.customToken);

      // Generate ID-token
      const idToken = await auth.currentUser?.getIdToken();

      // If ID-token is valid, verify ID-token in backend and store to Redux and local storage
      if (idToken) {
        const verifyResponse = await verifyIdTokenInBackend(idToken);
        if (verifyResponse) {
          const currentUser: UserObject = { ...verifyResponse.user };
          dispatch(setUser(currentUser));
          navigate(`../profile/${currentUser.uid}`, { relative: "path" });
        } else {
          throw new Error("ID token sign-in failed");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setAlert({ severity: "error", message: error.message }));
      }
      setPassword("");
    }
  };

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
        <Typography variant="h2" data-testid="login-header">
          Login
        </Typography>
        <TextField
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          inputProps={{ "data-testid": "login-email-input" }}
        />
        <TextField
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          inputProps={{ "data-testid": "login-password-input" }}
        />
        <Button type="submit" data-testid="login-button">
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
