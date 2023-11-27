import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/User/Login', { userName, password });
            localStorage.setItem('token', response.data.token); // Store the JWT token
            console.log('Logged in successfully');
            // Redirect to home page or dashboard
            navigate('/MinSide');
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