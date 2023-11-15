import React from 'react';

const ItemCard = ({ item }) => {
    // Karusellen må ha pris, ellers blir denne brukt. Kan slettes etterhvert
    if (!item || typeof item.PricePerNight !== 'number') {
        return (
            <div className="col">
                <p>Error: Invalid item</p>
            </div>
        );
    }

    return (
        <div className="col">
            <div className="bg-white border border-dark-subtle rounded-3">
                <a href={`/item/details/${item.Id}`} className="ratio ratio-4x3">
                    <img
                        src={item.ImageUrl}
                        className="card-img-top img-fluid"
                        alt={item.Name}
                        id="itemcard-image"
                    />
                </a>
                <div>
                    <div className="d-flex justify-content-between pt-2 mx-2">
                        <div>
                            <b className="text-start">
                                <a href={`/item/details/${item.Id}`}>{item.Name}</a>
                            </b>
                            <p>{item.Location}</p>
                        </div>
                        <div>
                            <b className="text-end">
                                {item.PricePerNight.toFixed(2)} kr
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
