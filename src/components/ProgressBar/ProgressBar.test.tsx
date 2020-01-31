import { shallow } from 'enzyme'
import ProgressBar from './ProgressBar';
import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';

describe('ProgressBar component', () => {
    it('should be rendered with Logo', () => {
        const wrapper = shallow(<ProgressBar />)
        expect(wrapper.find(Logo).length).toBeTruthy();
    });

    it('should render snapshot', () => {
        const wrapper = shallow(<ProgressBar />)
        expect(wrapper).toMatchSnapshot();
    });

    it('should render compact snapshot', () => {
        const wrapper = shallow(<ProgressBar compact={true} />)
        expect(wrapper).toMatchSnapshot();
    });
});