'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  github: {
    id: String,
    displayName: String,
    username: String,
    publicRepos: Number
  },
  nbrClicks: {
    clicks: Number
  }
});


module.exports = mongoose.model('User', UserSchema);
