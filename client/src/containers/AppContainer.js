import React, {useState} from "react";
import {Outlet} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Toaster } from "react-hot-toast";
import {useNavigate} from 'react-router-dom';


const AppContainer = () => {

   let navigate = useNavigate()

    return(
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">TractorFactor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav className="me-auto">
                            <Nav.Link onClick = {() => {navigate("/")}} href="/">Home</Nav.Link>
                            <Nav.Link onClick = {() => {navigate("/search")}} href="search">Search Inspectors</Nav.Link>
                            <Nav.Link onClick = {() => {navigate("/admin")}} href="admin">Admin</Nav.Link>
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