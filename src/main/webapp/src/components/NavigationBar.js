import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    <img src="/logo192.png" width="25" height="25" alt="Brand"/>Moex
                </Link>
                <Nav className="mr-auto">
                    <Link to={"add"} className="nav-link">Add Security</Link>
                    <Link to={"list"} className="nav-link">Securities</Link>
                </Nav>
            </Navbar>

        );
    }
}



