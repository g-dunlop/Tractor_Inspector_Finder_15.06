import React, {useState} from "react";
import {Outlet} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Toaster } from "react-hot-toast";
import {useNavigate} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "../components/Profile";
import Loading from "../components/Loading";
import AuthenticationButton from "../components/buttons/AuthenticationButton";


const AppContainer = () => {

    const { isLoading } = useAuth0();
    const {isAuthenticated} = useAuth0();

    if (isLoading) {
        return <Loading />;
      }

   let navigate = useNavigate();

    return(
        <div className="app-container">
            <Navbar bg="success" variant="dark" expand="lg" className="gap-3 px-3">
                <Container>
                <div className="extras">
                        {isAuthenticated ? <Profile /> : null}
                        <AuthenticationButton  />
                </div>


                <Navbar.Brand href="/home">TractorFactor</Navbar.Brand>
                    
                     
                     
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                   
                    <Navbar.Collapse>
                        <Nav variant="pills success"  className="flex-grow-1 justify-content-end"  >
                            <Nav.Item>
                            <Nav.Link onClick = {() => {navigate("/home")}} href="/home">Home</Nav.Link>
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