var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    Illeos.recentEdits(function(data){
      res.render('illeos/home', { title: 'Illeos Wiki', feature: GLOBAL.wikifeature, recent: data });
    }, res);
});

router.get('/wiki/*', function(req, res, next) {
  var args = req.path.split("/");
  console.log(JSON.stringify(args));
  Illeos.getPage(args[2], function(page){
    if(args.length == 4) {
      switch(args[3]){
        case "new":
            res.render('illeos/edit', { page: {}, feature: GLOBAL.wikifeature });
          break;
        case "edit":
          res.render('illeos/edit', { page: page, feature: GLOBAL.wikifeature });
          break;
        case "delete":
          res.render('illeos/delete', { page: page, feature: GLOBAL.wikifeature });
          break;
      }
    }else{
      res.render('illeos/show', { page: page, feature: GLOBAL.wikifeature });
    }
  });
});

router.post('/wiki/*', function(req, res, next) {
  var args = req.path.split("/");
  var page = req.body.page;
  delete page.pageid;
  switch(args[3]){
    case "new":
      Illeos.addPage(args[2], function(data){
        res.redirect(req.path.replace("new", ""));
      }, res);
      break;
    case "edit":
      Illeos.editPage(req.body.page.pageid, page, function(data){
        res.redirect(req.path.replace("edit", ""));
      }, res);
      break;
    case "delete":
      lleos.deletePage(req.body.page.pageid, page, function(data){
        res.redirect("/illeos");
      }, res);
      break;
  }
});

router.get('/about', function(req, res, next) {
  res.render('illeos/about', {feature: GLOBAL.wikifeature});
});

router.get('/index', function(req, res, next) {
  Illeos.listPages(function(pages){
    res.render('illeos/index', { pages: pages, feature: GLOBAL.wikifeature });
  });
});

router.get('/random', function(req, res, next) {
  Illeos.listPages(function(pages){
    res.render('illeos/show', { page: page[Math.random()*pages.length-1], feature: GLOBAL.wikifeature });
  });
});

module.exports = router;
