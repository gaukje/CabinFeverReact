// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Item from './components/Items/Item';
import './custom.css';

const App = () => {
    return (
        <div>
            <NavMenu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pages/about" element={<About />} />
                <Route path="/pages/contact" element={<Contact />} />
                <Route path="/Items/Item" element={<Item /> } />
                {/* Add more routes as needed */}
            </Routes>
        </div>
    );
};

export default App;
