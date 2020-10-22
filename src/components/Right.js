import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { cityWeather } from "../api/fetchData";
import Results from "./Results";

const Right = () => {
  const [state, setState] = useState({ 
    information: [],
    error: undefined
  });
  const getWeather = async (e) => {
    let data = await cityWeather(e);
    setState(data);
    return true;
  }
  return(
    <div className="col-7 form-container">
      <form onSubmit={getWeather}>
        <input type="text" name="city" placeholder="Madrid" />
        <input type="text" name="country" placeholder="es" />
        <button>Get Weather</button>
      </form>
      <Results data={state}/>
    </div>
  )
}
export default Right;