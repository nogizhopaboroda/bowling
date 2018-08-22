import React from 'react';


export default ({ index, turn }) => {
  return (
    <div style={{
      display: 'inline-block',
      border: '1px solid green'
    }}>Frame: {index} {JSON.stringify(turn)}</div>
  )
}
