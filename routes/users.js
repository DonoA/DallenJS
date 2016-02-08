var express = require('express');
var router = express.Router();
var user = require('app/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.profile.userdat.user_type == "admin"){
    user.listUsers(function(data){
      res.render('user/index', {title: "users", users: data});
    });
  }else{
    res.render('noperm.jade', {title: "Permission Denied"});
  }
});

router.get('/edit/*', function(req, res, next) {
  if(req.session.profile.userdat.user_type == "admin"){
    var user = req.path.replace("/edit/", "");
    res.render('user/edit', {title: "users", user: user});
  }else{
    res.render('noperm.jade', {title: "Permission Denied"});
  }
});

module.exports = router;
