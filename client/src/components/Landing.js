import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import config from '../config';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './buttons/LoginButton';
import {navigate} from 'react-router-dom';
import Loading from './Loading';
// const auth0 = new Auth0Client({
//   domain: config.REACT_APP_AUTH0_DOMAIN,
//   client_id: config.REACT_APP_AUTH0_CLIENT_ID
// });

const Landing = ({handleLandingClick, handleLoginClick}) => {

    const {isAuthenticated} = useAuth0();
    const { isLoading } = useAuth0();

    const handleClick = (evt) => {
        handleLoginClick()
    }

    const handleStartClick = () => {
        handleLandingClick()
    }

    if (isLoading) {
        return <Loading />;
      }

    return(
        <>
            
                <div className="landing-page">
                <div className="shading-div">
                    <h1 className="landing-header">TractorFactor</h1>
                    
                    {isAuthenticated ? <Nav.Link href="search"><Button  id="login" className="button" size="lg" variant="success">Get Started</Button></Nav.Link>  : <LoginButton />}

                </div>
            </div>
        </>

    )
}
export default Landing;