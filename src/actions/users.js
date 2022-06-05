import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types";

export const userStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken("users/getUsers");
            const body = await resp.json();

            const users = body.usuarios;

            if(body.ok) {
                dispatch(userLoaded(users))
            }
        } catch (error) {
            console.log(error)
        }

    }
}

export const userStartDelete = () => {
    return async (dispatch, getState) => {
        
        const {id} = getState().userReducer.activeUser

        try {

            const resp = await fetchConToken(`users/${id}`, {}, 'DELETE');
            const body = await resp.json();

            if(body.ok){
                dispatch(userDeleted());
                
                Swal.fire("¡Buen trabajo!", body.msg, "success");
            }else {
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const userSetActive = (user) => ({
    type: types.userSetActive,
    payload: user,
})

const userDeleted = () => ({ type: types.userDeleted });

const userLoaded = (users) => ({
    type: types.userLoaded,
    payload: users
})