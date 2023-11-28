// NavMenu.js!!
import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-dark mb-3 fixed-top" container light>
                    <NavbarBrand tag={Link} className="text-light py-0" to="/"><img src="images/logo.png" width="40px"></img></NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2 border-dark">
                        <i className="bi bi-list text-light fs-1"></i>
                    </NavbarToggler>
                    <Collapse className="navbar-collapse collapse d-sm-inline-flex justify-content-between" isOpen={!this.state.collapsed} navbar>
                        <ul className="navbar-nav flex-grow-1">
                            <NavItem>
                                <NavLink tag={Link} className="text-light" to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-light" to="/Items/Rentals">Rentals</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-light" to="/pages/about">About</NavLink>
                            </NavItem>
                        </ul>
                        <ul className="navbar-nav">
                            {/* Lenker eller komponenter p� h�yre side */}
                            <NavItem>
                                <NavLink tag={Link} className="text-light" to="/MinSide">Min Side</NavLink>
                            </NavItem>
                            {/* Her kan du inkludere din innloggingsportal */}
                            <NavItem>
                                <NavLink tag={Link} className="text-light" to="/register">Register</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-light" to="/login">Login</NavLink>
                            </NavItem>
                        </ul>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}

export default NavMenu;