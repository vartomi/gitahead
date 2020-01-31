import { getRawData, getUsers, mapRawToUser, findUsers, searchOnGithub, User } from './users';
import 'jest-fetch-mock';
import { GITHUB_QUERY_PAGE_USERS } from '../configs/constants';
import mockUser from '../mock/users.json';

jest.mock('../mock/users.json');

Object.defineProperty(window, 'open', {
    configurable: true,
});
window.open = jest.fn();

describe('users service', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('getRawData should return', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockUser));
        const data: Array<User> = await getRawData('url');

        expect(fetchMock.mock.calls.length).toEqual(1);
        expect(fetchMock.mock.calls[0][0]).toEqual('url');
        expect(data[0]).not.toBeUndefined();
        expect(data[0].login).toEqual('test-login');
    });

    it('getUsers should return mock', async () => {
        const users = await getUsers();

        expect(users[0]).not.toBeUndefined();
        expect(users[0].avatar).toEqual('test-avatar');
    });

    it('getUsers should return api call', async () => {
        fetchMock.mockResponses(
            JSON.stringify(mockUser),
            JSON.stringify(mockUser[0]))
        const users = await getUsers(true);

        expect(users[0]).not.toBeUndefined();
        expect(users[0].avatar).toEqual('test-avatar');
    });

    it('findUsers should return', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockUser));
        const users = await findUsers('test');

        expect(users[0]).not.toBeUndefined();
        expect(users[0].login).toEqual('test-login');
    });

    it('mapRawToUser should return', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockUser));
        const rawData: Array<any> = await getRawData('url');
        const user = mapRawToUser(rawData[0]);

        expect(user).not.toBeUndefined();
        expect(user.avatar).toEqual(rawData[0].avatar_url);
    });

    it('getRawData should throw error', async () => {
        fetchMock.mockResponseOnce('', { status: 500 });
        try {
            await getRawData('url');
        } catch (error) {
            expect(error.message).toEqual('Internal Server Error');
        }
    });

    it('searchOnGithub should call window.open', () => {
        searchOnGithub('test');
        expect(window.open).toBeCalledWith(`${GITHUB_QUERY_PAGE_USERS}?q=test&type=users`);
    })
})
