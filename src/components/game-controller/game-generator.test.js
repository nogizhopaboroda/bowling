

import createGame from './game-generator';


describe('player score calculation', () => {
  /*
   *
   * Game scenario:
   *      1	2	3	4	5	6	7	8	9	10
   *      X	3/	6-1	X	X	X	2/	9-0	7/	XXX
   *      20	36	43	73	95	115	134	143	163	193
   * */

  const game = createGame(['John'], 10);
  game.next();

  it('1 turn, player scores strike', () => {
    const { done, value: { currentPlayer, currentTurn, currentRoll, players }  } = game.next(10);

    expect(players[0].score[0].waitRolls).toEqual(2);
    expect(players[0].score[0].gameTotal).toEqual(undefined);
  });

  it('2 turn, 1 roll, player scores 3', () => {
    let { done, value: { currentPlayer, currentTurn, currentRoll, players }  } = game.next(3);

    expect(players[0].score[0].waitRolls).toEqual(1);
    expect(players[0].score[0].gameTotal).toEqual(undefined);

    expect(players[0].score[1].gameTotal).toEqual(undefined);
  });

  it('2 turn, 2 roll, player scores spare', () => {
    let { done, value: { currentPlayer, currentTurn, currentRoll, players }  } = game.next(7);

    expect(players[0].score[0].waitRolls).toEqual(0);
    expect(players[0].score[0].gameTotal).toEqual(20);

    expect(players[0].score[1].waitRolls).toEqual(1);
    expect(players[0].score[1].gameTotal).toEqual(undefined);
  });

  it('3 turn, 1 roll, player scores 6', () => {
    let { done, value: { currentPlayer, currentTurn, currentRoll, players }  } = game.next(6);

    expect(players[0].score[1].waitRolls).toEqual(0);
    expect(players[0].score[1].gameTotal).toEqual(36);

    expect(players[0].score[2].gameTotal).toEqual(undefined);
  });

  it('3 turn, 2 roll, player scores 1', () => {
    let { done, value: { currentPlayer, currentTurn, currentRoll, players }  } = game.next(1);

    expect(players[0].score[2].gameTotal).toEqual(43);
  });

  it('4 turn, 1 roll, player scores strike', () => {
    let { done, value: { currentPlayer, currentTurn, currentRoll, players }  } = game.next(10);

    expect(players[0].score[3].gameTotal).toEqual(undefined);
    expect(players[0].score[3].waitRolls).toEqual(2);
  });

  it('5 turn, 1 roll, player scores strike', () => {
    let { done, value: { currentPlayer, currentTurn, currentRoll, players }  } = game.next(10);

    expect(players[0].score[3].gameTotal).toEqual(undefined);
    expect(players[0].score[3].waitRolls).toEqual(1);

    expect(players[0].score[4].gameTotal).toEqual(undefined);
    expect(players[0].score[4].waitRolls).toEqual(2);
  });

  it('6 turn, 1 roll, player scores strike', () => {
    let { done, value: { currentPlayer, currentTurn, currentRoll, players }  } = game.next(10);

    expect(players[0].score[3].gameTotal).toEqual(73);
    expect(players[0].score[3].waitRolls).toEqual(0);

    expect(players[0].score[4].gameTotal).toEqual(undefined);
    expect(players[0].score[4].waitRolls).toEqual(1);

    expect(players[0].score[5].gameTotal).toEqual(undefined);
    expect(players[0].score[5].waitRolls).toEqual(2);
  });

  it('7 turn, 1 roll, player scores 2', () => {
    let { done, value: { currentPlayer, currentTurn, currentRoll, players }  } = game.next(2);

    expect(players[0].score[4].gameTotal).toEqual(95);
    expect(players[0].score[4].waitRolls).toEqual(0);

    expect(players[0].score[5].gameTotal).toEqual(undefined);
    expect(players[0].score[5].waitRolls).toEqual(1);

    expect(players[0].score[6].gameTotal).toEqual(undefined);
    expect(players[0].score[6].waitRolls).toEqual(undefined);
  });

  it('7 turn, 2 roll, player scores spare', () => {
    let { done, value: { currentPlayer, currentTurn, currentRoll, players }  } = game.next(8);

    expect(players[0].score[5].gameTotal).toEqual(115);
    expect(players[0].score[5].waitRolls).toEqual(0);

    expect(players[0].score[6].gameTotal).toEqual(undefined);
    expect(players[0].score[6].waitRolls).toEqual(1);
  });

  it('8 turn, 1 roll, player scores 9', () => {
    let { done, value: { currentPlayer, currentTurn, currentRoll, players }  } = game.next(9);

    expect(players[0].score[6].gameTotal).toEqual(134);
    expect(players[0].score[6].waitRolls).toEqual(0);

    expect(players[0].score[7].gameTotal).toEqual(undefined);
  });

  it('8 turn, 2 roll, player scores 0', () => {
    let { done, value: { currentPlayer, currentTurn, currentRoll, players }  } = game.next(0);

    expect(players[0].score[7].gameTotal).toEqual(143);
  });

  it('9 turn, 1 roll, player scores 7', () => {
    let { done, value: { currentPlayer, currentTurn, currentRoll, players }  } = game.next(7);

    expect(players[0].score[8].gameTotal).toEqual(undefined);
  });

  it('9 turn, 2 roll, player scores spare', () => {
    let { done, value: { currentPlayer, currentTurn, currentRoll, players }  } = game.next(3);

    expect(players[0].score[8].gameTotal).toEqual(undefined);
    expect(players[0].score[8].waitRolls).toEqual(1);
  });

  it('10 turn, 1 roll, player scores strike', () => {
    let { done, value: { currentPlayer, currentTurn, currentRoll, players }  } = game.next(10);

    expect(players[0].score[8].gameTotal).toEqual(163);
    expect(players[0].score[8].waitRolls).toEqual(0);

    expect(players[0].score[9].gameTotal).toEqual(undefined);
  });

  it('10 turn, 2 roll, player scores strike', () => {
    let { done, value: { currentPlayer, currentTurn, currentRoll, players }  } = game.next(10);

    expect(players[0].score[9].gameTotal).toEqual(undefined);
  });

  it('10 turn, 3 roll, player scores strike', () => {
    let { done, value: { currentPlayer, currentTurn, currentRoll, players }  } = game.next(10);

    expect(players[0].score[9].gameTotal).toEqual(193);
  });

});

