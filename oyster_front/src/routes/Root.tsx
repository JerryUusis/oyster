/// <reference types="vite-plugin-svgr/client" />
import Logo from "../assets/logo.svg?react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Box from "@mui/material/Box";

const Root = () => {
  return (
    <>
      <Header />
      {/* Offset the bottom menu bar */}
      {/* This has to implemented more dynamically in the future*/}
      <Box pb="56px" position={"relative"}>
        <Logo style={{ position: "absolute", top: 0, left: 0 }} />
        <Outlet />
      </Box>
    </>
  );
};

export default Root;
