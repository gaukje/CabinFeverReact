import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
                <Navbar.Brand as={Link} to="/">
                    <img src="/images/logo.png" alt="CabinFever" width="40" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/" className="text-light">Home</Nav.Link>
                        <Nav.Link as={Link} to="/rentals" className="text-light">Rentals</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="text-light">About</Nav.Link>
                        {/* Add more Nav.Link items as needed */}
                    </Nav>
                    {/* Add your login partial here */}
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
};

export default Header;
