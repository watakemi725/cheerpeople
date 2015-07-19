// サーバーに接続
var socket = io.connect(location.origin);

// サーバーへデータを送信(接続確認(デバッグ用))
// socket.emit("dataName2", { fuga : "connected"});

// サーバーからのデータを受信
socket.on("dataName1", function(dataFromServer) {
    // ブラウザのコンソールに出力される。
    // console.log(dataFromServer.hoge);
});












// // スクロールを抑止する関数
// function preventScroll(event) {

//   // li要素だけは、タップイベントに反応したいので、抑止しない。
//   if (event.touches[0].target.tagName.toLowerCase() == "li") {return;}

//   // preventDefaultでブラウザ標準動作を抑止する。
//   event.preventDefault();
// }

// // タッチイベントの初期化
// document.addEventListener("touchstart", preventScroll, false);
// document.addEventListener("touchmove", preventScroll, false);
// document.addEventListener("touchend", preventScroll, false);
// // ジェスチャーイベントの初期化
// document.addEventListener("gesturestart", preventScroll, false);
// document.addEventListener("gesturechange", preventScroll, false);
// document.addEventListener("gestureend", preventScroll, false);
