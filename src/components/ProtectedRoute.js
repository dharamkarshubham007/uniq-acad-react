import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from "react-redux";
import {INSTRUCTOR, STUDENT} from "../appConstants";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const checkAuthentication = () => {
        return !!rest.user.token;
    }

    const checkAuthorization = () => {
        console.log(rest.path);
        console.log(rest.user.user.role);
        if((rest.path == '/student-dashboard' && rest.user.user.role != STUDENT)) {
            return  false;
        } else if(rest.path == '/instructor-dashboard' && rest.user.user.role != INSTRUCTOR) {
            return false;
        }
        return true;
    }

    return (
        <Route {...rest} render={(props) => (
            (checkAuthentication() && checkAuthorization())
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(withRouter(ProtectedRoute));