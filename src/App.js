import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Display from "./components/Display";
import Create from "./components/Create";
import Details from "./components/Details"
import Update from "./components/Update"



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <h1>Note Wall</h1>
      <h5>Leave a note</h5>
        <Routes>
          <Route path="/" element={<Display/>}/>
          <Route path="/create" element={<Create />}/>
          <Route path="/details/:id" element={<Details />}/>
          <Route path="/update/:id" element={<Update />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
