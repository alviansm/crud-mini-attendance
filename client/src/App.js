import React from "react";
import Navbar from "./components/Navbar";
import Add from "./components/Add";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <div className="container">
        <div className="row">
          <Add></Add>          
        </div>
      </div>
    </div>
  );
}

export default App;
