const FRAMES_COUNT = 10;

export default function* (players, frames = FRAMES_COUNT){
  const gameData = players.map((player, index) => ({
    name: player,
    id: index,
    score: (new Array(frames)).fill(null).map((_, frame) => {
      return new Array(frame < frames - 1 ? 2 : 3).fill(null);
    })
  }));

  for(let turn = 0; turn < frames; turn++){
    const isLastTurn = turn === frames - 1;
    const rolls = isLastTurn ? 3 : 2;
    let turnTotal = 0;
    for(let currentPlayer = 0; currentPlayer < gameData.length; currentPlayer++){
      for(let roll = 0; roll < rolls; roll++){
        const score = yield {
          players: gameData,
          currentPlayer,
          currentTurn: turn,
          currentRoll: roll,
          turnTotal
        };
        turnTotal += score
        gameData[currentPlayer].score[turn][roll] = score;
      }
    }
  }
  return { players: gameData };
}
