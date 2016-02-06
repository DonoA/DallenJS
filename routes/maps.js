var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(GLOBAL.Maps);
  res.render('maps/index', { title: 'Maps', maps: GLOBAL.Maps, map: GLOBAL.Maps[0]});
});

router.get('/*', function(req, res, next) {
  console.log(GLOBAL.Maps);
  res.render('maps/map', { title: req.path.replace("/", "")+' Map', map: req.path.replace("/", ""), maps: GLOBAL.Maps});
});

module.exports = router;
