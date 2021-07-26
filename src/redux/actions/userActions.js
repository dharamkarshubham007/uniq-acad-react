import {SET_USER, USER_LOGGED_OUT} from "../actionTypes";

export const setUserDetails = (payload) => {
    return {
        type: SET_USER,
        payload
    }
}

export const logout = () => {
    return {
        type: USER_LOGGED_OUT
    }
}