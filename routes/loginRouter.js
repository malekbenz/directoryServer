var express =require('express');
var _ = require('underscore');
var router = express.Router();
var users =[
  {userName:"malekbenz@gmail.com",password:"bba34", isAdmin: true},
  {userName:"hammoudi@gmail.com",password:"bba34", isAdmin: false}
] ;

function authUser(currentUser, callback ){
  var user = _.find(users, function(user){
              return (user.userName == currentUser.userName) && ((user.password == currentUser.password) ) ;
              });
  if (user) {
      callback(null, user);
  } else {
      callback("unauthorized user", null);
  }
}

router.get('/', function(req, res) {
    console.log(req.query.url) ;
      res.
      res.render('pages/login', { title: 'The index page!', url: req.query.url});
    }).post('/', function(req, res) {

      console.log('url est :'+ req.query.url) ;
      var currentUser = {
              userName: req.body.loginEmail,
              password: req.body.loginPassword
            };

        authUser(currentUser , function(err, user){
          if (!err){
            req.session.user = user;
          res.redirect("/browse" );
          }else {
          res.redirect("/login");
          }
        });
});

module.exports =router;
