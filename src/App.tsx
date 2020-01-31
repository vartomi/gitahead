import React from 'react';
import styles from './App.module.css';
import Header from './components/Header/Header';
import Container from './components/Container/Container';

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Header />
      <Container />
    </div>
  );
}

export default App;
