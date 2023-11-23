import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import { ItemService } from '../services/ItemService';


const Rentals = () => {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    
    useEffect(() => {
        ItemService.getItems()
            .then(fetchedItems => {
                console.log(fetchedItems)
                setItems(fetchedItems);
                setFilteredItems(fetchedItems); // Initially, all items are shown
            })
            .catch(error => {
                console.error('Failed to fetch items:', error);
                // Optionally, show an error message in the UI
            });
    }, []);
    
    const handleLocationChange = (e) => {
        const selectedLocation = e.target.value;
        setSelectedLocation(selectedLocation);
        const filtered = selectedLocation === 'All' ? items : items.filter(item => item.location === selectedLocation);
        setFilteredItems(filtered);
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
                        <select id="locationSearch" value={selectedLocation} onChange={handleLocationChange}>
                            <option value="" disabled hidden>
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
                    {filteredItems.length && filteredItems > 0 ? (
                        filteredItems.map(item => (
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
