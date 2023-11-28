import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const login = (token) => {
    localStorage.setItem('token', token);
    setCurrentUser({ ...currentUser, token }); // Update the current user with the token
};

const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
};

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    // Add methods to log in, log out, register, etc.

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

/*
import { AuthProvider } from './AuthContext'; // Adjust the path based on your file structure

const App = () => {
  return (
    <AuthProvider>
      { Rest of your app component }
    </AuthProvider >
  );
};

export default App;

Using useAuth Hook:

    You can now use the useAuth hook in any component to access the authentication state and functions.
    For example, in ProtectedRoute, you can use useAuth to determine if a user is authenticated.

javascript

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the path based on your file structure

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth();
    const isAuthenticated = currentUser != null;

    return (
        <Route {...rest} render={(props) => (
            isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
        )} />
    );
};

export default ProtectedRoute;

*/