var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

var homeRouter = express.Router();
var browseRouter = require('./routes/browseRouter');
var loginRouter = require('./routes/loginRouter');

app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(session({
              secret: 'malekbenz.com secret',
              resave: false,
              saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
  if (req.session.user)
    console.log( "user "+req.session.user.userName +", is Admin "+ req.session.user.isAdmin  );
  else
    console.log("Anonyme user "  );
  next();
});

app.use("/",homeRouter);
app.use("/browse", browseRouter);
app.use("/login", loginRouter);

homeRouter.get('/', function(req, res) {
  res.render('pages/index', { title: 'The index page!' })
});

app.listen(app.get('port'), function(){
  console.info("listen on port %s", app.get('port'));
});
