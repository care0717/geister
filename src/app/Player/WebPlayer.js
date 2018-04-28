"use strict";
const Player = require("./Player");
const Position = require("../Position");
const Piece = require("../Piece");

module.exports = class WebPlayer extends Player {
  constructor(id, currentTurn) {
    super(id);
    this.currentTurn = currentTurn;
  }

  getCurrentTurn() {
    return this.currentTurn;
  }
  setCurrentTurn(turn) {
    this.currentTurn = turn;
  }
  initBoard(board) {
    const randomProperties = this.getRandomProperties();
    for (let y = 0; y < 2; y++) {
      for (let x = 1; x < board.wide - 1; x++) {
        board.cells[board.height - y - 1][x] = new Piece(
          randomProperties[y * (board.wide - 2) + x - 1],
          this.id
        );
      }
    }
  }

  getRandomProperties() {
    var array = ["good", "good", "good", "bad", "bad", "bad"];
    for (var i = array.length - 1; i > 0; i--) {
      var r = Math.floor(Math.random() * (i + 1));
      var tmp = array[i];
      array[i] = array[r];
      array[r] = tmp;
    }
    return array;
  }

  getMove(board) {}
};
