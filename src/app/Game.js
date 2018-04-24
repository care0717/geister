"use strict";
const Board = require("./Board");

const HEIGT = 5;
const WIDE = 5;

module.exports = class Game {
  constructor(player0, player1) {
    let blankBoard = new Board(HEIGT, WIDE);
    this.players = [player0, player1];
    this.turn = 0;
    this.isFinished = false;
    this.players.forEach(function(player) {
      blankBoard.reverse();
      player.initBoard(blankBoard);
    });
    this.board = blankBoard;
  }

  getBoard() {
    return this.board;
  }

  play() {
    var turnPlayerId;
    var nextPlayerId;
    this.show(this.turn);
    while (!this.isFinished) {
      turnPlayerId = this.turn % this.players.length;
      // this.show(turnPlayerId)
      this.playerAction(turnPlayerId);
      nextPlayerId = (turnPlayerId + 1) % this.players.length;
      this.isFinished =
        this.isFinishByGetPiece() || this.isFinishByMovePiece(nextPlayerId);
    }
    this.show(nextPlayerId);
  }

  isFinishByGetPiece() {
    return (
      this.players[0].isWinnerByGetPiece(this.board) ||
      this.players[1].isWinnerByGetPiece(this.board)
    );
  }
  isFinishByMovePiece(nextPlayerId) {
    return this.players[nextPlayerId].isWinnerByMovePiece(this.board);
  }

  playerAction(id) {
    const move = this.players[id].getMove(this.board);
    if (
      this.board.isMine(id, move.currentPos) &&
      this.board.canMove(id, move.nextPos)
    ) {
      if (this.board.canGet(id, move.nextPos)) {
        console.log(
          `Player${id}は${JSON.stringify(
            this.board.getCellValue(move.nextPos)
          )}を入手した`
        );
        this.players[id].get(this.board.getCellValue(move.nextPos));
      }
      this.board.move(move.currentPos, move.nextPos);
      this.turn += 1;
      this.board.reverse();
    }
  }

  show(id) {
    console.log(`Player${id}のターンです`);
    this.players.forEach(function(player) {
      player.print();
    });
    this.board.print();
  }
};
