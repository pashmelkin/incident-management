var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var onCallRouter = require('./routes/onCall');
var excelRouter = require('./routes/excel');
var overridesRouter = require('./routes/overrides');
var reportRouter = require('./routes/report');
var healthCheckRouter = require('./routes/health');
var readyCheckRouter = require('./routes/ready');
var contactRouter = require('./routes/contact');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/onCall', onCallRouter);
app.use('/overrides', overridesRouter);
app.use('/excel', excelRouter);
app.use('/report', reportRouter);
app.use('/health', healthCheckRouter);
app.use('/ready', readyCheckRouter);
app.use('/contact', contactRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.get('/favicon.ico', (req, res) => res.status(204));

module.exports = app;
