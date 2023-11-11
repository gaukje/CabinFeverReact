// Home.js
import React from 'react';
import Banner from '../banner';
import Welcome from '../welcome';
import Carousel from '../carousel';

// Home.js
const Home = () => {
    // Mock data for testing
    const itemsList = [
        // Your item data here
    ];

    return (
        <div>
            <Banner />
            <Welcome />
            <Carousel itemsList={itemsList} /> {/* Pass the itemsList prop */}
            {/* Add more components as needed */}
        </div>
    );
};


export default Home;
