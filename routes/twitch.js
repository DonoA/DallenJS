var express = require('express');
var router = express.Router();
var db = require('app/config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('twitch/index', { title: 'Twitch' });
});

router.get('/*', function(req, res, next) {
  db.getTwitchStats(req.path.replace("/", ""));
  res.render('twitch/user', { title: req.path.replace("/", "") });
});

module.exports = router;
