﻿import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ItemService } from './../services/ItemService';

const ItemDelete = () => {
    // states for deletion status and item
    const [isDeleting, setIsDeleting] = useState(false);
    const [item, setItem] = useState(null);
    // for navigation after delete
    const navigate = useNavigate();
    // getting id from params
    const { id } = useParams();

    // effect to fetch item on component load
    useEffect(() => {
        const fetchItem = async () => {
            try {
                // fetching item by id
                const fetchedItem = await ItemService.getItemById(id);
                setItem(fetchedItem);
            } catch (error) {
                // logging error if fetch fails
                console.error('Error fetching item:', error);
            }
        };

        fetchItem();
    }, [id]);

    // handle delete action
    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            // deleting the item
            await ItemService.deleteItem(id);
            navigate('/MinSide');
        } catch (error) {
            // logging error and stop deleting state
            console.error('Error deleting item:', error);
            setIsDeleting(false);
        }
    };

    // if item not loaded yet -> show loading
    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container col-lg-8 my-5">
            <h2 className="pt-3 mb-3">Are you sure you want to delete this item?</h2>
            <div>

                <p><strong>Name:</strong> {item.Name}</p>
                <p><strong>Price:</strong> {item.Price}</p>
                <p><strong>Description:</strong> {item.Description}</p>

            </div>
            <div className="d-flex">
                <button onClick={handleDelete} type="button" className="btn btn-danger" disabled={isDeleting}>
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
                <button onClick={() => navigate('/MinSide')} type="button" className="btn btn-secondary mx-1">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ItemDelete;
