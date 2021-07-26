import React from 'react';
import {useQuery} from "@apollo/client";
import {GET_ENROLLED_COURSES_OF_STUDENT, GET_INSTRUCTOR_COURSES} from "../../graphql/query";
import {toggleSpinner} from "../../redux/actions/spinnerActions";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import CourseTable from "../CourseTable";

const columns = [
    {id: 'course_name', label: 'Course Name'},
    {id: 'prerequisites', label: 'Prerequisites'},
    {id: 'duration', label: 'Duration'},
    {id: 'number_of_students', label: "Number of Students"}
];
const Courses = (props) => {

    const {loading, error, data} = useQuery(GET_INSTRUCTOR_COURSES);
    let filteredInstructorCourses = [];

    if (loading) {
        props.toggleSpinner();
    }

    if (error) {
        props.toggleSpinner();
    }

    if (data) {
        props.toggleSpinner();
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

const mapDispatchToProps = (dispatch) => {
    return {
        toggleSpinner: () => dispatch(toggleSpinner)
    }
}

export default connect(null, mapDispatchToProps)(Courses);
