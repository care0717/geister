const Piece = require('./Piece');
const Position = require('./Position');
const arroudPos = [new Position(0, -1), new Position(0, 1), new Position(-1, 0), new Position(1, 0)]

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
    this.print()
  }

  print (){
    console.log(this.cells);
    console.log("")
  }

  getCanMoveVec(id, piecePos){
    return arroudPos.filter(pos => this.canMove(id, piecePos.plus(pos)))
  }

  getPlayerPiecePos(id){
    var result = []
    for(let y = 0; y < this.hight; y++) {
      for(let x = 0; x < this.wide; x++) {
        if (this.cells[y][x] !== null &&  this.cells[y][x].getOwner() === id){
          result.push(new Position(y, x))
        }
      }
    }
    return result
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
