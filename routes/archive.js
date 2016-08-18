var express = require('express');
var router = express.Router();
var db = require("app/dbmanager.js");
var multer  = require('multer');
var Async = require('async');
var fs = require('fs');
var upload = multer({ storage: multer.diskStorage({
    destination: (req, file, cb) => {
      now = Date.now().toString();
      require('fs').mkdir('uploads/'+now, err => {
        cb(null, 'uploads/'+now);
      });
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname.split('/').pop().trim());
    }
  })
});


//This will need some hella caches
router.get('/', function(req, res, next) {
    db.archives.findAll({
      where: {}
    }).then(items => {
      Async.each(items, (i, cb) => {
        i.getDownloads().then(dls => {
          i.downloads = dls;
          cb();
        });
      }, err => {
        res.render('archive/index', { items: items });
      });
    });
});

router.get('/new', function(req, res, next) {
  if(req.session.user && req.session.user.admin){
    res.render('archive/new', {title: 'New Archive'});
  }else{
    res.redirect('/restricted');
  }
});

router.post('/new', upload.array('downloads', 5), function(req, res, next) {
  if(req.session.user && req.session.user.admin){
    db.archives.create(req.body).then(arch => {
      Async.each(req.files, (f, cb) => {
        db.downloads.create({name: f.originalname, url: f.path}).then(dl => {
          arch.addDownload(dl);
          cb();
        });
      }, err => {
        res.redirect('/archive');
      });
    });
  }else{
    res.redirect('/restricted');
  }
});

router.get('/:archive/edit', function(req, res, next) {
    db.archives.findOne({
      where: {
        name: req.params.archive
      }
    }).then(arch => {
      arch.getDownloads().then(dls => {
        arch.downloads = [];
        Async.each(dls, (i, cb) => {
          arch.downloads.push(i.name);
          cb(null);
        }, err =>{
          res.render('archive/edit', {title: 'Dallen\'s ' + req.params.prj, page: arch});
        });
      });
    });
});

router.post('/:archive/edit', upload.array('downloads', 5), function(req, res, next) {
  if(req.session.user && req.session.user.admin){
    db.archives.findOne({
      where: {
        name: req.params.archive
      }
    }).then(arch => {
      arch.updateAttributes(req.body).then(arch => {
        if(req.files.length > 0){
          arch.setDownloads([]).then(err => {
            Async.each(req.files, (f, cb) => {
              db.downloads.create({
                  name: f.originalname,
                  url: f.path
                }).then(dl => {
                  arch.addDownload(dl);
                  cb();
                });
            }, err => {
              res.redirect('/archive');
            });
          });
        }else{
          res.redirect('/archive');
        }
      });
    });
  }else{
    res.redirect('/restricted');
  }
});


module.exports = router;
