import React from 'react';
import styles from './ProgressBar.module.css';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import classNames from 'classnames';

type ProgressBarProps = {
    compact?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ compact }) => {
    const size: number = compact ? 24 : 64;
    return (
        <div className={classNames(styles.container, { [styles.compact]: compact })}>
            <Logo height={size} width={size} className={styles.animation} />
            {!compact && <div>Loading...</div>}
        </div>
    );
}

export default ProgressBar;
