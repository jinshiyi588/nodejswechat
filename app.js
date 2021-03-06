var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require("fs");

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();

var mongoose = require('mongoose');
var dbUrl='mongodb://42.159.224.67/weixin';
mongoose.connect(dbUrl,function(err,db){
  //assert.equal(null, err);
    console.log("Connected correctly to server.");
    //db.close();
})


//session
app.use(session({
  secret: "jindoubi",
  cookie: { maxAge: 1000*60*10 } ,
  store: new MongoStore({
    url: dbUrl,
    collection: "sessions"
  })
}));

// view engine setup
app.set('views', __dirname+'/app/views/pages');
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//route
require('./routes')(app);

app.use(express.query());


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
