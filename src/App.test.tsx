import { shallow } from 'enzyme'
import App from './App';
import React from 'react';
import Header from './components/Header/Header';
import Container from './components/Container/Container';

describe('App component', () => {
  it('should be rendered with Header and Container', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(Header)).toBeDefined();
    expect(wrapper.find(Container)).toBeDefined();
  });

  it('should render snapshot', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot();
  });
});
