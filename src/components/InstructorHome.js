import React from 'react';
import {Container} from "@material-ui/core";
import {Route, Switch, useRouteMatch} from "react-router";
import Courses from "./instructor/Courses";
import CreateCourse from "./instructor/CreateCourse";

const InstructorHome = () => {
    const {path} = useRouteMatch();
    return (
        <>
            <Container>
                <Switch>
                    <Route path={`${path}/create-course`}>
                        <CreateCourse/>
                    </Route>
                    <Route path={`${path}`}>
                        <Courses/>
                    </Route>
                </Switch>
            </Container>
        </>
    )
};

export default InstructorHome;