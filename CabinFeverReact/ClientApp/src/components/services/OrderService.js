import axios from 'axios';
import { Order } from '../../types/order.ts';

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
                Authorization: `Bearer ${token}`
            },
            params: {
                email: email
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user orders:', error);
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

export const OrderService = {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    getDateRange,
    getUserOrders,
};

