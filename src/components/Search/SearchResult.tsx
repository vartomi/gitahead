import React from 'react';
import styles from './SearchResult.module.css';
import { User } from '../../services/users';
import UserCard from '../UserProfile/UserCard';

type SearchResultProps = {
    users: User[];
    onSelect: any;
}

const SearchResult: React.FC<SearchResultProps> = ({ users, onSelect }) => {
    return (
        <div className={styles.container}>
            {users.map(user => <UserCard user={user} onSelect={onSelect} />)}
        </div>
    );
}

export default SearchResult;
