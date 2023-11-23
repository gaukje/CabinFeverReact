// ItemCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
    if (!item) {
        return <div className="col">Item is undefined</div>;
    }

    const formattedPrice = new Intl.NumberFormat('no-NO', {
        style: 'currency',
        currency: 'NOK',
    }).format(item.pricePerNight);

    return (
        <div className="col">
            <div className="bg-white border border-dark-subtle rounded-3">
                <Link to={`/Item/Details/${item.ItemId}`}>
                    <div className="ratio ratio-4x3">
                        <img src={item.ImageUrl} className="card-img-top img-fluid" alt={item.Name} id="itemcard-image" />
                    </div>
                </Link>
                <div>
                    <div className="d-flex justify-content-between pt-2 mx-2">
                        <div>
                            <b className="text-start">
                                <Link to={`/Item/Details/${item.ItemId}`}>{item.Name}</Link>
                            </b>
                            <p>{item.Location}</p>
                        </div>
                        <div>
                            <b className="text-end">
                                {item.Price !== undefined ? item.Price.toFixed(2) : '0.00'} kr
                            </b>
                            <p className="text-end">per night</p>
                        </div>
                    </div>
                    <div className="mx-2">
                        <p className="text-truncate">{item.Description}</p>
                        <hr className="hr hr-blurry" />
                        <p className="bi bi-person">{item.Capacity}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;