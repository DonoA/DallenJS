var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
  fs.readdir("public/images", (err, dat) =>{
    res.render('images/index', { imgs: dat });
  });
});

module.exports = router;
