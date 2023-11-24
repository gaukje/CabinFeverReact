import axios from 'axios';
import { Order } from '../../types/order.ts';

// Anta at backend API for ordre er tilgjengelig p� /api/order
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

// Du kan legge til flere funksjoner for � h�ndtere oppretting, oppdatering og sletting av ordre
const createOrder = async (newOrder) => {
    // Implementer funksjonalitet for � opprette en ny ordre
};

const updateOrder = async (orderId, updatedOrder) => {
    // Implementer funksjonalitet for � oppdatere en eksisterende ordre
};

const deleteOrder = async (orderId) => {
    // Implementer funksjonalitet for � slette en ordre
};

export const OrderService = {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
};
