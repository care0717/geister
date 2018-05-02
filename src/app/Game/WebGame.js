"use strict";
const Game = require("./Game");
const Position = require("../Position")

module.exports = class WebGame extends Game {
  constructor(player, roomId) {
    super(player);
    this.roomId = roomId;
    this.selectPos = null;
  }
  getRoomId() {
    return this.roomId;
  }

  playTurn(tile) {
    // Emit an event to update other player that you've played your turn.
    console.log("turn tile");
    console.log(tile);
    console.log(this.getRoomId());
    socket.emit("playTurn", {
      tile: tile,
      room: this.getRoomId()
    });
  }

  selectBoard(tile) {
    console.log("select");
    $(`#${tile}`).addClass("selectedCell");
    const row = parseInt(tile.split("_")[1][0]);
    const col = parseInt(tile.split("_")[1][1]);
    this.selectPos = new Position(row, col);
  }

  unselectBoard(tile) {
    console.log("unselect");
    $(`#${tile}`).removeClass("selectedCell");
    this.selectPos = null;
  }

  createGameBoard(message, tileClickHandler) {
    $(".menu").css("display", "none");
    $(".gameBoard").css("display", "block");
    $(".startButton").css("display", "none");
    $("#userHello").html(message);
    const cells = this.board.cells;
    for (let i = this.board.height-2; i < this.board.height; i++) {
      for (let j = 1; j < this.board.wide-1; j++) {
        $(`#button_${i}${j}`).on("click", tileClickHandler);
        $(`#button_${i}${j}`).text(cells[i][j] ? cells[i][j].getProperty() : null);
      }
    }
  }

  toReadyGameBoard(tileClickHandler) {
    const cells = this.board.cells;
    for (let i = 0; i < this.board.height; i++) {
      for (let j = 0; j < this.board.wide; j++) {
        $(`#button_${i}${j}`).off('click');
        $(`#button_${i}${j}`).on("click", tileClickHandler);
      }
    }
  }

  switchPiece(pos1, pos2){
    this.board.switchPiece(pos1, pos2)
    
  }

  toNotSelectState() {
    for (let i = 0; i < this.board.height; i++) {
      for (let j = 0; j < this.board.wide; j++) {
        $(`#button_${i}${j}`).removeClass("selectedCell");
        this.selectPos = null;
      }
    }
  }
  isSelectPos(currntPos) {
    return this.selectPos.isHere(currntPos.vert, currntPos.hori);
  }
  isArroundSelectPos(currntPos) {
    return this.selectPos.minus(currntPos).size() === 1;
  }
  notExistSelectPos() {
    return this.selectPos === null;
  }
  updateStatus() {
    $(`#status`).text(JSON.stringify(this.player.gotPiece));
  }
  updateTiles(convertCellValue) {
    var cells = this.board.cells;
    for (let i = 0; i < this.board.height; i++) {
      for (let j = 0; j < this.board.wide; j++) {
        $(`#button_${i}${j}`).text(convertCellValue(cells[i][j]));
      }
    }
  }
  nextTurn(socket){
    this.board.reverse();
    var cells = this.board.cells;
    $("#userHello").html("opponent turn");
    socket.emit("sync", {
      cells: cells,
      room: this.getRoomId()
    });
    this.board.reverse();
  }
  endGame(winner) {
    $(".center").css("display", "none");
    $("#userHello").html(`勝者は${winner}`);
  }
}
