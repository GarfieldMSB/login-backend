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
  List,
  ListItemText,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "../../hooks/useForm";
import nextId from "react-id-generator";
import "./LoginScreen.css";
import { startChecking, startRegister } from "../../actions/auth";
import { expressions } from "../../helpers/expressions";
import { Formik } from "formik";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

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

  const { checking } = useSelector(state => state.authReducer)

  const handleRegister = (e) => {
    e.preventDefault();

    if (!rEmail || !rName || !rLastname1 || !rPassword) {
      return Swal.fire("Error", "Debe llenar los campos", "error");
    }
    if (rEmail !== rRepeatEmail) {
      return Swal.fire("Error", "Los correos no son idénticos", "error");
    }
    if (rPassword !== rRepeatPass) {
      return Swal.fire("Error", "Las contraseñas no son identicas", "error");
    }

    dispatch(
      startRegister(navigate, uid, rName, rLastname1, rLastname2, rEmail, rPassword)
    );
    dispatch(startChecking())
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
            <Formik
              validate={() => {
                //Validaciones
                let errors = {};

                //Validación nombre
                if (!rName) {
                  errors.name = 'Por favor ingrese un nombre'
                } else if (!expressions.name.test(rName)) {
                  errors.name = 'El nombre solo puede contener letras y espacios'
                }

                //Validación apellido 1
                if (!rLastname1) {
                  errors.lastname1 = 'Por favor ingrese un apellido'
                } else if (!expressions.name.test(rLastname1)) {
                  errors.lastname1 = 'El apellido solo puede contener letras y espacios'
                }

                //Validación correo
                if (!rEmail) {
                  errors.email = 'Por favor ingrese un correo'
                } else if (!expressions.email.test(rEmail)) {
                  errors.email = 'El correo solo puede contener letras, números, puntos, guiones, y guión bajo'
                }
                if (!rRepeatEmail) {
                  errors.repeatEmail = 'Por favor ingrese un correo'
                }

                //Validación contraseña
                if (!rPassword) {
                  errors.password = 'Por favor ingrese una contraseña'
                }
                if (!rRepeatPass) {
                  errors.repeatPass = 'Por favor ingrese una contraseña'
                }

                return errors;
              }}
            >
              {({ errors, handleBlur }) => (
                <>
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
                        msg="Nombre obligatorio"
                        value={rName}
                        onChange={handleLoginInputChange}
                        onBlur={handleBlur}
                      />
                      {errors.name && <Typography variant="body2" sx={{ color: 'red' }}>{errors.name}</Typography>}
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
                        onBlur={handleBlur}
                      />
                      {errors.lastname1 && <Typography variant="body2" sx={{ color: 'red' }}>{errors.lastname1}</Typography>}
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
                        type='email'
                        margin="normal"
                        name="rEmail"
                        value={rEmail}
                        onChange={handleLoginInputChange}
                        onBlur={handleBlur}
                      />
                      {errors.email && <Typography variant="body2" sx={{ color: 'red' }}>{errors.email}</Typography>}
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
                        onBlur={handleBlur}
                      />
                      {errors.repeatEmail && <Typography variant="body2" sx={{ color: 'red' }}>{errors.repeatEmail}</Typography>}
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl sx={{ width: "100%" }} variant="outlined">
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
                          onBlur={handleBlur}
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
                        {errors.password && <Typography variant="body2" sx={{ color: 'red' }}>{errors.password}</Typography>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl sx={{ width: "100%" }} variant="outlined">
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
                          onBlur={handleBlur}
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
                        {errors.repeatPass && <Typography variant="body2" sx={{ color: 'red' }}>{errors.repeatPass}</Typography>}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <List>
                    <Typography variant="body1">La contraseña debe seguir las siguientes políticas:</Typography>
                    <div className="pass-conditions">
                      <ListItemText>6 a 15 digitos</ListItemText>
                      {/\w{6,15}/.test(rPassword) ? <CheckIcon sx={{ color: 'green' }} /> : <CloseIcon sx={{ color: 'red' }} />}
                    </div>
                    <div className="pass-conditions">
                      <ListItemText>Al menos una letra mayúscula</ListItemText>
                      {/[A-Z]/.test(rPassword) ? <CheckIcon sx={{ color: 'green' }} /> : <CloseIcon sx={{ color: 'red' }} />}
                    </div>
                    <div className="pass-conditions">
                      <ListItemText>Al menos una letra minucula</ListItemText>
                      {/\w[a-z]/.test(rPassword) ? <CheckIcon sx={{ color: 'green' }} /> : <CloseIcon sx={{ color: 'red' }} />}
                    </div>
                    <div className="pass-conditions">
                      <ListItemText>Al menos un dígito numérico</ListItemText>
                      {/\w(?=.*\d)/.test(rPassword) ? <CheckIcon sx={{ color: 'green' }} /> : <CloseIcon sx={{ color: 'red' }} />}
                    </div>
                    <div className="pass-conditions">
                      <ListItemText>No espacios en blanco</ListItemText>
                      {/^\S+$/.test(rPassword) ? <CheckIcon sx={{ color: 'green' }} /> : <CloseIcon sx={{ color: 'red' }} />}
                    </div>
                    <div className="pass-conditions">
                      <ListItemText>Al menos 1 caracter especial</ListItemText>
                      {/(?=.*[$@$!%*?&#.,])/.test(rPassword) ? <CheckIcon sx={{ color: 'green' }} /> : <CloseIcon sx={{ color: 'red' }} />}
                    </div>
                  </List>

                  <Link to="../login">
                    <Typography sx={{ margin: "10px" }} variant="body1">
                      ¿Ya se encuentra registrado? Click aquí
                    </Typography>
                  </Link>

                  {checking && <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '30px', marginTop: '30px' }}> <CircularProgress /> </Box>}

                  <div className="auth-button">
                    { }
                    <Button
                      onClick={handleRegister}
                      variant="contained"
                      color="success"
                      sx={{ p: "20 10%" }}
                      type="submit"
                    >
                      Registrar
                    </Button>
                  </div>
                </>
              )}

            </Formik>
          </Card>
        </Box>


      </div>
    </div >
  );
};
