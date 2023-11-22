﻿import React, { useEffect, useState } from 'react';
import ItemCard from '../Layout/ItemCard';
import { ItemService } from './../services/ItemService';

const Rentals = () => {
    const [location, setLocation] = useState('');
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        ItemService.getItems()
            .then(itemsData => {
                console.log('Items hentet fra databasen:', itemsData);
                setItems(itemsData); // Update the items state with the fetched data
                setFilteredItems(itemsData);
            })
            .catch(error => {
                console.error('Det oppsto en feil ved henting av items:', error);
            });
    }, []);

    const handleLocationChange = (e) => {
        const selectedLocation = e.target.value;
        setLocation(selectedLocation);
        if (selectedLocation === 'All') {
            setFilteredItems(items);
        } else {
            const filtered = items.filter((item) => item.location === selectedLocation);
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
                    {filteredItems && filteredItems.length > 0 ? (
                        items.map((item) => (
                            <div className="item" data-location={item.location} key={item.id}>
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
