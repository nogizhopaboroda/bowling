import React from 'react';
import ReactDOM from 'react-dom';

import GameController from './components/game-controller/game-controller'

const app = (
  <GameController></GameController>
)

ReactDOM.render(app, document.getElementById('app-container'));
