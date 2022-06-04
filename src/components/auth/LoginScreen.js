import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { startChecking, startLogin } from "../../actions/auth";
import { expressions } from "../../helpers/expressions";
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
    lEmail: "",
    lPassword: "",
  });

  const { lEmail, lPassword } = formLoginValues;

  const dispatch = useDispatch();

  //Iniciar sesión
  const { checking } = useSelector(state => state.authReducer)

  const handleLogin = (e) => {
    e.preventDefault();

    if (!lEmail | !lPassword) {
      return Swal.fire("Error", "Debe llenar los campos", "error");
    }
    dispatch(startLogin(lEmail, lPassword));
    dispatch(startChecking())
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

          <Formik
            validate={() => {
              //Validaciones
              let errors = {};

              if (!lEmail) {
                errors.email = 'Debe ingresar un correo'
              }

              if (!lPassword) {
                errors.password = 'Debe ingresar una contraseña'
              } else if (!expressions.password.test(lPassword)) {
                errors.password = 'Debe ingresar una contraseña válida'
              }

              return errors;
            }}
          >
            {({ errors, handleBlur }) => (
              <form onSubmit={handleLogin}>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={{ xs: 1, sm: 2, md: 1 }}
                >
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Correo"
                      id="email"
                      margin="normal"
                      name="lEmail"
                      value={lEmail}
                      onChange={handleLoginInputChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && <Typography variant="body1" sx={{ color: 'red' }}>{errors.email}</Typography>}
                  </Grid>
                  
                  <Grid item xs={12}>
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
                        onBlur={handleBlur}
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
                      {errors.password && <Typography variant="body1" sx={{ color: 'red' }}>{errors.password}</Typography>}
                    </FormControl>
                  </Grid>

                  <Link to="../register">
                    <Typography sx={{ margin: '10px' }} variant="body2">¿No se encuentra registrado? Click aquí</Typography>
                  </Link>
                </Grid>

                {checking && <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '30px', marginTop: '30px' }}> <CircularProgress /> </Box>}

                <div className="auth-button">
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    sx={{ p: "20 10%" }}
                  >
                    Iniciar sesión
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
};
