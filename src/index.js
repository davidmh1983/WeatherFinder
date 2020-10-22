import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import Weather from "./components/Weather.js";

function App() {
  return (
    <div className="App">
      <Weather />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);