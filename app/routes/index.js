"use strict";

var path = process.cwd();

var ClickHandler = require(path + "/app/controllers/clickHandler.server.js");

module.exports = function (app) {
  var clickHandler = new ClickHandler();

  app.route("/")
    .get(function (req, res) {
    res.sendFile(path + "/views/index.html");
    });

  app.route("/api/clicks")
    .get(clickHandler.getClicks)
    .post(clickHandler.addClick)
    .delete(clickHandler.resetClicks);
};
