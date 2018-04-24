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
});
