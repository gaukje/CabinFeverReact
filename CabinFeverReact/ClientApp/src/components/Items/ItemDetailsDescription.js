import React, { useEffect, useState } from 'react';
import { ItemService } from './../services/ItemService';

const ItemDetailsDescription = ({ item }) => {
    const [owner, setOwner] = useState("");

    useEffect(() => {
        if (item && item.ItemId) {
            ItemService.getItemWithUser(item.ItemId)
                .then(response => {
                    const username = response.userName.split('@')[0]; // Beholder kun delen før '@'
                    setOwner(username);
                })
                .catch(error => {
                    console.error('Error fetching item owner:', error);
                });
        }
    }, [item]);

    return (
        <div>
            <h4>Cabin owned by: {owner}</h4>
            {item.Capacity > 1 ? (
                <p>{item.Capacity} guests</p>
            ) : (
                <p>{item.Capacity} guest</p>
            )}
            <hr className="hr hr-blurry" />
            <p id="container-description">{item.Description}</p>
        </div>
    );
};

export default ItemDetailsDescription;
