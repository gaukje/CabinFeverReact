// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Rentals from './components/Items/Rentals';
import ItemDetails from './components/Items/ItemDetails';
import ItemCreate from './components/Items/ItemCreate';
import ItemEdit from './components/Items/ItemEdit';
import ItemDelete from './components/Items/ItemDelete';
import MinSide from './components/pages/MinSide';
import './custom.css';
import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';
import Footer from './components/Items/Footer';
import ProtectedRoute from './components/Authentication/ProtectedRoute';
import { AuthProvider } from './AuthContext';
import OrderConfirmation from './components/Order/OrderConfirmation';


const App = () => {
    return (
        <AuthProvider>
            <div>
                <NavMenu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pages/about" element={<About />} />
                    <Route path="/pages/contact" element={<Contact />} />
                    <Route path="/Items/Rentals" element={<Rentals />} />

                    {<Route path="/Items/Details/:id" element={<ItemDetails />} />}
                    {<Route path="/Items/Create" element={<ProtectedRoute><ItemCreate /></ProtectedRoute>} />}
                    {<Route path="/Items/Edit/:id" element={<ProtectedRoute><ItemEdit /></ProtectedRoute>} />}
                    {<Route path="/Items/Delete/:id" element={<ProtectedRoute><ItemDelete /></ProtectedRoute>} />}

                    <Route path="Orders/Confirmation" element={<OrderConfirmation />} />

                    <Route path="/MinSide" element={<ProtectedRoute><MinSide /></ProtectedRoute>} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/Login" element={<Login />} />
                </Routes>
                <Footer />
            </div>
        </AuthProvider>
    );
};

export default App;
