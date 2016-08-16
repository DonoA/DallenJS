var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home/' + req.path.replace("/prj-", ""), {title: 'Dallen\'s Landing', plugins: GLOBAL.plugins, github: "https://github.com/DonoA/"});
});


module.exports = router;
