import axios from 'axios';
import { Item } from '../Items/item.ts';
const baseUrl = `${ window.location.protocol }//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/api/item`;
console.log("ItemService");

const getItems = async () => {
    try {
        const response = await axios.get(`${baseUrl}/GetAll`);
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

const createItem = async (newItem) => {
    try {
        const response = await axios.post(`${baseUrl}/Create`, newItem);
        return response.data;
    } catch (error) {
        console.error('Error creating item:', error);
        throw error;
    }
};

const getItemById = async (itemId) => {
    try {
        const response = await axios.get(`${baseUrl}/${itemId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const updateItem = async (itemId, newItem) => {
    try {
        const response = await axios.put(`${baseUrl}/update/${itemId}`, newItem);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const deleteItem = async (itemId) => {
    try {
        const response = await axios.delete(`${baseUrl}/delete/${itemId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const uploadImage = async (formData) => {
    try {
        const response = await axios.post(`${baseUrl}/Upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

const getUserItems = async (userEmail, token) => {
    try {
        const response = await axios.get(`${baseUrl}/GetUserItems`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: { email: userEmail }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

export const ItemService = {
    getItems,
    createItem,
    getItemById,
    updateItem,
    deleteItem,
    uploadImage,
    getUserItems,
};
