import axios from 'axios';

const baseUrl = '/api/item';

console.log("ItemService");

const getItems = async () => {
    try {
        // Hard-coded list of items
        const items = [
            {
                id: 1,
                name: 'Item 1',
                location: 'Oslo',
                pricePerNight: 100,
                description: 'Description for Item 1',
                capacity: 2,
                imageUrl: '/images/hytte_stock_1.jpg',
            },
            {
                id: 2,
                name: 'Item 2',
                location: 'Agder',
                pricePerNight: 150,
                description: 'Description for Item 2',
                capacity: 4,
                imageUrl: '/images/hytte_stock_2.jpg',
            },
        ];

        return items;
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
