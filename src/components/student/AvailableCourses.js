import React from 'react';
import { useQuery} from "@apollo/client";
import {GET_AVAILABLE_COURSES_FOR_STUDENT} from "../../graphql/query";
import CourseTable from "../CourseTable";
import Typography from "@material-ui/core/Typography";

const columns = [
    {id: 'course_name', label: 'Course Name'},
    {id: 'instructor_name', label: 'Instructor'},
    {
        id: 'prerequisites',
        label: 'Prerequisites',
    },
    {
        id: 'duration',
        label: 'Duration',
    },
    {
        id: 'number_of_students',
        label: 'Number Of Students',
    },
    {
        id: 'actions',
        label: 'Actions',
    },
];
const AvailableCourses = () => {
    const {loading, error, data} = useQuery(GET_AVAILABLE_COURSES_FOR_STUDENT);
    let filteredAvailableCourses = [];
    if(loading) {}
    if(error) {}
    if(data) {
        console.log("availbale courses")
        console.log(data);
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
                instructor_name: `${course.instructor.user.firstName} ${course.instructor.user.lastName}`
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