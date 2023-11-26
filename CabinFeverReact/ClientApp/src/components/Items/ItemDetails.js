import React, { useEffect, useState } from 'react';
import { ItemService } from './../services/ItemService';
import { useParams } from 'react-router-dom';
import ItemDetailsDescription from './ItemDetailsDescription';
import ItemDetailsOrder from './ItemDetailsOrder';

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
        <div className="container my-4 pt-4">
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
