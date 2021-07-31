import React from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {GET_AVAILABLE_COURSES_FOR_STUDENT} from "../../graphql/query";
import CourseTable from "../CourseTable";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {ENROLL_FOR_COURSE} from "../../graphql/mutations";
import {toggleSpinner} from "../../redux/actions/spinnerActions";
import {useDispatch} from "react-redux";

const columns = [
    {id: 'course_name', label: 'Course Name'},
    {id: 'instructor_name', label: 'Instructor'},
    {id: 'prerequisites', label: 'Prerequisites'},
    {id: 'duration', label: 'Duration'},
    {id: 'number_of_students', label: 'Number Of Students'},
    {id: 'actions', label: 'Actions'},
];

const AvailableCourses = () => {
    const {loading, error, data} = useQuery(GET_AVAILABLE_COURSES_FOR_STUDENT);
    const [enroll] = useMutation(ENROLL_FOR_COURSE);
    const dispatch = useDispatch();
    let filteredAvailableCourses = [];
    if(loading) {}
    if(error) {}

    const enrollForCourse = async (courseId) => {
        console.log(courseId);
        // try {
        //     dispatch(toggleSpinner());
        //     await enroll({
        //         variables: {
        //             courseId: parseInt(courseId)
        //         }
        //     })
        //
        //     dispatch(toggleSpinner());
        // } catch (e) {
        //     dispatch(toggleSpinner());
        // }
    }

    if(data) {
        filteredAvailableCourses = data.availableCoursesForStudent.map((course) => {
            return {
                student_course_id: course.id,
                status: course.status,
                course: {...course},
                course_name: course.name,
                prerequisites: course.prerequisites,
                duration: course.duration + 'hr',
                course_id: course.id,
                number_of_students: course.numberOfStudents,
                instructor: {...course.instructor.user},
                instructor_name: `${course.instructor.user.firstName} ${course.instructor.user.lastName}`,
                actions:  <Button variant="contained" color="secondary" onClick={() => enrollForCourse(course.id)}>Enroll</Button>
        }
        });
    }

    return (
        <>
            <Typography variant="h6" color="secondary">
                Available Courses
            </Typography>
            <CourseTable columns={columns} rows={filteredAvailableCourses} />
        </>
    )
}

export default AvailableCourses;