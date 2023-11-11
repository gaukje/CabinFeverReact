// Home.js
import React from 'react';
import Banner from './Banner/banner';
import Welcome from './Welcome/welcome';
import Carousel from './Carousel/carousel';

const Home = () => {
    // Mock data for testing
    const itemsList = [
        // Your item data here
    ];

    return (
        <div>
            <Banner />
            <Welcome />
            <Carousel items={itemsList} />
            {/* Add more components as needed */}
        </div>
    );
};

export default Home;
