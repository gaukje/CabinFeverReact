import React, { createContext, useState, useEffect, useContext } from 'react';
import * as authHelpers from './utils/authHelpers';

// Creating a context for authentication
export const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component for auth context
export const AuthProvider = ({ children }) => {
        // State for current user and loading status
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state

    // Effect to check token in local storage and update user state
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
           // Decoding the token to get user details
            const userId = authHelpers.getUserIdFromToken(token);
            const email = authHelpers.getEmailFromToken(token);
            setCurrentUser({ token, userId, email });
        }
        setLoading(false); // Set loading to false after checking the token
    }, []);

    // Function to handle login
    const login = (token) => {
        // Storing token in local storage and updating user state
        localStorage.setItem('token', token);
        const userId = authHelpers.getUserIdFromToken(token);
        const email = authHelpers.getEmailFromToken(token);
        setCurrentUser({ token, userId, email });
    };
    // Functio to handle logout
    const logout = () => {
        // Removing token from local storage and resetting user state
        localStorage.removeItem('token');
        setCurrentUser(null);
    };

    // Function to check if user is authenticated
    const isAuthenticated = () => {
        return currentUser != null;
    };

    // Providing the auth context with user and auth functions
    return (
        <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout, loading }}>
            {!loading && children} {/* Render children only when not loading */}
        </AuthContext.Provider>
    );
};