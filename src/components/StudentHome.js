import React from 'react';
import {Container} from "@material-ui/core";
import AvailableCourses from "./student/AvailableCourses";
import EnrolledCourses from "./student/EnrolledCourses";
import {Route, Switch, useRouteMatch} from "react-router";

const StudentHome = () => {
    const {path} = useRouteMatch();
    return (
        <>
            <Container>
                <Switch>
                    <Route exact path={`${path}/available-courses`}>
                        <AvailableCourses/>
                    </Route>
                    <Route path={`${path}`}>
                        <EnrolledCourses/>
                    </Route>
                </Switch>
            </Container>
        </>
    )
};

export default StudentHome;