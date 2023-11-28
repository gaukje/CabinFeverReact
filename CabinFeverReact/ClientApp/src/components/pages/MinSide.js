import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import { OrderService } from '../services/OrderService';
import OrderHistory from '../Order/OrderHistory';
import ItemList from '../Items/ItemList';
import { getEmailFromToken } from '../../utils/authHelpers';

const MinSide = () => {
    const [orders, setOrders] = useState([]);
    const [userEmail, setUserEmail] = useState(null); // Legger til en tilstand for e-post
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const email = getEmailFromToken(token);
            setUserEmail(email); // Setter e-post tilstanden
            if (email) {
                OrderService.getUserOrders(email, token)
                    .then(fetchedOrders => {
                        const ordersArray = fetchedOrders.$values || fetchedOrders;
                        setOrders(ordersArray);
                    })
                    .catch(error => {
                        console.error('Failed to fetch orders:', error);
                    });
            }
        }
    }, [token]);

    console.log("Orders to display:", orders);

    // Resten av komponenten er uendret
    return (
        <>
            <div>
                <h1>Min Side</h1>
                <div>
                    {orders.length > 0 ? (
                        <OrderHistory orders={orders} />
                    ) : (
                        <p>Ingen ordre å vise.</p>
                    )}
                </div>
            </div>
            <div>
                <h1>Mine Items</h1>
                {userEmail && <ItemList userEmail={userEmail} />} {/* Sjekker om userEmail er tilgjengelig før rendering */}
            </div>
        </>
    );
};

export default MinSide;
