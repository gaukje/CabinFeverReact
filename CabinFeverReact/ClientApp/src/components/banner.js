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
                    <div className="col-12 d-flex align-items-center justify-content-center position-absolute top-50 start-50 translate-middle pb-5 mb-5">
                        <div className="text-center">
                            <img className="pe-none user-select-none" src="images/logo.png" width="200px" unselectable="on" style={{ filter: 'drop-shadow(0px 0px 1px black)' }} />
                            <h3 className="text-white pe-none user-select-none">Escape to the Wild: Your Cabin Getaway Awaits with CabinFever!</h3>
                            <div className="banner-link">
                                <a href="items/Rentals">Reserve here</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
