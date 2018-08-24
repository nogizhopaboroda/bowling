import React from 'react';


export default ({ index, turn, total }) => {
  return (
    <div style={{
      display: 'inline-block',
      border: '1px solid green',
      height: '45px',
      width: '100px'
    }}>
      <div style={{
        border: '1px solid red',
        height: '50%'
      }}>{turn.map((roll, i) => (
        <span key={i}>{roll}</span>
      ))}</div>
      <div style={{
        border: '1px solid blue',
        height: '50%'
      }}>{total}</div>
    </div>
  )
}
