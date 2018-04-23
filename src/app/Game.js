const Board = require("./Board");

const HEIGT = 5;
const WIDE = 5;

module.exports = class Game {
  constructor(player0, player1) {
    this.board = new Board(HEIGT, WIDE);
    this.players = [player0, player1];
    this.turn = 0;
    this.isFinished = false;
  }

  getBoard() {
    return this.board;
  }

  play() {
    var turnPlayerId
    var nextPlayerId
    while (!this.isFinished) {
      turnPlayerId = this.turn % this.players.length;
      
      this.playerAction(turnPlayerId);
      nextPlayerId = (turnPlayerId + 1) % this.players.length;
      this.isFinished = this.whichIsWinnerByGetPiece(nextPlayerId);
      this.turn += 1;
      this.board.reverse();
      this.isFinished = this.whichIsWinnerByMovePiece(nextPlayerId) || this.isFinished;
    }
    this.show(nextPlayerId)
  }

  whichIsWinnerByGetPiece() {
    return (
      this.players[0].isWinnerByGetPiece(this.board) ||
      this.players[1].isWinnerByGetPiece(this.board)
    );
  }
  whichIsWinnerByMovePiece(nextPlayerId) {
    this.players[nextPlayerId].isWinnerByMovePiece(this.board);
  }

  playerAction(id) {
    const move = this.players[id].getMove(this.board);
    if (
      this.board.isMine(id, move.currentPos) &&
      this.board.canMove(id, move.nextPos)
    ) {
      if (this.board.canGet(id, move.nextPos)) {
        console.log(`Player${id}は${JSON.stringify(this.board.getCellValue(move.nextPos))}を入手した`)
        this.players[id].get(this.board.getCellValue(move.nextPos));
        this.show(id)
      }
      this.board.move(move.currentPos, move.nextPos);
    }
  }

  show(id) {
    console.log(`Player${id}のターンです`)
    this.players.forEach(function(player) {
      player.print();
    });
    this.board.print();
  }
};
