import {HIDE_TOASTER, SHOW_TOASTER} from '../actionTypes';

const initialState = {
    show: false,
    message: '',
    severity: ''
}

const toasterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_TOASTER:
            return {
                show: true,
                ...action.payload
            }
        case HIDE_TOASTER:
            return {
                show: false,
                message: '',
                severity: ''
            }

        default:
            return state;
    }
}
export default toasterReducer;