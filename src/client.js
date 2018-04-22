var socket = io(SERVER_HOST); // サーバーと接続

// 送信処理
$("form").submit(function() {
  // formのsubmitが押された時
  socket.emit("message", $("#input").val()); // サーバーへ'message'として#inputの内容を送信
  return false;
});

// 受信処理
socket.on("message", function(data) {
  //'message'でデータが来た時
  $("#message-box").append(data); // #message-boxに追加
});
