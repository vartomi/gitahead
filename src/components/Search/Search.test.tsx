import { shallow } from 'enzyme'
import Search from './Search';
import React from 'react';
import { Keys } from '../../configs/constants';
import { searchOnGithub } from '../../services/users';
import SearchResult from './SearchResult';

jest.mock('../../services/users', () => ({
    findUsers: () => Promise.resolve([{
        id: 1,
        login: 'login',
        avatar: 'avatar',
        url: 'url',
        name: 'name',
        blog: 'blog',
        bio: 'bio',
        email: 'email',
        company: 'company',
        location: 'location',
        nrOfRepositories: 0,
        nrOfFollowers: 0,
        nrOfFollowing: 0,
        joinedAt: 'date'
    }]),
    searchOnGithub: jest.fn(() => { })
}));

const onSelectMock = jest.fn(() => { });

describe('Search component', () => {
    it('should be rendered', () => {
        const wrapper = shallow(<Search onSelect={onSelectMock} />);
        expect(wrapper.find('input').prop('id')).toEqual('search-input');
    });

    it('should setSearchValue', () => {
        const wrapper = shallow(<Search onSelect={onSelectMock} />);
        wrapper.find('input').simulate('change', { target: { value: 'login' } });

        expect(wrapper.find('input').prop('value')).toEqual('login');
    });

    it('should call searchOnGithub in case of Enter key', async () => {
        const wrapper = shallow(<Search onSelect={onSelectMock} />);
        wrapper.find('input').simulate('change', { target: { value: 'login' } });

        await new Promise(resolve => setTimeout(resolve, 500));
        wrapper.simulate('keyup', { keyCode: Keys.Enter });

        expect(searchOnGithub).toBeCalled();
    });

    it('should call onSelect in case of Tab key', async () => {
        const wrapper = shallow(<Search onSelect={onSelectMock} />);
        wrapper.find('input').simulate('change', { target: { value: 'login' } });

        await new Promise(resolve => setTimeout(resolve, 500));
        wrapper.simulate('keyup', { keyCode: Keys.Tab });
        wrapper.update();

        expect(onSelectMock).toBeCalled();
    });

    it('should render SearchResult with user in case of matching user', async () => {
        const wrapper = shallow(<Search onSelect={onSelectMock} />);
        wrapper.find('input').simulate('change', { target: { value: 'login' } });

        await new Promise(resolve => setTimeout(resolve, 500));
        wrapper.update();

        expect(wrapper.find(SearchResult).length).toBeTruthy();
    });

    it('should not render SearchResult with less character typed in', async () => {
        const wrapper = shallow(<Search onSelect={onSelectMock} />);
        wrapper.find('input').simulate('change', { target: { value: 't' } });

        await new Promise(resolve => setTimeout(resolve, 500));
        wrapper.update();

        expect(wrapper.find(SearchResult).length).not.toBeTruthy();
    });

    it('should render snapshot', () => {
        const wrapper = shallow(<Search onSelect={onSelectMock} />);
        expect(wrapper).toMatchSnapshot();
    });
});