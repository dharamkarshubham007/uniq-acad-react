import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const checkAuthentication = () => {
        return !!rest.user.token;
    }
    return (
        <Route {...rest} render={(props) => (
            checkAuthentication()
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