import React from 'react';
import styles from './UserCard.module.css';
import { User } from '../../services/users';

type UserCardProps = {
    user: User;
    onSelect: any;
}

const UserCard: React.FC<UserCardProps> = ({ user, onSelect }) => {
    const { login, name, avatar, bio, nrOfFollowers, nrOfRepositories, nrOfFollowing } = user;
    return (
        <div className={styles.container} onClick={() => onSelect(user)} tabIndex={0}>
            <div className={styles.imgContainer}><img src={avatar} className={styles.img} alt="avatar" /></div>
            <div className={styles.profileContainer}>
                <div className={styles.userHeader}>
                    <span><strong>{name}</strong></span>
                    <span>{login}</span>
                </div>
                <div className={styles.userMain}>{bio}</div>
                <div className={styles.userFooter}>
                    <span>Following </span><span className={styles.value}>{nrOfFollowing}</span>
                    <span>Followers </span><span className={styles.value}>{nrOfFollowers}</span>
                    <span>Repositories </span><span className={styles.value}>{nrOfRepositories}</span>
                </div>
            </div>
        </div >
    );
}

export default UserCard;
