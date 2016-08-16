var express = require('express');
var router = express.Router();
var db = require('app/dbmanager.js');

var MapCache;

router.get('/', function(req, res, next) {
  if(!MapCache){
    db.maps.findAll({
      attributes: ['name']
    }).then(maps => {
      if(maps.length == 0){
        res.render('maps/empty', { title: 'Maps' });
      }else{
        MapCache = maps;
        console.log(MapCache);
        res.render('maps/index', { title: 'Maps', maps: MapCache, map: MapCache[0]});
      }
    });
  }else{
    console.log(MapCache);
    res.render('maps/index', { title: 'Maps', maps: MapCache, map: MapCache[0]});
  }
});

router.get('/new', function(req, res, next) {
  if(req.session.user && req.session.user.admin){
    res.render('maps/new', { title: 'new Map' });
  }else{
    res.redirect(req.header('Referer') || '/');
  }
});

router.post('/new', function(req, res, next) {
  if(req.session.user && req.session.user.admin){
    db.maps.create({name: req.body.name}).then(()=>{
      MapCache = undefined;
      res.redirect('/maps');
    });
  }else{
    res.end({error: "not admin"});
  }
});

// router.get('/*', function(req, res, next) {
//   res.render('maps/map', { title: req.path.replace("/", "")+' Map', map: req.path.replace("/", ""), maps: GLOBAL.Maps});
// });

module.exports = router;
