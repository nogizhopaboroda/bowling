import React from 'react';

import classNames from './frame.css';


export default ({ index, turn, total }) => {
  return (
    <div className={classNames.frameWrapper}>
      <div className={classNames.frameHeader}>{turn.map((roll, i) => (
        <span key={i}>{roll}</span>
      ))}</div>
      <div className={classNames.frameTotal}>{total}</div>
    </div>
  )
}
