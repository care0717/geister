"use strict";
const Board = require("../Board");

const HEIGT = 6;
const WIDE = 6;

module.exports = class Game {
  constructor(player) {
    let blankBoard = new Board(HEIGT, WIDE);
    this.player = player;
    player.initBoard(blankBoard);
    this.board = blankBoard;
  }

  getBoard() {
    return this.board;
  }

  play() {
    this.show();
    const move = this.player.getMove(this.board);
    this.playerAction(move);
  }

  sync(game) {
    game.board.reverse();
    this.board.cells = game.board.copyCells();
    game.board.reverse();
  }

  initSync(game) {
    game.board.reverse();
    const oppositeCells = game.board.copyCells();
    for (let y = 0; y < 2; y++) {
      for (let x = 0; x < this.board.wide; x++) {
        if (oppositeCells[y][x] === null) {
          this.board.cells[y][x] = null;
        } else {
          this.board.cells[y][x] = Object.assign(oppositeCells[y][x]);
        }
      }
    }
    game.board.reverse();
  }

  checkWinner(isMyTurn) {
    return this.isFinishByGetPiece() || this.isFinishByMovePiece(isMyTurn);
  }
  returnWinner() {
    if (this.isFinishByMovePiece(true)) {
      return `Player${this.player.id}`;
    }
    if (
      this.board.getPlayerPiecePositions(this.player.id).bad.length === 0 ||
      this.board.getPlayerPiecePositions((this.player.id + 1) % 2).good
        .length === 0
    ) {
      return `Player${this.player.id}`;
    } else {
      return `Player${(this.player.id + 1) % 2}`;
    }
  }

  isFinishByGetPiece() {
    const player1Win =
      this.board.getPlayerPiecePositions(1).bad.length === 0 ||
      this.board.getPlayerPiecePositions(0).good.length === 0;
    const player0Win =
      this.board.getPlayerPiecePositions(0).bad.length === 0 ||
      this.board.getPlayerPiecePositions(1).good.length === 0;
    return player0Win || player1Win;
  }
  isFinishByMovePiece(isMyTurn) {
    const goodPositions = this.board.getPlayerPiecePositions(this.player.id)
      .good;
    const wide = this.board.wide - 1;
    return goodPositions.reduce(function(previous, pos) {
      return pos.isHere(0, 0) || pos.isHere(0, wide) || previous;
    }, false) && isMyTurn;
  }

  playerAction(move) {
    const id = this.player.id;
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
        this.player.get(this.board.getCellValue(move.nextPos));
      }
      this.board.move(move.currentPos, move.nextPos);
    }
  }

  show() {
    console.log(`Player${this.player.id}のターンです`);
    this.player.print();
    this.board.print();
  }
};
