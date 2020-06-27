import React from 'react';
import styles from '../styles/css/home.module.css';

const PlayerList = (props) => {
  return (
    <div className={styles.container}>
      <span className={styles.playercounter}>{`${props.players.length}/8`}</span>
      <ul className={styles.playerlist}>
        {props.players.map((player) => (
          <li key={player.index}>
            {player.name}
            <button
              onClick={(e) => {
                e.target.parentNode.className = styles.deletedItem;
                setTimeout(() => props.deletePlayer(player.index), 1000);
              }}
              className={styles.btnDel}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
