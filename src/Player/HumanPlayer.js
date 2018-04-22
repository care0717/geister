const Player = require('./Player');
const Position = require('../Position');
const readlineSync = require('readline-sync'); 

module.exports =  class HumanPlayer extends Player {
  constructor(id){
    super(id)
  }
  getMove(board){
    console.log(`Player${this.id}の手番です`)
    console.log('動かしたいコマの位置は？')
    const currentPosList = readlineSync.question().split(" ")
    console.log('動かしたい先の位置は？')
    const nextPosList = readlineSync.question().split(" ")
    console.log('')
    return {currentPos: new Position(...currentPosList), nextPos: new Position(...nextPosList)}
  }
}
