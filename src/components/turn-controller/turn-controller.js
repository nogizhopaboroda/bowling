import React from 'react';

const getRandom = (max = 10) => {
  return Math.floor(Math.random() * (max + 1));
}

const sum = (arr) => arr.reduce((acc, item) => acc + item, 0);

export default ({ player, turn, roll, handleClick, finished }) => {
  console.log(player);
  const turnData = player.score[turn];
  const turnTotal = sum(turnData);
  const rest = 10 - turnTotal;
  return (
    <div style={{border: '1px solid'}}>
      <div>Player name: {player.name}</div>
      <div>Turn #{turn}</div>
      <div>Roll #{roll}</div>
      <span>{new Array(rest).fill('| ').join('')}</span>
      <span style={{color: 'red'}}>{new Array(turnTotal).fill('| ').join('')}</span>
      <button disabled={finished} onClick={() => {
        setTimeout(() => {
          handleClick(getRandom(rest));
        }, 300);
      }}>roll</button>
    </div>
  )
}
