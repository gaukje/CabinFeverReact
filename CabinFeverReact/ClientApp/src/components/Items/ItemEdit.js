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
    // Initialize errors state here
    const [errors, setErrors] = useState({});


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

    const handleInvalid = (event) => {
        event.target.setCustomValidity('Please fill out this field.');
    };

    const handleInputChange = (event) => {
        event.target.setCustomValidity(''); // clear the custom validity message
        const { name, value } = event.target;
        setItem({ ...item, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {};
        if (!item.Name.trim()) newErrors.Name = 'Name is required.';
        if (!item.Price || item.Price <= 0) newErrors.Price = 'Price is required and must be greater than 0.';
        if (!item.Description.trim()) newErrors.Description = 'Description is required.';
        if (!item.Capacity || item.Capacity <= 0) newErrors.Capacity = 'Capacity is required and must be greater than 0.';

        if (Object.keys(newErrors).length > 0) {
            // If there are errors, update the errors state and do not submit
            setErrors(newErrors);
            return;
        }

        try {
            await ItemService.updateItem(id, item);
            console.log('Item updated successfully');
            navigate('/MinSide');
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div className="container my-4">
            <h2>Edit Item</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <label>Name</label><span className="text-danger">*</span>
                    <input
                        type="text"
                        name="Name"
                        value={item.Name}
                        onChange={handleInputChange}
                        onInvalid={handleInvalid}
                        className={`form-control ${errors.Name ? 'is-invalid' : ''}`}
                        required
                    />
                    {errors.Name && <div className="invalid-feedback">{errors.Name}</div>}
                    </div>
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
                
                <div className="form-group mb-2">
                    <label>Price per Night</label><span className="text-danger">*</span>
                    <input
                        type="number"
                        name="Price"
                        value={item.Price}
                        onChange={handleInputChange}
                        onInvalid={handleInvalid}
                        className={`form-control ${errors.Price ? 'is-invalid' : ''}`}
                        required
                    />
                    {errors.Price && <div className="invalid-feedback">{errors.Price}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Description</label><span className="text-danger">*</span>
                    <textarea
                        name="Description"
                        value={item.Description}
                        onChange={handleInputChange}
                        onInvalid={handleInvalid}
                        className={`form-control ${errors.Description ? 'is-invalid' : ''}`}
                        required
                    />
                    {errors.Description && <div className="invalid-feedback">{errors.Description}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Capacity</label><span className="text-danger">*</span>
                    <input
                        type="number"
                        name="Capacity"
                        value={item.Capacity}
                        onChange={handleInputChange}
                        onInvalid={handleInvalid}
                        className={`form-control ${errors.Capacity ? 'is-invalid' : ''}`}
                        required
                    />
                    {errors.Capacity && <div className="invalid-feedback">{errors.Capacity}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Update Item</button>

                <button onClick={() => navigate('/MinSide')} type="button" className="btn btn-secondary">
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default ItemEdit;
