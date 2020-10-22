import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Left from "./Left";
import Right from "./Right";

function Weather() {
  return (
    <div>
      <div className="wrapper">
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <Left />
              <Right />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
