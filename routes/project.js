var express = require('express');
var router = express.Router({ mergeParams: true });
var models = require("../models");
var caches = require("../models/cache");
var request = require('request');

router.get('/', function(req, res, next) {
  res.redirect('/restricted');
    // res.render('projects/index', {title: 'Dallen\'s Projects'});
});

router.get('/new', function(req, res, next) {
  if(req.session.user && req.session.user.admin){
    res.render('projects/new', {title: 'New Projects', type: req.projectType});
  }else{
    res.redirect('/restricted');
  }
});

router.post('/new', function(req, res, next) {
  if(req.session.user && req.session.user.admin){
    if(req.body.readme) {
      request(req.body.readme, function (error, response, body) {
        if(error) {
          res.send({
            success: false,
            errors: [
              "Could not fetch read me by that url!"
            ]
          });
        }
        req.body.description = body;
        models.Projects.create(req.body)
        .then((rtn) => {
          req.projectType.addProject(rtn);
          caches.projectTypeCache = undefined;
          res.send({
            success: true,
            redir: rtn.getPath(req.projectType),
            message: ''
          });
        }).catch(function (err) {
          res.send({
            success: false,
            errors: [
              "Could not parse readme (sorry)!"
            ]
          });
        });;
      });
    }else{
      models.Projects.create(req.body).then(rtn => {
        req.projectType.addProject(rtn);
        caches.projectTypeCache = undefined;
        res.send({
          success: true,
          redir: rtn.getPath(req.projectType),
          message: ''
        });
      });
    }
  }else{
    res.redirect('/restricted');
  }
});

// router.get('/:prj/:name/edit', function(req, res, next) {
//     models.projects.findOne({
//       where: {
//         type: req.params.prj,
//         name: req.params.name
//       }
//     }).then(prjrtn => {
//       res.render('projects/edit', {title: 'Dallen\'s ' + req.params.prj, page: prjrtn});
//     });
// });

// router.post('/:prj/:name/edit', function(req, res, next) {
//   if(req.session.user && req.session.user.admin){
//     models.projects.findOne({
//       where: {
//         type: req.params.prj,
//         name: req.params.name
//       }
//     }).then(prjrtn => {
//       prjrtn.updateAttributes(req.body).then((prj) => {
//         res.redirect('/prj/' + req.body.type);
//       });
//     });
//   }else{
//     res.redirect('/restricted');
//   }
// });

router.get('/:prj', function(req, res, next) {
  models.Projects.findOne({
    where: {
      url: req.params.prj
    }
  }).then(prjrtn => {
    res.render('projects/index', {title: 'Dallen\'s ' + prjrtn.name, project: prjrtn});
  });
});

var newType = express.Router();

newType.get('/', function(req, res, next) {
  res.render('project_types/new', {});
});

newType.post('/', function(req, res, next) {
  models.ProjectTypes.create(req.body).then(() => {
    caches.projectTypeCache = undefined;
    res.send({
      success: true,
      redir: '/',
      message: ''
    });
  });
});

module.exports = {
  router: router,
  newProjectRouter: newType
};
