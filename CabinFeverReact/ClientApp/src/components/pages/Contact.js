// Contact.js
import React from 'react';

const Contact = () => {
    return (
        <div>
            {/* Banner */}
            <div className="banner-secondary">
                <div className="banner-secondary-container">
                    {/* Midlertidig */}
                    <img src="https://images.pexels.com/photos/513710/pexels-photo-513710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" id="banner-image" alt="Banner" />                </div>
                <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-center position-absolute top-50 start-50 translate-middle">
                        <div className="text-center">
                            {/* The text */}
                            <h1 className="text-white">Contact</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact information */}
            <div className="container pb-5 w-75">
                <div className="container my-5">
                    <h2>Customers and renters</h2>
                    <p>Email: cabinfever.support@cf.no</p>
                    <p>Phone: 22 xx xx xx</p>
                </div>

                <div className="container my-5">
                    <h2>Cabin owners regarding guests or owned cabins</h2>
                    <p>Email: cabinfever.owner@cf.no</p>
                    <p>Phone: 23 xx xx xx</p>
                </div>

                <div className="container my-5">
                    <h2>Opening hours for phone support</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>Monday</td>
                                <td></td>
                                <td>9 AM - 5 PM</td>
                            </tr>
                            <tr>
                                <td>Tuesday</td>
                                <td></td>
                                <td>9 AM - 5 PM</td>
                            </tr>
                            <tr>
                                <td>Wednesday</td>
                                <td></td>
                                <td>9 AM - 5 PM</td>
                            </tr>
                            <tr>
                                <td>Thursday</td>
                                <td></td>
                                <td>9 AM - 5 PM</td>
                            </tr>
                            <tr>
                                <td>Friday</td>
                                <td></td>
                                <td>9 AM - 4 PM</td>
                            </tr>
                            <tr>
                                <td>Saturday</td>
                                <td></td>
                                <td>10 AM - 3 PM</td>
                            </tr>
                            <tr>
                                <td>Sunday</td>
                                <td></td>
                                <td>Closed</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
 
    );
};

export default Contact;
