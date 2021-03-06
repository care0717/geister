"use strict";
const Piece = require("./Piece");
const Position = require("./Position");
const arroudPos = [
  new Position(0, -1),
  new Position(0, 1),
  new Position(-1, 0),
  new Position(1, 0)
];

module.exports = class Board {
  constructor(height, wide) {
    this.wide = wide;
    this.height = height;
    var tbl = new Array(wide);
    for (let y = 0; y < height; y++) {
      tbl[y] = new Array(wide).fill(null);
    }
    this.cells = tbl;
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
    for (let y = 0; y < this.height; y++) {
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
  setCellValue(piecePos, value) {
    this.cells[piecePos.vert][piecePos.hori] = Object.assign(value);
  }
  switchPiece(pos1, pos2) {
    const temp = Object.assign(this.getCellValue(pos2));
    this.setCellValue(pos2, this.getCellValue(pos1));
    this.setCellValue(pos1, temp);
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
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.wide; x++) {
        if (beforeCells[this.height - 1 - y][this.wide - 1 - x] === null) {
          this.cells[y][x] = null;
        } else {
          this.cells[y][x] = Object.assign(
            beforeCells[this.height - 1 - y][this.wide - 1 - x]
          );
        }
      }
    }
  }

  setCells(cells, height = this.height) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < this.wide; x++) {
        if (cells[y][x] !== null) {
          this.cells[y][x] = new Piece(cells[y][x].property, cells[y][x].owner);
        } else {
          this.cells[y][x] = null;
        }
      }
    }
  }

  getReverseCells() {
    const beforeCells = this.copyCells();
    var reverseCells = new Array(this.wide);
    for (let y = 0; y < this.height; y++) {
      reverseCells[y] = new Array(this.wide).fill(null);
    }
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.wide; x++) {
        if (beforeCells[this.height - 1 - y][this.wide - 1 - x] === null) {
          reverseCells[y][x] = null;
        } else {
          reverseCells[y][x] = Object.assign(
            beforeCells[this.height - 1 - y][this.wide - 1 - x]
          );
        }
      }
    }
    return reverseCells;
  }

  getStringCells() {
    const beforeCells = this.copyCells();
    var stringCells = new Array(this.wide);
    for (let y = 0; y < this.height; y++) {
      stringCells[y] = new Array(this.wide).fill(null);
    }
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.wide; x++) {
        if (beforeCells[y][x] !== null) {
          stringCells[y][x] = beforeCells[y][x].getProperty();
        }
      }
    }
    return stringCells;
  }

  // isMineは前提としている
  // 移動先がボード内でかつ自分の駒がないことをチェック
  canMove(playerId, position) {
    const isStillBoard =
      position.isInHoriRange(0, this.wide - 1) &&
      position.isInVertRange(0, this.height - 1);
    return isStillBoard && !this.isMine(playerId, position);
  }
  copyCells() {
    var cells = new Array(this.wide);
    for (let y = 0; y < this.height; y++) {
      cells[y] = new Array(this.wide).fill(null);
    }
    for (let y = 0; y < this.height; y++) {
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
