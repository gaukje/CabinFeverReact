import React, { useEffect, useState } from 'react';
import { ItemService } from './../services/ItemService';

import { useLocation } from 'react-router-dom';

// component for order confirmation
const OrderConfirmation = () => {

// using location to get state from router
    const location = useLocation();

    // state for storing item details
    const [item, setItem] = useState(null);

   // getting order details from location state
    const { order, extraOrderDetails } = location.state;

    // effect to fetch item details when component loads
    useEffect(() => {
        // calling item service to get item by id
        ItemService.getItemById(order.ItemId)
            .then(data => {
               // setting item details to state
                setItem(data);
            })
            .catch(error => {
                // logging error if fetching item fails
                console.error('Error fetching item details:', error);
            });
    }, [order.ItemId]);

    return (
        <div>
            <div className="container">
                <div className="row d-flex align-items-center justify-content-start vh-100">
                    <div className="row justify-content-center bg-light border border-dark-subtle rounded py-5">
                        <div className="col-md-6 mb-5">
                            <div className="mb-4">
                                <h2>Order Confirmation</h2>
                                <p>We are pleased to confirm that your reservation has been successfully processed and is now confirmed.</p>
                                <p>Please review the order details to ensure they are accurate. If you have any questions or concerns regarding your reservation, please do not hesitate to contact our customer support team.</p>
                                <p>Thank you for choosing our service.</p>
                            </div>
                            <a className="btn btn-primary" href="/">Back to Home</a>
                        </div>

                        {item && (
                            <div className="col-md-4 bg-white border border-dark-subtle rounded p-4">
                                <div className="row mb-4">
                                    <div className="col-md-8">
                                        <h5>{item.Name}</h5>
                                        <p>{item.Location}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="ratio ratio-4x3">
                                            <img src={item.ImageUrl} className="card-img-top img-fluid" alt={item.Name} id="itemcard-image" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <p className="bi bi-person">&#09;{order.Guests} {order.Guests > 1 ? 'guests' : 'guest'}</p>
                                </div>

                                <div className="row">
                                    <p className="bi bi-calendar">&#09;{order.FromDate.toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })} &#8594; {order.ToDate.toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </p>
                                </div>

                                <hr className="hr hr-blurry" />

                                <div className="row">
                                    <div className="col-7">
                                        <p>{extraOrderDetails.PricePerNightString}</p>
                                    </div>
                                    <div className="col-5 text-end">
                                        <p>{extraOrderDetails.PricePerNight}</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-7">
                                        <p>Cleaning fee</p>
                                    </div>
                                    <div className="col-5 text-end">
                                        <p>{extraOrderDetails.CleaningFee}</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-7">
                                        <p>Service fee</p>
                                    </div>
                                    <div className="col-5 text-end">
                                        <p>{extraOrderDetails.ServiceFee}</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-7">
                                        <p>Taxes</p>
                                    </div>
                                    <div className="col-5 text-end">
                                        <p>{extraOrderDetails.Taxes}</p>
                                    </div>
                                </div>

                                <hr className="hr hr-blurry" />

                                <div className="row">
                                    <div className="col-7">
                                        <b>Total</b>
                                    </div>
                                    <div className="col-5 text-end">
                                        <b>{extraOrderDetails.TotalPrice}</b>
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

    )


}

export default OrderConfirmation;
