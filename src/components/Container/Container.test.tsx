import { shallow, mount } from 'enzyme'
import Container from './Container';
import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';

describe('Container component', () => {
    it('should be rendered with ProgressBar', () => {
        const wrapper = mount(<Container />)
        expect(wrapper.find(ProgressBar).length).toBeTruthy();
    });

    it('should render snapshot', async () => {
        const wrapper = shallow(<Container />);

        expect(wrapper).toMatchSnapshot();
    });
});