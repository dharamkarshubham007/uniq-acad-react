import React from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {GET_ENROLLED_COURSES_OF_STUDENT} from "../../graphql/query";
import CourseTable from "../CourseTable";
import Typography from "@material-ui/core/Typography";
import {toggleSpinner} from "../../redux/actions/spinnerActions";
import {useDispatch} from "react-redux";
import {ENROLL_FOR_COURSE} from "../../graphql/mutations";

const columns = [
    {id: 'course_name', label: 'Course Name'},
    {id: 'instructor_name', label: 'Instructor'},
    {id: 'prerequisites', label: 'Prerequisites'},
    {id: 'duration', label: 'Duration'},
    {id: 'status', label: 'Status'}
];

const EnrolledCourses = () => {
    const dispatch = useDispatch();
    const {loading, error, data} = useQuery(GET_ENROLLED_COURSES_OF_STUDENT);
    let filteredEnrolledCourses = [];

    if (loading) {
        dispatch(toggleSpinner());
    }

    if (error) {
        dispatch(toggleSpinner());
    }

    if (data) {
        dispatch(toggleSpinner());
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

export default EnrolledCourses;