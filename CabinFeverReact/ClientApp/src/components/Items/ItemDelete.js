import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ItemService } from './../services/ItemService';

const ItemDelete = () => {
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams(); // Extracting id from URL

    const handleDelete = async () => {
        console.log(`Attempting to delete item with id: ${id}`);
        setIsDeleting(true);
        try {
            await ItemService.deleteItem(id);
            console.log('Item deleted successfully');
            navigate('/Items/Rentals');
        } catch (error) {
            console.error('Error deleting item:', error);
            setIsDeleting(false);
        }
    };

    return (
        <div className="container my-4">
            <h2>Are you sure you want to delete this item?</h2>
            <div className="d-flex justify-content-center">
                <button
                    onClick={handleDelete}
                    type="button" // Ensure this is set to 'button' if within a form
                    className="btn btn-danger me-2"
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
                <button
                    onClick={() => navigate(-1)}
                    type="button" // Same as above
                    className="btn btn-secondary"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ItemDelete;
