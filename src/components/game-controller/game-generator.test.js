import createGame from './game-generator';

describe('multi player generator', () => {
  const game = createGame(['John', 'Peter'], 2);
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
             "name": "Peter",
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

  it('1 turn, 1 roll of John', () => {
    const userScores = 3;
    const { done, value: { currentPlayer, currentTurn, currentRoll, players } } = game.next(userScores);
    expect(done).toEqual(false)
    expect(currentPlayer).toEqual(0);
    expect(currentTurn).toEqual(0);
    expect(currentRoll).toEqual(1);
    expect(players[0].score[0]).toEqual([3, null]);
  });

  it('1 turn, 2 roll of John', () => {
    const userScores = 7;
    const { done, value: { currentPlayer, currentTurn, currentRoll, players } } = game.next(userScores);
    expect(done).toEqual(false)
    expect(currentPlayer).toEqual(1);
    expect(currentTurn).toEqual(0);
    expect(currentRoll).toEqual(0);
    expect(players[0].score[0]).toEqual([3, 7]);
  });

  it('1 turn, 1 roll of Peter', () => {
    const userScores = 2;
    const { done, value: { currentPlayer, currentTurn, currentRoll, players } } = game.next(userScores);
    expect(done).toEqual(false)
    expect(currentPlayer).toEqual(1);
    expect(currentTurn).toEqual(0);
    expect(currentRoll).toEqual(1);
    expect(players[1].score[0]).toEqual([2, null]);
  });

  it('1 turn, 2 roll of Peter', () => {
    const userScores = 8;
    const { done, value: { currentPlayer, currentTurn, currentRoll, players } } = game.next(userScores);
    expect(done).toEqual(false)
    expect(currentPlayer).toEqual(0);
    expect(currentTurn).toEqual(1);
    expect(currentRoll).toEqual(0);
    expect(players[1].score[0]).toEqual([2, 8]);
  });

  it('2 turn, 1 roll of John', () => {
    const userScores = 10;
    const { done, value: { currentPlayer, currentTurn, currentRoll, players } } = game.next(userScores);
    expect(done).toEqual(false)
    expect(currentPlayer).toEqual(1);
    expect(currentTurn).toEqual(1);
    expect(currentRoll).toEqual(0);
    expect(players[0].score[1]).toEqual([10, null, null]);
  });

  it('2 turn, 1 roll of Peter', () => {
    const userScores = 5;
    const { done, value: { currentPlayer, currentTurn, currentRoll, players } } = game.next(userScores);
    expect(done).toEqual(false)
    expect(currentPlayer).toEqual(1);
    expect(currentTurn).toEqual(1);
    expect(currentRoll).toEqual(1);
    expect(players[1].score[1]).toEqual([5, null, null]);
  });

  it('2 turn, 2 roll of Peter', () => {
    const userScores = 1;
    const { done, value: { currentPlayer, currentTurn, currentRoll, players } } = game.next(userScores);
    expect(done).toEqual(false)
    expect(currentPlayer).toEqual(1);
    expect(currentTurn).toEqual(1);
    expect(currentRoll).toEqual(2);
    expect(players[1].score[1]).toEqual([5, 1, null]);
  });

  it('2 turn, 3 roll of Peter', () => {
    const userScores = 2;
    const { done, value: { currentPlayer, currentTurn, currentRoll, players }  } = game.next(userScores);
    expect(done).toEqual(true)
    expect(currentPlayer).toBeUndefined();
    expect(currentTurn).toBeUndefined();
    expect(currentRoll).toBeUndefined();
    expect(players[1].score[1]).toEqual([5, 1, 2]);
  });
})
