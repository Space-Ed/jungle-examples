
var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var http = require('http')

var os = require('os')

var app = express();

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'examples', 'favicon.ico')));
app.use(logger('dev'));


app.use(express.static(path.join(__dirname, 'examples')));

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
  res.render('error');
});


var port = process.env.PORT || 3000;
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

module.exports = app;
