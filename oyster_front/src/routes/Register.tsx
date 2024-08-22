import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AlertHandler from "../components/AlertHandler";
import { Link } from "react-router-dom";
import { registerNewUser } from "../services/registerService";
import { useDispatch } from "react-redux";
import { setAlert } from "../store/alertSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!username || !email || !password) {
        return dispatch(
          setAlert({
            severity: "error",
            message: "Missing credential(s)",
          })
        );
      }
      await registerNewUser({ username, email, password });
      dispatch(
        setAlert({ severity: "success", message: "Registration succesful!" })
      );
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          setAlert({
            severity: "error",
            message: error.message,
          })
        );
      }
    }
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 56px)",
        width: "100vw",
      }}
    >
      <AlertHandler />
      <Typography variant="h2" mb="1rem" data-testid="register-header">
        Register
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          inputProps={{ "data-testid": "register-username-input" }}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          inputProps={{ "data-testid": "register-email-input" }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          inputProps={{ "data-testid": "register-password-input" }}
        />
        <Button type="submit" data-testid="register-button">
          Register
        </Button>
        <Typography>
          Already have an account? Go to <Link to="/login">login</Link>.
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
