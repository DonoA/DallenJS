var express = require('express');
var db = require("app/dbmanager.js");
var router = express.Router();
var auth = require('app/auth.js');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var fs = require('fs');
var os = require("os");

var google_auth = JSON.parse(fs.readFileSync('config.json', 'utf8')).google_secrets.web;

router.get('/', function(req, res, next) {
    res.render('home/index', { title: 'Dallen\'s Landing'});
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
  oauthC.getToken(req.query.code, function(err, tokens) {
    if(!err) {
      oauthC.setCredentials(tokens);
      auth.getUser(oauthC, function(profile){
        db.users.findOrCreate({
          where: {
            email: profile.emails[0].value
          },
          defaults: {
            name: profile.displayName,
            email: profile.emails[0].value,
            icon: profile.image.url
          }
        }).then(function(usr){
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



router.get('/tunnel', function(req, res, next) {
  res.render('tunnel/index', { title: 'Tunnel' });
});

router.get('/upDB', function(req, res, next) {
    res.render('home/update', { title: 'Dallen\'s Landing', status: db.pullDB()});
});

module.exports = router;
