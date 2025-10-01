import logo from './logo.svg';
import './App.css';
import React from "react";
import Navbar from "./components/Navbar"; // import Navbar page
import Home from "./pages/Home"; // import Home page

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
