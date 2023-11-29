import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { ItemService } from '../services/ItemService';

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        ItemService.getItems()
            .then(fetchedItems => {
                // Sjekker direkte om $values nøkkelen eksisterer og er et array
                if (fetchedItems && fetchedItems.$values && Array.isArray(fetchedItems.$values)) {
                    setItems(fetchedItems.$values);
                } else {
                    console.error('Received data is not in expected format:', fetchedItems);
                    setItems([]);
                }
            })
            .catch(error => {
                console.error('Failed to fetch items:', error);
                setItems([]);
            });
    }, []);
    return (
        <div className="table-responsive">
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th className="col-sm-1">Id</th>
                        <th className="col-sm-1">Name</th>
                        <th className="col-sm-1">Location</th>
                        <th className="col-sm-1">Price Per Night</th>
                        <th className="col-sm-2">Description</th>
                        <th className="col-sm-1">Image</th>
                        <th className="col-sm-1">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.ItemId}>
                            <td>{item.ItemId}</td>
                            <td>{item.Name}</td>
                            <td>{item.Location}</td>
                            <td>{`${item.Price} NOK`}</td>
                            <td className="item-description">{item.Description}</td>
                            <td>
                                <div className="ratio ratio-16x9">
                                    <img src={item.ImageUrl} alt={item.Name} />
                                </div>
                            </td>
                            <td>
                                {/* Link-komponentene må oppdateres til å jobbe med din router, for eksempel React Router */}
                                <a className="btn btn-primary m-1 w-100" href={`/Items/Edit/${item.ItemId}`}>Update</a>
                                <a className="btn btn-danger m-1 w-100" href={`/Items/Delete/${item.ItemId}`}>Delete</a>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemList;
