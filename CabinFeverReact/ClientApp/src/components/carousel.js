import React from 'react';
import ItemCard from './Layout/itemCard';

const Carousel = ({ itemsList }) => {
    console.log(itemsList);
    return (
        <>
            <div id="carouselImages" className="carousel slide" data-bs-ride="true">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselImages" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselImages" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselImages" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="images/hytte_stock_1.jpg" className="d-block w-100" alt="Hytte 1" />
                    </div>
                    <div className="carousel-item">
                        <img src="images/hytte_stock_2.jpg" className="d-block w-100" alt="Hytte 2" />
                    </div>
                    <div className="carousel-item">
                        <img src="images/hytte_stock_3.jpg" className="d-block w-100" alt="Hytte 3" />
                    </div>
                </div>
            </div>

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

                    <a className="carousel-control-prev" href="#carouselImages" role="button" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </a>

                    <a className="carousel-control-next" href="#carouselImages" role="button" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </a>

                </div>
            </div>
        </>
    );
};

export default Carousel;
