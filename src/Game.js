const Board = require('./Board');
const Player = require('./Player');
const Position = require('./Position');

module.exports = class Game {
  constructor(height, wide){
    this.board = new Board(height, wide)
    this.players = [new Player(0), new Player(1)]
  }

  getBoard() {
    return this.board
  }

  play(playerId, piecePos, direction){
    const pos = new Position(piecePos.vert, piecePos.hori)
    const nextPos = pos.plus(this.directionToVec(direction))
    if(this.board.isMine(playerId, pos) && this.board.canMove(playerId, nextPos)){
      if(this.board.canGet(playerId, nextPos)){
        this.players[playerId].get(this.board.getCellValue(nextPos))
      }
      this.board.move(pos, nextPos)
    }
  }

  directionToVec(direction){
    let directionVec = new Position(0, 0)
    switch(direction){
      case 'left':
        directionVec.hori -= 1
        break;
      case 'right':
        directionVec.hori += 1
        break;
      case 'down':
        directionVec.vert += 1
        break;
      case 'up':
        directionVec.vert -= 1
        break;    
    }
    return directionVec
  }
  show(){
    this.players.forEach(function(player) {
      player.print()
    });
    this.board.print()
  }
}
