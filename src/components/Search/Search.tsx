import React, { useState, useCallback } from 'react';
import styles from './Search.module.css';
import SearchResult from './SearchResult';
import { User, findUsers, searchOnGithub } from '../../services/users';
import { THRESHOLD_CHARACTER_NUMBER_FOR_SEARCH, PLACEHOLDER_FOR_SEARCH_INPUT, Keys } from '../../configs/constants';
import ProgressBar from '../ProgressBar/ProgressBar';
import debounce from 'lodash.debounce';

type SearchProps = {
    onSelect: (user: User) => void;
}

const Search: React.FC<SearchProps> = ({ onSelect }) => {
    const [searchValue, setSearchValue]: [string, any] = useState('');
    const [top5Result, setTop5Result]: [User[], any] = useState([]);
    const [isLoading, setLoading]: [boolean, any] = useState(false);

    const debouncedSearch = useCallback(debounce((value: string) => {
        if (value.length >= THRESHOLD_CHARACTER_NUMBER_FOR_SEARCH) {
            setLoading(true);
            findUsers(value).then(result => { setLoading(false); setTop5Result(result) });
        } else {
            setTop5Result([]);
        }
    }, 300), []);

    const onSearchChange = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(value);
        debouncedSearch(value);
    }, [debouncedSearch]);

    const onSelectUser = useCallback((user: User) => {
        setSearchValue(user.name);
        setTop5Result([]);
        onSelect(user);
    }, [onSelect]);

    const onKeyUp = useCallback(({ keyCode }: React.KeyboardEvent<HTMLInputElement>) => {
        if (keyCode === Keys.Tab && top5Result.length > 0) {
            onSelectUser(top5Result[0]);
        } else if (keyCode === Keys.Enter) {
            searchOnGithub(searchValue);
        }
    }, [onSelectUser, top5Result, searchValue]);

    return (
        <div className={styles.container} onKeyUp={onKeyUp}>
            <input
                id={'search-input'}
                className={styles.input}
                placeholder={PLACEHOLDER_FOR_SEARCH_INPUT}
                type="text"
                value={searchValue}
                onChange={onSearchChange}
            />
            {isLoading && <ProgressBar compact={true} />}
            {top5Result.length > 0 && <SearchResult users={top5Result} onSelect={onSelectUser} />}
        </div>
    );
}

export default Search;
