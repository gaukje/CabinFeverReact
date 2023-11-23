import React, { useEffect, useState } from 'react';
import { ItemService } from './../services/ItemService';
import { useParams } from 'react-router-dom';

const ItemDetailsOrder = ({ item }) => {

    useEffect(() => {
        const listReservedDates = []; // Replace this with your list of reserved dates

        // Initialize the attributes of the check-in calendar
        window.jQuery("#fromDate").datepicker({
            dateFormat: "yy-mm-dd",
            firstDay: 1,
            minDate: new Date(),
            beforeShowDay: function (date) {
                var dateString = window.jQuery.datepicker.formatDate('yy-mm-dd', date);
                return [listReservedDates.indexOf(dateString) === -1];
            },
        });

        // Initialize the attributes of the checkout calendar
        window.jQuery("#toDate").datepicker({
            dateFormat: "yy-mm-dd",
            firstDay: 1,
            minDate: new Date(),
            beforeShowDay: function (date) {
                var dateString = window.jQuery.datepicker.formatDate('yy-mm-dd', date);
                return [listReservedDates.indexOf(dateString) === -1];
            },
        });
    }, []); // The empty dependency array ensures it runs only once after mount


    return (
        <div>
            <div class="bg-light border border-dark-subtle rounded-3 p-4">
                <div class="row mb-2">
                    <b>{item.Price.toFixed(2)} kr per night</b>
                </div>

                <form asp-controller="Order" asp-action="Create" method="post" id="reservationForm">
                    <div class="section mb-4">
                        <input type="hidden" name="ItemId" value="@Model.Id" />
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="FromDate">Check-In</label>
                                    <input name="FromDate" className="form-control" id="fromDate" min={new Date().toISOString().split('T')[0]} value="" placeholder="Add dates" readOnly />
                                    <span class="text-danger"></span>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="ToDate">Checkout</label>
                                    <input name="ToDate" className="form-control" id="toDate" min={new Date().toISOString().split('T')[0]} value="" placeholder="Add dates" readOnly />
                                    <span class="text-danger"></span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group">
                                <label for="Guests">Guests</label>
                                <input name="Guests" type="number" class="form-control" min="1" max={item.Capacity} placeholder="Add guests" />
                                <span class="text-danger"></span>
                            </div>
                        </div>

                    </div>
                    <p><span class="text-danger" id="errorDateOverlap"></span></p>
                    @if (ViewData["ErrorMessage"] != null)
                    {
                        <div class="alert alert-danger">
                            @ViewData["ErrorMessage"]
                        </div>
                    }

                    <div class="section d-none mb-4" id="listReserve">
                        <div class="row">
                            <div class="col-7">
                                <p>@Model.PricePerNight.ToString("N2", CultureInfo.CreateSpecificCulture("no-NO")) kr &#215; <span id="countDays"></span></p>
                            </div>
                            <div class="col-5 text-end">
                                <p><span id="costPerNight"></span></p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-7">
                                <p>Cleaning fee</p>
                            </div>
                            <div class="col-5 text-end">
                                <p><span id="cleaningFee"></span></p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-7">
                                <p>Service fee</p>
                            </div>
                            <div class="col-5 text-end">
                                <p><span id="serviceFee"></span></p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-7">
                                <p>Taxes</p>
                            </div>
                            <div class="col-5 text-end">
                                <p><span id="taxes"></span></p>
                            </div>
                        </div>

                        <hr class="hr hr-blurry" />

                        <div class="row">
                            <div class="col-7">
                                <b>Total</b>
                            </div>
                            <div class="col-5 text-end">
                                <b><span id="totalPriceString"></span></b>
                            </div>
                        </div>
                    </div>

                    <div class="form-group d-none">
                        <label for="TotalPrice">Total Price</label>
                        <input name="TotalPrice" type="number" step="0.01" class="form-control" id="totalPrice" />
                        <span class="text-danger">@ViewData["TotalPriceError"]</span>
                    </div>
                </form>
            </div>
        </div>

    );

};

export default ItemDetailsOrder;
