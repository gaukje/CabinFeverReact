import React from 'react';
import ItemCard from './Items/ItemCard';

const Carousel = ({ itemsList }) => {
    return (
        <div className="row mb-5">
        <h1 class="text-center mb-4">Explore</h1>
            <div id="carouselIndex" className="carousel slide px-4" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row justify-content-center">
                            {itemsList.slice(0, 2).map((item, i) => (
                                <div key={i} className={i % 2 === 0 ? "col-md-5 col-12" : "col-md-5 col-12 d-none d-md-block"}>
                                    <ItemCard item={item} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {itemsList.slice(2, 4).map((item, i) => (
                        <div key={i} className="carousel-item">
                            <div className="row justify-content-center">
                                {itemsList.slice(2 + i * 2, 2 + i * 2 + 2).map((item, j) => (
                                    <div key={j} className={j % 2 === 0 ? "col-md-5 col-12" : "col-md-5 col-12 d-none d-md-block"}>
                                        <ItemCard item={item} />
                                    </div>
                                ))}
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
