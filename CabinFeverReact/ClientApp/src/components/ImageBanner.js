import React from 'react';

const Banner = ({ imageSrc, titleText }) => {
    return (
        <div className="banner-secondary">
            <div className="banner-secondary-container">
                {/* Image */}
                <img src={imageSrc} id="banner-image" alt="Banner" />
            </div>
            <div className="row">
                <div className="col-12 d-flex align-items-center justify-content-center position-absolute top-50 start-50 translate-middle">
                    <div className="text-center">
                        {/* Title */}
                        <h1 className="text-white">{titleText}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
