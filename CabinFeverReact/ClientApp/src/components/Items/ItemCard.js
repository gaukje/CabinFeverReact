// ItemCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
    if (!item) {
        return <div className="col">Item is undefined</div>;
    }
    if (typeof item.pricePerNight !== 'number') {
        console.error('Invalid item price', item);
        return <div className="col">Invalid item price</div>;
    }

    return (
        <div className="col">
            <Link to={'/Items/itemDetails/${item.id}'}>
                <div className="bg-white border border-dark-subtle rounded-3">
                    <a href={`/item/details/${item.id}`} className="ratio ratio-4x3">
                        <img src={item.imageUrl} className="card-img-top img-fluid" alt={item.name} id="itemcard-image" />
                    </a>
                    <div>
                        <div className="d-flex justify-content-between pt-2 mx-2">
                            <div>
                                <b className="text-start">
                                    <a href={`/item/details/${item.id}`}>{item.name}</a>
                                </b>
                                <p>{item.location}</p>
                            </div>
                            <div>
                                <b className="text-end">{item.pricePerNight.toFixed(2) || '0.00'} kr</b>
                                <p className="text-end">per night</p>
                            </div>
                        </div>
                        <div className="mx-2">
                            <p className="text-truncate">{item.description}</p>
                            <hr className="hr hr-blurry" />
                            <p className="bi bi-person">{item.capacity}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ItemCard;