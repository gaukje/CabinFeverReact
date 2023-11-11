import React, { useState } from 'react';

const Rentals = () => {
    // Mock data for testing
    const itemsList = [
        // Your item data here
    ];

    // State for selected location
    const [selectedLocation, setSelectedLocation] = useState('');

    // Function to handle location search
    const handleLocationSearch = (e) => {
        const location = e.target.value;
        setSelectedLocation(location);
        searchLocation(location);
    };

    // Function to filter items by location
    const searchLocation = (location) => {
        const itemContainer = document.getElementById('itemContainer');
        const items = itemContainer.getElementsByClassName('item');

        // Hide all items
        Array.from(items).forEach((item) => {
            item.style.display = 'none';
        });

        // Show items based on the selected location
        if (location === 'All') {
            Array.from(items).forEach((item) => {
                item.style.display = 'block';
            });
        } else {
            const selectedItems = itemContainer.querySelectorAll(`[data-location="${location}"]`);
            Array.from(selectedItems).forEach((item) => {
                item.style.display = 'block';
            });
        }

        // If no items are visible after filtering, show the no items message
        const itemEmpty = document.getElementById('itemEmpty');
        itemEmpty.style.display = itemContainer.querySelectorAll('.item:visible').length === 0 ? 'block' : 'none';
    };

    return (
        <div>
            {/* Banner */}
            <div className="banner-secondary">
                {/* Your banner content */}
            </div>

            {/* Location search */}
            <div className="row">
                <div className="col-4 d-flex align-items-center justify-content-center position-absolute top-50 start-50 translate-middle mt-5">
                    <select id="locationSearch" onChange={handleLocationSearch}>
                        <option value="" selected disabled hidden>
                            Search by Location
                        </option>
                        <option value="All">All</option>
                        {/* Add other location options */}
                    </select>
                </div>
            </div>

            {/* Item container */}
            <div className="container my-5">
                <div className="row row-cols-1 row-cols-md-3 g-4" id="itemContainer">
                    <p className="d-none" id="itemEmpty">
                        No items to display.
                    </p>
                    {/* Map through itemsList and render items */}
                    {itemsList.map((item) => (
                        <div className="item" data-location={item.Location} key={item.Id}>
                            {/* Render your item card component here or use JSX directly */}
                            {/* <YourItemCardComponent item={item} /> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Rentals;
