import React from 'react';

const getRandom = (max = 10) => {
  return Math.floor(Math.random() * (max + 1));
}

const sum = (arr) => arr.reduce((acc, item) => acc + item, 0);

export default ({ player, turn, roll, handleClick, finished, showScored }) => {
  const { turnScore, strike, spare, turnTotal = 0, restPins = 10 } = player.score[turn];
  return (
    <div style={{border: '1px solid'}}>
      <div>Player name: {player.name}</div>
      <div>Turn #{turn}</div>
      <div>Roll #{roll}</div>
      <span>{new Array(restPins).fill('| ').join('')}</span>
      <span style={{color: 'red'}}>{new Array(turnTotal).fill('| ').join('')}</span>
      {showScored ? (
        <div> you scored {player.score[turn].turnScore[roll]}({turnTotal})</div>
      ) : void 0}
      <div>
        <button disabled={finished} onClick={() => {
          setTimeout(() => {
            handleClick(getRandom(restPins));
          }, 300);
        }}>roll</button>
      </div>
    </div>
  )
}
