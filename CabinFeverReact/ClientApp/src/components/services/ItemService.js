import axios from 'axios';
import { Item } from '../Items/item.ts';
const baseUrl = `${ window.location.protocol }//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/api/item`;
console.log("ItemService");
/*
function isValidItem(item) {
    return typeof item.id === 'number' &&
        typeof item.name === 'string' &&
        typeof item.pricePerNight === 'number' &&
        item.fromDate instanceof Date && // Checking if fromDate is a Date object
        item.toDate instanceof Date;     // Checking if toDate is a Date object
}

const getItems = async () => {
    try {
        const response = await axios.get(`${baseUrl}/GetAll`);
        if (!response.data.every(isValidItem)) {
            console.error('Invalid item structure:', response.data);
            throw new Error('Invalid item structure');
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};
*/
const getItems = async () => {
    try {
        const response = await axios.get(`${baseUrl}/GetAll`);
        return response.data;
         /*Hard-coded list of items
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
        */
        
    } catch (error) {
        // Handle error
        console.error('Error fetching items:', error);
        throw error;
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
