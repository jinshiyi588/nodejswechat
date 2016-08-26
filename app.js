var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var fs = require("fs");

var wechat_j = require('./routes/wechat');
var log = require('./routes/log');

//var wechat = require('wechat');
var config = require('./public/config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/wechat', wechat_j);
app.use('/log', log);

app.use(express.query());
/*
app.use('/wechat', wechat(config, function (req, res, next) {
  // message is located in req.weixin
  var message = req.weixin;
  
  fs.writeFile('./log.txt',message.FromUserName,function(err){
    if(err){
      return console.log(err);
    }

    console.log('write file success');
  });

  if(((message.MsgType === 'event') && (message.Event === 'subscribe'))||((message.MsgType=== 'text') &&  (message.Content === '3')))  
  {

    var coldStr = "<a href=\"http://jin41.chinacloudsites.cn/fun/getPic?weixinId=" + message.FromUserName + "\">1. 每日一冷</a>";
                          
    var musicStr = "<a href=\"http://jin41.chinacloudsites.cn/fun/getMusic?weixinId=" + message.FromUserName + "\">2. Music</a>";   
    
    var menuStr = "3. 回复3进入Menu";   

    var emptyStr = "          ";                  
    
    var replyStr = "Hello，你终于来啦，颜值高的人都在关注我哟～(•̀ロ•́)و✧ ~~" + "\n"+ emptyStr + "\n" + coldStr + "\n"+ emptyStr + "\n" + musicStr;  

    res.reply(replyStr); 
  } else if(message.MsgType=== 'text' &&  message.Content === '你好'){
    res.reply('你好呀～');

  }else if(message.MsgType=== 'text' &&  message.Content === 'site'){
    
    res.reply([
      {
        title: 'Jinshiyi588',
        description: 'Jinshiyi’s github site',
        picurl: 'http://jin41.chinacloudsites.cn/public/pic1.jpg',
        url: 'https://jinshiyi588.github.io/'
      }
    ]);
  }else{
    res.reply('功能还未完善，欢迎调戏我～');

  }
  
}));*/


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

//app.listen(3000, function () {
//  console.log('Example app listening on port 3000!');
//});

module.exports = app;
