import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'

const Landing = ({handleLandingClick}) => {

    const handleClick = (evt) => {
        handleLandingClick()
    }


    return(
        <>
            
                <div className="landing-page">
                <div className="shading-div">
                    <h1 className="landing-header">TractorFactor</h1>
                    <Nav.Link href="search"><Button onClick={handleClick} className="button" variant="light">Get Started</Button></Nav.Link>


                </div>
            </div>
        </>

    )
}
export default Landing;