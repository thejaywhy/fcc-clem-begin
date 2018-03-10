'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClickSchema = Schema(
  {clicks: Number},
  {versionKey: false},
);


module.exports = mongoose.model('Click', ClickSchema);
