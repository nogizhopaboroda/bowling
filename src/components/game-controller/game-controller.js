import React from 'react';

import createGame from './game-generator';

import FramesController from '../frames-controller/frames-controller';
import TurnController from '../turn-controller/turn-controller';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.initGame(props);
  }

  initGame({ players }){
    this.game = createGame(players);
    const { done, value } = this.game.next();
    if(this.state){
      this.setState(Object.assign({}, value, { done }));
      return;
    }
    this.state = value;
  }

  roll(scored){
    const { value, done } = this.game.next(scored);
    const player = value.players[this.state.currentPlayer];

    this.setState(Object.assign({}, value, { done }));
  }

  render(){
    return (
      <div>
        <FramesController gameData={this.state.players}></FramesController>
        {this.state.done ? (
          <button onClick={() => this.initGame({ players: ['Jake', 'Morgan', 'Andrew'] })}>once again</button>
        ) : (
          <TurnController player={this.state.players[this.state.currentPlayer]}
                          turn={this.state.currentTurn}
                          roll={this.state.currentRoll}
                          finished={this.state.done}
                          showScored={this.state.showScored}
                          handleClick={this.roll.bind(this)}></TurnController>
        )}
      </div>
    );
  }
}
