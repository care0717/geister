const Player = require("../../src/app/Player/Player");
const Board = require("../../src/app/Board");
const Position = require("../../src/app/Position");
const Piece = require("../../src/app/Piece");
const Game = require("../../src/app/Game/Game");
const assert = require("assert");
const sinon = require("sinon");

const WIDE = 5;
const HIGHT = 4;

describe("Game", function() {
  before(function() {
    player = new Player(0);
    board = new Board(HIGHT, WIDE);
    game = new Game(player);
    piecePos0 = new Position(0, 0);
    piecePos1 = new Position(0, 1);
    piecePos2 = new Position(1, 1);
    stubPiecePosFunc = sinon.stub(game.board, "getPlayerPiecePositions");
    p0Piece = new Piece("bad", 0);
    p1Piece = new Piece("good", 0);
  });
  describe("isFinishByGetPiece", function() {
    it("p1のgoodコマがないのでtrueになる", function() {
      stubPiecePosFunc.withArgs(0).returns({
        all: [piecePos0, piecePos2],
        bad: [piecePos2],
        good: [piecePos0]
      });
      stubPiecePosFunc.withArgs(1).returns({
        all: [piecePos0.plus(piecePos1)],
        bad: [piecePos0.plus(piecePos1)],
        good: []
      });
      assert.equal(game.isFinishByGetPiece(), true);
    });
    it("p0のbadコマがないのでtrueになる", function() {
      stubPiecePosFunc.withArgs(0).returns({
        all: [piecePos0, piecePos1],
        bad: [],
        good: [piecePos0, piecePos1]
      });
      stubPiecePosFunc.withArgs(1).returns({
        all: [piecePos0.plus(piecePos1), piecePos0.plus(piecePos2)],
        bad: [piecePos0.plus(piecePos1)],
        good: [piecePos0.plus(piecePos2)]
      });
      assert.equal(game.isFinishByGetPiece(), true);
    });
    it("コマがつきてないのでfalseになる", function() {
      stubPiecePosFunc.withArgs(0).returns({
        all: [piecePos0, piecePos2],
        bad: [piecePos2],
        good: [piecePos0]
      });
      stubPiecePosFunc.withArgs(1).returns({
        all: [piecePos0.plus(piecePos1), piecePos0.plus(piecePos2)],
        bad: [piecePos0.plus(piecePos1)],
        good: [piecePos0.plus(piecePos2)]
      });
      assert.equal(game.isFinishByGetPiece(), false);
    });
  });
  describe("isFinishByMovePiece", function() {
    it("(0,0)にp0のgoodコマがあるのでtrueになる", function() {
      stubPiecePosFunc.withArgs(0).returns({
        all: [piecePos0, piecePos2],
        bad: [piecePos2],
        good: [piecePos0]
      });
      assert.equal(game.isFinishByMovePiece(true), true);
    });
    it("(0,0)にp0のgoodコマがないのでtrueになる", function() {
      stubPiecePosFunc.withArgs(0).returns({
        all: [piecePos1, piecePos2],
        bad: [piecePos2],
        good: [piecePos1]
      });
      assert.equal(game.isFinishByMovePiece(true), false);
    });
    it("自分のターンじゃなければfalseになる", function() {
      stubPiecePosFunc.withArgs(0).returns({
        all: [piecePos1, piecePos2],
        bad: [piecePos2],
        good: [piecePos1]
      });
      assert.equal(game.isFinishByMovePiece(false), false);
    });
  });
  describe("returnWinner", function() {
    it("p1が勝者なのでPlayer1がかえる", function() {
      stubPiecePosFunc.withArgs(0).returns({
        all: [piecePos2],
        bad: [piecePos2],
        good: []
      });
      assert.equal(game.returnWinner(), "Player1");
    });
    it("p0が勝者なのでPlayer0がかえる", function() {
      stubPiecePosFunc.withArgs(0).returns({
        all: [piecePos1, piecePos2],
        bad: [piecePos2],
        good: [piecePos0]
      });
      stubPiecePosFunc.withArgs(1).returns({
        all: [piecePos0.plus(piecePos1), piecePos0.plus(piecePos2)],
        bad: [piecePos0.plus(piecePos1)],
        good: [piecePos0.plus(piecePos2)]
      });
      assert.equal(game.returnWinner(), "Player0");
    });
  });
});
