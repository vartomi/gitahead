import { shallow } from 'enzyme'
import SearchResult from './SearchResult';
import React from 'react';
import { User } from '../../services/users';
import UserCard from '../UserProfile/UserCard';

const onSelectMock = jest.fn(() => { });
const mockUser: User = {
    id: 1,
    name: 'name',
    login: 'login',
    avatar: 'avatar',
    url: 'url',
    blog: 'blog',
    email: 'email',
    bio: 'bio',
    company: 'company',
    location: 'location',
    joinedAt: 'date',
    nrOfFollowers: 0,
    nrOfFollowing: 0,
    nrOfRepositories: 0
};

describe('SearchResult component', () => {
    it('should be rendered without UserCards', () => {
        const users: User[] = [];
        const wrapper = shallow(<SearchResult users={users} onSelect={onSelectMock} />);
        expect(wrapper.find(UserCard).length).toEqual(0);
    });

    it('should be rendered with UserCards', () => {
        const users: User[] = [mockUser];
        const wrapper = shallow(<SearchResult users={users} onSelect={onSelectMock} />);
        expect(wrapper.find(UserCard).length).toEqual(1);
    });

    it('should render snapshot', () => {
        const users: User[] = [mockUser];
        const wrapper = shallow(<SearchResult users={users} onSelect={onSelectMock} />);
        expect(wrapper).toMatchSnapshot();
    });
});