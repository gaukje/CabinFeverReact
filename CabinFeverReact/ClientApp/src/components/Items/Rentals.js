import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import { ItemService } from '../services/ItemService';


const Rentals = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        ItemService.getItems()
            .then(fetchedItems => {
                const itemsArray = fetchedItems.$values || [];
                console.log('Detailed properties:', JSON.stringify(itemsArray[0], null, 2)); // Burde vise de faktiske ""properties
                setItems(itemsArray);
                setFilteredItems(itemsArray);
            })
            .catch(error => {
                console.error('Failed to fetch items:', error);
            });
    }, []);


    const filterItemsBySearchTerm = (searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
        if (!lowerCaseSearchTerm) {
            return items;
        }

        const filtered = items.filter(item => {
            const itemLocation = item.Location?.trim().toLowerCase(); // Bruk Location (PascalCase)
            return itemLocation?.includes(lowerCaseSearchTerm);
        });

        return filtered;
    };

    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        const filtered = filterItemsBySearchTerm(newSearchTerm);
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
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search for location"
                        />
                    </div>
                </div>
            </div>
           
            
            <div className="container my-5">
                <div className="row row-cols-1 row-cols-md-3 g-4" id="itemContainer">
                    {filteredItems.length > 0 ? (
                        filteredItems.map(item => (
                            <div className="item" data-location={item.Location} key={item.ItemId}>
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
