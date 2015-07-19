var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


// ここから
// カンマ区切りの文字列
var text = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,ァ,ア,ィ,イ,ゥ,ウ,ェ,エ,ォ,オ,カ,ガ,キ,ギ,ク,グ,ケ,ゲ,コ,ゴ,サ,ザ,シ,ジ,ス,ズ,セ,ゼ,ソ,ゾ,タ,ダ,チ,ヂ,ッ,ツ,ヅ,テ,デ,ト,ド,ナ,ニ,ヌ,ネ,ノ,ハ,バ,パ,ヒ,ビ,ピ,フ,ブ,プ,ヘ,ベ,ペ,ホ,ボ,ポ,マ,ミ,ム,メ,モ,ャ,ヤ,ュ,ユ,ョ,ヨ,ラ,リ,ル,レ,ロ,ワ,ヲ,ン,ぁ,あ,ぃ,い,ぅ,う,ぇ,え,ぉ,お,か,が,き,ぎ,く,ぐ,け,げ,こ,ご,さ,ざ,し,じ,す,ず,せ,ぜ,そ,ぞ,た,だ,ち,ぢ,っ,つ,づ,て,で,と,ど,な,に,ぬ,ね,の,は,ば,ぱ,ひ,び,ぴ,ふ,ぶ,ぷ,へ,べ,ぺ,ほ,ぼ,ぽ,ま,み,む,め,も,ゃ,や,ゅ,ゆ,ょ,よ,ら,り,る,れ,ろ,わ,を,ん,0,1,2,3,4,5,6,7,8,9,!,%,&,+,-,=,?,~,×,…,、,。,〜,・,ー,！,％,＆,＋,：,＝,？,';

// 「,(カンマ)」 で切り出しを
var textArray = text.split(",");
// var count = textArray.length;

//OSC用に追加
var osc = require('node-osc');
//send用
// こちらのIPアドレスはうっきーさんPCに合わせる
// こちらは固定IPにしてわたぬきPORTに送る
var oscclient = new osc.Client('172.20.10.4', 3000);

// '/cheer'というのが呼ばれた場合
app.post('/cheer', function(req,res) {
  var text = req.body.text;
  var count = text.length;


  //自分のOFに送る用
  oscclient.send('/bapacText', text);

  //空の配列を宣言
  var msgBoxAfter = [];
  var msgBoxBefore = text.split("");

  //照合
  for(var i = 0; i < count ; i++){

    msgBoxAfter[i] = textArray.indexOf(msgBoxBefore[i]);
    console.log(textArray.indexOf(msgBoxBefore[i]));

  }

  //うっきーさんに直接数字送る時用
  oscclient.send('/bapac', msgBoxAfter);


  res.send(200);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
