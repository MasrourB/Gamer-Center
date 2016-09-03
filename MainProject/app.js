require('./db');
require('./auth');

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var app = express();
var session = require('express-session');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var sessionOptions = {
	secret: 'secret cookie thang (store this elsewhere!)',
	resave: true,
	saveUninitialized: true
};
app.use(session(sessionOptions));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


var myRouter = require('./myRouter.js');

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});

//Middleware to get the router started
app.use('', myRouter);

app.listen(3000);
console.log('Started server on port 3000');