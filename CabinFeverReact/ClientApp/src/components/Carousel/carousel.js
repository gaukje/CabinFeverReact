import React from 'react';
import ItemCard from '../Layout/itemCard'; 

const Carousel = ({ itemsList }) => {
    return (
        <div className="row mb-5">
            <div id="carouselIndex" className="carousel slide px-4" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {itemsList.map((item, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <div className="row justify-content-center">
                                <div className={index % 2 === 0 ? 'col-md-5 col-12' : 'col-md-5 col-12 d-none d-md-block'}>
                                    <ItemCard item={item} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <a className="carousel-control-prev" href="#carouselIndex" role="button" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </a>

                <a className="carousel-control-next" href="#carouselIndex" role="button" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </a>
            </div>
        </div>
    );
};

export default Carousel;
