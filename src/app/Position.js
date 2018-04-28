"use strict";
module.exports = class Position {
  constructor(vert, hori) {
    this.vert = vert;
    this.hori = hori;
  }

  plus(pos) {
    return new Position(this.vert + pos.vert, this.hori + pos.hori);
  }
  minus(pos) {
    return new Position(this.vert - pos.vert, this.hori - pos.hori);
  }
  size() {
    return Math.abs(this.vert) + Math.abs(this.hori);
  }

  isInHoriRange(min, max) {
    return min <= this.hori && this.hori <= max;
  }
  isInVertRange(min, max) {
    return min <= this.vert && this.vert <= max;
  }

  isHere(vert, hori) {
    return this.vert === vert && this.hori === hori;
  }
};
