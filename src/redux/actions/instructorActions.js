import {ADD_COURSE, ADD_COURSES} from "../actionTypes";

export const addCourses = (courses) => {
    return {
        type: ADD_COURSES,
        payload: { courses }
    }
}

export const addCourse = (course) => {
    return {
        type: ADD_COURSE,
        payload: { course }
    }
}