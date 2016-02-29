var express =require('express');
var serveIndex = require('serve-index');
var request = require('request');

var sharedPath ='Y:\\' ;

var  router =express.Router();

router.use(function(req, res, next){

  if (!req.session.user) {
    res.redirect('/login?url=browse');
    return;
  }
  next();
})

router.use(express.static(sharedPath));

router.use('/', serveIndex(sharedPath, {
    'icons': true,
    'template':'views/pages/directory/directory.ejs'
  }))

module.exports = router;
