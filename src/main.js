"use strict";

const Game = require("./app/Game");
const ConsolePlayer = require("./app/Player/ConsolePlayer");
const CPUPlayer = require("./app/Player/CPUPlayer");
const Organizer = require("./app/Organizer")

main();
function main() {
  const player0 = new CPUPlayer(0, true);
  const player1 = new CPUPlayer(1, false);
  const player0game = new Game(player0);
  const player1Game = new Game(player1);
  const organizer = new Organizer(player0game, player1Game)

  organizer.play();
}
