var express = require('express');
var router = express.Router();
var user = require('app/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  user.getUsers(function(data){
    res.render('user/index', {users: data});
  });
});

router.get('/edit', function(req, res, next) {
  var user = req.path.replace("/edit", "");
  res.render('user/edit', {user: user});
});

module.exports = router;
