var express = require('express');
var redis = require("redis");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var Sequelize = require('sequelize');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var client  = redis.createClient();
var fs = require('fs');
var db = require("app/dbmanager.js");
// var updates = require('app/updates.js');
// var CronJob = require('cron').CronJob;
//
// var job = new CronJob({
//   cronTime: '00 00 * * * *',
//   onTick: function() {
//
//   },
//   timeZone: 'America/Denver'
// });
// job.start();


var routes = require('./routes/index');
var images = require('./routes/images');
var users = require('./routes/users');
var twitch = require('./routes/twitch');
var maps = require('./routes/maps');
var illeos = require('./routes/illeos');
var projects = require('./routes/projects');
var projects = require('./routes/archive');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    store: new RedisStore({
      host: "localhost",
      port: 6379,
      client: client,
      saveUninitialized: false,
      resave: false
    }),
    secret: JSON.parse(fs.readFileSync('config.json', 'utf8')).secrets.sessionKey
}));

var prjtypCache;

app.use(function(req,res,next){
  res.locals.session = req.session;
  if(!prjtypCache){
    db.projects.findAll({
      attributes: [[Sequelize.literal('DISTINCT `type`'), 'type']]
    }).then(typs => {
      prjtypCache = typs;
      res.locals.prjtyps = prjtypCache;
      next();
    });
  }else{
    res.locals.prjtyps = prjtypCache;
    next();
  }
});

app.use('/', routes);
app.use('/prj', projects)
app.use('/images', images);
app.use('/users', users);
app.use('/twitch', twitch);
app.use('/maps', maps);
app.use('/illeos', illeos);
app.use('/archive', archive);


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
