import axios from 'axios';
import { Order } from '../../types/order.ts';

// Base URL for the order API
const baseUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/api/order`;
console.log("OrderService");

// Function to get all orders
const getOrders = async () => {
    try {
        // Making a GET request to fetch all orders
        const response = await axios.get(`${baseUrl}/GetAll`);
        return response.data;
    } catch (error) {
       // Logging and throwing error if request fails
        console.error('Error fetching orders:', error);
        throw error;
    }
};
// Function to get date range for a specific item
const getDateRange = async (itemId) => {
    try {
       // Making a GET request to fetch date range for an item
        const response = await axios.get(`${baseUrl}/GetDateRange?itemId=${itemId}`);
        return response.data;
    } catch (error) {
        // Logging and throwing error if request fails
        console.error('Error fetching orders:', error);
        throw error;
    }
}
// Function to get orders for a specific user by email
const getUserOrders = async (email, token) => {
    try {
        // Making a GET request with authorization header
        const response = await axios.get(`${baseUrl}/GetUserOrdersByEmail`, {
            headers: {
                Authorization: `Bearer ${token}` // Setting authorization token in headers
            },
            params: {
                email: email // Passing email as a parameter
            }
        });
        return response.data;
    } catch (error) {
       // Logging and throwing error if request fails
        console.error('Error fetching user orders:', error);
        throw error;
    }
};

// Function to create a new order
const createOrder = async (newOrder) => {
    try {
       // Making a POST request to create a new order
        const response = await axios.post(`${baseUrl}/Create`, newOrder);
        return response.data;
    } catch (error) {
        // Logging and throwing error if request fails
        console.error('Error creating order:', error);
        throw error;
    }
};

// Exporting the order service functions
export const OrderService = {
    getOrders,
    createOrder,
    getDateRange,
    getUserOrders,
};

