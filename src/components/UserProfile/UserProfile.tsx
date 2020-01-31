import React from 'react';
import styles from './UserProfile.module.css';
import { User } from '../../services/users';
import { ReactComponent as LocationIcon } from '../../assets/location.svg';
import { ReactComponent as BlogIcon } from '../../assets/blog.svg';
import { ReactComponent as CompanyIcon } from '../../assets/company.svg';

type UserProfileProps = {
    user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user: { url, login, name, avatar, blog, bio, nrOfFollowers, nrOfRepositories, nrOfFollowing, company, location, joinedAt } }) => {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.imgContainer}><img src={avatar} className={styles.img} alt="avatar" /></div>
                <div className={styles.profileContainer}>
                    <div className={styles.userHeader}>
                        <div className={styles.userName}><strong>{name}</strong></div>
                        <div>{login}</div>
                    </div>
                    <div className={styles.userMain}>
                        {company && <div><CompanyIcon />{company}</div>}
                        {location && <div><LocationIcon />{location}</div>}
                        {blog && <div><BlogIcon /><a href={blog}>{blog}</a></div>}
                        <p>{bio}</p>
                    </div>
                    <div className={styles.userFooter}>
                        <span>Following </span><span className={styles.value}>{nrOfFollowing}</span>
                        <span>Followers </span><span className={styles.value}>{nrOfFollowers}</span>
                        <span>Repositories </span><span className={styles.value}>{nrOfRepositories}</span>
                    </div>
                </div>
            </div>
            <a className={styles.buttonLink} href={url}>Open in GitHub</a>
        </div>
    );
}

export default UserProfile;
