// Home.js
import React, { useEffect, useState } from 'react';
import Banner from '../banner';
import Welcome from '../welcome';
import Carousel from '../carousel';
import { ItemService } from '../services/ItemService';


// Home.js
const Home = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        ItemService.getItems()
            .then(fetchedItems => {
                // Randomise the fetched list to simulate social media algorithm
                const itemsArray = (fetchedItems.$values || []).sort(() => Math.random() - 0.5);
                console.log('Detailed properties:', JSON.stringify(itemsArray[0], null, 2)); // Burde vise de faktiske ""properties
                setItems(itemsArray);
            })
            .catch(error => {
                console.error('Failed to fetch items:', error);
            });
    }, []);

    return (
        <div>
            <Banner />
            <Welcome />
            <Carousel itemsList={items} /> {/* Pass the itemsList prop */}
            {/* Add more components as needed */}
        </div>
    );
};


export default Home;
