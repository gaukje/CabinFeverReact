import axios from 'axios';

const baseUrl = '/api/item';

console.log("ItemService");

const getItems = async () => {
    try {
        // Hard-coded list of items
        const items = [
            {
                Id: 1,
                Name: 'Item 1',
                Location: 'Oslo',
                PricePerNight: 100,
                Description: 'Description for Item 1',
                Capacity: 2,
                ImageUrl: 'https://example.com/item1.jpg',
            },
            {
                Id: 2,
                Name: 'Item 2',
                Location: 'Agder',
                PricePerNight: 150,
                Description: 'Description for Item 2',
                Capacity: 4,
                ImageUrl: 'https://example.com/item2.jpg',
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
