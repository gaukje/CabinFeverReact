import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-light text-center py-3 position-absolute bottom-0 start-0 w-100">
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <h5 className="mb-1">About Us</h5>
                        <a className="text-light" href="/pages/about">Read more</a>
                    </div>
                    <div className="col-4">
                        <h5 className="mb-1">Contact Us</h5>
                        <a className="text-light" href="/pages/contact">Contact us</a>
                    </div>
                    <div className="col-4">
                        <h5 className="mb-1">Follow Us</h5>
                        <div>
                            <a className="bi bi-facebook text-white mx-2" href="https://www.facebook.com/nelsonmandela/"></a>
                            <a className="bi bi-instagram text-white mx-2" href="https://www.instagram.com/nelson_mandela_oficial/"></a>
                            <a className="bi bi-twitter text-white mx-2" href="https://twitter.com/NelsonMandela"></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;