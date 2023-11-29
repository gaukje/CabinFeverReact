import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { ItemService } from '../services/ItemService';

// item list component taking user email as prop
const ItemList = ({ userEmail }) => {
    // state for storing items
    const [items, setItems] = useState([]);
    // get token from local storage
    const token = localStorage.getItem('token');

    // effect runs when userEmail or token changes
    useEffect(() => {
        // check if we have both user email and token
        if (userEmail && token) {
            // call service to get user's items
            ItemService.getUserItems(userEmail, token)
                .then(fetchedItems => {
                    // if items are in expected format, set them to state
                    if (fetchedItems && fetchedItems.$values && Array.isArray(fetchedItems.$values)) {
                        setItems(fetchedItems.$values);
                        console.log('Items fetched for user:', fetchedItems.$values);
                    } else {
                        // log and handle unexpected response format
                        console.error('Unexpected response format:', fetchedItems);
                        setItems([]);
                    }
                })
                .catch(error => {
                    // log any errors and clear items
                    console.error('Error fetching items for user:', error);
                    setItems([]);
                });
        }
    }, [userEmail, token]);
    return (
        <div>
            {items.length === 0 ? (
                <p>No properties to display.</p>
            ) : (
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
                                        <a className="btn btn-primary m-1 w-100" href={`/Items/Edit/${item.ItemId}`}>Update</a>
                                        <a className="btn btn-danger m-1 w-100" href={`/Items/Delete/${item.ItemId}`}>Delete</a>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ItemList;
