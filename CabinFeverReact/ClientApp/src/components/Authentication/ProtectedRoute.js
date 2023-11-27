import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated()) {
        return <Navigate to="/Login" />;
    }

    return children;
};

export default ProtectedRoute;