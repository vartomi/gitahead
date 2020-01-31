import { shallow } from 'enzyme'
import UserProfile from './UserProfile';
import React from 'react';
import { User } from '../../services/users';

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

describe('UserProfile component', () => {

    it('should render snapshot', () => {
        const wrapper = shallow(<UserProfile user={mockUser} />)
        expect(wrapper).toMatchSnapshot();
    });
});