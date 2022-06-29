import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import config from './config';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
  <Auth0Provider
    domain={config.REACT_APP_AUTH0_DOMAIN}
    clientId={config.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri={'http://localhost:3000/home/'}
    audience={config.REACT_APP_AUTH0_AUDIENCE}
    scope="read:current_user update:current_user_metadata create:tractors create:inspectors update:inspectors delete:inspectors"
  >
    <App />
  </Auth0Provider> </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
