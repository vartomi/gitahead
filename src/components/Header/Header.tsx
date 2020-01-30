import React from 'react';
import styles from './Header.module.css';
import { ReactComponent as Logo } from '../../assets/logo.svg';

const Header: React.FC = () => {
  return (
    <header className={styles.container}>
      <Logo className={styles.logo} /><h3>GitAhead</h3>
    </header >
  );
}

export default Header;
