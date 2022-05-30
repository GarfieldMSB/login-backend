import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useId } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "../../hooks/useForm";
import  nextId  from "react-id-generator" ;
import "./LoginScreen.css";
import { startRegister } from "../../actions/auth";

export const RegisterScreen = () => {
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //Hook Formulario
  const [formLoginValues, handleLoginInputChange] = useForm({
    rName: "",
    rLastname1: "",
    rLastname2: "",
    rEmail: "",
    rRepeatEmail: "",
    rPassword: "",
    rRepeatPass: "",
  });
  /*
  const [formLoginValues, handleLoginInputChange] = useForm({
    rName: "Michelle",
    rLastname1: "Ibarra",
    rLastname2: "",
    rEmail: "michelle@gmail.com",
    rRepeatEmail: "michelle@gmail.com",
    rPassword: "123456",
    rRepeatPass: "123456",
  });
  */

  const {
    rName,
    rLastname1,
    rLastname2,
    rEmail,
    rRepeatEmail,
    rPassword,
    rRepeatPass,
  } = formLoginValues;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uid = nextId("user");

  const handleRegister = (e) => {
    e.preventDefault();

    if (rEmail !== rRepeatEmail) {
      return Swal.fire("Error", "Los correos no son idénticos");
    }
    if (rPassword !== rRepeatPass) {
      return Swal.fire("Error", "Las contraseñas no son identicas");
    }
    
    dispatch(
      startRegister(navigate, uid, rName, rLastname1, rLastname2, rEmail, rPassword)
    );
  };

  return (
    <div className="container">
      <div>
        <div className="auth-tittle">
          <Typography variant="h2" component="h2">
            Register
          </Typography>
        </div>
        <Box container>
          <Card className="card-container" sx={{ mb: 20 }}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 1 }}
            >
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  fullWidth
                  id="rName"
                  label="Nombre"
                  name="rName"
                  margin="normal"
                  value={rName}
                  onChange={handleLoginInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  fullWidth
                  id="rLastname1"
                  label="Primer Apellido"
                  margin="normal"
                  name="rLastname1"
                  value={rLastname1}
                  onChange={handleLoginInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  fullWidth
                  id="rLastname2"
                  label="Segundo Apellido"
                  margin="normal"
                  name="rLastname2"
                  value={rLastname2}
                  onChange={handleLoginInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Correo"
                  id="rEmail"
                  margin="normal"
                  name="rEmail"
                  value={rEmail}
                  onChange={handleLoginInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Repetir correo"
                  id="rRepeatEmail"
                  margin="normal"
                  name="rRepeatEmail"
                  value={rRepeatEmail}
                  onChange={handleLoginInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel htmlFor="outline d-adornment-password">
                  Contraseña
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  id="rPassword"
                  name="rPassword"
                  type={values.showPassword ? "text" : "password"}
                  value={rPassword}
                  onChange={handleLoginInputChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Contraseña"
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel htmlFor="outline d-adornment-password">
                  Repetir contraseña
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  id="rRepeatPass"
                  name="rRepeatPass"
                  type={values.showPassword ? "text" : "password"}
                  value={rRepeatPass}
                  onChange={handleLoginInputChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Contraseña"
                />
              </Grid>
            </Grid>

            <FormControl
              sx={{ width: "100%" }}
              variant="outlined"
            ></FormControl>
            <Link to="../login">
              <Typography sx={{ margin: "10px" }} variant="body1">
                ¿Ya se encuentra registrado? Click aquí
              </Typography>
            </Link>
            <div className="auth-button">
              <Button
                onClick={handleRegister}
                variant="contained"
                color="success"
                sx={{ p: "20 10%" }}
              >
                Registrar
              </Button>
            </div>
          </Card>
        </Box>
      </div>
    </div>
  );
};
