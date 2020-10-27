import React from 'react';
import Right from '../Right';
import { shallow } from '../../../enzyme';
import cityWeather from '../../api/fetchData';
import 'babel-polyfill';

jest.mock('../../api/fetchData');

const structuredData = (city, country) => {
  if (city === 'Madrid' && country === 'ES') {
    return {
      information: [
        {
          check: true, label: 'Temperature', result: 13.4,
        },
        {
          check: true, label: 'Location', result: 'Madrid, ES',
        },
        {
          check: true, label: 'Humidity', result: 45,
        },
        {
          check: true, label: 'Description', result: 'arida',
        },
      ],
      error: '',
    };
  }
  if ((city === '' && country === 'ES')
  || (city === 'Madrid' && country === '')
  || (city === '' && country === '')
  || (city === 'Madrid' && country === 'FR')) {
    return {
      information: [],
      error: 'city not found',
    };
  }
};

function checkTest(city, country, code) {
  const responseStructured = structuredData(city, country);
  const response = cityWeather(city, country, false);
  expect(response.cod).toEqual(code);
  if (code === '404') {
    expect(response.message).toEqual(responseStructured.error);
  }
  if (code === 200) {
    expect(response.name).toEqual(responseStructured.information[1].result.split(',')[0]);
    expect(response.main.temp).toEqual(responseStructured.information[0].result);
    expect(response.main.humidity).toEqual(responseStructured.information[2].result);
    expect(response.weather[0].description).toEqual(responseStructured.information[3].result);
  }
}

describe('Check response api', () => {
  it('Matches the snapshot', () => {
    const wrapper = shallow(<Right />);
    expect(wrapper).toMatchSnapshot();
  });

  it('city and country exist and city belong to that country', () => {
    checkTest('Madrid', 'ES', 200);
  });
  it('city exists and country doesnt exist or there is no country written', () => {
    checkTest('Madrid', '', '404');
  });
  it('city doesnt exist or there is no city written and country exists', () => {
    checkTest('', 'ES', '404');
  });
  it('city and country dont exist or there is nothing written', () => {
    checkTest('', '', '404');
  });
  it('city exists and country exists but city doesnt belong to that country', () => {
    checkTest('Madrid', 'FR', '404');
  });
});
