import React, { useEffect, useState } from 'react';
import { ItemService } from './../services/ItemService';
import { useParams } from 'react-router-dom';

const ItemDetailsDescription = ({ item }) => {
    return (
        <div>
            <h4>Cabin owned by: </h4>
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
