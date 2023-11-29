import React, { useEffect, useState } from 'react';
import { ItemService } from './../services/ItemService';
import { useParams } from 'react-router-dom';
import ItemDetailsDescription from './ItemDetailsDescription';
import ItemDetailsOrder from './ItemDetailsOrder';

const ItemDetails = () => {
    // getting id from url parameters
    const { id } = useParams();
    // state for storing item details
    const [item, setItem] = useState(null);

    // effect to fetch item details when component loads
    useEffect(() => {
        // calling item service to get item by id
        ItemService.getItemById(id)
            .then(data => {
                // setting item details to state
                setItem(data);
            })
            .catch(error => {
                // logging error if fetching item fails
                console.error('Error fetching item details:', error);
            });
    }, [id]);

    // if item not loaded yet -->show loading
    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container my-4 pt-4 pb-5">
            <div className="row mb-4">
                <h2>{item.Name}</h2>
                <p><strong>Location:</strong> {item.Location}</p>
                <div className="container">
                    <div className="ratio ratio-16x9">
                        <img src={item.ImageUrl} alt={item.Name} className="img-fluid rounded" id="itemcard-image" />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-8">
                    <ItemDetailsDescription item={item} />
                </div>

                <div class="col-lg-4">
                    <ItemDetailsOrder item={item} />
                </div>
            </div>

        </div>
    );
};

export default ItemDetails;
