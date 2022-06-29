import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import config from '../config';


// const auth0 = new Auth0Client({
//   domain: config.REACT_APP_AUTH0_DOMAIN,
//   client_id: config.REACT_APP_AUTH0_CLIENT_ID
// });

const Landing = ({handleLandingClick, handleLoginClick}) => {

    

    const handleClick = (evt) => {
        handleLoginClick()
        
    }


    return(
        <>
            
                <div className="landing-page">
                <div className="shading-div">
                    <h1 className="landing-header">TractorFactor</h1>
                    {/* <Nav.Link href="search"> */}
                        <Button onClick={handleClick} id="login" className="button" size="lg" variant="success">Log In</Button>{' '}
                    {/* </Nav.Link> */}


                </div>
            </div>
        </>

    )
}
export default Landing;