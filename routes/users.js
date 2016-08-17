var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.user && req.session.user.admin){
    user.listUsers(function(data){
      res.render('user/index', {title: "users", users: data});
    });
  }else{
    res.redirect('/restricted');
  }
});

router.get('/edit/:user', function(req, res, next) {
  if(req.session.user && req.session.user.admin){
    res.render('user/edit', {title: "users", user: req.perams.user});
  }else{
    res.redirect('/restricted');
  }
});

module.exports = router;
