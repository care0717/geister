'use strict';

const Game = require('./Game');
const HumanPlayer = require('./Player/HumanPlayer');
const CPUPlayer = require('./Player/CPUPlayer')

main()
function main() { 
  const player0 =  new HumanPlayer(0)
  const player1 =  new CPUPlayer(1)
  const game = new Game(player0, player1)
  for (var i = 0; i < 15; i++){
    game.play()
    game.show()
  }
}


