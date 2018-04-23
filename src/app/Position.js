module.exports = class Position {
  constructor(vert, hori) {
    this.hori = hori;
    this.vert = vert;
  }

  plus(pos) {
    return new Position(this.vert + pos.vert, this.hori + pos.hori);
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
