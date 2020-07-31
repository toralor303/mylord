import React from 'react';
import { v4 as uuid } from 'uuid';

import styles from '../styles/css/home.module.css';

const PlayerForm = (props) => {
  const addPlayer = (e) => {
    if (
      e.target.parentNode.children[1].value !== '' &&
      props.players.length < 8
    ) {
      props.setPlayers([
        ...props.players,
        {
          name: e.target.parentNode.children[1].value,
          index: uuid(),
        },
      ]);

      //Clear the input
      e.target.parentNode.children[1].value = '';
    }
  };

  return (
    <form autoComplete='off' className={styles.playerform}>
      <label>Player's name</label>
      <input id='playerName' type='text' maxLength='25'></input>
      <button
        className={
          props.players.length < 8
            ? styles.btnAdd
            : styles.btnAddDeactivated
        }
        type='submit'
        onClick={(e) => {
          e.preventDefault();
          addPlayer(e);
        }}>
        +
      </button>
    </form>
  );
};

export default PlayerForm;
