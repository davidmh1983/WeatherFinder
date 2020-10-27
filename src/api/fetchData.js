import axios from 'axios';

const { REACT_APP_OPENWEATHERMAP_API_KEY } = process.env;

export const cityWeather = async (city, country, useCache = true) => {
  if (useCache) {
    const ls = JSON.parse(localStorage.getItem('temperature'));
    if (ls && ls.name === city && ls.sys.country === country.toUpperCase()) {
      return ls;
    }
  }
  try {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`,
    );
    if (useCache) {
      localStorage.setItem('temperature', JSON.stringify(data));
    }
    return data;
  } catch (e) {
    throw (e);
  }
};
