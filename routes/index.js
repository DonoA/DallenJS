var express = require('express');
var models = require("../models");
var router = express.Router();
var auth = require('../models/auth.js');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var fs = require('fs');

var google_auth = JSON.parse(fs.readFileSync('config.json', 'utf8')).google_secrets.web;

router.get('/', function(req, res, next) {
    res.render('home/index');
});

router.get('/restricted', function(req, res, next) {
    res.render('noperm');
});

router.get('/uploads/:path/:name', function(req, res, next) {
  console.log('download', req.params.path);
  res.download('uploads/'+req.params.path+'/'+req.params.name);
});

router.get('/login', function(req, res, next) {
  if(req.session.user != null){
    req.session.user = null;
    backURL=req.header('Referer') || '/';
    res.redirect(backURL);
  }else{
    req.session.continue = req.query.continue;
    res.redirect(auth.Init(req.headers.host));
  }
});

router.get('/login/authcallback*', function(req, res, next) {
  var oauthC = new OAuth2(google_auth.client_id, google_auth.client_secret, GLOBAL.http+"://"+req.headers.host+"/login/authcallback");
  oauthC.getToken(req.query.code, (err, tokens) => {
    if(!err) {
      oauthC.setCredentials(tokens);
      auth.getUser(oauthC, profile => {
        models.Users.findOrCreate({
          where: {
            email: profile.emails[0].value
          },
          defaults: {
            name: profile.displayName,
            email: profile.emails[0].value,
            icon: profile.image.url
          }
        }).then(usr => {
          req.session.user = {
            name: usr[0].name,
            admin: usr[0].admin
          };
          res.redirect(req.session.continue);
        });
      });
    }else{
      res.render('error', { message: "Authentication Failed, please try again", error: {status: 500}})
    }
  });
});

router.get('/uploads/:file', function(req, res, next) {
  res.download('uploads/' + req.params.file);
});

router.use('/archive', require('./archive'));

router.use('/project-type/new', require('./project').newProjectRouter);

router.use('/projects/:projectType', function(req, res, next) {
  models.ProjectTypes.findOne({ 
    where: {prefix: req.params.projectType} 
  }).then(type => {
    req.projectType = type;
    next();
  });
}, require('./project').router);

module.exports = router;
