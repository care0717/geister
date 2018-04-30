"use strict";
const Game = require("./Game/Game");

module.exports = class Organizer {
  constructor(game0, game1) {
    this.games = [game0, game1];
    this.turn = 0;
    this.isFinished = false;
  }

  play() {
    var currentCells;
    var currentGameId;
    var nextGameId;
    this.initSync();
    while (!this.isFinished) {
      currentGameId = this.turn % 2;
      this.games[currentGameId].play();
      nextGameId = (currentGameId + 1) % 2;
      this.syncGames(currentGameId, nextGameId);
      this.isFinished = this.games[nextGameId].checkWinner();
      this.turn += 1;
    }
    console.log(`勝者は${this.games[nextGameId].returnWinner()}`);
  }

  syncGames(currentGameId, nextGameId) {
    this.games[nextGameId].sync(this.games[currentGameId]);
  }

  initSync() {
    this.games[0].initSync(this.games[1]);
    this.games[1].initSync(this.games[0]);
  }
};
