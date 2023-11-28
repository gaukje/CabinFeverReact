import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleEmailValidation = (userName) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(userName);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!handleEmailValidation(userName)) {
            console.error('Invalid e-mail address');
            setErrorMessage('Invalid e-mail address');
            return;
        }

        if (password !== confirmPassword) {
            console.error('The passwords do not match');
            setErrorMessage('The passwords do not match');
            return;
        }

        try {
            const response = await axios.post('/api/User/Register', { userName, password });
            console.log(response.data);
            if (response.status === 200) {
                navigate('/Login');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            setErrorMessage('The password must contain an uppercase character, lowercase character, a digit, and a non-alphanumeric character. It must also be at least six characters long.')
        }
    };

    return (
        <div>
            {/* Banner */}
            <div className="banner-secondary">
                <div className="banner-secondary-container">
                    {/* Midlertidig */}
                    <img src="/images/login_background.jpg" id="banner-image" alt="Banner" />

                </div>
                <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-center position-absolute top-50 start-50 translate-middle">
                        <div className="text-center">
                            {/* The text */}
                            <h1 className="text-white">Register</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container my-5">
                <div class="row">
                    <div class="col-md-4">
                        <form onSubmit={handleSubmit}>
                            <h2>Create a new account</h2>
                            <hr />
                            <div className="form-floating mb-2">
                                <input
                                    className="form-control"
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)} />
                                <label for="floatingInput">E-mail address</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input
                                    className="form-control"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                                <label for="floatingInput">Password</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input
                                    className="form-control"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} />
                                <label for="floatingInput">Confirm password</label>
                            </div>
                            <p><span className="text-danger" id="errorMessage">{errorMessage}</span></p>

                            <button class="w-100 btn btn-lg btn-primary" type="submit">Register</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Register;