"use strict";

const Game = require("./app/Game");
const HumanPlayer = require("./app/Player/HumanPlayer");
const CPUPlayer = require("./app/Player/CPUPlayer");

main();
function main() {
  const player0 = new CPUPlayer(0);
  const player1 = new CPUPlayer(1);
  const game = new Game(player0, player1);
  for (var i = 0; i < 25; i++) {
    game.play();
    game.show();
  }
}
