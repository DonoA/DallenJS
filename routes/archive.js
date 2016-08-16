var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
    db.projects.findAll({
    }).then(items => {
      res.render('archive/index', { items: items });
    });
});

router.get('/new', function(req, res, next) {
  if(req.session.user && req.session.user.admin){
    res.render('archive/new', {title: 'New Archive'});
  }else{
    res.redirect('/restricted');
  }
});

router.post('/new', function(req, res, next) {
  if(req.session.user && req.session.user.admin){
    console.log(req.body);
    db.projects.create(req.body).then(rtn => {
      res.redirect('/archive');
    });
  }else{
    res.redirect('/restricted');
  }
});

router.get('/:archive/edit', function(req, res, next) {
  if(req.session.user && req.session.user.admin){
    res.render('archive/edit', {title: 'Editing ' + req.params.archive});
  }else{
    res.redirect('/restricted');
  }
});

router.post('/:archive/edit', function(req, res, next) {
  if(req.session.user && req.session.user.admin){
    console.log(req.body);
    db.projects.create(req.body).then(rtn => {
      res.redirect('/archive');
    });
  }else{
    res.redirect('/restricted');
  }
});


module.exports = router;
