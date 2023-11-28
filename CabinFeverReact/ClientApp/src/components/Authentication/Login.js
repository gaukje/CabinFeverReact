import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const Login = () => {
    const { login } = useAuth();
    //const { setCurrentUser } = useAuth();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/User/Login', { userName, password });
            if (response.data.token) {
                console.log('Logged in successfully');
                login(response.data.token);
                navigate('/MinSide');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Incorrect e-mail address or password');
            // Handle login failure
        }
    };

    return (
        <div>
            <div
                className="vh-100"
                style={{
                    backgroundImage: "url('images/login_background.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >              
                <div className="row d-flex align-items-center vh-100">
                    <div className="row justify-content-center">
                        <div className="col-md-4 m-5 p-4 align-self-start text-center">
                            <h1 className="text-white">Welcome</h1>
                            <hr className="text-white" />
                            <p className="text-white">Here you can log in and see all your details as a guest or a host</p>
                            <div className="banner-link mb-3">
                                <a href="/register">Not a member yet? Become one!</a>
                            </div>
                        </div>

                        <div className="col-md-4 m-5 p-4 bg-light rounded">
                            <section>
                                <h1 className="text-center">Login</h1>
                                <hr />
                                <form onSubmit={handleSubmit}>
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
                                    <p><span className="text-danger" id="errorMessage">{errorMessage}</span></p>


                                    <button
                                        className="w-100 btn btn-lg btn-primary mb-2"
                                        type="submit"
                                    >
                                        Log in
                                    </button>
                                </form>
                            </section>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;
/*
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/User/Login', { email, password });
            localStorage.setItem('token', response.data.token); // Store the JWT token
            console.log('Logged in successfully');
            // Redirect to home page or dashboard
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login failure
        }
    };

    return (
        <div style={{ backgroundImage: "url('https://img.freepik.com/free-photo/wide-shot-brown-house-surrounded-by-forest-spruce-trees-clouds_181624-5123.jpg?w=1380')" }}>
            <div className="row d-flex justify-content-center mt-5">
                <div className="col-md-4 m-5 p-4 text-center">
                    <h1 className="text-white">Welcome</h1>
                    <hr className="text-white" />
                    <p className="text-white">Here you can log in and see all your details as a guest or a host</p>
                    <div className="banner-link mb-3">
                        <a href="/register">Not a member yet? Become one!</a>
                    </div>
                </div>

                <div className="col-md-4 m-5 p-4 bg-light rounded">
                    <section>
                        <form id="account" onSubmit={handleSubmit}>
                            <h1 className="text-center">Login</h1>
                            <hr />
                            <div className="form-floating mb-2">
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    autoComplete="username"
                                    aria-required="true"
                                />
                                <label>Email</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    aria-required="true"
                                />
                                <label>Password</label>
                            </div>
                            <div className="checkbox mb-2">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    Remember Me
                                </label>
                            </div>
                            <button type="submit" className="w-100 btn btn-lg btn-primary mb-2">Log in</button>
                            <div>
                                <p><a href="/forgot-password">Forgot your password?</a></p>
                                <p><a href="/resend-email-confirmation">Resend email confirmation</a></p>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Login;
*/