import React from 'react';
import { useAuth } from '../../AuthContext';
import { Navigate } from 'react-router-dom';

// component to protect routes
const ProtectedRoute = ({ children }) => {
    // using auth context to check if user is authenticated and if it's loading
    const { isAuthenticated, loading } = useAuth();

     // if loading show loading message
    if (loading) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    // if not authenticated redirect to login
    if (!isAuthenticated()) {
        return <Navigate to="/Login" />;
    }

    // if authenticated, show the children components
    return children;
};

export default ProtectedRoute;
