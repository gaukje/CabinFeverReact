import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import { OrderService } from '../services/OrderService';
import OrderHistory from '../Order/OrderHistory'; // Import the OrderHistory component
import { getEmailFromToken } from '../../utils/authHelpers'

const MinSide = () => {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const email = getEmailFromToken(token);
            OrderService.getUserOrders(email, token)
                .then(fetchedOrders => {
                    // Sjekk om ordredataen inneholder $values nøkkel
                    const ordersArray = fetchedOrders.$values || fetchedOrders;
                    setOrders(ordersArray);
                })
                .catch(error => {
                    console.error('Failed to fetch orders:', error);
                });
        }
    }, [token]);

    console.log("Orders to display:", orders);

    return (
        <div>
            <h1>Min Side</h1>
            <div>
                {orders.length > 0 ? (
                    <OrderHistory orders={orders} /> // Send ordre til OrderHistory komponent
                ) : (
                    <p>Ingen ordre å vise.</p>
                )}
            </div>
        </div>
    );
};

export default MinSide;

