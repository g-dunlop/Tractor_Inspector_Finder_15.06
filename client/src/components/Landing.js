import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Landing = ({handleLandingClick}) => {

    const handleClick = (evt) => {
        handleLandingClick()
    }


    return(
        <>
            
                <div className="landing-page">
                <div className="shading-div">
                    <h1 className="landing-header">TractorFactor</h1>
                    <Nav.Link href="search"><button onClick={handleClick} className="button">Get Started</button></Nav.Link>


                </div>
            </div>
        </>

    )
}
export default Landing;