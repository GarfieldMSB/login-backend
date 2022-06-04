import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startLogout } from "../actions/auth";

export const HomeRouter = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout())
  }
  return (
    <>
      <div>HomeRouter</div>
      <div className="auth-button">
        <Button
          onClick={handleLogout}
          variant="contained"
          color="success"
          sx={{ p: "20 10%" }}
        >
          Salir
        </Button>
      </div>
    </>
  );
};
