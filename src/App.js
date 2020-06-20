import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Play from './pages/Play';

const App = () => {
  const [players, setPlayers] = useState([]);

  const deletePlayer = (i) => {
    setPlayers(players.filter((player) => player.index !== i));
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
            <Play />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
