import React from 'react';

const Banner = () => {
    return (
        <div className="banner">
            <div className="banner-container">
                <video autoPlay muted loop id="background-video">
                    <source src="videos/winter_-_15650 (540p).mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-center position-absolute top-50 start-50 translate-middle">
                        <div className="text-center">
                            <h1 className="text-white">CabinFever</h1>
                            <h3 className="text-white">Escape to the Wild: Your Cabin Getaway Awaits with CabinFever!</h3>
                            <div className="banner-link">
                                <a href="Home/Rentals">Reserve here</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
