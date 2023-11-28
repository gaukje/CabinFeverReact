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

const getDateRange = async (itemId) => {
    try {
        const response = await axios.get(`${baseUrl}/GetDateRange?itemId=${itemId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}

// Du kan legge til flere funksjoner for å håndtere oppretting, oppdatering og sletting av ordre
const createOrder = async (newOrder) => {
    try {
        const response = await axios.post(`${baseUrl}/Create`, newOrder);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

/*
const updateOrder = async (orderId, updatedOrder) => {
    try {
        const response = await axios.put(`${baseUrl}/Update/${orderId}`, updatedOrder);
        return response.data;
    } catch (error) {
        console.error('Error updating order:', error);
        throw error;
    }
};


const deleteOrder = async (orderId) => {
    try {
        const response = await axios.delete(`${baseUrl}/Delete/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting order:', error);
        throw error;
    }
};
*/

export const OrderService = {
    getOrders,
    createOrder,
    //updateOrder,
    //deleteOrder,
    getDateRange,
};
