var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var followersRouter = require('./routes/followers');
var mediaRouter = require('./routes/media');
var accountRouter = require('./routes/account');
var uploadRouter = require('./routes/upload');



var app = express();

mongoose.connect('mongodb://localhost:27017/pixogram',{useNewUrlParser: true, useUnifiedTopology: true})

    .then(() => console.log('Connected to MongoDB...'))

    .catch(err => console.error('Could not connect to MongoDB...'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/followers', followersRouter);
app.use('/media', mediaRouter);
app.use('/account', accountRouter);
app.use('/upload', uploadRouter);


let configureJwtPassport = require('./utility/jwt-passport');
configureJwtPassport(passport => {
  app.use(passport.initialize());
});

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(4200, () => {
  console.log('listening on port number 4000');
})
module.exports = app;



