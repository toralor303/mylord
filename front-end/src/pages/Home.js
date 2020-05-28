import React from 'react';
import { Link } from 'react-router-dom';

import PlayerForm from '../components/PlayerForm';
import PlayerList from '../components/PlayerList';

const Home = (props) => {
  return (
    <>
      <PlayerForm players={props.players} setPlayers={props.setPlayers} />
      <PlayerList players={props.players} deletePlayer={props.deletePlayer} />
      {props.players.length > 1 ? (
        <Link to='/play'>Play !</Link>
      ) : (
        <button disabled>Play !</button>
      )}
    </>
  );
};

export default Home;
