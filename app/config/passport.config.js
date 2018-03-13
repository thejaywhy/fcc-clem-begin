'use strict';

var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/users.model');
var configAuth = require('./auth.config');

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new GitHubStrategy({
    clientID: configAuth.githubAuth.clientId,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL
  },
  function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({'github.id': profile.id}, function (err, user) {
        if (err) return done(err);

        if (user) {
          return done(null, user);
        } else {
          var newUser = new User({
            github: {
              id: profile.id,
              displayName: profile.displayName,
              username: profile.username,
              publicRepos: profile._json.public_repos
            },
            nbrClicks: {
              clicks: 0
            }
          });

          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));
};
