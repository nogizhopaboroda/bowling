import React from 'react';

import Frame from '../frame/frame';

import classNames from './frames-controller.css';


export default ({ gameData }) => {
    return (
      <table className={classNames.framesWrapper} cellSpacing="0" cellPadding="0">
        <thead className={classNames.framesHeader}>
          <tr>
            <td></td>
            {gameData[0].score.map((_, i) => (
              <td key={i}>{i + 1}</td>
            ))}
            <td>total</td>
          </tr>
        </thead>
        <tbody className={classNames.framesBody}>
          {gameData.map((user, i) => (
            <tr key={i}>
              <td>{user.name}</td>
              {user.score.map((turn, i) => (
                <td key={i}>
                  <Frame key={i} index={i} turn={turn}></Frame>
                 </td>
              ))}
              <td>{user.gameTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )

}
