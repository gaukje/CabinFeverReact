import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('token') != null;

    // Use isAuthenticated to determine if the user should be redirected or not

    return (
        <Route {...rest} render={(props) => (
            isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
        )} />
    );
};

export default ProtectedRoute;
