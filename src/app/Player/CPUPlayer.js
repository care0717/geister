"use strict";
const Player = require("./Player");
const Position = require("../Position");
const Piece = require("../Piece");

module.exports = class HumanPlayer extends Player {
  constructor(id, currentTurn) {
    super(id, currentTurn);
  }
  initBoard(board){
    for (let y = 1; y < board.wide - 1; y++) {
      board.cells[board.height - 2][y] = new Piece("bad", this.id);
      board.cells[board.height - 1][y] = new Piece("good", this.id);
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
