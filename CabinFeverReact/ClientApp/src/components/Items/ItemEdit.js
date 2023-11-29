import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ItemService } from './../services/ItemService';

const ItemEdit = () => {
    const [item, setItem] = useState({
        Name: '',
        Price: '',
        FromDate: '',
        ToDate: '',
        Capacity: 1,
        Description: '',
        Location: '',
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const fetchedItem = await ItemService.getItemById(id);
                setItem(fetchedItem);
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };

        fetchItem();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setItem({ ...item, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await ItemService.updateItem(id, item);
            console.log('Item updated successfully');
            navigate('/Items/Rentals');
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div className="container my-4">
            <h2>Edit Item</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <label>Name</label>
                    <input
                        name="Name"
                        value={item.Name}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    <div className="form-group mb-2">
                        <label>Location</label><span className="text-danger">*</span>
                        <select
                            name="Location"
                            value={item.Location}
                            onChange={handleInputChange}
                            className="form-select"
                            required
                        >
                            <option value="">Choose a location</option>
                            <option value="Agder">Agder</option>
                            <option value="Innlandet">Innlandet</option>
                            <option value="Møre og Romsdal">Møre og Romsdal</option>
                            <option value="Nordland">Nordland</option>
                            <option value="Oslo">Oslo</option>
                            <option value="Rogaland">Rogaland</option>
                            <option value="Troms og Finnmark">Troms og Finnmark</option>
                            <option value="Trøndelag">Trøndelag</option>
                            <option value="Vestfold og Telemark">Vestfold og Telemark</option>
                            <option value="Vestlandet">Vestlandet</option>
                            <option value="Viken">Viken</option>
                        </select>
                    </div>
                </div>
                <div className="form-group mb-2">
                    <label>Price per Night</label>
                    <input
                        type="number"
                        name="Price"
                        value={item.Price}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group mb-2">
                    <label>Description</label>
                    <textarea
                        name="Description"
                        value={item.Description}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group mb-2">
                    <label>Capacity</label>
                    <input
                        type="number"
                        name="Capacity"
                        value={item.Capacity}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Item</button>
            </form>
        </div>
    );
};

export default ItemEdit;
