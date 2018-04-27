"use strict";
const Player = require("./Player");
const Position = require("../Position");
const Piece = require("../Piece");

module.exports = class WebPlayer extends Player {
  constructor(id, currentTurn) {
    super(id, currentTurn);
  }
  initBoard(board){
    for (let y = 1; y < board.wide - 1; y++) {
      board.cells[0][y] = new Piece("bad", this.id);
      board.cells[1][y] = new Piece("good", this.id);
    }
  }
  getMove(board) {

  }
};
