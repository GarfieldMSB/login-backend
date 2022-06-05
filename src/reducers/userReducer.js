import { types } from "../types/types";

const initialState = {
    users: [],
    activeUser: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.userLoaded:
            return {
                ...state,
                users: [...action.payload]
            }

        case types.userSetActive:
            return {
                ...state,
                activeUser: action.payload
            }
        case types.userDeleted:
            return {
                ...state,
                users: state.users.filter(
                    e => (e.uid !== state.activeUser.id)
                ),
                activeUser: null
            }
        default:
            return state;
    }
}