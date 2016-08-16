var express = require('express');
var router = express.Router();
var db = require("app/dbmanager.js");

router.get('/', function(req, res, next) {
  res.redirect('/restricted');
    // res.render('projects/index', {title: 'Dallen\'s Projects'});
});

router.get('/new', function(req, res, next) {
  if(req.session.user && req.session.user.admin){
    res.render('projects/new', {title: 'New Projects'});
  }else{
    res.redirect('/restricted');
  }
});

router.post('/new', function(req, res, next) {
  if(req.session.user && req.session.user.admin){
    console.log(req.body);
    db.projects.create(req.body).then(rtn => {
      res.redirect('/prj/' + req.body.type);
    });
  }else{
    res.redirect('/restricted');
  }
});

router.get('/:prj', function(req, res, next) {
    db.projects.findAll({
      where: {
        type: req.params.prj
      }
    }).then(prjrtn => {
      res.render('projects/index', {title: 'Dallen\'s ' + req.params.prj, items: prjrtn});
    });
});

module.exports = router;
