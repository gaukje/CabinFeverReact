// Contact.js
import React from 'react';
import ImageBanner from '../ImageBanner';


const Contact = () => {
    return (
        <div>
            <ImageBanner imageSrc="images/banners/pexels-photo-513710.jpeg" titleText="Contact" ></ImageBanner>

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
