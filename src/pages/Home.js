import React from 'react';
import { Link } from 'react-router-dom';

import PlayerForm from '../components/PlayerForm';
import PlayerList from '../components/PlayerList';

import styles from '../styles/css/home.module.css';

const Home = ({ players, setPlayers, deletePlayer }) => {
  let index = 0;
  const addPlayersToLocalStorage = () => {
    players.forEach((p) => {
      p.index = index++;
    });
    localStorage.clear();
    localStorage.setItem('players', JSON.stringify(players));
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>MyLord</h1>
      <div>
        <PlayerForm players={players} setPlayers={setPlayers} />
        <PlayerList players={players} deletePlayer={deletePlayer} />
      </div>
      {players.length > 2 ? (
        <Link
          to='/play'
          onClick={addPlayersToLocalStorage}
          className={styles.btnPlay}>
          Play !
        </Link>
      ) : (
        <button disabled className={styles.btnPlayDisabled}>
          Play !
        </button>
      )}
    </div>
  );
};

export default Home;
