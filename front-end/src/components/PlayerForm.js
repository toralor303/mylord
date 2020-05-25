import React from 'react';
import { v4 as uuid } from 'uuid';

const PlayerForm = (props) => {
  const addPlayer = (e) => {
    props.setPlayers([
      ...props.players,
      { name: e.target.parentNode.children[0].value, uuid: uuid() },
    ]);

    //Clear the input
    e.target.parentNode.children[0].value = '';
  };

  return (
    <div>
      <input id='playerName' type='text' placeholder="Player's name"></input>
      <button onClick={(e) => addPlayer(e)}>Add</button>
    </div>
  );
};

export default PlayerForm;
