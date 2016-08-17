var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('illeos/home', { title: 'Illeos Wiki' });
});

router.get('/about', function(req, res, next) {
  res.render('illeos/about', {feature: GLOBAL.wikifeature});
});

router.get('/index', function(req, res, next) {
  res.redirect('/illeos');
});

router.get('/random', function(req, res, next) {
  res.redirect('/illeos');
});

module.exports = router;
