import {HIDE_TOASTER, SHOW_TOASTER} from "../actionTypes";

export const showToaster = (message, severity) => {
    return {
        type: SHOW_TOASTER,
        payload: {
            message: message,
            severity: severity
        }
    }
}

export const hideToaster = () => {
    return {
        type: HIDE_TOASTER
    }
}