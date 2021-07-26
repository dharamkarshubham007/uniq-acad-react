import {ADD_COURSE, ADD_COURSES} from '../actionTypes';

const initialState = {
    courses: []
}

const instructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COURSE:
            return {
                courses: [...state.courses, action.payload.course],
            }
        case ADD_COURSES:
            return {
                courses: [...action.payload.courses],
            }
        default:
            return state;
    }
}
export default instructorReducer;