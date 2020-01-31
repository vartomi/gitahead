import mockUserList from '../mock/users.json';
import { USE_REAL_GITHUB_API } from '../configs/constants';

export interface User {
    id: number;
    login: string;
    avatar: string;
    url: string;
    name: string;
    blog: string;
    bio: string;
    email: string | null;
    company: string;
    location: string;
    nrOfRepositories: number;
    nrOfFollowers: number;
    nrOfFollowing: number;
    joinedAt: string;
}

const mapRawToUser: (rawData: any) => User = function ({ id, avatar_url, login, name, bio, blog, email, public_repos, followers, following, created_at, html_url, company, location }): User {
    return {
        id,
        login,
        avatar: avatar_url,
        url: html_url,
        name,
        blog,
        bio,
        email,
        location,
        company,
        nrOfRepositories: public_repos,
        nrOfFollowers: followers,
        nrOfFollowing: following,
        joinedAt: created_at
    };
}

let users: User[] = [];

const getRawData = async function (link: string): Promise<[]> {
    const response: Response = await fetch(link);
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    let rawData: [] = await response.json();
    return rawData;
}


export const getUsers = async function (): Promise<User[]> {

    if (USE_REAL_GITHUB_API) {
        let rawData: any = await getRawData('https://api.github.com/users')
        rawData = await Promise.all(rawData.map(async (data: any) => {
            const meta: any = await getRawData(data.url);
            return { ...data, ...meta };
        }));

        users = rawData.map(mapRawToUser);
        return users;
    } else {
        users = mockUserList.map(mapRawToUser);

        return new Promise((resolve, _) => {
            setTimeout(() => resolve(users), 0);
        });
    }
}


export const findUsers = function (searchValue: string): Promise<User[]> {
    const lowerCaseSearchValue = searchValue.toLowerCase();
    return new Promise((resolve, _) => {
        const result: User[] = users.filter(user =>
            user.login && user.login.toLowerCase().includes(lowerCaseSearchValue) || user.name && user.name.toLowerCase().includes(lowerCaseSearchValue)
        ).slice(0, 5);
        setTimeout(() => resolve(result), 0);
    });
};