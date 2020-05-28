import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Play from './pages/Play';

const App = () => {
  const [players, setPlayers] = useState([]);

  const deletePlayer = (uuid) => {
    setPlayers(players.filter((player) => player.uuid !== uuid));
  };

  return (
    <div className='App'>
      <Router>
        <Switch>
          {/* Home/Setup page */}
          <Route path='/' exact>
            <Home players={players} setPlayers={setPlayers} deletePlayer={deletePlayer} />
          </Route>
          <Route path='/play' exact>
            <Play players={players} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
