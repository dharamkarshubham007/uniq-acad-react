import React from 'react';
import {Container} from "@material-ui/core";
import AvailableCourses from "./student/AvailableCourses";
import EnrolledCourses from "./student/EnrolledCourses";

const StudentHome = () => {
    return (
        <Container>
            <AvailableCourses/>
            <br/>
            <br/>
            <EnrolledCourses/>
        </Container>
    )
};

export default StudentHome;