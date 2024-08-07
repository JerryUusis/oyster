import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ChangeEvent, useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithCustomToken,
} from "firebase/auth";
import { auth } from "../services/firebaseAuthentication";
import { loginWithIdToken } from "../services/loginService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
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
      console.error(error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
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
        <TextField label="Email" onChange={(e) => setEmail(e.target.value)} />
        <TextField
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </Box>
    </Box>
  );
};

export default Login;
