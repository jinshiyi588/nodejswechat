var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

//var wechat = require('./routes/wechat');
var log = require('./routes/log');

var wechat = require('wechat');

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
//app.use('/wechat', wechat);
app.use('/log', log);
//app.use(express.query());
app.use('/wechat', wechat('jsy_token', function (req, res, next) {
  // message is located in req.weixin
  var message = req.weixin;
  
  if((message.MsgType == 'event') && (message.Event == 'subscribe'))  
  {
    res.reply('hehe'); 
  } 
  else{
    // reply with thumbnails posts
    res.reply([
      {
        title: 'Come to fetch me',
        description: 'or you want to play in another way ?',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ]);
  }
  
}));


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
