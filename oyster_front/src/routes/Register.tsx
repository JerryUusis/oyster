import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

const Register = () => {
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
      <Typography variant="h2" mb="1rem">Register</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap:"1rem"
        }}
      >
        <TextField label="Username" />
        <TextField label="Email" />
        <TextField label="Password" type="password" />
        <Typography>Already have an account? Go to <Link to="/login">login</Link>.</Typography>
      </Box>
    </Box>
  );
};

export default Register;
