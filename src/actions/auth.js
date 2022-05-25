import { fetchSinToken, fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";


export const startLogin = (email, password) => {
    return async(dispatch) => {
        const resp = await fetchSinToken('auth/login', {email, password}, 'POST');
        const body = await resp.json();
        
        if(body.ok){
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-day', new Date().getTime())

            dispatch(login({
                uid: body.rut,
                name: body.name
            }))
        }
    }
}

export const startChecking = () => {
    return async(dispatch) => {
        const resp = await fetchConToken('auth/renew/');
        const body = await resp.json();
        
        if(body.ok){
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-day', new Date().getTime())

            dispatch(login({
                uid: body.rut,
                name: body.name
            }))
        } else {
            dispatch( checkingFinish() )
        }
    }
}

const checkingFinish = () => ({
    type: types.authChekingFinish
})

const login = (user) => ({
    type: types.authLogin,
    payload: user
})