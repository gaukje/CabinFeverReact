import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageBanner from '../ImageBanner';


const Register = () => {
    // states for user input and error message
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // for navigation after registration
    const navigate = useNavigate();

   // function to validate email format
    const handleEmailValidation = (userName) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(userName);
    }

  // handle form submit for registration
    const handleSubmit = async (event) => {
        event.preventDefault();

        // validate email
        if (!handleEmailValidation(userName)) {
            console.error('Invalid e-mail address');
            setErrorMessage('Invalid e-mail address');
            return;
        }

        // check if passwords match
        if (password !== confirmPassword) {
            console.error('The passwords do not match');
            setErrorMessage('The passwords do not match');
            return;
        }

        try {
            // sending registration details to server
            const response = await axios.post('/api/User/Register', { userName, password });
            console.log(response.data);
            // navigate to login if successful
            if (response.status === 200) {
                navigate('/Login');
            }
        } catch (error) {
            // log error and set error message
            console.error('Registration failed:', error);
            setErrorMessage('The password must contain an uppercase character, lowercase character, a digit, and a non-alphanumeric character. It must also be at least six characters long.')
        }
    };

    return (
        <div>
            <ImageBanner imageSrc="/images/banners/wide-shot-brown-house-surrounded-by-forest-spruce-trees-clouds.jpg" titleText="Register"></ImageBanner>

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