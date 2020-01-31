import { shallow } from 'enzyme';
import UserCard from './UserCard';
import React from 'react';
import { User } from '../../services/users';

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

describe('UserCard component', () => {

    it('should render snapshot', () => {
        const wrapper = shallow(<UserCard user={mockUser} onSelect={onSelectMock} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should trigger onSelect', () => {
        const wrapper = shallow(<UserCard user={mockUser} onSelect={onSelectMock} />);
        wrapper.simulate('click');

        expect(onSelectMock).toBeCalled();
    });
});