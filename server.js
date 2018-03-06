"use stric";

var express = require("express")
    routes = require("./app/routes/index.js");
    mongo = require("mongodb").MongoClient;
var app = express();


mongo.connect("mongodb://localhost:27017/clementinejs", function (err, client) {

  if (err) throw new Error("Database failed to connect");
  console.log("MongoDB successfully connected on port 27017");

  app.use("/public", express.static(process.cwd() + "/public"));
  app.use("/controllers", express.static(process.cwd() + "/app/controllers"));

  var db = client.db('clicks');

  routes(app, db);

  var listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
  });
});

module.exports = app; // for testing
