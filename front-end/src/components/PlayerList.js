import React from 'react';

const PlayerList = (props) => {
  return (
    <ul>
      {props.players.map((player) => (
        <li key={player.uuid}>
          {player.name}
          <button onClick={() => props.deletePlayer(player.uuid)}>X</button>
        </li>
      ))}
    </ul>
  );
};

export default PlayerList;
