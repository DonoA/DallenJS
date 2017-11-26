var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var plus = google.plus('v1');
var debug = require('debug')('DallenJS:server');
var fs = require('fs');
var os = require("os");

var google_auth = JSON.parse(fs.readFileSync('config.json', 'utf8')).google_secrets.web;

var Auth = {
  getUser: function(oauth, callback){
    plus.people.get({ userId: "me", auth: oauth }, function(err, dat) {
      if (err) {
        console.log('An error occured', err);
        return;
      }
      callback(dat);
    });
  },
  Init: function(host){
    var oauth2Client = new OAuth2(google_auth.client_id, google_auth.client_secret, GLOBAL.http+"://"+host+"/login/authcallback");
    var url = oauth2Client.generateAuthUrl({
      access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
      scope: ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/userinfo.email']
    });
    return url;
  }
};

module.exports = Auth;