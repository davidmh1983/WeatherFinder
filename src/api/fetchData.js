const { REACT_APP_OPENWEATHERMAP_API_KEY } = process.env;

export const cityWeather = async(e) => {
  try {
    e.preventDefault();
    const city = e.target.elements.city.value || "Madrid";
    const country = e.target.elements.country.value || "es";
    const ls = JSON.parse(localStorage.getItem('temperature'));
    let data = {};
    if(ls.name === city && ls.sys.country === country.toUpperCase()) {
      data = ls;
    }else{
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`
      );
      data = await api_call.json();
    } 
    const existPlace = city && country;
    localStorage.setItem("temperature", JSON.stringify(data));
    return({
      information: [
        {
          check: existPlace, label:'Temperature', result: existPlace ? data.main.temp : undefined
        },
        {
          check: existPlace && data.sys.country ,label: 'Location', result: existPlace ? data.name +', '+ data.sys.country : undefined
        },
        {
          check:existPlace, label: 'Humidity', result: existPlace ? data.main.humidity : undefined
        },
        {
          check: existPlace, label:'Description', result: existPlace ? data.weather[0].description : undefined
        } 
      ],
      error: existPlace ? "": "Please enter the values.",
      cityAndCountry: data.name && data.sys.country
    });
  }catch(e){
    return({information: [],error: "Place not found"});
  } 
};