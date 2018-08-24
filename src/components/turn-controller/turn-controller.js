import React from 'react';

import classNames from './turn-controller.css';

const getRandom = (max = 10) => {
  return Math.floor(Math.random() * (max + 1));
}

const sum = (arr) => arr.reduce((acc, item) => acc + item, 0);

export default ({ player, turn, roll, handleClick, finished, showScored }) => {
  const { turnScore, strike, spare, turnTotal = 0, restPins = 10 } = player.score[turn];
  return (
    <div className={classNames.turnWrapper}>
      <div className={classNames.turnInfoWrapper}>
        <span>Player name: <strong>{player.name}</strong></span>
        <span>Turn <strong>#{turn + 1}</strong></span>
        <span>Roll <strong>#{roll + 1}</strong></span>
      </div>
      <div className={classNames.rollButtonsWrapper}>
        <button disabled={finished} onClick={() => handleClick(getRandom(restPins))}>random</button>
        {new Array(restPins + 1).fill(null).map((_, index) => (
          <button key={index} disabled={finished} onClick={() => handleClick(index)}>
            {index}
          </button>
        ))}
      </div>
      <div>
      </div>
    </div>
  )
}
