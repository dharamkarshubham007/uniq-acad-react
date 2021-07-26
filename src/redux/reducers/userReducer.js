import {SET_USER} from '../actionTypes';

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : undefined
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                user: action.payload.user,
                token: action.payload.token
            }
        default:
            return state;
    }
}
export default userReducer;