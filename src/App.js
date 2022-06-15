import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import AppContainer from './containers/AppContainer';
import HomeContainer from './containers/HomeContainer';
import AdminContainer from './containers/AdminContainer';

function App() {

    return (
      
      <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppContainer />} >
            <Route path="/" element={<HomeContainer />} />
            <Route path="/admin" element={<AdminContainer />} />
          </Route>
        </Routes>
        </BrowserRouter>
      </div>
  
  
    );
  }
  
  export default App;
