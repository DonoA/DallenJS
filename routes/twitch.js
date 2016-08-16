var express = require('express');
var router = express.Router();
var db = require('app/dbmanager.js');

router.get('/', function(req, res, next) {
  console.log(db.streams);
  res.render('twitch/index', { title: 'Twitch', channels: Object.keys(db.streams) });
});

router.get('/:user', function(req, res, next) {
    db.getTwitchStats(req.params.user, function(dat){
        res.render('twitch/user', { title: req.params.user, data: dat, channels: Object.keys(db.streams) });
    });
});

module.exports = router;
