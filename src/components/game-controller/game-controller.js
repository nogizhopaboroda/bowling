import React from 'react';

import FramesController from '../frames-controller/frames-controller';
import TurnController from '../turn-controller/turn-controller';

const FRAMES = 3;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: props.players.map((player, index) => ({
        name: player,
        id: index,
        score: (new Array(FRAMES)).fill(null).map((_, frame) => {
          return new Array(frame < FRAMES - 1 ? 2 : 3).fill(null);
        })
      })),
      currentPlayer: 0,
      currentTurn: 0,
      currentRoll: 0,
    };
  }

  roll(scored){
    const player = this.state.players[this.state.currentPlayer];
    this.state.players[this.state.currentPlayer].score[this.state.currentTurn][this.state.currentRoll] = scored;

    this.setState(Object.assign({}, this.state, {
      showScored: true
    }));

    setTimeout(this.nextTurn.bind(this), 1000);
  }

  nextTurn(){

    const isLastPlayer = this.state.currentPlayer === this.state.players.length - 1;
    const isLastTurn = this.state.currentTurn === FRAMES - 1;
    const rolls = isLastTurn ? 3 : 2;
    const isLastRoll = this.state.currentRoll === rolls - 1;

    if(isLastPlayer && isLastTurn && isLastRoll){
      console.log(JSON.stringify(gameData));
      this.setState(Object.assign({}, this.state, {
        end: true
      }));
      return;
    }

    const nextRoll = (this.state.currentRoll + 1) % rolls;
    const nextPlayer = nextRoll ? this.state.currentPlayer : (this.state.currentPlayer + 1) % this.state.players.length;
    const nextTurn = nextRoll || nextPlayer ? this.state.currentTurn : this.state.currentTurn + 1;

    this.setState(Object.assign({}, this.state, {
      currentPlayer: nextPlayer,
      currentTurn: nextTurn,
      currentRoll: nextRoll,
      isLastPlayer,
      showScored: false
    }));
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
