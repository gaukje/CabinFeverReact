import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/User/Login', { userName, password });
            localStorage.setItem('token', response.data.token); // Store the JWT token
            console.log('Logged in successfully');
            // Redirect to home page or dashboard
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login failure
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
