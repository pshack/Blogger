var express = require('express'); 
var path = require('path'); 
var dotenv = require('dotenv').config({path: path.join(__dirname, '.env')}); 
var favicon = require('serve-favicon'); 
var logger = require('morgan'); 
var cookieParser = require('cookie-parser'); 
var bodyParser = require('body-parser'); 
var passport = require('passport'); 

require('./app_api/models/db'); 
require('./app_api/config/passport'); 

var routesAPI = require('./app_api/routes/index'); 
var app = express(); 

// view engine setup 
app.set('views', path.join(__dirname, 'app_client')); 
//app.set('view engine', 'ejs'); 

//uncomment after placing your favicon in /public 
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); 
app.use(logger('dev')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.static(path.join(__dirname, 'app_client'))); 
app.use(passport.initialize()); 

//app.use('/', index); 
app.use('/api', routesAPI); 
//app.use('/users', users); 

// catch 404 and forward to error handler 
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler 
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
// render the error page
  res.status(err.status || 500);
    res.json({error: err});
});

module.exports = app;
