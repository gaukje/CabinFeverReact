// NavMenu.js
import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { AuthContext } from '../AuthContext'; 



class NavMenu extends Component {
    static contextType = AuthContext; // Set the context type

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
        const context = this.context;


        if (!context) {
            console.error("AuthContext not found");
            return null; // or some fallback UI
        }

        const { isAuthenticated } = context;

        console.log("Context:", context);
        console.log("Is Authenticated:", context.isAuthenticated());

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
                            {isAuthenticated() ? (
                                <NavItem>
                                    <NavLink tag={Link} className="text-light" to="/MinSide">Min Side</NavLink>
                                </NavItem>
                                ) : (
                                <>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-light" to="/register">Register</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-light" to="/login">Login</NavLink>
                                    </NavItem>
                                </>
                            )}
                        </ul>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}

export default NavMenu;
/*
<AuthContext.Consumer>
    {({ isAuthenticated }) => (
        <ul className="navbar-nav">
            {!isAuthenticated() && (
                <>
                    <NavItem>
                        <NavLink tag={Link} className="text-light" to="/register">Register</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-light" to="/login">Login</NavLink>
                    </NavItem>
                </>
            )}
            {isAuthenticated() && (
                <NavItem>
                    <NavLink tag={Link} className="text-light" to="/MinSide">Min Side</NavLink>
                </NavItem>
            )}
        </ul>
    )}
</AuthContext.Consumer>
*/