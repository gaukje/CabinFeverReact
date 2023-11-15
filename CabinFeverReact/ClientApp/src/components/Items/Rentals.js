import React, { useEffect, useState } from 'react';
import ItemCard from '../Layout/ItemCard';
import { ItemService } from './../services/ItemService';

const Rentals = () => {
    const [location, setLocation] = useState('');
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        ItemService.getItems().then(items => {
            console.log('Items hentet fra databasen:', items);
        }).catch(error => {
            console.error('Det oppsto en feil ved henting av items:', error);
        });
    }, []); // Tomt avhengighetsarray sikrer at dette kjører kun én gang ved mount


    useEffect(() => {
        // Simulate fetching items from an API
        fetchItems()
            .then((data) => {
                setItems(data);
                setFilteredItems(data);
            });
    }, []);

    const fetchItems = async () => {
        // Replace this with your actual API call to fetch items


        // Hardkodet hytter. Må slettes etterhvert
        return [
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
            // Add more items here
        ];
    };

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

    return (
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
                            <option value="Møre og Romsdal">Møre og Romsdal</option>
                            <option value="Nordland">Nordland</option>
                            <option value="Oslo">Oslo</option>
                            <option value="Rogaland">Rogaland</option>
                            <option value="Troms og Finnmark">Troms og Finnmark</option>
                            <option value="Trøndelag">Trøndelag</option>
                            <option value="Vestfold og Telemark">Vestfold og Telemark</option>
                            <option value="Vestland">Vestland</option>
                            <option value="Viken">Viken</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                <div className="row row-cols-1 row-cols-md-3 g-4" id="itemContainer">
                    <p className="d-none" id="itemEmpty">
                        No items to display.
                    </p>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div className="item" data-location={item.Location} key={item.Id}>
                                {/* Use the ItemCard component here */}
                                <ItemCard item={item} />
                            </div>
                        ))
                    ) : (
                        <p className="d-none" id="itemEmpty">
                            No items to display.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Rentals;
