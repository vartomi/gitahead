import React, { useEffect, useState } from 'react';
import styles from './Container.module.css';
import Search from '../Search/Search';
import { User, getUsers } from '../../services/users';
import ProgressBar from '../ProgressBar/ProgressBar';
import UserProfile from '../UserProfile/UserProfile';

const Container: React.FC = () => {
    const [users, setUsers]: [User[] | null, any] = useState(null);
    const [selectedUser, setSelectedUser]: [User | null, any] = useState(null);

    useEffect(() => {
        getUsers().then(setUsers);
    }, []);

    return (
        <main className={styles.container}>
            {users ? <Search onSelect={setSelectedUser} /> : <ProgressBar />}
            {selectedUser && <UserProfile user={selectedUser} />}
        </main>
    );
}

export default Container;
