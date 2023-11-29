import React, { useEffect, useState } from 'react';
import { ItemService } from './../services/ItemService';

const ItemDetailsDescription = ({ item }) => {
    // State to store the owner's username
    const [owner, setOwner] = useState("");

    // useEffect to fetch the owner information when the component receives an item
    useEffect(() => {
        // Checks if item and item.ItemId are available
        if (item && item.ItemId) {
            // Calls the service to fetch the item with user information
            ItemService.getItemWithUser(item.ItemId)
                .then(response => {
                    // Splits the username at '@' and keeps only the part before '@'
                    const username = response.userName.split('@')[0];
                    // Updates the owner state with the filtered username
                    setOwner(username);
                })
                .catch(error => {
                    // Logs an error if fetching the item owner fails
                    console.error('Error fetching item owner:', error);
                });
        }
    }, [item]); // Dependency: item

    return (
        <div>
            {/* Displays the owner's username */}
            <h4>Cabin owned by: {owner}</h4>
            {/* Checks the capacity and displays the appropriate text */}
            {item.Capacity > 1 ? (
                <p>{item.Capacity} guests</p>
            ) : (
                <p>{item.Capacity} guest</p>
            )}
            <hr className="hr hr-blurry" />
            {/* Displays the description of the cabin */}
            <p id="container-description">{item.Description}</p>
        </div>
    );
};

export default ItemDetailsDescription;
