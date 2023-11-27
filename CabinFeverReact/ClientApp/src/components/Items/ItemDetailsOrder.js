import React, { useEffect, useState } from 'react';
import { ItemService } from './../services/ItemService';
import { useParams } from 'react-router-dom';

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

    function formatCurrency(value) {
        return value.toLocaleString('nb-NO', { style: 'currency', currency: 'NOK' }).replace('kr', '').trim() + " kr";
    }

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
        const listReservedDates = []; // Replace this with your list of reserved dates
        var array = ["2023-12-14", "2023-12-15", "2023-12-16", "2023-12-27", "2023-12-28", "2023-12-29"];

        // Initialize the attributes of the check-in calendar
        window.jQuery("#fromDate").datepicker({
            dateFormat: "yy-mm-dd",
            firstDay: 1,
            minDate: new Date(),
            beforeShowDay: function (date) {
                var dateString = window.jQuery.datepicker.formatDate('yy-mm-dd', date);
                return [array.indexOf(dateString) === -1];
            },

            onSelect: function (date) {
                console.log("Handle From Date called: ", date);
                setSelectedFromDate(date); // Update the selectedFromDate state

                // Calculate the validation for the checkout date by adding one day to the selected date from the check-in input
                var fromDateAddOneDay = new Date(new Date(date).setDate(new Date(date).getDate() + 1));

                window.jQuery("#toDate").datepicker("destroy");
                window.jQuery("#toDate").datepicker({
                    dateFormat: "yy-mm-dd",
                    firstDay: 1,
                    minDate: fromDateAddOneDay,
                    beforeShowDay: function (date) {
                        var dateString = window.jQuery.datepicker.formatDate('yy-mm-dd', date);
                        return [array.indexOf(dateString) == -1]
                    },
                    onSelect: function (date) {
                        console.log("Handle To Date called: ", date);
                        setSelectedToDate(date); // Update the selectedFromDate state
                        setShowListReserve(true); // Show "listReserve" when changing "Checkout" date
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
                return [array.indexOf(dateString) === -1];
            }
        });
    }, []); // The empty dependency array ensures it runs only once after mount

    return (
        <div>
            <div className="bg-light border border-dark-subtle rounded-3 p-4">
                <div className="row mb-2">
                    <b>{formatCurrency(item.Price)} per night</b>
                </div>

                <form asp-controller="Order" asp-action="Create" method="post" id="reservationForm">
                    <div className="section mb-4">
                        <input type="hidden" name="ItemId" value="@Model.Id" />
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="FromDate">Check-In</label>
                                    <input name="FromDate" className="form-control" id="fromDate" min={new Date().toISOString().split('T')[0]} value={selectedFromDate} placeholder="Add dates" readOnly />
                                    <span className="text-danger"></span>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="ToDate">Checkout</label>
                                    <input name="ToDate" className="form-control" id="toDate" min={new Date().toISOString().split('T')[0]} value={selectedToDate} placeholder="Add dates" readOnly />
                                    <span className="text-danger"></span>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group">
                                <label htmlFor="Guests">Guests</label>
                                <input name="Guests" type="number" className="form-control" min="1" max={item.Capacity} value={selectedGuests} onChange={(e) => setSelectedGuests(e.target.value)} placeholder="Add guests" />
                                <span className="text-danger"></span>
                            </div>
                        </div>

                    </div>
                    <p><span className="text-danger" id="errorDateOverlap"></span></p>

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
                        <input name="TotalPrice" type="number" step="0.01" className="form-control" id="totalPrice" value={totalPrice} />
                        <span className="text-danger">@ViewData["TotalPriceError"]</span>
                    </div>

                    <button type="submit" class="btn btn-primary w-100" disabled={!(selectedFromDate && selectedToDate && selectedGuests)}>Reserve</button>

                </form>
            </div>
        </div>
    );
};

export default ItemDetailsOrder;
