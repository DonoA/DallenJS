var express = require('express');
var db = require("app/dbmanager.js");
var router = express.Router();
var auth = require('app/auth.js');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var fs = require('fs');
var os = require("os");
var user = require("app/user.js");

router.get('/', function(req, res, next) {
    res.render('home/index', { title: 'Dallen\'s Landing'});
});

router.get('/login', function(req, res, next) {
  if(req.session.profile != null){
    req.session.profile = null;
    backURL=req.header('Referer') || '/';
    res.redirect(backURL);
  }else{
    req.session.continue = req.query.continue;
    res.redirect(auth.Init(req.headers.host));
  }
});

router.get('/login/authcallback*', function(req, res, next) {
  var google_auth = JSON.parse(fs.readFileSync('config.json', 'utf8')).google_secrets.web;
  var oauthC = new OAuth2(google_auth.client_id, google_auth.client_secret, "http://"+req.headers.host+"/login/authcallback");
  oauthC.getToken(req.query.code, function(err, tokens) {
    if(!err) {
      oauthC.setCredentials(tokens);
      console.log(oauthC);
      req.session.user = "user";
      auth.getUser(oauthC, function(profile){
        req.session.tokens = tokens;
        req.session.profile = profile;
        var userdat = user.getUser(profile.id, function(dat){
          if(dat.length == 0){
            return user.addUser(profile, profile.displayName.replace(" ", "_"), function(data){
              return user.getUser(profile.id, function(udat){
                return udat[0];
              });
            });
          }else{
            return dat[0];
          }
        });
        console.log(userdat);
        req.session.profile.userdat = userdat;
        res.redirect(req.session.continue);
      });
    }else{
      res.render('error', { message: "Authentication Failed, please try again", error: {status: 500}})
    }
  });
});

router.get('/prj-*', function(req, res, next) {
    res.render('home/' + req.path.replace("/prj-", ""), {title: 'Dallen\'s Landing', plugins: GLOBAL.plugins, github: "https://github.com/DonoA/"});
});

router.get('/upDB', function(req, res, next) {
    res.render('home/update', { title: 'Dallen\'s Landing', status: db.pullDB()});
});

module.exports = router;
