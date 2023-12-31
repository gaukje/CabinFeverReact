// NavMenu.js
import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { AuthContext } from '../AuthContext';
import { jwtDecode } from "jwt-decode";

class NavMenu extends Component {
    static contextType = AuthContext; // Set the context type

    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
        };
    }

    handleLogout = () => {
        this.context.logout(); // Call the logout function from AuthContext
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const { isAuthenticated } = this.context; // Use this.context
        let emailPart = "";

        // Remove the standalone context check, it's not necessary since you're using this.context
        if (isAuthenticated && this.context.currentUser && this.context.currentUser.email) {
            emailPart = this.context.currentUser.email.split('@')[0];
        }

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
                            {isAuthenticated() ? (
                                <>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-light" to="/Items/Create">List your property</NavLink>
                                    </NavItem>

                                    <li class="nav-item dropdown d-none d-sm-block">
                                        <a class="btn btn-dark dropdown-toggle bi bi-person-circle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">&#9; {emailPart}</a>
                                        <ul class="dropdown-menu bg-dark border-0" aria-labelledby="dropdownMenuLink">
                                            <li>
                                                <NavItem>
                                                    <NavLink tag={Link} className="text-light" to="/MinSide">My profile</NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink tag={Link} className="text-light" to="/" onClick={this.handleLogout}>Logout</NavLink>
                                                </NavItem>
                                            </li>
                                        </ul>
                                    </li>

                                    <div class="d-block d-sm-none">
                                        <NavItem>
                                            <NavLink tag={Link} className="text-light" to="/MinSide">My profile</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-light" to="/">Logout</NavLink>
                                        </NavItem>
                                    </div>
                                </>
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
