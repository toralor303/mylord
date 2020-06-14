import React, { useState, useEffect, useCallback } from 'react';

const Play = () => {
  // Try to get all values from localStorage, with default values if nothing in localStorage
  const players = JSON.parse(localStorage.getItem('players'));
  const [currentPlayer, setCurrentPlayer] = useState(
    JSON.parse(localStorage.getItem('currentPlayer'))
  );
  const [turnCounter, setTurnCounter] = useState(
    localStorage.getItem('turnCounter') || 0
  );
  const [dice, setDice] = useState(JSON.parse(localStorage.getItem('dice')) || [1, 1]);

  let rules = JSON.parse(localStorage.getItem('rules')) || [];

  // console.log('---------\nRENDER\n---------');
  // console.log('TURN COUNTER: ' + turnCounter);
  // console.log('DICE VALUES: ' + dice[0] + ' and ' + dice[1]);
  // console.log(`players: ${players.map((p) => JSON.stringify(p) + '\n\n')}`);
  // console.log(`currentPlayer: ${JSON.stringify(currentPlayer)}`);

  // const calculateRules = useCallback(() => {
  //   const doubled = dice[0] === dice[1];
  //   const added = dice[0] + dice[1];
  //   const three = dice[0] === 3 || dice[1] === 3;

  //   if (doubled) rules.push(`Choose someone to take ${dice[0]} sip(s).`);
  //   if (added === 3) rules.push(`Choose a new joker.`);
  //   if (added === 5)
  //     rules.push(
  //       `The last person to say MyLord with a hand on their heart has to take a sip.`
  //     );
  //   if (added === 7) rules.push(`Cheers! Everyone takes a sip!`);

  //   localStorage.setItem('rules', JSON.stringify(rules));

  //   console.log('Calculated the rules:');
  //   console.log(JSON.stringify(rules));
  // }, [dice, rules]);

  useEffect(() => {
    // Get the rules
    if (dice === JSON.parse(localStorage.getItem('dice')));
    {
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

      localStorage.setItem('rules', JSON.stringify(rules));

      console.log('Calculated the rules:');
      console.log(JSON.stringify(rules));
    }
    return () => {
      // Store dice values in localStorage
      localStorage.setItem('dice', JSON.stringify(dice));
      console.log('Stored dice values: ' + JSON.stringify(dice));
    };
  }, []);

  const nextPlayer = () => {
    // console.log('---------\nNEXTPLAYER()\n---------');
    setTurnCounter(turnCounter + 1);
    localStorage.setItem('turnCounter', turnCounter);

    const next = players[currentPlayer.index + 1];
    next ? setCurrentPlayer(next) : setCurrentPlayer(players[0]);
    // Store currentPlayer in localStorage
    localStorage.setItem('currentPlayer', JSON.stringify(currentPlayer));
    // console.log('Stored the current player: ' + JSON.stringify(currentPlayer));
  };

  const rollTheDice = () => {
    // console.log('---------\nROLLING THE DICE\n---------');
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
      <div>{turnCounter % 2 === 0 ? null : rules.map((r) => <div>{r}</div>)}</div>
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
      <div>State dice values: {JSON.stringify(dice)}</div>
      <div>localStorage dice values: {localStorage.getItem('dice')}</div>
    </>
  );
};

export default Play;
