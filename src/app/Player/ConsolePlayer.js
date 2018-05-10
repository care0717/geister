"use strict";
const Player = require("./Player");
const Position = require("../Position");
const Piece = require("../Piece");
const readlineSync = require("readline-sync");

module.exports = class ConsolePlayer extends Player {
  constructor(id) {
    super(id);
  }
  initBoard(board) {
    for (let y = 1; y < board.wide - 1; y++) {
      board.cells[board.height - 2][y] = new Piece("bad", this.id);
      board.cells[board.height - 1][y] = new Piece("good", this.id);
    }
  }
  getMove(board) {
    board.print();
    console.log(`Player${this.id}の手番です`);
    console.log("動かしたいコマの位置は？");
    const currentPosList = readlineSync
      .question()
      .split(" ")
      .map(function(stringNum) {
        return Number(stringNum);
      });
    console.log("動かしたいコマの方向は？(left, right, down, up)");
    const direction = readlineSync.question();
    const directionVec = this.directionToVec(direction);
    console.log("");
    return {
      currentPos: new Position(...currentPosList),
      nextPos: new Position(...currentPosList).plus(directionVec)
    };
  }
  directionToVec(direction) {
    switch (direction) {
      case "left":
        return new Position(0, -1);
      case "right":
        return new Position(0, 1);
      case "down":
        return new Position(1, 0);
      case "up":
        return new Position(-1, 0);
    }
    return new Position(0, 0);
  }
};
