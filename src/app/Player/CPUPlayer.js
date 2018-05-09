"use strict";
const Player = require("./Player");
const Position = require("../Position");
const Piece = require("../Piece");

module.exports = class HumanPlayer extends Player {
  constructor(id) {
    super(id);
  }
  
  initBoard(board) {
    const randomProperties = this.getRandomProperties(board);
    for (let y = 0; y < 2; y++) {
      for (let x = 1; x < board.wide - 1; x++) {
        board.cells[board.height - y - 1][x] = new Piece(
          randomProperties[y * (board.wide - 2) + x - 1],
          this.id
        );
      }
    }
  }

  getRandomProperties(board) {
    var array = [];
    for(let i = 0; i<board.wide-2; i++){
      array.unshift("good")
      array.push("bad")
    }
    for (var i = array.length - 1; i > 0; i--) {
      var r = Math.floor(Math.random() * (i + 1));
      var tmp = array[i];
      array[i] = array[r];
      array[r] = tmp;
    }
    return array;
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
    return directionVectors[index] || new Position(0, -1);
  }
};
