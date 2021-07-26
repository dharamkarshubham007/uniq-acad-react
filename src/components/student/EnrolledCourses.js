import React from 'react';
import {useQuery} from "@apollo/client";
import {GET_ENROLLED_COURSES_OF_STUDENT} from "../../graphql/query";
import CourseTable from "../CourseTable";
import Typography from "@material-ui/core/Typography";
import {toggleSpinner} from "../../redux/actions/spinnerActions";
import {connect} from "react-redux";

const columns = [
    {id: 'course_name', label: 'Course Name'},
    {id: 'instructor_name', label: 'Instructor'},
    {id: 'prerequisites', label: 'Prerequisites'},
    {id: 'duration', label: 'Duration'},
    {id: 'status', label: 'Status'}
];

const EnrolledCourses = (props) => {
    const {loading, error, data} = useQuery(GET_ENROLLED_COURSES_OF_STUDENT);
    let filteredEnrolledCourses = [];

    if (loading) {
        props.toggleSpinner();
    }

    if (error) {
        props.toggleSpinner();
    }

    if (data) {
        props.toggleSpinner();
        filteredEnrolledCourses = data.studentEnrolledCourses.map((course) => {
            return {
                student_course_id: course.id,
                status: course.status,
                course: {...course.course},
                course_name: course.course.name,
                prerequisites: course.course.prerequisites,
                duration: course.course.duration + 'hr',
                course_id: course.course.id,
                instructor: {...course.course.instructor.user},
                instructor_name: `${course.course.instructor.user.firstName} ${course.course.instructor.user.lastName}`
            }
        });
    }

    return (
        <>
            <Typography variant="h6" color="secondary">
                Enrolled Courses
            </Typography>
            <CourseTable columns={columns} rows={filteredEnrolledCourses}/>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleSpinner: () => dispatch(toggleSpinner)
    }
}

export default connect(null, mapDispatchToProps)(EnrolledCourses);