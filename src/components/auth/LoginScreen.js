import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startLogin } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import "./LoginScreen.css";

export const LoginScreen = () => {
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
    lEmail: "michelle@gmail.com",
    lPassword: "123456",
  });
  const { lEmail, lPassword } = formLoginValues;

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(lEmail, lPassword));
  };

  return (
    <div className="container">
      <div>
        <div className="auth-tittle">
          <Typography variant="h2" component="h2">
            Login
          </Typography>
        </div>
        <Card className="card-container" sx={{ mb: 20 }}>
          <TextField
            fullWidth
            label="Correo"
            id="email"
            margin="normal"
            name="lEmail"
            value={lEmail}
            onChange={handleLoginInputChange}
          />

          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outline d-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              name="lPassword"
              type={values.showPassword ? "text" : "password"}
              value={lPassword}
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
          </FormControl>
          <Link to="../register">
            <Typography sx={{margin: '10px'}} variant="body1">¿No se encuentra registrado? Click aquí</Typography>
          </Link>
          
          <div className="auth-button">
            <Button
              onClick={handleLogin}
              variant="contained"
              color="success"
              sx={{ p: "20 10%" }}
            >
              Iniciar sesión
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
