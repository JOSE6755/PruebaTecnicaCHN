import React from "react";
import { AppBar, Toolbar, Tabs, Tab } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeToIndex = {
    "/": 0,
    "/clientes": 1,
    "/prestamos": 2,
  };

  const indexToRoute = {
    0: "/",
    1: "/clientes",
    2: "/prestamos",
  };

  const currentTab = routeToIndex[location.pathname] ?? 0;

  const handleChange = (event, newValue) => {
    navigate(indexToRoute[newValue]);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
        >
          <Tab label="Inicio" />
          <Tab label="Clientes" />
          <Tab label="Préstamos" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
