const Player = require("./Player");
const Position = require("../Position");
const Piece = require("../Piece");

module.exports = class HumanPlayer extends Player {
  constructor(id) {
    super(id);
  }
  initBoard(board){
    for (let y = 1; y < board.wide - 1; y++) {
      board.cells[0][y] = new Piece("bad", this.id);
      board.cells[1][y] = new Piece("good", this.id);
    }
  }
  getMove(board) {
    const piecePositions = super.getMyPiecePos(board);
    const targetIndex = Math.floor(Math.random() * piecePositions.length);
    const directionVec = this.getRandomDirectionVec(
      board,
      piecePositions[targetIndex]
    );
    return {
      currentPos: piecePositions[targetIndex],
      nextPos: piecePositions[targetIndex].plus(directionVec)
    };
  }

  getRandomDirectionVec(board, targetPos) {
    const directionVectors = board.getCanMoveVec(this.id, targetPos);
    const index = Math.floor(Math.random() * directionVectors.length);
    return directionVectors[index] || new Position(0,-1);
  }
};
