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
        <div className="container my-4">
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
                    <h4>Cabin owned by: </h4>
                    {item.Capacity > 1 ? (
                        <p>{item.Capacity} guests</p>
                    ) : (
                        <p>{item.Capacity} guest</p>
                    )}
                    <hr className="hr hr-blurry" />

                    <p id="container-description">{item.Description}</p>
                </div>

            </div>
        </div>
    );
};

export default ItemDetails;