describe('multi player game flow', () => {
  const game = createGame(['John', 'Peter'], 2);
  it('generates initial state correctly', () => {
    let { done, value: { currentPlayer, currentTurn, currentRoll, players }  } = game.next();

    expect(done).toEqual(false);
    expect(currentPlayer).toEqual(0);
    expect(currentTurn).toEqual(0);
    expect(currentRoll).toEqual(0);

  });

  it('1 turn, 1 roll of John', () => {
    const playerScores = 3;
    const { done, value: { currentPlayer, currentTurn, currentRoll, players } } = game.next(playerScores);
    expect(done).toEqual(false)
    expect(currentPlayer).toEqual(0);
    expect(currentTurn).toEqual(0);
    expect(currentRoll).toEqual(1);
    expect(players[0].score[0].turnScore).toEqual([3, null]);
    expect(players[0].score[0].spare).toEqual(false);
    expect(players[0].score[0].strike).toEqual(false);
    expect(players[0].score[0].restPins).toEqual(7);
  });

  it('1 turn, 2 roll of John', () => {
    const playerScores = 7;
    const { done, value: { currentPlayer, currentTurn, currentRoll, players } } = game.next(playerScores);
    expect(done).toEqual(false)
    expect(currentPlayer).toEqual(1);
    expect(currentTurn).toEqual(0);
    expect(currentRoll).toEqual(0);
    expect(players[0].score[0].turnScore).toEqual([3, 7]);
    expect(players[0].score[0].spare).toEqual(true);
    expect(players[0].score[0].strike).toEqual(false);
    expect(players[0].score[0].restPins).toEqual(0);
  });

  it('1 turn, 1 roll of Peter', () => {
    const playerScores = 2;
    const { done, value: { currentPlayer, currentTurn, currentRoll, players } } = game.next(playerScores);
    expect(done).toEqual(false)
    expect(currentPlayer).toEqual(1);
    expect(currentTurn).toEqual(0);
    expect(currentRoll).toEqual(1);
    expect(players[1].score[0].turnScore).toEqual([2, null]);
    expect(players[1].score[0].spare).toEqual(false);
    expect(players[1].score[0].strike).toEqual(false);
    expect(players[1].score[0].restPins).toEqual(8);
  });

  it('1 turn, 2 roll of Peter', () => {
    const playerScores = 8;
    const { done, value: { currentPlayer, currentTurn, currentRoll, players } } = game.next(playerScores);
    expect(done).toEqual(false)
    expect(currentPlayer).toEqual(0);
    expect(currentTurn).toEqual(1);
    expect(currentRoll).toEqual(0);
    expect(players[1].score[0].turnScore).toEqual([2, 8]);
    expect(players[1].score[0].spare).toEqual(true);
    expect(players[1].score[0].strike).toEqual(false);
    expect(players[1].score[0].restPins).toEqual(0);
  });

  it('2 turn, 1 roll of John', () => {
    const playerScores = 10;
    const { done, value: { currentPlayer, currentTurn, currentRoll, players } } = game.next(playerScores);
    expect(done).toEqual(false)
    expect(currentPlayer).toEqual(0);
    expect(currentTurn).toEqual(1);
    expect(currentRoll).toEqual(1);
    expect(players[0].score[1].turnScore).toEqual([10, null, null]);
    expect(players[0].score[1].spare).toEqual(false);
    expect(players[0].score[1].strike).toEqual(true);
    expect(players[0].score[1].restPins).toEqual(10);
  });

  it('2 turn, 2 roll of John', () => {
    const playerScores = 5;
    const { done, value: { currentPlayer, currentTurn, currentRoll, players } } = game.next(playerScores);
    expect(done).toEqual(false)
    expect(currentPlayer).toEqual(0);
    expect(currentTurn).toEqual(1);
    expect(currentRoll).toEqual(2);
    expect(players[0].score[1].turnScore).toEqual([10, 5, null]);
    expect(players[0].score[1].spare).toEqual(false);
    expect(players[0].score[1].strike).toEqual(false);
    expect(players[0].score[1].restPins).toEqual(5);
  });

  it('2 turn, 3 roll of John', () => {
    const playerScores = 5;
    const { done, value: { currentPlayer, currentTurn, currentRoll, players } } = game.next(playerScores);
    expect(done).toEqual(false)
    expect(currentPlayer).toEqual(1);
    expect(currentTurn).toEqual(1);
    expect(currentRoll).toEqual(0);
    expect(players[0].score[1].turnScore).toEqual([10, 5, 5]);
    expect(players[0].score[1].restPins).toEqual(0);
  });

  it('2 turn, 1 roll of Peter', () => {
    const playerScores = 3;
    const { done, value: { currentPlayer, currentTurn, currentRoll, players } } = game.next(playerScores);
    expect(done).toEqual(false)
    expect(currentPlayer).toEqual(1);
    expect(currentTurn).toEqual(1);
    expect(currentRoll).toEqual(1);
    expect(players[1].score[1].turnScore).toEqual([3, null, null]);
    expect(players[1].score[1].spare).toEqual(false);
    expect(players[1].score[1].strike).toEqual(false);
    expect(players[1].score[1].restPins).toEqual(7);
  });

  it('2 turn, 2 roll of Peter', () => {
    const playerScores = 7;
    const { done, value: { currentPlayer, currentTurn, currentRoll, players } } = game.next(playerScores);
    expect(done).toEqual(false)
    expect(currentPlayer).toEqual(1);
    expect(currentTurn).toEqual(1);
    expect(currentRoll).toEqual(2);
    expect(players[1].score[1].turnScore).toEqual([3, 7, null]);
    expect(players[1].score[1].restPins).toEqual(10);
  });

  it('2 turn, 3 roll of Peter', () => {
    const playerScores = 2;
    const { done, value: { currentPlayer, currentTurn, currentRoll, players } } = game.next(playerScores);
    expect(done).toEqual(true)
    expect(players[1].score[1].turnScore).toEqual([3, 7, 2]);
    expect(players[1].score[1].restPins).toEqual(8);
  });
});

