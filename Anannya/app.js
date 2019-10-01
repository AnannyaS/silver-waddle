var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var flash = require('connect-flash');
var cookieParser = require('cookie-Parser');
var exphbs = require('express-handlebars');
var session = require('express-session');
var passport = require('passport');
var validator = require('express-validator');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.Promise =  require('bluebird');
const { check, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');

var routes = require('./routes/index');
var users = require('./routes/users');

//Init App 
var app = express(); 

//view engine
app.set('views',path.join(__dirname, 'views'));
app.engine('handlebars',exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//Set Static Folder
app.use(express.static(path.join(__dirname,'public')));

//Express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 600000 }
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());


app.use(validator());

app.use(flash());
app.use(function(req,res,next){
  res.locals.error = req.flash('error');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.success_msg = req.flash('success_msg');
  res.locals.warning_msg = req.flash('warning_msg');
  res.locals.user = req.user || null;
  res.locals.leave = req.leave || null;
  res.locals.data = req.data || null;
   next();
});

app.use('/',routes);
app.use('/users',users);


app.listen(3000, function(){
  console.log('Listening to port 3000');
});
