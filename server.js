"use stric";

var express = require("express");
var routes = require("./app/routes/index.js");
var mongoose = require("mongoose");
var passport = require("passport");
var session = require("express-session");

var app = express();
// load config data
require('dotenv').load();
require('./app/config/passport.config')(passport);

// connect to db
mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));


// Set up session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Register routes
routes(
  app,
  passport
);

// here we go!
var listener = app.listen(process.env.PORT || 8080, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

module.exports = app; // for testing
