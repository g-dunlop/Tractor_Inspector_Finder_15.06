import React from 'react';
import Nav from 'react-bootstrap/Nav';
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
                    <Nav.Link href="search"><Button onClick={handleClick} className="button" size="lg" variant="success">Get Started</Button>{' '}</Nav.Link>


                </div>
            </div>
        </>

    )
}
export default Landing;