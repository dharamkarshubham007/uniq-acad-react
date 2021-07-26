import React from 'react';
import {Container} from "@material-ui/core";
import AvailableCourses from "./student/AvailableCourses";
import EnrolledCourses from "./student/EnrolledCourses";
import {Route, Switch, useLocation, useRouteMatch} from "react-router";
import Navbar from "./Navbar";

const StudentHome = () => {
    const {path} = useRouteMatch();
    return (
        <>
            <Container>
                <Switch>
                    <Route path={`${path}student-dashboard/available-courses`}>
                        <AvailableCourses/>
                    </Route>
                    <Route path={`${path}student-dashboard`}>
                        <EnrolledCourses/>
                    </Route>
                </Switch>
            </Container>

        </>
    )
};

export default StudentHome;