import { shallow } from 'enzyme'
import Container from './Container';
import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';

describe('Container component', () => {
    it('should be rendered with ProgressBar', () => {
        const wrapper = shallow(<Container />)
        expect(wrapper.find(ProgressBar).length).toBeTruthy();
    });

    it('should render snapshot', () => {
        const wrapper = shallow(<Container />)
        expect(wrapper).toMatchSnapshot();
    });
});