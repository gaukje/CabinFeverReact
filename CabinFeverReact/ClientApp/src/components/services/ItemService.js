import axios from 'axios';

const baseUrl = '/api/item';

const getItems = async () => {
    try {
        const response = await axios.get(`${baseUrl}`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};

const createItem = async (newItem) => {
    try {
        const response = await axios.post(`${baseUrl}/create`, newItem);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};

const getItemById = async (itemId) => {
    try {
        const response = await axios.get(`${baseUrl}/${itemId}`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};

const updateItem = async (itemId, newItem) => {
    try {
        const response = await axios.put(`${baseUrl}/update/${itemId}`, newItem);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};

const deleteItem = async (itemId) => {
    try {
        const response = await axios.delete(`${baseUrl}/delete/${itemId}`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};

export const ItemService = {
    getItems,
    createItem,
    getItemById,
    updateItem,
    deleteItem,
};
