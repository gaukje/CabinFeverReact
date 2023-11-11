// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import Home from './components/Home';
import './custom.css';

const App = () => {
    return (
        <Router>
            <NavMenu />
            <Routes>
                <Route path="/" element={<Home />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;
