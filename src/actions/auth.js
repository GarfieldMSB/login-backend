import Swal from "sweetalert2";
import { fetchSinToken, fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startRegister = (
  navigate,
  uid,
  name,
  lastname1,
  lastname2,
  email,
  password
) => {
  return async (dispatch) => {
    dispatch(startRegis());
    //const uid = new Date().getTime();
    const resp = await fetchSinToken(
      "auth/new",
      { uid, name, lastname1, lastname2, email, password },
      "POST"
    );
    const body = await resp.json();

    if (body.ok) {
      dispatch(
        register({
          uid: body.uid,
          name: body.name,
        })
      );
      navigate("login");
      dispatch(finishRegister())
      Swal.fire("¡Buen trabajo!", body.msg, "success");
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startLogin = (email, password) => {
  return async (dispatch) => {
    dispatch(startLog());
    const resp = await fetchSinToken("auth/login", { email, password }, "POST");
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
    
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken("auth/renew/");
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      dispatch(checkingFinish());
    }
  };
};



const startLog = () => ({
  type: types.authStartLogin,
});

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

const startRegis = () => ({
  type: types.authStartRegister,
})

const register = (user) => ({
  type: types.authRegister,
  payload: user,
});

const finishRegister = () => ({type: types.authFinishRegister})

const checkingFinish = () => ({
  type: types.authChekingFinish,
});

export const startLogout = () => {
    return( dispatch ) => {
        localStorage.clear();
        dispatch( logout() )
    }
}

const logout = () => ({ type: types.authLogout })
