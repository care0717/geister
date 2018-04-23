module.exports = class Player {
  constructor(id) {
    this.id = id;
    this.gotPiece = { bad: 0, good: 0 };
  }
  get(piece) {
    this.gotPiece[piece.getProperty()] += 1;
  }

  getMyPiecePos(board) {
    return board.getPlayerPiecePositions(this.id).all;
  }

  isWinnerByGetPiece(board){
    return board.getPlayerPiecePositions(this.id).bad.length === 0 || board.getPlayerPiecePositions((this.id+1)%2).good.length === 0
  }

  //ピースを動かしたら勝てる位置に駒があるかどうか
  isWinnerByMovePiece(board){
    const goodPositions = board.getPlayerPiecePositions(this.id).good
    return goodPositions.reduce(function (previous, pos) {
      pos.isHere(0, 0) || pos.isHere(0, board.wide-1) || previous
    }, false);
  }

  print() {
    console.log(`Player${this.id}の取った駒は${JSON.stringify(this.gotPiece)}`);
  }
  getMove(board) {
    throw new Error("Not Implemented");
  }
};
