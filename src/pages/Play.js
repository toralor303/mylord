import React, { useState } from 'react';
import Modal from '../components/Modal';
import styles from '../styles/css/play.module.css';

const Play = () => {
  // Try to get all values from localStorage, with default values if nothing in localStorage
  const players = JSON.parse(localStorage.getItem('players'));
  const [currentPlayer, setCurrentPlayer] = useState(
    JSON.parse(localStorage.getItem('currentPlayer') || null)
  );
  const [turnCounter, setTurnCounter] = useState(
    parseInt(localStorage.getItem('turnCounter')) || 0
  );
  const [dice, setDice] = useState(
    JSON.parse(localStorage.getItem('dice')) || [1, 1]
  );
  const [joker, setJoker] = useState(
    JSON.parse(localStorage.getItem('joker')) || null
  );
  const [lords, setLords] = useState(
    JSON.parse(localStorage.getItem('lords')) || []
  );

  const [calculateRules, setCalculateRules] = useState(JSON.parse(localStorage.getItem('calculateRules')));
  const [showJokerModal, setShowJokerModal] = useState(JSON.parse(localStorage.getItem('setShowJokerModal')));
  const [showLordsModal, setShowLordsModal] = useState(JSON.parse(localStorage.getItem('setShowLordsModal')));

  let rules = JSON.parse(localStorage.getItem('rules')) || [];

  const saveTurnToLocalStorage = () => {
    localStorage.setItem('players', JSON.stringify(players)); // Useless since they never change. Added this line in case of future features
    localStorage.setItem('currentPlayer', JSON.stringify(currentPlayer));
    localStorage.setItem('turnCounter', JSON.stringify(turnCounter));
    localStorage.setItem('dice', JSON.stringify(dice));
    localStorage.setItem('joker', JSON.stringify(joker));
    localStorage.setItem('lords', JSON.stringify(lords));
    localStorage.setItem('calculateRules', JSON.stringify(calculateRules));
    localStorage.setItem('showJokerModal', JSON.stringify(showJokerModal));
    localStorage.setItem('showLordsModal', JSON.stringify(showLordsModal));
    localStorage.setItem('rules', JSON.stringify(rules));
  }

  // Compute the rules that apply
  if (
    dice !== JSON.parse(localStorage.getItem('dice')) &&
    calculateRules
  ) {
    rules = [];
    const doubled = dice[0] === dice[1];
    const added = dice[0] + dice[1];
    const three = dice[0] === 3 || dice[1] === 3;

    if (doubled)
      rules.push(`Choose someone to take ${dice[0]} sip(s).`);
    if (added === 5)
      rules.push(
        `The last person to say MyLord with a hand on their heart has to take a sip.`
      );
    if (added === 7) rules.push(`Cheers! Everyone takes a sip!`);
    if (three) {
      if (joker === null) {
        rules.push(`You are now the joker.`);
        setJoker(currentPlayer);
        saveTurnToLocalStorage();
      } else {
        if (
          currentPlayer ? currentPlayer.index !== joker.index : false
        ) {
          rules.push(
            doubled
              ? `The joker (${joker.name}) has to take 2 sips`
              : `The joker (${joker.name}) has to take 1 sip`
          );
        } else {
          rules.push('You are no longer the joker.');
          setJoker(null);
          saveTurnToLocalStorage();
        }
      }
    }
    if (added === 3) {
      rules.push(`Choose a new joker:`);
      setShowJokerModal(true);
    }
    if (added === 12) {
      // Choose a new lord to add to the list
      if ((lords.length + 1) % players.length !== 0) {
        setShowLordsModal(true);
      }
      // Reset lords list
      else {
        rules.push(
          'Maximum number of lords reached. Everyone loose their lord role. You can cancel any of the rules set by a lord.'
        );
        setLords([]);
      }
    }

    setCalculateRules(false);
    saveTurnToLocalStorage();
  }

  const nextPlayer = () => {
    if (!showJokerModal && !showLordsModal) {
      setTurnCounter(turnCounter + 1);

      const next = players[currentPlayer.index + 1];
      next ? setCurrentPlayer(next) : setCurrentPlayer(players[0]);

      // In this case, we need to save the turn without the method because the state doesn't have time to update
      localStorage.setItem('currentPlayer', JSON.stringify(next ? next : players[0]));
      localStorage.setItem('turnCounter', JSON.stringify(turnCounter + 1));
    }
  };

  const rollTheDice = () => {
    setCalculateRules(true);
    setTurnCounter(turnCounter + 1);
    setDice([
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ]);
    saveTurnToLocalStorage();
  };

  const chooseNewJoker = (idx) => {
    setJoker(players.filter((p) => p.index === idx)[0]);
    setShowJokerModal(false);
    saveTurnToLocalStorage();
  };

  const chooseNewLord = (idx) => {
    setLords([...lords, players.filter((p) => p.index === idx)[0]]);
    setShowLordsModal(false);
    saveTurnToLocalStorage();
  };

  const modals = () => {
    if (showJokerModal) {
      return (
        <Modal
          role='joker'
          callback={(idx) => chooseNewJoker(idx)}
          choices={players.filter((p) => {
            return joker ? p.index !== joker.index : true;
          })}
        />
      );
    }

    if (showLordsModal) {
      return (
        <Modal
          role='lord'
          callback={(idx) => chooseNewLord(idx)}
          choices={players.filter((p) => {
            return lords.map((l) => l.name).indexOf(p.name) === -1;
          })}
        />
      );
    }
  };

  return (
    <div className={styles.page}>
        <h1 className={styles.title}>MyLord</h1>
        <h3 className={styles.playerName}>
          {currentPlayer ? currentPlayer.name + "'s turn" : null}
        </h3>
        <div className={styles.dices}>
          <img
            alt={`Dice value (${dice[0]})`}
            src={`/images/${dice[0]}.svg`}
            className={styles.dice1}></img>
          <img
            alt={`Dice value (${dice[1]})`}
            src={`/images/${dice[1]}.svg`}
            className={styles.dice2}></img>
        </div>
        <div className={styles.rules}>
          {turnCounter % 2 === 0
            ? null
            : rules.map((r) => <div key={r}>{r}</div>)
          }
        </div>
        {modals()}
        {currentPlayer ? (
          turnCounter % 2 === 0 ? (
            <button
              onClick={() => rollTheDice()}
              className={styles.btnRoll}>
              Roll the dice
            </button>
          ) : (
            <button
              onClick={() => nextPlayer()}
              className={styles.btnNext}>
              Next player
            </button>
          )
        ) : (
          <button
            onClick={() => {
              localStorage.setItem(
                'currentPlayer',
                JSON.stringify(players[0])
              );
              setCurrentPlayer(players[0]);
            }}
            className={styles.btnStart}>
            Start playing
          </button>
        )}
    </div>
  );
};

export default Play;
