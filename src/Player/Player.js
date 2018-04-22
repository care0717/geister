module.exports =  class Player {
  constructor(id) {
    this.id = id
    this.gotPiece = {bad: 0, good: 0}
  } 
  get(piece){
    this.gotPiece[piece.getProperty()] += 1
  }

  getMyPiecePos(board){
    return board.getPlayerPiecePos(this.id)
  }

  print(){
    console.log(`Player${this.id}の持ち駒は${JSON.stringify(this.gotPiece)}`)
  }
  getMove(board){
    throw new Error('Not Implemented');
  }

}
