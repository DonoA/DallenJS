var express = require('express');
var redis = require("redis");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var Sequelize = require('sequelize');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressLayouts = require('express-ejs-layouts');
var RedisStore = require('connect-redis')(session);
var client  = redis.createClient();
var fs = require('fs');
var showdown  = require('showdown');
var showdownConv = new showdown.Converter();
var models = require("./models");
var caches = require("./models/cache");

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

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

app.use(function(req,res,next){
  res.locals.parseMarkdown = showdownConv.makeHtml.bind(showdownConv);
  res.locals.session = req.session;
  res.locals.title = undefined;
  if(!caches.projectTypeCache){
    models.ProjectTypes.findAll({
      include: [{
        model: models.Projects,
        order: [ 'id' ]
      }],
      order: [ 'id' ]
    }).then(types => {
      caches.projectTypeCache = res.locals.projectTypes = types;
      next();
    });
  }else{
    res.locals.projectTypes = caches.projectTypeCache;
    next();
  }
});

app.use('/', routes);

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
      error: err,
      layout: 'layouts/error'
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    layout: 'layouts/error'
  });
});

module.exports = app;
