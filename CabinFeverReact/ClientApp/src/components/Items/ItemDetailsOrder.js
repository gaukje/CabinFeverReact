import React, { useEffect, useState } from 'react';
import { ItemService } from './../services/ItemService';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { OrderService } from '../services/OrderService';
import { useAuth } from '../../AuthContext'; // Update the path accordingly

const ItemDetailsOrder = ({ item }) => {
    const [selectedFromDate, setSelectedFromDate] = useState('');
    const [selectedToDate, setSelectedToDate] = useState('');
    const [selectedGuests, setSelectedGuests] = useState('');

    const [timeDifference, setTimeDifference] = useState(0);

    const [costPerNight, setCostPerNight] = useState('')
    const [cleaningFee, setCleaningFee] = useState('');
    const [serviceFee, setServiceFee] = useState('');
    const [taxes, setTaxes] = useState('');
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalPriceString, setTotalPriceString] = useState('')

    const [showListReserve, setShowListReserve] = useState(false); // Initialize visibility state
    const [listReservedDates, setListReservedDates] = useState([]); // Initialize an empty array for reserved dates
    const [errorDateOverlap, setErrorDateOverlap] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    const { currentUser } = useAuth();

    const controllDate = (fromDate, toDate) => {
        const fromDateObj = new Date(fromDate);
        const toDateObj = new Date(toDate);

        console.log("fromDateObj", fromDateObj);
        console.log("toDateObj", toDateObj)

        // Initialize a flag to track overlap status
        let overlapFound = false;

        // Looping through the date range from "From"-date to "To"-date
        for (let currentDate = fromDateObj; currentDate <= toDateObj; currentDate.setDate(currentDate.getDate() + 1)) {
            // Converts the current date to a string in 'yyyy-mm-dd' format (same format as "listReserveDate")
            const currentDateStr = currentDate.toISOString().split('T')[0];

            // Checks if the current date is in the list of reserved dates
            if (listReservedDates.includes(currentDateStr)) {
                // Sets the overlap flag to true if an overlap is found
                overlapFound = true;
                // Exits the loop since an overlap has been detected
                break;
            }
        }

        // You can now use the 'overlapFound' variable to handle the overlap status as needed
        if (overlapFound) {
            // Handle overlap case
            console.log('Overlap found!');
            setErrorDateOverlap('Please choose alternative dates, as the selected dates are overlapping with existing reservations.'); // Set the error message
            setShowListReserve(false); // Show "listReserve" when changing "Checkout" date


        } else {
            // Handle non-overlap case
            console.log('No overlap found.');
            setErrorDateOverlap(''); // Clear the error message
            setShowListReserve(true); // Hide "listReserve" when changing "Checkout" date
        }
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('nb-NO', { style: 'currency', currency: 'NOK' }).replace('kr', '').trim() + " kr";
    }

    const handleIncrementGuests = () => {
        if (selectedGuests < item.Capacity) {
            setSelectedGuests(Number(selectedGuests) + 1);
        }
    };

    const handleDecrementGuests = () => {
        if (selectedGuests > 1) {
            setSelectedGuests(Number(selectedGuests) - 1);
        }
    };


    useEffect(() => {
        var price = item.Price;

        var pricePerNight = price * timeDifference;
        setCostPerNight(formatCurrency(pricePerNight));

        var cleaningFee = 400 + (price * 0.05);
        setCleaningFee(formatCurrency(cleaningFee));

        var serviceFee = pricePerNight * 0.10;
        setServiceFee(formatCurrency(serviceFee));

        var taxes = pricePerNight * 0.025;
        setTaxes(formatCurrency(taxes));

        var totalPrice = pricePerNight + cleaningFee + serviceFee + taxes;
        setTotalPrice(totalPrice.toFixed(2));
        setTotalPriceString(formatCurrency(totalPrice));

    }, [timeDifference]);

    useEffect(() => {
        const fromDateTimestamp = new Date(selectedFromDate).getTime();
        const toDateTimestamp = new Date(selectedToDate).getTime();

        console.log("FromDate:", fromDateTimestamp);
        console.log("ToDate:", toDateTimestamp);

        if (!isNaN(fromDateTimestamp) && !isNaN(toDateTimestamp) && fromDateTimestamp <= toDateTimestamp) {
            const timeDifference = Math.floor((toDateTimestamp - fromDateTimestamp) / (1000 * 3600 * 24));

            // Update the state with the calculated time difference
            setTimeDifference(timeDifference);
        }

    }, [selectedToDate]);


    useEffect(() => {
        // Initialize the attributes of the check-in calendar
        window.jQuery("#fromDate").datepicker({
            dateFormat: "yy-mm-dd",
            firstDay: 1,
            minDate: new Date(),
            beforeShowDay: function (date) {
                var dateString = window.jQuery.datepicker.formatDate('yy-mm-dd', date);
                return [listReservedDates.indexOf(dateString) === -1];
            },

            onSelect: function (fromDate) {
                console.log("Handle From Date called: ", fromDate);
                setSelectedFromDate(fromDate); // Update the selectedFromDate state

                // Calculate the validation for the checkout date by adding one day to the selected date from the check-in input
                var fromDateAddOneDay = new Date(new Date(fromDate).setDate(new Date(fromDate).getDate() + 1));

                window.jQuery("#toDate").datepicker("destroy");
                window.jQuery("#toDate").datepicker({
                    dateFormat: "yy-mm-dd",
                    firstDay: 1,
                    minDate: fromDateAddOneDay,
                    beforeShowDay: function (date) {
                        var dateString = window.jQuery.datepicker.formatDate('yy-mm-dd', date);
                        return [listReservedDates.indexOf(dateString) == -1]
                    },
                    onSelect: function (toDate) {
                        console.log("Handle To Date called: ", toDate);
                        setSelectedToDate(toDate); // Update the selectedFromDate state

                        // Call the controllDate function and check its result
                        controllDate(fromDate, toDate);
                    }
                });

                setSelectedToDate('');
                setShowListReserve(false); // Hide "listReserve" when changing "Check-In" date
            }
        });

        // Initialize the attributes of the checkout calendar
        window.jQuery("#toDate").datepicker({
            dateFormat: "yy-mm-dd",
            firstDay: 1,
            minDate: new Date(),
            beforeShowDay: function (date) {
                var dateString = window.jQuery.datepicker.formatDate('yy-mm-dd', date);
                return [listReservedDates.indexOf(dateString) === -1];
            }
        });
    }, [listReservedDates]);

    useEffect(() => {
        // Load the data you need first
        OrderService.getDateRange(item.ItemId)
            .then((fetchedItems) => {
                const dateArray = fetchedItems.$values || [];
                console.log('Detailed properties:', JSON.stringify(dateArray, null, 2));
                setListReservedDates(dateArray);
                setIsLoading(false); // Set isLoading to false once the data is loaded
            })
            .catch((error) => {
                console.error('Failed to fetch items:', error);
                setIsLoading(false); // Set isLoading to false in case of an error
            });
    }, []);

    // Render the component conditionally based on the isLoading state
    if (isLoading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner or any other loading indicator
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevents the default form submission

        // Create an order object based on your Order type
        const order = {
            UserId: currentUser?.UserId,
            ItemId: item.ItemId,
            FromDate: new Date(selectedFromDate),
            ToDate: new Date(selectedToDate),
            Guests: Number(selectedGuests),
            TotalPrice: Number(totalPrice),
        };

        try {
            // Call the createOrder function from OrderService
            const response = await OrderService.createOrder(order);
            console.log('Order created:', response);
            // Handle the response, e.g., redirecting the user or showing a success message
        } catch (error) {
            console.error('Error creating order:', error);
            // Handle the error, e.g., showing an error message to the user
        }
    };

    return (
        <div>
            <div className="bg-light border border-dark-subtle rounded-3 p-4">
                <div className="row mb-2">
                    <b>{formatCurrency(item.Price)} per night</b>
                </div>

                <form onSubmit={handleSubmit} id="reservationForm">
                    <input type="hidden" name="ItemId" value={item.ItemId} />
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="FromDate">Check-In</label>
                                <input
                                    name="FromDate"
                                    className="form-control"
                                    id="fromDate"
                                    min={new Date().toISOString().split('T')[0]}
                                    value={selectedFromDate}
                                    placeholder="Add dates"
                                    readOnly
                                />
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="ToDate">Checkout</label>
                                <input
                                    name="ToDate"
                                    className="form-control"
                                    id="toDate"
                                    min={new Date().toISOString().split('T')[0]}
                                    value={selectedToDate}
                                    placeholder="Add dates"
                                    readOnly
                                />
                                <span className="text-danger"></span>
                            </div>
                        </div>


                        <div className="row">
                            <div className="form-group">
                                <label htmlFor="Guests">Guests</label>
                                <div className="input-group">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={handleDecrementGuests}
                                    >
                                        <i class="bi bi-dash"></i>
                                    </button>
                                    <input
                                        name="Guests"
                                        type="number"
                                        className="form-control text-center"
                                        min="1"
                                        max={item.Capacity}
                                        value={selectedGuests}
                                        onChange={(e) => setSelectedGuests(e.target.value)}
                                        placeholder="Add guests"
                                        readOnly
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={handleIncrementGuests}
                                    >
                                        <i class="bi bi-plus-lg"></i>
                                    </button>
                                </div>
                                <span className="text-danger"></span>
                            </div>
                        </div>


                        <p><span className="text-danger" id="errorDateOverlap">{errorDateOverlap}</span></p>

                        <div className={`section mb-4 ${showListReserve ? "" : "d-none"}`} id="listReserve">
                            <div className="row">
                                <div className="col-7">
                                    <p>{formatCurrency(item.Price)} &#215; {timeDifference} {timeDifference > 1 ? 'nights' : 'night'}</p>
                                </div>
                                <div className="col-5 text-end">
                                    <p>{costPerNight}</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-7">
                                    <p>Cleaning fee</p>
                                </div>
                                <div className="col-5 text-end">
                                    <p>{cleaningFee}</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-7">
                                    <p>Service fee</p>
                                </div>
                                <div className="col-5 text-end">
                                    <p>{serviceFee}</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-7">
                                    <p>Taxes</p>
                                </div>
                                <div className="col-5 text-end">
                                    <p>{taxes}</p>
                                </div>
                            </div>

                            <hr className="hr hr-blurry" />

                            <div className="row">
                                <div className="col-7">
                                    <b>Total</b>
                                </div>
                                <div className="col-5 text-end">
                                    <b>{totalPriceString}</b>
                                </div>
                            </div>
                        </div>

                        <div className="form-group d-none">
                            <label htmlFor="TotalPrice">Total Price</label>
                            <input
                                name="TotalPrice"
                                type="number"
                                step="0.01"
                                className="form-control"
                                id="totalPrice"
                                value={totalPrice}
                            />
                            <span className="text-danger">@ViewData["TotalPriceError"]</span>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={!(selectedFromDate && selectedToDate && selectedGuests && showListReserve)}
                        >
                            Reserve
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ItemDetailsOrder;