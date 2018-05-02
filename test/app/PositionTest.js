const Position = require("../../src/app/Position");
const assert = require("assert");

const VERT = 1;
const HORI = 1;

describe("Position", function() {
  before(function() {
    pos1 = new Position(VERT, HORI);
    pos2 = new Position(VERT, HORI + 1);
  });
  describe("constractor", function() {
    it("vertとhoriがきちんと入っている", function() {
      assert.equal(pos1.vert, VERT);
      assert.equal(pos1.hori, HORI);
    });
  });
  describe("plus", function() {
    it("pos1とpos2をたせる", function() {
      assert.equal(
        JSON.stringify(pos1.plus(pos2)),
        JSON.stringify(new Position(VERT + VERT, HORI + HORI + 1))
      );
    });
  });
  describe("minus", function() {
    it("pos1とpos2を引ける", function() {
      assert.equal(
        JSON.stringify(pos1.minus(pos2)),
        JSON.stringify(new Position(VERT - VERT, HORI - HORI - 1))
      );
    });
  });
  describe("size", function() {
    it("pos1とpos2を引ける", function() {
      assert.equal(pos1.size(), VERT + HORI);
    });
  });
  describe("isHere", function() {
    it("pos1の大きさは2", function() {
      assert.equal(pos1.isHere(VERT, HORI), true);
    });
  });
});
