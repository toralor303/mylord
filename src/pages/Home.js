import React from 'react';
import { Link } from 'react-router-dom';

import PlayerForm from '../components/PlayerForm';
import PlayerList from '../components/PlayerList';

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
    <>
      <PlayerForm players={players} setPlayers={setPlayers} />
      <PlayerList players={players} deletePlayer={deletePlayer} />
      {players.length > 1 ? (
        <Link to='/play' onClick={addPlayersToLocalStorage}>
          Play !
        </Link>
      ) : (
        <button disabled>Play !</button>
      )}
    </>
  );
};

export default Home;
