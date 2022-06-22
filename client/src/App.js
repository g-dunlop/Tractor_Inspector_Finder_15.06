import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AppContainer from './containers/AppContainer';
import SearchContainer from './containers/SearchContainer';
import AdminContainer from './containers/AdminContainer';
import AdminUpdateContainer from './containers/AdminUpdateContainer';
import Landing from './components/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

//   const [inspectorId, setInspectorId] = useState(null)

//   const handleUpdateButtonClick = (id) => {
//     setInspectorId(id)
//     console.log(id)
// }

    return (
      <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppContainer   />} >
            <Route path="/" element={<Landing />} />
            <Route path="/search" element={<SearchContainer />} />
            <Route path="/admin" element={<AdminContainer />} />
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
        </BrowserRouter>
      </div>
  
  
    );
  }
  
  export default App;
