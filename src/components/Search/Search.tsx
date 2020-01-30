import React, { useState } from 'react';
import styles from './Search.module.css';
import SearchResult from './SearchResult';
import { User, findUsers } from '../../services/users';
import { THRESHOLD_CHARACTER_NUMBER_FOR_SEARCH } from '../../configs/constants';

type SearchProps = {
    onSelect: any;

}

const Search: React.FC<SearchProps> = ({ onSelect }) => {
    const [searchValue, setSearchValue]: [string, any] = useState('');
    const [top5Result, setTop5Result]: [User[], any] = useState([]);

    const onSearchChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(value);
        if (value.length >= THRESHOLD_CHARACTER_NUMBER_FOR_SEARCH) {
            findUsers(value).then(setTop5Result);
        } else {
            setTop5Result([]);
        }
    }

    const onSelectUser = (user: User) => {
        setSearchValue(user.name);
        setTop5Result([]);
        onSelect(user);
    }

    const onKeyUp = ({ keyCode }: React.KeyboardEvent<HTMLInputElement>) => {
        if (keyCode === 9 && top5Result.length > 0) {
            onSelectUser(top5Result[0]);
        }
    }

    return (
        <div className={styles.container} onKeyUp={onKeyUp}>
            <input
                className={styles.input}
                placeholder={'Search for GitHub users...'}
                type="text"
                value={searchValue}
                onChange={onSearchChange}
            />
            {top5Result.length > 0 && <SearchResult users={top5Result} onSelect={onSelectUser} />}
        </div>
    );
}

export default Search;
