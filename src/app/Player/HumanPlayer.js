"use strict";
const Player = require("./Player");
const Position = require("../Position");
const Piece = require("../Piece");
const readlineSync = require("readline-sync");

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
    board.print()
    console.log(`Player${this.id}の手番です`);
    console.log("動かしたいコマの位置は？");
    const currentPosList = readlineSync.question().split(" ");
    console.log("動かしたい先の位置は？");
    const nextPosList = readlineSync.question().split(" ");
    console.log("");
    return {
      currentPos: new Position(...currentPosList),
      nextPos: new Position(...nextPosList)
    };
  }
};
