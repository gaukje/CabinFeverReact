import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ItemService } from './../services/ItemService';
import axios from 'axios';

// this is our item edit component
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

    // for navigating pages
    const navigate = useNavigate();
    // get item id from url
    const { id } = useParams();
    // state for form errors
    const [errors, setErrors] = useState({});

    // runs when component mounts or id changes
    useEffect(() => {
        // function to fetch item data
        const fetchItem = async () => {
            try {
                // call our service to get item
                const fetchedItem = await ItemService.getItemById(id);
                // set item in state
                setItem(fetchedItem);
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };

        // call the function
        fetchItem();
    }, [id]);

    // state for the selected file
    const [selectedFile, setSelectedFile] = useState(null);

    // handles when a file is selected
    const handleFileChange = async (event) => {
        // get the file from the event
        const file = event.target.files[0];
        // set the file in state
        setSelectedFile(file);

        // if no file, set validation message
        if (!file) {
            event.target.setCustomValidity('Please upload an image.');
        } else {
            // reset validation message
            event.target.setCustomValidity('');
            try {
                // Upload the file and get the URL, then update item state
                const imageUrl = await uploadImageAndGetUrl(file);
                // set the image url in item state
                setItem({ ...item, ImageUrl: imageUrl });
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    // uploads image and returns url

    const uploadImageAndGetUrl = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            // post request to upload image
            const uploadResponse = await axios.post('/api/item/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
             // return the image url
            return uploadResponse.data.imageUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    // sets custom validity message
    const handleInvalid = (event) => {
        event.target.setCustomValidity('Please fill out this field.');
    };

    // handles changes in input fields
    const handleInputChange = (event) => {
        // reset validation message
        event.target.setCustomValidity('');
        // get name and value from event
        const { name, value } = event.target;
         // update item state with new value
        setItem({ ...item, [name]: value });
    };

    // handles form submission

    const handleSubmit = async (event) => {
        // prevent default form behavior
        event.preventDefault();

        const newErrors = {};
        // validation checks
        if (!item.Name.trim()) newErrors.Name = 'Name is required.';
        if (!item.Price || item.Price <= 0) newErrors.Price = 'Price is required and must be greater than 0.';
        if (!item.Description.trim()) newErrors.Description = 'Description is required.';
        if (!item.Capacity || item.Capacity <= 0) newErrors.Capacity = 'Capacity is required and must be greater than 0.';

        // if there are errors, set them and stop
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // if file selected, upload it
        if (selectedFile) {
            try {
                const imageUrl = await uploadImageAndGetUrl(selectedFile);
                setItem({ ...item, ImageUrl: imageUrl });
            } catch (error) {
                console.error('Error uploading image:', error);
                return;
            }
        }

         // try updating the item
        try {
            await ItemService.updateItem(id, item);
            console.log('Item updated successfully');
            // navigate to MinSid
            navigate('/MinSide');
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div className="container col-lg-8 my-5">
            <h2 className="pt-3 mb-3">Edit Item</h2>
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
                            <option value="Vestland">Vestland</option>
                            <option value="Viken">Viken</option>
                        </select>
                    </div>
                
                <div className="form-group mb-2">
                    <label>Price per night</label><span className="text-danger">*</span>
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
                        rows="5"
                        required
                    />
                    {errors.Description && <div className="invalid-feedback">{errors.Description}</div>}
                </div>
                <div className="form-group mb-2">
                    <label>Select an image to upload</label>
                    <span className="text-danger">*</span>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group mb-4">
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
                <button type="submit" className="btn btn-primary">Update</button>

                <button onClick={() => navigate('/MinSide')} type="button" className="btn btn-secondary mx-1">
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default ItemEdit;
