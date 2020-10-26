
import Results from '../Results';
import React from "react";
import { shallow} from '../../../enzyme';

const dataSuccess = {
  information: [
    {
      check: true, label:'Temperature', result: '13.4'
    },
    {
      check: true, label: 'Location', result: 'Barcelona, ES'
    },
    {
      check:true, label: 'Humidity', result: '45'
    },
    {
      check: true, label:'Description', result: 'arida'
    } 
  ],
  error: ""
}
const dataError = {
  information: [],
  error: "city not found"
}

describe('Results Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Results data={dataSuccess} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('checks number of info when data is correct', () => {
    const wrapper = shallow(<Results data={dataSuccess} />);
    expect(wrapper.find('.weather__key').length).toEqual(4);
    expect(wrapper.find('.weather__value').length).toEqual(4);
    expect(wrapper.find('.weather__value').text).not.toEqual('');
    expect(wrapper.find('.weather__error').length).toEqual(0);
  });

  it('checks number of info when data is not correct', () => {
    const wrapper = shallow(<Results data={dataError} />);
    expect(wrapper.find('.weather__key').length).toEqual(0);
    expect(wrapper.find('.weather__value').length).toEqual(0);
    expect(wrapper.find('.weather__error').length).toEqual(1);
    expect(wrapper.find('.weather__error').text).not.toEqual('');
  });
});