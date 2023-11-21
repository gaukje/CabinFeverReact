// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Rentals from './components/Items/Rentals';
import ItemDetails from './components/Items/ItemDetails';
import './custom.css';

const App = () => {
    return (
        <div>
            <NavMenu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pages/about" element={<About />} />
                <Route path="/pages/contact" element={<Contact />} />
                <Route path="/Items/Rentals" element={<Rentals />} />
                <Route path="/Items/ItemDetails/:id" element={<ItemDetails />} />
                {/* Add more routes as needed */}
            </Routes>
        </div>
    );
};

export default App;
