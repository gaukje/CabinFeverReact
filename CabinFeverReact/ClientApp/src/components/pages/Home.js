// Home.js
import React from 'react';
import Banner from '../banner';
import Welcome from '../welcome';
import Carousel from '../carousel';


// Home.js
const Home = () => {
    // Mock data for testing
    const itemsList = [
        {
            title: "Oslomarka",
            imageUrl: "/images/hytte_stock_1.jpg", // Replace with actual image path
            description: "The most outstanding cabin in the heart of Norway."
        },
        {
            title: "Haugesund",
            imageUrl: "/images/hytte_stock_2.jpg", // Replace with actual image path
            description: "Nothing else like the coziest cabin in Haugesund perfect for a romantic get away."
        },
        {
            title: "Geilo",
            imageUrl: "/images/hytte_stock_3.jpg", // Replace with actual image path
            description: "Have an unforgettable night with the family in this memorable viking cabin."
        },
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
