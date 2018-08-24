import React from 'react';

import classNames from './frame.css';


const renderHeader = ({ strike, spare, turnScore, turnTotal, sum }) => {
  return turnScore.map((roll, i) => spare && i === turnScore.length - 1 ? (
    <span key={i}>/</span>
  ) : (
    <span key={i}>{roll === 10 ? 'X' : roll}</span>
  ))
}

export default ({ index, turn }) => {
  const { turnScore, gameTotal } = turn;
  return (
    <div className={classNames.frameWrapper}>
      <div className={classNames.frameHeader}>{renderHeader(turn)}</div>
      <div className={classNames.frameTotal}>{gameTotal}</div>
    </div>
  )
}
