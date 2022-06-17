import React from "react";
import {Link, Outlet} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const AppContainer = () => {


    return(
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">TractorFactor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="search">Search Inspectors</Nav.Link>
                            <Nav.Link href="admin">Admin</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
                
            <Outlet />

            <footer>
                <h3>Footer</h3>
            </footer>
        </>
    )
}
export default AppContainer;