var express = require('express');
var db = require("app/dbmanager");
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('home/index', { title: 'Dallen\'s Landing'});
    req.session.name = "name";
});

router.get('/login', function(req, res, next) {
  if(req.session.loggedin){
    req.session.loggedin = false;
    res.render('home/login', { title: 'Dallen\'s Landing'});
  }else{
    req.session.loggedin = true;
    res.render('home/login', { title: 'Dallen\'s Landing'});
  }
});

router.get('/prj-*', function(req, res, next) {
    res.render('home/' + req.path.replace("/prj-", ""), {title: 'Dallen\'s Landing', plugins: GLOBAL.plugins, github: "https://github.com/DonoA/"});
});

router.get('/upDB', function(req, res, next) {
    res.render('home/update', { title: 'Dallen\'s Landing', status: db.pullDB()});
});

module.exports = router;
