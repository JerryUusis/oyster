import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Box from "@mui/material/Box";

const Root = () => {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
};

export default Root;
