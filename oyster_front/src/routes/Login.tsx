import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithCustomToken,
} from "firebase/auth";
import { auth } from "../services/firebaseAuthentication";
import { loginWithIdToken } from "../services/loginService";
import AlertHandler from "../components/AlertHandler";
import { useDispatch } from "react-redux";
import { setAlert } from "../store/alertSlice";
import { FirebaseError } from "firebase/app";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!email || !password) {
        return dispatch(
          setAlert({
            severity: "error",
            message: "Missing password or email",
            isVisible: true,
          })
        );
      }
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken(); // https://firebase.google.com/docs/auth/users#auth_tokens
      const response = await loginWithIdToken(idToken);

      const loginResult = await signInWithCustomToken(
        auth,
        response.customToken
      ); // Sign in with the custom token received from the backend
      // If custom token sign-in was succesful, store signed in user data and custom token in local storage
      if (loginResult.user) {
        const currentUser = { ...response };
        localStorage.setItem("loggedUser", JSON.stringify(currentUser));
      } else {
        console.log("Custom token sign-in failed");
      }
    } catch (error) {
      // Handle errors if SignInWithEmailAndPassword fails
      if (error instanceof FirebaseError) {
        const errorMessage = handleLoginErrorMessages(error.code);
        dispatch(
          setAlert({
            severity: "error",
            message: errorMessage,
            isVisible: true,
          })
        );
      }
      setEmail("");
      setPassword("");
    }
  };

  // List of auth error codes https://firebase.google.com/docs/reference/js/auth#autherrorcodes
  const handleLoginErrorMessages = (errorCode: string): string => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "The email address is not valid";
      case "auth/user-not-found":
        return "No user found with this email";
      case "auth/wrong-password":
        return "The password is incorrect";
      case "auth/network-request-failed":
        return "Network error. Please check your internet connection and try again";
      default:
        return "An unknown error occurred. Please try again";
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
