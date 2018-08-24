const FRAMES_COUNT = 10;
const PINS_COUNT = 10;

export default function* (playersRaw, frames = FRAMES_COUNT){
  const players = playersRaw.map((player, index) => ({
    name: player,
    id: index,
    score: (new Array(frames)).fill(null).map((_, frame) => {
      return {
        turnScore: new Array(frame < frames - 1 ? 2 : 3).fill(null),
      };
    }),
  }));

  const playersTotal = [0, 0];

  for(let currentTurn = 0; currentTurn < frames; currentTurn++){
    const isLastTurn = currentTurn === frames - 1;
    const rolls = isLastTurn ? 3 : 2;

    playerTurn:
    for(let currentPlayer = 0; currentPlayer < players.length; currentPlayer++){
      let turnTotal = 0;
      const player = players[currentPlayer];
      const turnData = player.score[currentTurn];

      turnData.bonus = 0;
      for(let currentRoll = 0; currentRoll < rolls; currentRoll++){

        const isLastRoll = currentRoll === rolls - 1;

        const score = yield {
          players,
          currentPlayer,
          currentTurn,
          currentRoll,
          turnTotal
        };

        turnData.turnScore[currentRoll] = score;

        const strike = currentRoll === 0 && score === PINS_COUNT;
        turnData.strike = strike;

        turnTotal += score;
        turnData.sum = turnTotal;

        const spare = !strike && turnTotal === PINS_COUNT;
        turnData.spare = spare;

        turnData.restPins = PINS_COUNT - turnTotal;
        if(isLastTurn){
          turnData.restPins = PINS_COUNT - (turnTotal % 10);
          if(isLastRoll){
            turnData.restPins = PINS_COUNT - ((turnTotal % 10) || 10);
          }
        }

        for(let i = 2; i > 0; i--){
          const data = player.score[currentTurn - i];
          if(data && data.waitRolls === 1){
            data.bonus += score;
            data.turnTotal = data.sum + data.bonus;

            data.gameTotal = ((player.score[currentTurn - i - 1] || {}).gameTotal || 0) + data.turnTotal;
            data.waitRolls = 0;
          }
          if(data && data.waitRolls === 2){
            data.bonus += score;
            data.waitRolls = 1;
          }
        }

        if((isLastTurn || !(spare || strike)) && isLastRoll){
          turnData.turnTotal = turnData.sum;
          turnData.gameTotal = (player.score[currentTurn - 1] || {}).gameTotal + turnData.turnTotal;
        }

        if(strike){
          turnData.waitRolls = 2;
        }

        if(spare){
          turnData.waitRolls = 1;
        }

        if((!isLastTurn) && (strike || spare)){
          continue playerTurn;
        }
      }
    }
  }
  return { players };
}
