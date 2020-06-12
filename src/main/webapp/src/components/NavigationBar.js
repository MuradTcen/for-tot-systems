import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    <img src="/logo192.png" width="25" height="25" alt="Brand"/> MOEX
                </Link>
                <Nav className="mr-auto">
                    <Link to={"add-security"} className="nav-link">Add Security</Link>
                    <Link to={"securities"} className="nav-link">Securities</Link>
                    <Link to={"add-history"} className="nav-link">Add History</Link>
                    <Link to={"histories"} className="nav-link">Histories</Link>
                    <Link to={"import-securities"} className="nav-link">Import Securities</Link>
                    <Link to={"import-histories"} className="nav-link">Import Histories</Link>
                    <Link to={"swagger"} className="nav-link">Swagger</Link>
                    <Link to={"github"} className="nav-link">GitHub</Link>
                </Nav>
            </Navbar>

        );
    }
}



