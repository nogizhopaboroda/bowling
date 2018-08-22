import React from 'react';

import createGame from './game-generator';

import FramesController from '../frames-controller/frames-controller';
import TurnController from '../turn-controller/turn-controller';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.game = createGame(props.players, 3);
    this.state = this.game.next().value;
  }

  roll(scored){
    const { value, done } = this.game.next(scored);
    const player = value.players[this.state.currentPlayer];

    this.setState(Object.assign({}, this.state, {
      showScored: true
    }));

    if(done){
      this.setState(Object.assign({}, this.state, {
        end: true
      }));
      return;
    }

    setTimeout(() => {
      this.setState(Object.assign({}, this.state, value, {
        showScored: false
      }));
    }, 10);
  }

  render(){
    return (
      <div>
        <FramesController gameData={this.state.players}></FramesController>
        <TurnController player={this.state.players[this.state.currentPlayer]}
                        turn={this.state.currentTurn}
                        roll={this.state.currentRoll}
                        finished={this.state.end}
                        showScored={this.state.showScored}
                        handleClick={this.roll.bind(this)}></TurnController>
      </div>
    );
  }
}
