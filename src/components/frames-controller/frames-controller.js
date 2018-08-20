import React from 'react';

import Frame from '../frame/frame';


const FRAMES = 10;
const framesArr = new Array(10).fill(null);

export default ({ gameData }) => {
  return Object.keys(gameData).map((i) => {
    return (
      <div style={{border: '1px solid'}} key={i}>
        {framesArr.map((_, i) => (
          <Frame key={i} index={i}></Frame>
        ))}
      </div>
    )
  });
}
