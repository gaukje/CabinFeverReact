import React, { useState, useEffect } from 'react';
import { ItemService } from './../services/ItemService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserIdFromToken } from '../../utils/authHelpers'; 

const ItemCreate = () => {
    const [item, setItem] = useState({
        Name: '',
        PricePerNight: '',
        Capacity: 1,
        Description: '',
        Location: '',
        ImageUrl: '',
        UserId: '',
        IsAvailable: true,
    });

    const setCustomValidityMessages = () => {
        // Select all required inputs and textareas
        const requiredFields = document.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            // Set the message for each required field
            field.oninvalid = function (e) {
                if (field.value === '') {
                    e.target.setCustomValidity('Please fill out this field');
                }
            };
            field.oninput = function (e) {
                // Clear custom validity message when the user starts typing
                e.target.setCustomValidity('');
            };
        });
    };

    useEffect(() => {
        // Set custom validation messages when the component mounts
        setCustomValidityMessages();

        // Also reset the custom validation for the file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
            fileInput.setCustomValidity('');
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userId = getUserIdFromToken(token);
            if (userId) {
                setItem(prevItem => ({ ...prevItem, UserId: userId })); // Set UserId
            }
        }
    }, []);

    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const newValue = event.target.type === 'number' ? Number(value) : value;

        if (name === "PricePerNight") {
            if (newValue <= 0) {
                event.target.setCustomValidity('Price must be greater than 0 ');
            } else {
                event.target.setCustomValidity(''); // Clear custom message for valid input
            }
        }

        if (name === "Capacity" && newValue < 1) {
            event.target.setCustomValidity('The value must be greater than or equal to 1.');
        } else {
            event.target.setCustomValidity(''); // Clear custom message for valid input
        }

        setItem({ ...item, [name]: newValue });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (!file) {
            // If no file is selected, set the custom validity message.
            event.target.setCustomValidity('Please upload an image.');
        } else {
            // If a file is selected, clear any custom validity messages.
            event.target.setCustomValidity('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Check if a file is selected and set custom validity before submitting
        const fileInput = document.querySelector('input[type="file"]');
        if (!selectedFile) {
            fileInput.setCustomValidity('Please upload an image.');
            fileInput.reportValidity(); // This will show the custom validation message
            return; // Prevent the form from submitting
        } else {
            fileInput.setCustomValidity(''); // Clear any custom message
        }

        let newItemData = { ...item };

        if (selectedFile) {
            try {
                // Upload the file and get the URL
                const imageUrl = await uploadImageAndGetUrl(selectedFile);
                newItemData.ImageUrl = imageUrl;
            } catch (error) {
                console.error('Error uploading image:', error);
                return;
            }
        }

        // Construct FormData to send to the server
        const formData = new FormData();
        for (const key in newItemData) {
            formData.append(key, newItemData[key]);
        }

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            // Send FormData to the server
            const response = await ItemService.createItem(formData);
            console.log('Item created:', response);
            navigate('/Items/Rentals');
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };

    const uploadImageAndGetUrl = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const uploadResponse = await axios.post('/api/item/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('uploadRespone.data.imageUrl: ', uploadResponse.data.imageUrl);
            // Assuming the server response contains the imageUrl field with the correct URL
            return uploadResponse.data.imageUrl; // or just "/images/..."
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error; // This will prevent further execution in the calling function
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
                        placeholder="0"
                        min="1"
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
                    <label>Select an image to upload</label><span className="text-danger">*</span>
                    <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
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
                        min="1" // Minimum value
                        max="10" // Set a maximum value if needed
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Create</button>
                <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">Cancel</button>
            </form>
        </div>
    );
};

export default ItemCreate;
