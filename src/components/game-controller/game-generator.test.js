import createGame from './game-generator';

describe('multi player generator', () => {
  const game = createGame(['John', 'Paul'], 2);
  it('generates initial state correctly', () => {
    expect(game.next()).toEqual({
       "done": false,
       "value": {
         "currentPlayer": 0,
         "currentRoll": 0,
         "currentTurn": 0,
         "players": [
           {
             "id": 0,
             "name": "John",
             "score": [
                [ null, null ],
                [ null, null, null, ]
             ]
           },
           {
             "id": 1,
             "name": "Paul",
             "score": [
                [ null, null ],
                [ null, null, null, ]
             ]
           }
         ],
         "turnTotal": 0,
       },
     });
  });
})
