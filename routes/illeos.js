var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('illeos/index', { title: 'Twitch' });
});

module.exports = router;