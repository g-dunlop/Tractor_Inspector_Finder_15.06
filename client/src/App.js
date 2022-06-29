import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AppContainer from './containers/AppContainer';
import SearchContainer from './containers/SearchContainer';
import AdminContainer from './containers/AdminContainer';
import AdminUpdateContainer from './containers/AdminUpdateContainer';
import Landing from './components/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useAuth0 } from "@auth0/auth0-react";





function App() {

  const { loginWithRedirect } = useAuth0();

  const handleLoginClick = () => {
    loginWithRedirect()
    // .then(res => console.log(res))
  }

    return (
      <div className="App">
       
        <Routes>
          <Route path="/" element={<AppContainer   />} >
            <Route path="/home" element={<Landing handleLoginClick={handleLoginClick}  />} />
            <Route path="/search" element={<SearchContainer />} />
            <Route path="/admin" element={<AdminContainer  />} />
            <Route path="/admin/:id" element={<AdminUpdateContainer />} />
            <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
          </Route>
        </Routes>
       
      </div>
  
  
    );
  }
  
  export default App;
