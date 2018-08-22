import React from 'react';


export default ({ index, turn, total }) => {
  return (
    <div style={{
      display: 'inline-block',
      border: '1px solid green'
    }}>Frame: {index} {JSON.stringify(turn)}, Total: {total}</div>
  )
}
