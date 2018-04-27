"use strict";
const Board = require("./Board");

const HEIGT = 5;
const WIDE = 5;

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
    this.playerAction(); 
  }

  sync(game){
    game.board.reverse()
    this.board.cells = game.board.copyCells()
    game.board.reverse()
  }

  initSync(game){
    game.board.reverse()
    const oppositeCells = game.board.copyCells()
    for (let y = 0; y < 2; y++) {
      for (let x = 0; x < this.board.wide; x++) {
        if (oppositeCells[y][x] === null) {
          this.board.cells[y][x] = null;
        } else {
          this.board.cells[y][x] = Object.assign(
            oppositeCells[y][x]
          );
        }
      }
    }
    game.board.reverse()
  }

  checkWinner(){
    return this.isFinishByGetPiece() || this.isFinishByMovePiece()
  }
  

  isFinishByGetPiece() {
    const player0Win = this.board.getPlayerPiecePositions(1).bad.length === 0 || this.board.getPlayerPiecePositions(0).good.length === 0
    const player1Win = this.board.getPlayerPiecePositions(0).bad.length === 0 || this.board.getPlayerPiecePositions(1).good.length === 0
    return (player0Win || player1Win);
  }
  isFinishByMovePiece() {
    const goodPositions = this.board.getPlayerPiecePositions(this.player.id).good
    const wide = this.board.wide-1
    return goodPositions.reduce(function (previous, pos) {
      return pos.isHere(0, 0) || pos.isHere(0, wide) || previous
    }, false);
  }

  playerAction() {
    const id = this.player.id
    const move = this.player.getMove(this.board);
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
