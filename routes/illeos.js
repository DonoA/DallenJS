var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('illeos/home', { title: 'Twitch' });
});

router.get('/wiki/*', function(req, res, next) {
  res.render('illeos/home', { title: 'Twitch' });
});

module.exports = router;