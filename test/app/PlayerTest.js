const Player = require("../../src/app/Player/Player");
const Board = require("../../src/app/Board");
const Position = require("../../src/app/Position");
const Piece = require("../../src/app/Piece");
const assert = require("assert");
const sinon = require("sinon");

const WIDE = 5;
const HIGHT = 4;

describe("Player", function() {
  before(function() {
    player = new Player(0);
    board = new Board(HIGHT, WIDE);
    piecePos0 = new Position(0, 0);
    piecePos1 = new Position(0, 1);
    piecePos2 = new Position(1, 1);
    stubPiecePosFunc = sinon.stub(board, "getPlayerPiecePositions");
    stubPiecePosFunc.withArgs(0).returns({
      all: [piecePos0, piecePos1, piecePos2],
      bad: [piecePos2],
      good: [piecePos0, piecePos1]
    });
    stubPiecePosFunc.withArgs(1).returns({
      all: [piecePos0.plus(piecePos1)],
      bad: [piecePos0.plus(piecePos1)],
      good: []
    });
    p0Piece = new Piece("bad", 0);
    p1Piece = new Piece("good", 0);
  });
  describe("get", function() {
    it("goodのコマを手に入れられる", function() {
      player.get(p1Piece);
      assert.equal(player.gotPiece.good, 1);
    });
  });
  describe("getMyPiecePos", function() {
    it("自分のコマの場所を手に入れられる", function() {
      assert.equal(
        JSON.stringify(player.getMyPiecePos(board)),
        JSON.stringify([piecePos0, piecePos1, piecePos2])
      );
    });
  });
  describe("isWinnerByGetPiece", function() {
    it("相手のgoodコマがないので勝ちになる", function() {
      assert.equal(player.isWinnerByGetPiece(board), true);
    });
  });
  describe("isWinnerByMovePiece", function() {
    it("相手のgoodコマがないので勝ちになる", function() {
      assert.equal(player.isWinnerByMovePiece(board), true);
    });
  });
});
