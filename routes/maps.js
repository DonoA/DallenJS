var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('maps/index', { title: 'Maps' });
});

router.get('/*', function(req, res, next) {
  res.render('maps/map', { title: req.path.replace("/", "")+' Map', map: req.path.replace("/", "")});
});

module.exports = router;
