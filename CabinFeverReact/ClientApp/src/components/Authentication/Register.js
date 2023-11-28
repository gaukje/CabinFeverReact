import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== repeatPassword) {
            console.error("Passwords do not match");
            setErrorMessage('Passwords do not match');
            return;
        }


        try {
            const response = await axios.post('/api/User/Register', { userName, password });
            console.log(response.data);
            if (response.status === 200) {
                navigate('/Login');
            }
            // Handle success (redirect, show message, etc.)
        } catch (error) {
            console.error('Registration failed:', error);
            setErrorMessage('The password must contain an uppercase character, lowercase character, a digit, and a non-alphanumeric character. Passwords must also be at least six characters long.')
            // Handle error (show error message, etc.)
        }
    };

    return (
        <div>
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
                <input
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    placeholder="Repeat password"
                />
                <button type="submit">Register</button>
            </form>
            <p><span className="text-danger" id="errorMessage">{errorMessage}</span></p>
        </div>

    );
};

export default Register;