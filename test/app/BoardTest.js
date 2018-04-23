const Board = require("../../src/app/Board");
const Position = require("../../src/app/Position");
const Piece = require("../../src/app/Piece");
const assert = require("assert");

const WIDE = 5;
const HIGHT = 4;

before(function() {
  board = new Board(HIGHT, WIDE);
  p0Piece = new Piece("bad", 0);
  p1Piece = new Piece("good", 1);

  for (let y = 0; y < board.hight; y++) {
    for (let x = 0; x < board.wide; x++) {
      board.cells[y][x] = null;
    }
  }
  board.cells[0][1] = p0Piece;
  board.cells[1][1] = p1Piece;
  board.cells[0][2] = p0Piece;

  nullPos = new Position(0, 0);
  p0PiecePos = new Position(0, 1);
  p1PiecePos = new Position(1, 1);
});

describe("Board", function() {
  describe("constractor", function() {
    it("wideとhightがきちんと入っている", function() {
      assert.equal(board.wide, WIDE);
      assert.equal(board.hight, HIGHT);
    });
  });

  describe("getCellValue", function() {
    it("(0, 0)には空白が入っている", function() {
      assert.equal(board.getCellValue(nullPos), null);
    });
    it("(0, 1)にはコマが入っている", function() {
      assert.equal(board.getCellValue(p0PiecePos), p0Piece);
    });
  });

  describe("getPlayerPiecePos", function() {
    it("Player0のコマは(0, 1)と(0, 2)にある", function() {
      assert.equal(
        JSON.stringify(board.getPlayerPiecePos(0)),
        JSON.stringify([p0PiecePos, new Position(0, 2)])
      );
    });
  });

  describe("getCanMoveVec", function() {
    it("Player0のコマp0Pieceは←と↓に移動できる", function() {
      assert.equal(
        JSON.stringify(board.getCanMoveVec(0, p0PiecePos)),
        JSON.stringify([new Position(0, -1), new Position(1, 0)])
      );
    });
  });

  describe("isExist", function() {
    it("(0, 0)にはコマが存在しない", function() {
      assert.equal(board.isExist(nullPos), false);
    });
    it("(0, 1)にはコマが存在する", function() {
      assert.equal(board.isExist(p0PiecePos), true);
    });
  });
  describe("isMine", function() {
    it("(0, 1)にはp0のコマが存在する", function() {
      assert.equal(board.isMine(0, p0PiecePos), true);
    });
    it("(1, 1)にはp1のコマが存在する", function() {
      assert.equal(board.isMine(1, p1PiecePos), true);
    });
  });
  describe("canMove", function() {
    it("(-1, 0)には移動できない", function() {
      assert.equal(board.canMove(0, new Position(-1, 0)), false);
    });
    it("(0, 1)にはp0のコマは移動できない", function() {
      assert.equal(board.canMove(0, p0PiecePos), false);
    });
    it("(1, 1)にはp0のコマは移動できる", function() {
      assert.equal(board.canMove(0, p1PiecePos), true);
    });
  });
  describe("canGet", function() {
    it("(1, 1)にあるコマをp0は取れる", function() {
      assert.equal(board.canMove(0, p1PiecePos), true);
    });
  });
  describe("move", function() {
    it("(0, 1)にあるコマを(0, 0)に動かせる", function() {
      board.move(p0PiecePos, nullPos);
      assert.equal(board.getCellValue(p0PiecePos), null);
      assert.equal(board.getCellValue(nullPos), p0Piece);
      board.move(nullPos, p0PiecePos);
    });
    it("(0, 1)にあるコマを(1, 1)に動かせる", function() {
      board.move(p0PiecePos, p1PiecePos);
      assert.equal(board.getCellValue(p0PiecePos), null);
      assert.equal(board.getCellValue(p1PiecePos), p0Piece);
    });
  });
});
