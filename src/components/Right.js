import React, { useState } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import { cityWeather } from "../api/fetchData";
import Results from "./Results";

const Right = () => {
  const [state, setState] = useState({ 
    information: [],
    error: undefined
  });

  const getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value || "Madrid";
    const country = e.target.elements.country.value || "es";
    try{
      setState(structureData(await cityWeather(city, country), city, country));
    }catch(e){
      setState({error:'Please enter the values'});
    }
  }

  const structureData = (data, city, country) => {
    const placeChosen = city && country;
    if(data.message) {
      return ({
        information: [],
        error: data.message
      })
    }
    return (
      {
        information: [
          {
            check: placeChosen, label:'Temperature', result: placeChosen ? data.main.temp : undefined
          },
          {
            check: placeChosen && data.sys.country ,label: 'Location', result: placeChosen ? data.name +', '+ data.sys.country : undefined
          },
          {
            check:placeChosen, label: 'Humidity', result: placeChosen ? data.main.humidity : undefined
          },
          {
            check: placeChosen, label:'Description', result: placeChosen ? data.weather[0].description : undefined
          } 
        ],
        error: placeChosen ? "": "Please enter the values."
      }
    )
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