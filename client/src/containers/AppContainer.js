import React, {useState} from "react";
import {Link, Outlet} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Toaster } from "react-hot-toast";
import Landing from "../components/Landing";

const AppContainer = ({isLanding, setIsLanding}) => {

   

    const handleLandingClick = () => {
        setIsLanding(!isLanding)
    }

    const handleLandingFalseClick = () => {
        setIsLanding(false)
    }

    const handleLandingTrueClick = () => {
        setIsLanding(true)
    }

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
            <div className="App">
            <div><Toaster position="top-right"/></div>
            <Outlet />
            </div>

            <footer>
                <h5>Footer</h5>
            </footer>
        </>
    )
}
export default AppContainer;