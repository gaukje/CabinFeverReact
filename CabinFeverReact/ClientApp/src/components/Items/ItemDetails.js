import React, { useEffect, useState } from 'react';
import { ItemService } from './../services/ItemService';
import { useParams } from 'react-router-dom';

const ItemDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        ItemService.getItemById(id)
            .then(data => {
                setItem(data);
            })
            .catch(error => {
                console.error('Error fetching item details:', error);
            });
    }, [id]);

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{item.name}</h1>
            {/* Display other details of the item */}
        </div>
    );
};

export default ItemDetails;
