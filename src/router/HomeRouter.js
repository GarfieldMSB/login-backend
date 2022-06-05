import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { startLogout } from "../actions/auth";
import { HomeScreen } from "../components/home/HomeScreen";

export const HomeRouter = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout())
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              GarfieldCode
            </Typography>
            <Button
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <HomeScreen />

    </>
  );
};
