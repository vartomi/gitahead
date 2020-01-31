import { shallow } from 'enzyme'
import Header from './Header';
import React from 'react';

describe('Header component', () => {
    it('should be rendered with h3 title', () => {
        const wrapper = shallow(<Header />)
        expect(wrapper.find('h3').text()).toEqual('GitAhead');
    });

    it('should render snapshot', () => {
        const wrapper = shallow(<Header />)
        expect(wrapper).toMatchSnapshot();
    });
});