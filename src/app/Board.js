const Piece = require("./Piece");
const Position = require("./Position");
const arroudPos = [
  new Position(0, -1),
  new Position(0, 1),
  new Position(-1, 0),
  new Position(1, 0)
];

module.exports = class Board {
  constructor(hight, wide) {
    this.wide = wide;
    this.hight = hight;
    var tbl = new Array(wide);
    for (let y = 0; y < hight; y++) {
      tbl[y] = new Array(wide).fill(null);
    }
    this.cells = tbl;
    for (let y = 1; y < this.wide - 1; y++) {
      this.cells[0][y] = new Piece("bad", 1);
      this.cells[1][y] = new Piece("good", 1);
      this.cells[this.hight - 1][y] = new Piece("bad", 0);
      this.cells[this.hight - 2][y] = new Piece("good", 0);
    }
    this.print();
  }

  print() {
    console.log(this.cells);
    console.log("");
  }

  getCanMoveVec(id, piecePos) {
    return arroudPos.filter(pos => this.canMove(id, piecePos.plus(pos)));
  }

  getPlayerPiecePositions(id) {
    var badPos = [];
    var goodPos = [];
    for (let y = 0; y < this.hight; y++) {
      for (let x = 0; x < this.wide; x++) {
        if (this.cells[y][x] !== null && this.cells[y][x].getOwner() === id) {
          if (this.cells[y][x].getProperty() === "bad") {
            badPos.push(new Position(y, x));
          } else {
            goodPos.push(new Position(y, x));
          }
        }
      }
    }
    return { all: badPos.concat(goodPos), bad: badPos, good: goodPos };
  }

  getCellValue(piecePos) {
    return this.cells[piecePos.vert][piecePos.hori];
  }

  isExist(piecePos) {
    let value = this.getCellValue(piecePos);
    return value !== null;
  }

  isMine(playerId, piecePos) {
    let piece = this.getCellValue(piecePos);
    return piece !== null && piece.getOwner() === playerId;
  }

  reverse() {
    const beforeCells = this.copyCells();
    for (let y = 0; y < this.hight; y++) {
      for (let x = 0; x < this.wide; x++) {
        if (beforeCells[this.hight - 1 - y][this.wide - 1 - x] === null) {
          this.cells[y][x] = null;
        } else {
          this.cells[y][x] = Object.assign(
            beforeCells[this.hight - 1 - y][this.wide - 1 - x]
          );
        }
      }
    }
  }

  // isMineは前提としている
  // 移動先がボード内でかつ自分の駒がないことをチェック
  canMove(playerId, position) {
    const isStillBoard =
      position.isInHoriRange(0, this.wide - 1) &&
      position.isInVertRange(0, this.hight - 1);
    return isStillBoard && !this.isMine(playerId, position);
  }
  copyCells() {
    var cells = new Array(this.wide);
    for (let y = 0; y < this.hight; y++) {
      cells[y] = new Array(this.wide).fill(null);
    }
    for (let y = 0; y < this.hight; y++) {
      for (let x = 0; x < this.wide; x++) {
        if (this.cells[y][x] !== null) {
          cells[y][x] = Object.assign(this.cells[y][x]);
        }
      }
    }
    return cells;
  }
  // isMineとcanMoveは前提
  // 移動先に敵の駒があるかをチェック
  canGet(playerId, position) {
    return this.isExist(position) && !this.isMine(playerId, position);
  }

  move(piecePos, nextPos) {
    const targetPiece = this.getCellValue(piecePos);
    this.cells[nextPos.vert][nextPos.hori] = targetPiece;
    this.cells[piecePos.vert][piecePos.hori] = null;
  }
};
