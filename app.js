var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
// var logger = require("morgan");
var sassMiddleware = require("node-sass-middleware");

const getData = require(__dirname + "/utils/getData");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  const data = await getData();
  const page = decodeURIComponent(req.path.slice(1).toLowerCase());
  const key = page === "" ? "home" : page;
  if (data.hasOwnProperty(key)) {
    res.render("index", { title: "ARP By Abhishek Rohilla", key, data, curr: data[key] });
    return;
  }
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

// const port = 80
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;
