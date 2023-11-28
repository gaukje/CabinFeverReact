import React, { useEffect, useState } from 'react';
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
        <div className="container table-responsive">
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Price Per Night</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Actions</th>
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
                                <a style={{ color: '#007A6E' }}>Update</a>
                                <a style={{ color: '#007A6E' }}>Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemList;
