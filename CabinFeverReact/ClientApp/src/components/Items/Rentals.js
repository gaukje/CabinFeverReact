import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import { ItemService } from '../services/ItemService';

//Rentals component
const Rentals = () => {
    // state for all items
    const [items, setItems] = useState([]);
    // state for items that match search
    const [filteredItems, setFilteredItems] = useState([]);
    // state for search term
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        // get items from service
        ItemService.getItems()
            .then(fetchedItems => {
                // get items array or empty array if not present
                const itemsArray = fetchedItems.$values || [];
                // log first item details for debugging
                console.log('Detailed properties:', JSON.stringify(itemsArray[0], null, 2));
                // set items in state
                setItems(itemsArray);
                // initially filtered items are same as all items
                setFilteredItems(itemsArray);
            })
            .catch(error => {
                console.error('Failed to fetch items:', error);
            });
    }, []);


    // filters items based on search term
    const filterItemsBySearchTerm = (searchTerm) => {
        // trim and lower case the search term
        const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
        // if no search term, return all items
        if (!lowerCaseSearchTerm) {
            return items;
        }

        // filter items where location includes search term
        const filtered = items.filter(item => {
            const itemLocation = item.Location?.trim().toLowerCase();
            return itemLocation?.includes(lowerCaseSearchTerm);
        });

        // return filtered list
        return filtered;
    };

    // handles change in search input
    const handleSearchChange = (e) => {
        // get new search term from event
        const newSearchTerm = e.target.value;
        // set new search term in state
        setSearchTerm(newSearchTerm);
        // get filtered items based on new search term
        const filtered = filterItemsBySearchTerm(newSearchTerm);
         // set filtered items in state
        setFilteredItems(filtered);
    };

    return(
        <div>
            <div className="banner-secondary">
                <div className="banner-secondary-container">
                    <img
                        src="/images/banners/pexels-photo-1724228.jpeg"
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
                            className="w-100"
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search for location"
                        />
                    </div>
                </div>
            </div>
           
            
            <div className="container my-5 pb-5">
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
