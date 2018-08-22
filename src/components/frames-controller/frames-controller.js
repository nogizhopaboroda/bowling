import React from 'react';

import Frame from '../frame/frame';


const FRAMES = 10;
const framesArr = new Array(10).fill(null);

export default ({ gameData }) => {
  return gameData.map((user, i) => {
    return (
      <div style={{border: '1px solid'}} key={i}>
        {user.score.map((turn, i) => (
          <Frame key={i} index={i} turn={turn}></Frame>
        ))}
      </div>
    )
  });
}
