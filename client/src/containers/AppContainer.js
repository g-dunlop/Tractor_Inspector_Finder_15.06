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
        <div className="app-container">
            <Navbar bg="success" variant="dark" expand="lg" className="gap-3 px-3">
                <Container >
                    <Navbar.Brand href="/">TractorFactor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav variant="pills success"  className="flex-grow-1 justify-content-end"  >
                            <Nav.Item>
                            <Nav.Link onClick = {() => {navigate("/")}} href="/">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link  onClick = {() => {navigate("/search")}} href="search">Search Inspectors</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link  onClick = {() => {navigate("/admin")}} href="admin">Admin</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="App">
            <div><Toaster position="top-right"/></div>
            <Outlet />
            </div>

            <Navbar bg="success" variant="dark" expand="lg" className="footer gap-3 px-3">
            <Container >
                    <Navbar.Brand href="/">TractorFactor</Navbar.Brand>
                </Container>
                </Navbar>
        </div>
    )
}
export default AppContainer;