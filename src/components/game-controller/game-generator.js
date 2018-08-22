const FRAMES_COUNT = 10;
const PINS_COUNT = 10;

export default function* (playersRaw, frames = FRAMES_COUNT){
  const players = playersRaw.map((player, index) => ({
    name: player,
    id: index,
    score: (new Array(frames)).fill(null).map((_, frame) => {
      return new Array(frame < frames - 1 ? 2 : 3).fill(null);
    })
  }));

  for(let currentTurn = 0; currentTurn < frames; currentTurn++){
    const isLastTurn = currentTurn === frames - 1;
    const rolls = isLastTurn ? 3 : 2;
    userTurn:
    for(let currentPlayer = 0; currentPlayer < players.length; currentPlayer++){
      let turnTotal = 0;

      for(let currentRoll = 0; currentRoll < rolls; currentRoll++){
        const score = yield {
          players,
          currentPlayer,
          currentTurn,
          currentRoll,
          turnTotal
        };
        players[currentPlayer].score[currentTurn][currentRoll] = score;
        const strike = currentRoll === 0 && score === PINS_COUNT;
        turnTotal += score;
        const spare = turnTotal === PINS_COUNT;
        if(strike || spare){
          continue userTurn;
        }
      }
    }
  }
  return { players };
}
