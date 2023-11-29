import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import { OrderService } from '../services/OrderService';
import OrderHistory from '../Order/OrderHistory';
import ItemList from '../Items/ItemList';
import { getEmailFromToken } from '../../utils/authHelpers';
import ImageBanner from '../ImageBanner';


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
        <div>
            <ImageBanner imageSrc="https://img.freepik.com/free-photo/cozy-glow-illuminates-modern-winter-living-room-generated-by-ai_188544-16425.jpg?t=st=1701222483~exp=1701226083~hmac=b5506c865a039baaddc7529860ca82b1de03a28274cbefad745d4ef3639a4399&w=1800" titleText="My profile"></ImageBanner>

            <div className="container my-5">
                <div className="mb-5">
                    <h2>Your properties</h2>
                    {userEmail && <ItemList userEmail={userEmail} />} {/* Sjekker om userEmail er tilgjengelig før rendering */}
                </div>

                <div className="mb-5">
                    <h2 className="mb-3">Order history</h2>
                    {orders.length > 0 ? (
                        <OrderHistory orders={orders} />
                    ) : (
                        <p>Ingen ordre å vise.</p>
                    )}
                </div>
            </div>

            
        </div>
    );
};

export default MinSide;
