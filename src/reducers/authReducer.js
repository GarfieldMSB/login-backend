import { types } from "../types/types";


const initialState = {
    checking: true
}


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.authStartLogin:
            return {
                checking: true,
            }
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false,

            }
        case types.authFinishLogin:
            return {
                checking: false,
            }
        case types.authStartRegister:
            return {
                checking: true,
            }
        case types.authRegister:
            return {
                ...state,
                ...action.payload,
                checking: true,
            }
        case types.authFinishRegister:
            return {
                checking: false,
            }

        case types.authChekingFinish:
            return {
                ...state,
                checking: false
            }
        case types.authLogout:
            return {
                checking: false
            }

        default:
            return state;
    }
}