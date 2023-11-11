// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import Home from './components/Home';
import './custom.css';

const App = () => {
    return (
        <div>
            <NavMenu />
            <Routes>
                <Route path="/" element={<Home />} />
                {/* Add more routes as needed */}
            </Routes>
        </div>
    );
};

export default App;
