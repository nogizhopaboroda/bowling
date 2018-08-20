import React from 'react';


export default ({ player, turn }) => {
  return (
    <div style={{border: '1px solid'}}>
      <div>Player name: {player}</div>
      <div>Turn #{turn}</div>
      <div>{new Array(10).fill('| ').join('')}</div>
      <button onClick={console.log}>roll</button>
    </div>
  )
}
