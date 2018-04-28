"use strict";
const Player = require("./Player");
const Position = require("../Position");
const Piece = require("../Piece");

module.exports = class WebPlayer extends Player {
  constructor(id, currentTurn) {
    super(id, currentTurn);
  }

  getMove(board) {

  }
};
