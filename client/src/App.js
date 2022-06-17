import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import AppContainer from './containers/AppContainer';
import SearchContainer from './containers/SearchContainer';
import AdminContainer from './containers/AdminContainer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  

    return (
      
      <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppContainer />} >
            <Route path="/search" element={<SearchContainer />} />
            <Route path="/admin" element={<AdminContainer />} />
          </Route>
        </Routes>
        </BrowserRouter>
      </div>
  
  
    );
  }
  
  export default App;
