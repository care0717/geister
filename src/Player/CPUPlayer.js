const Player = require("./Player");
const Position = require("../Position");

module.exports = class HumanPlayer extends Player {
  constructor(id) {
    super(id);
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
    return directionVectors[index];
  }
};
