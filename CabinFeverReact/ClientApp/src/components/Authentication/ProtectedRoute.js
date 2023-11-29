import React from 'react';
import { useAuth } from '../../AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    if (!isAuthenticated()) {
        return <Navigate to="/Login" />;
    }

    return children;
};

export default ProtectedRoute;
