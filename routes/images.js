var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(fs.readdirSync("public/images").toString());
  res.render('images/index', { title: 'Dallen\'s Landing', imgs: fs.readdirSync("public/images")});
});

module.exports = router;
