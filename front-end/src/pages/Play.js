import React, { useState } from 'react';

const Play = () => {
  const players = JSON.parse(localStorage.getItem('players'));
  let currentPlayer = null;
  const [joker, setJoker] = useState(null);
  const [lords, setLords] = useState([]);
  const [dice, setDice] = useState([
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
  ]);
  const [rule, setRule] = useState('');

  const nextTurn = () => {
    // Setting next player
    if (currentPlayer === null) currentPlayer = players[0];
    console.log(players);
    console.log(currentPlayer);
    const nextPlayerIndex = players.map((p) => p.name).indexOf(currentPlayer.name) + 1;
    if (nextPlayerIndex >= players.length) currentPlayer = players[0];
    else currentPlayer = players[nextPlayerIndex];

    // Getting new dice values
    setDice([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]);

    setRule(calculateRules(dice[0], dice[1]).map((rule) => rule + '\n'));
  };

  const calculateRules = (nb1, nb2) => {
    const doubled = nb1 === nb2;
    const added = nb1 + nb2;
    const three = nb1 === 3 || nb2 === 3;
    let newJoker;
    let rules = [];

    if (doubled) rules.push(`Choose someone to take ${nb1} sip(s).`);
    if (added === 3) rules.push(`Choose a new joker.`);
    if (added === 5)
      rules.push(
        `The last person to say MyLord with a hand on their heart has to take a sip.`
      );
    if (added === 7) rules.push(`Cheers! Everyone takes a sip!`);
    if (three) {
      if (joker === null) {
        rules.push(`You are now the joker.`);
        newJoker = currentPlayer;
        console.log('joker now set (if)');
      } else {
        console.log('make the joker drink (else)');
        rules.push(
          doubled
            ? `The joker (${joker.name}) has to take 2 sips`
            : `The joker (${joker.name}) has to take 1 sip`
        );
      }
    }
    if (added === 12) {
      // Lords
      if (players.length - 1 > lords.length) {
        rules.push('You are now lord. Make a new rule and demand respect.');
        setLords(currentPlayer);
      } else {
        rules.push(
          'Everyone looses their lord status. You can choose to keep the rules made up by the lords or not.'
        );
      }
    }

    if (newJoker) setJoker(newJoker);
    return rules;
  };

  // console.log(calculateRules(6, 6));

  return (
    <>
      <h1>MyLord</h1>
      <p>{currentPlayer ? `${currentPlayer.name}'s turn` : ''}</p>
      <div className='dice'>
        <img alt={dice[0]} src={`images/${dice[0]}.svg`}></img>
        <img alt={dice[1]} src={`images/${dice[1]}.svg`}></img>
      </div>
      <p>{rule}</p>
      <button onClick={() => nextTurn()}>Roll the dice</button>

      <div className='modal'></div>
      <div className='modal'></div>
    </>
  );
};

export default Play;
