"use stric";

var express = require("express"),
    routes = require("./app/routes/index.js"),
    mongoose = require("mongoose")
var app = express();

mongoose.connect("mongodb://localhost:27017/clementinejs");

app.use("/public", express.static(process.cwd() + "/public"));
app.use("/controllers", express.static(process.cwd() + "/app/controllers"));

routes(app);

var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

module.exports = app; // for testing
