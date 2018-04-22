module.exports = class Piece {
  constructor(property, owner) {
    this.property = property;
    this.owner = owner;
  }
  getOwner() {
    return this.owner;
  }
  getProperty() {
    return this.property;
  }
};
