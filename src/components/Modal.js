import React from 'react';

const Modal = ({ callback, choices }) => {
  return (
    <div>
      <ul>
        {choices.map((c) => {
          return (
            <li key={c.index} onClick={() => callback(c.index)}>
              {c.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Modal;
