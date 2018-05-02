const WebGame = require("./app/Game/WebGame");
const WebPlayer = require("./app/Player/WebPlayer");
const CPUPlayer = require("./app/Player/CPUPlayer");
const Position = require("./app/Position")
const config = require('./environment/config');

(function init() {
  let player;
  let game;
  let height;
  let wide;
  let isMyReady = false;
  let isOpponentReady = false;
  const socket = io.connect(config.URL);

  function convertCellValue(cell) {
    if (cell !== null) {
      if (cell.owner === player.id) {
        return cell.property;
      } else {
        return cell.owner;
      }
    } else {
      return null;
    }
  }

  function initTileClickHandler() {
    const row = parseInt(this.id.split("_")[1][0]);
    const col = parseInt(this.id.split("_")[1][1]);
    const position = new Position(row, col);
    if (game.notExistSelectPos()) {
      if (game.board.isMine(player.id, position)) {
        game.selectBoard(this.id);
      }
    } else {
      if (game.isSelectPos(position)) {
        game.unselectBoard(this.id);
        return;
      }
      console.log(game)
      game.switchPiece(game.selectPos, position)
      game.updateTiles(convertCellValue);
      game.toNotSelectState();
    }
  }

  function tileClickHandler() {
    const row = parseInt(this.id.split("_")[1][0]);
    const col = parseInt(this.id.split("_")[1][1]);
    const position = new Position(row, col);
    if (!(isMyReady && isOpponentReady)) {
      alert("Its not ready!");
      return;
    }
    if (game.checkWinner()) {
      game.endGame(game.returnWinner());
      socket.emit("gameEnded", {
        room: game.getRoomId(),
        winner: game.returnWinner()
      });
      return;
    }

    if (!player.getCurrentTurn()) {
      alert("Its not your turn!");
      return;
    }
    if (game.notExistSelectPos()) {
      if (game.board.isMine(player.id, position)) {
        game.selectBoard(this.id);
      }
    } else {
      if (game.isSelectPos(position)) {
        game.unselectBoard(this.id);
        return;
      }
      if (!game.isArroundSelectPos(position)) {
        return;
      }

      if (game.board.canMove(player.id, position)) {
        const move = {
          currentPos: game.selectPos,
          nextPos: position
        };
        game.playerAction(move);
        game.show();
        game.toNotSelectState();
        player.setCurrentTurn(false);
        game.updateStatus();
        game.updateTiles(convertCellValue);
        game.nextTurn(socket)
      }
    }
  }

  // Create a new game. Emit newGame event.
  $("#new").on("click", () => {
    player = new WebPlayer(0, true);
    socket.emit("createGame", {});
  });

  // Join an existing game on the entered roomId. Emit the joinGame event.
  $("#join").on("click", () => {
    const name = "Player1";
    const roomID = $("#room").val();
    if (!roomID) {
      alert("Please enter game ID.");
      return;
    }
    player = new WebPlayer(1, false);
    socket.emit("joinGame", { name, room: roomID });
  });

  $("#start").on("click", () => {
    $(".startButton").css("display", "none");
    game.board.reverse();
    const cells = game.board.cells;
    socket.emit("init", {
      cells: cells,
      room: game.getRoomId()
    });
    isMyReady = true;
    game.board.reverse();
    game.toNotSelectState();
    game.toReadyGameBoard(tileClickHandler);
  });

  // New Game created by current client. Update the UI and create new Game var.
  socket.on("newGame", data => {
    const message = `Hello, ${
      data.name
    }. Please ask your friend to enter Game ID: 
      ${data.room}. Waiting for player 1...`;
    game = new WebGame(player, data.room);
    wide = game.board.wide;
    height = game.board.height;

    game.createGameBoard(message, initTileClickHandler);
  });

  /**
   * If player creates the game, he'll be P1(X) and has the first turn.
   * This event is received when opponent connects to the room.
   */
  socket.on("player0", data => {
    const message = `Hello, Player0`;
    $("#userHello").html(message);
    $(".startButton").css("display", "block");
  });

  /**
   * Joined the game, so player is P2(O).
   * This event is received when P2 successfully joins the game room.
   */
  socket.on("player1", data => {
    const message = `Hello, ${data.name}`;
    // Create game for player 2
    game = new WebGame(player, data.room);
    wide = game.board.wide;
    height = game.board.height;
    game.createGameBoard(message, initTileClickHandler);
    $(".startButton").css("display", "block");
  });

  socket.on("initReceive", data => {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < wide; j++) {
        $(`#button_${i}${j}`).text(
          data.cells[i][j] ? data.cells[i][j].owner : null
        );
      }
    }
    game.board.setCells(data.cells, 2);
    isOpponentReady = true;
    $("#userHello").html("Opponent is ready");
  });

  socket.on("syncTile", data => {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < wide; j++) {
        $(`#button_${i}${j}`).text(convertCellValue(data.cells[i][j]));
      }
    }
    game.board.setCells(data.cells);
    player.setCurrentTurn(true);
    $("#userHello").html("your turn");
  });

  /**
   * Opponent played his turn. Update UI.
   * Allow the current player to play now.
   */
  socket.on("turnPlayed", data => {
    game.selectBoard(data.tile);
  });

  // If the other player wins, this event is received. Notify user game has ended.
  socket.on("gameEnd", data => {
    game.endGame(data.winner);
    socket.leave(data.room);
  });

  /**
   * End the game on any err event.
   */
  socket.on("err", data => {
    game.endGame(data.message);
  });
})();
