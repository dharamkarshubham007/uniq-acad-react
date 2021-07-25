import {SET_USER} from "../actionTypes";


export const setUserDetails = (payload) => {
    return {
        type: SET_USER,
        payload
    }
}