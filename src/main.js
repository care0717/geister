'use strict';

const Game = require('./Game');
const piece = ["*","+"];
main()

function main() {
  var game = new Game(5,5)
  game.play(1, {vert: 0, hori:3}, "right")
  game.play(0, {vert: 4, hori:3}, "up")
  //game.play(1, {vert: 0, hori:1}, "down")
  //game.play(1, {vert: 0, hori:1}, "down")
  game.show()
}


