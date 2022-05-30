import Swal from "sweetalert2";
import { fetchSinToken, fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startRegister = (
  navigate,
  name,
  lastname1,
  lastname2,
  email,
  password
) => {
  return async (dispatch) => {
    const uid = new Date().getTime();
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
      Swal.fire("¡Buen trabajo!", "Registrado", "success");
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startLogin = (email, password) => {
  return async (dispatch) => {
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

const checkingFinish = () => ({
  type: types.authChekingFinish,
});

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

const register = (user) => ({
  type: types.authStartRegister,
  payload: user,
});

export const startLogout = () => {
    return( dispatch ) => {
        localStorage.clear();
        dispatch( logout() )
    }
}

const logout = () => ({ type: types.authLogout })
