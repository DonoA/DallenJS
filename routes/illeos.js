var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('illeos/home', { title: 'Illeos Wiki' });
});

router.get('/wiki/*', function(req, res, next) {
  var page = req.path.replace("/wiki/", "");
  
});

module.exports = router;
