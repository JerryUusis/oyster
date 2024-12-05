/// <reference types="vite-plugin-svgr/client" />
import Logo from "../assets/logo.svg?react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import { useAppSelector } from "../store/hooks";

const Root = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <>
      {user ? <Header /> : null}
      {/* Offset the bottom menu bar */}
      {/* This has to implemented more dynamically in the future*/}
      <Box pb={user ? "56px" : "0"} position={"relative"}>
        <Logo style={{ position: "absolute", top: 0, left: 0 }} />
        <Outlet />
      </Box>
    </>
  );
};

export default Root;
