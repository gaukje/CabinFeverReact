import React, { createContext, useState, useEffect, useContext } from 'react';
import * as authHelpers from './utils/authHelpers';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Retrieved token:', token);
        if (token)
        {
            const userId = authHelpers.getUserIdFromToken(token);
            const email = authHelpers.getEmailFromToken(token);
            setCurrentUser({ token, userId, email });
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const userId = authHelpers.getUserIdFromToken(token);
        const email = authHelpers.getEmailFromToken(token);
        setCurrentUser({ token, userId, email });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
    };

    const isAuthenticated = () => {
        return currentUser != null;
    };

    return (
        <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

/*
import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const email = localStorage.getItem('email');
        if (token) {
            setCurrentUser({ token, userId, email });
        }
    }, []);

    // Oppdatert login-funksjon
    const login = (token, userId, email) => {
        console.log('Storing token and user details:', token, userId, email);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId); // Store userId in local storage
        localStorage.setItem('email', email); // Store email in local storage
        setCurrentUser({ token, userId, email });
    };


    const logout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
    };

    const isAuthenticated = () => {
        return currentUser != null;
    };

    return (
        <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
*/