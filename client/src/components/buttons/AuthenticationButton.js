import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

import { useAuth0 } from '@auth0/auth0-react';

const AuthenticationButton = () => {
    const {isAuthenticated} = useAuth0();

    return (
        <div className="auth-button">
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
    )
}

export default AuthenticationButton;