﻿import React, { useState } from 'react';
import { ItemService } from './../services/ItemService';
import { useNavigate } from 'react-router-dom';

const ItemCreate = () => {
    const [item, setItem] = useState({
        Name: '',
        Location: '',
        PricePerNight: '',
        Capacity: 1, // Start with the minimum number of guests
        Description: '',
        CheckIn: '',
        CheckOut: '',
        Guests: 1,
    });
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setItem({ ...item, [name]: value });
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted, preparing FormData.');

        const formData = new FormData();
        Object.keys(item).forEach(key => formData.append(key, item[key]));

        if (selectedFile) {
            console.log('Appending file to FormData.');
            formData.append('file', selectedFile);
        }

        try {
            console.log('Sending data to the server...');
            const response = await ItemService.createItem(formData);
            console.log('Response received:', response);
            navigate('/Items/Rentals'); // Redirect to the list of items
        } catch (error) {
            console.error('Error creating item:', error);
            // Handle the error state appropriately in the UI
        }
    };


    return (
        <div className="container my-4">
            <h2 className="mb-3">Create New Item</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group mb-2">
                    <label>Name</label><span className="text-danger">*</span>
                    <input
                        name="Name"
                        value={item.Name}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
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
                    <label>Price per night</label><span className="text-danger">*</span>
                    <input
                        name="PricePerNight"
                        type="number"
                        value={item.PricePerNight}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-4">
                    <label>Description</label><span className="text-danger">*</span>
                    <textarea
                        name="Description"
                        value={item.Description}
                        onChange={handleInputChange}
                        className="form-control"
                        rows="5"
                        required
                    ></textarea>
                </div>
                <div className="form-group mb-4">
                    <label>Select an image to upload</label>
                    <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group mb-2">
                    <label>Check-In</label>
                    <input
                        type="date"
                        name="CheckIn"
                        value={item.CheckIn}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group mb-2">
                    <label>Checkout</label>
                    <input
                        type="date"
                        name="CheckOut"
                        value={item.CheckOut}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group mb-2">
                    <label>Guests</label>
                    <input
                        type="number"
                        name="Guests"
                        value={item.Guests}
                        onChange={handleInputChange}
                        className="form-control"
                        min="1" // Minimum value
                        max="10" // Set a maximum value if needed
                    />
                </div>

                <button type="submit" className="btn btn-primary">Create</button>
                <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">Cancel</button>
            </form>
        </div>
    );
};

export default ItemCreate;
