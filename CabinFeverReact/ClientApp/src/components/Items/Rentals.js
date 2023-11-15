import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCard from '../Layout/ItemCard';

const Rentals = () => {
    const [location, setLocation] = useState('');
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        axios.get('/api/item') // Replace '/api/item' with your actual API endpoint
            .then(response => {
                const validItems = Array.isArray(response.data) ? response.data : [];
                setItems(validItems);
                setFilteredItems(validItems);
            })
            .catch(error => {
                console.error('Det oppsto en feil ved henting av items:', error);
                setItems([]); // Set the items state to an empty array on error
                setFilteredItems([]);
            });
    }, []); // Dependency array is empty to ensure this runs only once on mount

    const handleLocationChange = (e) => {
        const selectedLocation = e.target.value;
        setLocation(selectedLocation);
        if (selectedLocation === 'All') {
            setFilteredItems(items);
        } else {
            const filtered = items.filter((item) => item.Location === selectedLocation);
            setFilteredItems(filtered);
        }
    };

    return(
        <div>
            <div className="banner-secondary">
                <div className="banner-secondary-container">
                    <img
                        src="https://images.pexels.com/photos/1724228/pexels-photo-1724228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        id="banner-image"
                        alt="Banner Image"
                    />
                </div>
                <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-center position-absolute top-50 start-50 translate-middle">
                        <div className="text-center">
                            <h1 className="text-white">Rentals</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 d-flex align-items-center justify-content-center position-absolute top-50 start-50 translate-middle mt-5">
                        <select id="locationSearch" onChange={handleLocationChange}>
                            <option value="" selected disabled hidden>
                                Search by Location
                            </option>
                            <option value="All">All</option>
                            <option value="Agder">Agder</option>
                            <option value="Innlandet">Innlandet</option>
                            <option value="M�re og Romsdal">M�re og Romsdal</option>
                            <option value="Nordland">Nordland</option>
                            <option value="Oslo">Oslo</option>
                            <option value="Rogaland">Rogaland</option>
                            <option value="Troms og Finnmark">Troms og Finnmark</option>
                            <option value="Tr�ndelag">Tr�ndelag</option>
                            <option value="Vestfold og Telemark">Vestfold og Telemark</option>
                            <option value="Vestland">Vestland</option>
                            <option value="Viken">Viken</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                <div className="row row-cols-1 row-cols-md-3 g-4" id="itemContainer">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div className="item" data-location={item.Location} key={item.Id}>
                                <ItemCard item={item} />
                            </div>
                        ))
                    ) : (
                        <p>No items to display.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Rentals;
