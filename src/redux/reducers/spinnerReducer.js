import { TOGGLE_SPINNER } from '../actionTypes';

const initialState = {
    show: false
}

const spinnerReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SPINNER:
            return {
                show: !state.show,
            }
        default:
            return state;
    }
}
export default spinnerReducer;