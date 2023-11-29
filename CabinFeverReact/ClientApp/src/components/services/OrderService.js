import axios from 'axios';
import { Order } from '../../types/order.ts';

// Anta at backend API for ordre er tilgjengelig på /api/order
const baseUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/api/order`;
console.log("OrderService");

const getOrders = async () => {
    try {
        const response = await axios.get(`${baseUrl}/GetAll`);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

const createOrder = async (newOrder) => {
    try {
        const response = await axios.post(`${baseUrl}/Create`, newOrder);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};




const getDateRange = async (itemId) => {
    try {
        const response = await axios.get(`${baseUrl}/GetDateRange?itemId=${itemId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}


const getUserOrders = async (email, token) => {
    try {
        const response = await axios.get(`${baseUrl}/GetUserOrdersByEmail`, {
            headers: {
                Authorization: `Bearer ${token}` // Bruk token som er sendt som parameter
            },
            params: {
                email: email // Send e-postadressen som en parameter
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw error;
    }
};




const updateOrder = async (orderId, updatedOrder) => {
    // Implementer funksjonalitet for å oppdatere en eksisterende ordre
};

const deleteOrder = async (orderId) => {
    // Implementer funksjonalitet for å slette en ordre
};

export const OrderService = {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    getDateRange,
    getUserOrders,
};

