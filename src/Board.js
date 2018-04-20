const Piece = require('./Piece');

module.exports = class Board {
  constructor(hight, wide){
    this.wide = wide
    this.hight = hight
    var tbl = new Array(wide);
    for(let y = 0; y < hight; y++) {
      tbl[y] = new Array(wide).fill(null);
    }
    this.cells = tbl;
    for(let y = 1; y < this.wide-1; y++) {
      this.cells[0][y] = new Piece("bad", 1)
      this.cells[this.hight-1][y] = new Piece("bad", 0)
    }
  }

  
  print (){
    console.log(this.cells);
  }


  getCellValue(piecePos){
    return this.cells[piecePos.vert][piecePos.hori]
  }

  isExist(piecePos){
    let value = this.getCellValue(piecePos)
    return value !== null
  }
  
  isMine(playerId, piecePos){
    let piece = this.getCellValue(piecePos)
    return (piece !== null && piece.getOwner() === playerId)
  }

  // isMineは前提としている
  // 移動先がボード内でかつ自分の駒がないことをチェック
  canMove(playerId, position){
    const isStillBoard = position.isInHoriRange(0, this.wide-1) && position.isInVertRange(0, this.hight-1)
    return (isStillBoard && !this.isMine(playerId, position))
  }
  // isMineとcanMoveは前提
  // 移動先に敵の駒があるかをチェック
  canGet(playerId, position){
    return (this.isExist(position) && !this.isMine(playerId, position))
  }

  move (piecePos, nextPos){
    const targetPiece = this.getCellValue(piecePos)
    this.cells[nextPos.vert][nextPos.hori] = targetPiece
    this.cells[piecePos.vert][piecePos.hori] = null
  }
}
