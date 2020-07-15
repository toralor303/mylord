import React from 'react';
import styles from '../styles/css/play.module.css';

const Modal = ({ callback, choices }) => {
  return (
    <div className={styles.modal}>
      <ul>
        {choices.map((c) => {
          return (
            <li
              key={c.index}
              onClick={() => callback(c.index)}
              className={styles.label}>
              {c.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Modal;
