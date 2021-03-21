import React, { Component } from 'react'
import {Navbar, Button, Nav, NavDropdown} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'


class NavBar extends Component {
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                         
                        </Nav>
                        <Nav>
                            <Link to="/">
                            <div className="nav-link">Home</div>
                            </Link>
                            <Link to="/form">
                            <div className="nav-link">Add a student</div>
                            </Link>
                            <Link to="/projects">
                            <div className="nav-link">projects</div>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default withRouter(NavBar); 
