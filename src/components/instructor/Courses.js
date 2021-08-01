import React from 'react';
import {useQuery} from "@apollo/client";
import {GET_INSTRUCTOR_COURSES} from "../../graphql/query";
import {toggleSpinner} from "../../redux/actions/spinnerActions";
import {useDispatch} from "react-redux";
import Typography from "@material-ui/core/Typography";
import CourseTable from "../CourseTable";
import {showToaster} from "../../redux/actions/ToasterActions";
import {ERROR_TYPE} from "../../appConstants";

const columns = [
    {id: 'course_name', label: 'Course Name'},
    {id: 'prerequisites', label: 'Prerequisites'},
    {id: 'duration', label: 'Duration'},
    {id: 'number_of_students', label: "Number of Students"}
];

const Courses = () => {
    const dispatch = useDispatch();
    const {loading, error, data} = useQuery(GET_INSTRUCTOR_COURSES);
    let filteredInstructorCourses = [];

    if (loading) {
        dispatch(toggleSpinner());
    }

    if (error) {
        dispatch(showToaster(error.message, ERROR_TYPE))
        dispatch(toggleSpinner());
    }

    if (data) {
        dispatch(toggleSpinner());
        filteredInstructorCourses = data.instructorCourses.map((instructorCourse) => {
            return {
                instructor_course_id: instructorCourse.id,
                course_id:  instructorCourse.course.id,
                course_name: instructorCourse.course.name,
                number_of_students: instructorCourse.course.numberOfStudents,
                    ...instructorCourse.course
            }
        });
    }

    return (
        <>
            <Typography variant="h6" color="secondary">
                My Courses
            </Typography>
            <CourseTable columns={columns} rows={filteredInstructorCourses}/>
        </>
    )
}

export default Courses;
