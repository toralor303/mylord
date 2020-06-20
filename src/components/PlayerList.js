import React from 'react';

const PlayerList = (props) => {
  return (
    <ul>
      {props.players.map((player) => (
        <li key={player.index}>
          {player.name}
          <button onClick={() => props.deletePlayer(player.index)}>X</button>
        </li>
      ))}
    </ul>
  );
};

export default PlayerList;