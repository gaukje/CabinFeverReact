import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/User/Register', { userName, password });
            console.log(response.data);
            // Handle success (redirect, show message, etc.)
        } catch (error) {
            console.error('Registration failed:', error);
            // Handle error (show error message, etc.)
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
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
