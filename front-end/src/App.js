import React, { useState } from 'react';
import PlayerForm from './components/PlayerForm';
import PlayerList from './components/PlayerList';

const App = () => {
  const [players, setPlayers] = useState([]);

  const deletePlayer = (uuid) => {
    setPlayers(players.filter((player) => player.uuid !== uuid));
  };

  return (
    <div className='App'>
      <PlayerForm players={players} setPlayers={setPlayers} />
      <PlayerList players={players} deletePlayer={deletePlayer} />
      {players.length > 1 ? (
        <button onClick={() => console.log('test')}>Play !</button>
      ) : (
        <button disabled>Play !</button>
      )}
    </div>
  );
};

export default App;
