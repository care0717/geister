const Piece = require('./Piece');

module.exports =  class Player {
  constructor(id) {
    this.id = id
    this.gotPiece = {bad: 0, good: 0}
  } 
  get(piece){
    this.gotPiece[piece.getProperty()] += 1
  }
  print(){
    console.log(this.id)
    console.log(this.gotPiece)
  }
}
