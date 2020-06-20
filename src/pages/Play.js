import React, { useState, useRef } from 'react';

const Play = () => {
  // Try to get all values from localStorage, with default values if nothing in localStorage
  const players = JSON.parse(localStorage.getItem('players'));
  const [currentPlayer, setCurrentPlayer] = useState(
    JSON.parse(localStorage.getItem('currentPlayer'))
  );
  const [turnCounter, setTurnCounter] = useState(
    parseInt(localStorage.getItem('turnCounter')) || 0
  );
  const [dice, setDice] = useState(JSON.parse(localStorage.getItem('dice')) || [1, 1]);
  const [joker, setJoker] = useState(JSON.parse(localStorage.getItem('joker')) || null);
  const [calculateRules, setCalculateRules] = useState(false);

  let rules = JSON.parse(localStorage.getItem('rules')) || [];

  const btnRef = useRef();

  // Compute the rules that apply
  if (dice !== JSON.parse(localStorage.getItem('dice')) && calculateRules) {
    // calculateRules();
    rules = [];
    const doubled = dice[0] === dice[1];
    const added = dice[0] + dice[1];
    const three = dice[0] === 3 || dice[1] === 3;

    if (doubled) rules.push(`Choose someone to take ${dice[0]} sip(s).`);
    if (added === 3) rules.push(`Choose a new joker.`);
    if (added === 5)
      rules.push(
        `The last person to say MyLord with a hand on their heart has to take a sip.`
      );
    if (added === 7) rules.push(`Cheers! Everyone takes a sip!`);
    if (three) {
      console.log('A 3 has been rolled');
      if (joker === null) {
        console.log(`No joker yet, ${currentPlayer.name} is now the new joker.`);
        rules.push(`You are now the joker.`);
        setJoker(currentPlayer);
      } else {
        console.log(
          'Joker exists: ' + JSON.stringify(joker),
          currentPlayer,
          joker != currentPlayer,
          joker !== currentPlayer
        );
        if (currentPlayer.index !== joker.index) {
          rules.push(
            doubled
              ? `The joker (${joker.name}) has to take 2 sips`
              : `The joker (${joker.name}) has to take 1 sip`
          );
        } else {
          console.log(
            'CurrentPlayer is the joker, he gets out of it ' + currentPlayer.name
          );
          rules.push('You are no longer the joker.');
          setJoker(null);
        }
      }
    }

    setCalculateRules(false);
    localStorage.setItem('rules', JSON.stringify(rules));

    // Store dice values in localStorage
    localStorage.setItem('dice', JSON.stringify(dice));
  }

  const nextPlayer = () => {
    setTurnCounter(turnCounter + 1);
    localStorage.setItem('turnCounter', turnCounter);

    const next = players[currentPlayer.index + 1];
    next ? setCurrentPlayer(next) : setCurrentPlayer(players[0]);
    // Store currentPlayer in localStorage
    localStorage.setItem('currentPlayer', JSON.stringify(currentPlayer));
  };

  const rollTheDice = () => {
    setCalculateRules(true);
    setTurnCounter(turnCounter + 1);
    setDice([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]);
  };

  return (
    <>
      <h1>MyLord</h1>
      <h3>{currentPlayer ? currentPlayer.name : null}</h3>
      <div>
        <img alt={`Dice value (${dice[0]})`} src={`/images/${dice[0]}.svg`}></img>
        <img alt={`Dice value (${dice[1]})`} src={`/images/${dice[1]}.svg`}></img>
      </div>
      <div>{turnCounter % 2 === 0 ? null : rules.map((r) => <div key={r}>{r}</div>)}</div>
      {currentPlayer ? (
        turnCounter % 2 === 0 ? (
          <button onClick={() => rollTheDice()}>Roll the dice</button>
        ) : (
          <button onClick={() => nextPlayer()}>Next player</button>
        )
      ) : (
        <button
          onClick={() => {
            localStorage.setItem('currentPlayer', JSON.stringify(players[0]));
            setCurrentPlayer(players[0]);
          }}>
          Start playing
        </button>
      )}
      <div>{joker ? joker.name : ''}</div>
    </>
  );
};

export default Play;
