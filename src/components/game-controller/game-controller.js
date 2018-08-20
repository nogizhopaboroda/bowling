import React from 'react';

import FramesController from '../frames-controller/frames-controller';
import TurnController from '../turn-controller/turn-controller';

const players = ['John'];
const gameData = players.map((player, index) => ({
  [player]: {
    id: index,
    score: []
  }
}));

export default () => (
  <div>
    <FramesController gameData={gameData}></FramesController>
    <TurnController player={players[0]} turn={1}></TurnController>
  </div>
)
