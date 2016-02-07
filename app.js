var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var Sequelize = require('sequelize');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var updates = require('app/updates.js');
var CronJob = require('cron').CronJob;

/*
var job = new CronJob({
  cronTime: '00 * 7-21 * * 1-5',
  onTick: function() {
    updates.sendupdate("test message");
  },
  timeZone: 'America/Denver'
});
job.start();
*/

var routes = require('./routes/index');
var images = require('./routes/images');
var users = require('./routes/users');
var twitch = require('./routes/twitch');
var tunnel = require('./routes/tunnel');
var maps = require('./routes/maps');
var illeos = require('./routes/illeos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var sqlConn = JSON.parse(fs.readFileSync('config.json', 'utf8')).sqlConn;

var sequelize = new Sequelize(
  sqlConn.database,
  sqlConn.user,
  sqlConn.password, {
      "dialect": "mysql"
});

sequelize.sync();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: JSON.parse(fs.readFileSync('config.json', 'utf8')).secrets.sessionKey,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  }),
  cookie: { secure: false } //TODO make conn secure and allow nginx proxy
}));

app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

app.use('/', routes);
app.use('/images', images);
app.use('/users', users);
app.use('/twitch', twitch);
app.use('/tunnel', tunnel);
app.use('/maps', maps);
app.use('/illeos', illeos);

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
