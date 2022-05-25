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
import React from "react";
import { useDispatch } from "react-redux";
import { startLogin } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import "./LoginScreen.css";

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
    rRut: "1-9",
    rName: "Michelle",
    rLastname1: "Ibarra",
    rLastname2: "",
    rEmail: "michelle@gmail.com",
    rRepeatEmail: "michelle@gmail.com",
    rPassword: "123456",
    rRepeatPass: "123456",
  });
  const {
    rRut,
    rName,
    rLastname1,
    rLastname2,
    rEmail,
    rRepeatEmail,
    rPassword,
    rRepeatPass,
  } = formLoginValues;

  const dispatch = useDispatch();

  const handleRegister = (e) => {
    dispatch(startLogin(rEmail, rPassword));
  };

  return (
    <div className="container">
      <div>
        <div className="auth-tittle">
          <Typography variant="h2" component="h2">
            Register
          </Typography>
        </div>
        <Card className="card-container" sx={{ mb: 20 }}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 1 }}
          >
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="rRut"
                label="Rut"
                name="rRut"
                value={rRut}
                onChange={handleLoginInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="rName"
                label="Nombre"
                name="rName"
                value={rName}
                onChange={handleLoginInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="rLastname1"
                label="Primer Apellido"
                name="rLastname1"
                value={rLastname1}
                onChange={handleLoginInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="rLastname2"
                label="Segundo Apellido"
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
                name="lEmail"
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
                value={rEmail}
                onChange={handleLoginInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel htmlFor="outline d-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                fullWidth
                id="password"
                name="lPassword"
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
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
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
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
              />
            </Grid>
          </Grid>

          <FormControl sx={{ width: "100%" }} variant="outlined"></FormControl>
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
      </div>
    </div>
  );
};
