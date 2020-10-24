export const cityWeather = (city, country) => {

  if( ( (city === '' || city === '') && country ==='ES') ||
      ( (city === '' || city === '') && (country === '' || country === '') ) ||
      ( city ==='Madrid' && country === 'FR') )
  {
    return {
      cod: "404",
      message: "city not found"
    }
  }
  if(city === 'Madrid' && (country ==='ES' || country ==='')) {
    return {
      "coord":{
        "lon":-3.7,
        "lat":40.42
      },
      "weather":[
        {
          "id":802,
          "main":"Clouds",
          "description":"scattered clouds",
          "icon":"03d"
        }
      ],
      "base":"stations",
      "main":{
        "temp":15.32,
        "feels_like":11.83,
        "temp_min":14.44,
        "temp_max":16.11,
        "pressure":1024,
        "humidity":59
      },
      "visibility":10000,
      "wind":{
        "speed":4.1,
        "deg":230
      },
      "clouds":{
        "all":40
      },
      "dt":1603549269,
      "sys":{
        "type":1,
        "id":6443,
        "country":'ES',
        "sunrise":1603521341,
        "sunset":1603560116
      },
      "timezone":7200,
      "id":3117735,
      "name":city,
      "cod":200
    }
  }
}

export default cityWeather;