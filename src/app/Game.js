const Board = require("./Board");

const HEIGT = 5;
const WIDE = 5;

module.exports = class Game {
  constructor(player0, player1) {
    this.board = new Board(HEIGT, WIDE);
    this.players = [player0, player1];
    this.turn = 0;
  }

  getBoard() {
    return this.board;
  }

  play(piecePos, direction) {
    const id = this.turn % this.players.length;
    const move = this.players[id].getMove(this.board);
    if (
      this.board.isMine(id, move.currentPos) &&
      this.board.canMove(id, move.nextPos)
    ) {
      if (this.board.canGet(id, move.nextPos)) {
        this.players[id].get(this.board.getCellValue(move.nextPos));
      }
      this.board.move(move.currentPos, move.nextPos);
      this.turn += 1;
    }
  }

  show() {
    this.players.forEach(function(player) {
      player.print();
    });
    this.board.print();
  }
};
