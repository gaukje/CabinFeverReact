import React, { useEffect, useState } from 'react';
import { OrderService } from '../services/OrderService';

const MinSide = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        OrderService.getOrders()
            .then(fetchedOrders => {
                const ordersArray = fetchedOrders.$values || [];
                console.log('Orders:', JSON.stringify(ordersArray, null, 2)); // Skriver ut ordreinformasjonen
                setOrders(ordersArray);
            })
            .catch(error => {
                console.error('Failed to fetch orders:', error);
            });
    }, []);

    return (
        <div>
            <h1>Min Side</h1>
            <div>
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order.orderId}>
                            {/* Render detaljer for hver ordre, eksempel: */}
                            <p>Order ID: {order.orderId}</p>
                            {/* Legg til flere detaljer om ordren som du ønsker å vise */}
                        </div>
                    ))
                ) : (
                    <p>Ingen ordre å vise.</p>
                )}
            </div>
        </div>
    );
}

export default MinSide;
