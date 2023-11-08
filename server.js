var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

var app = express();
const cors = require("cors");

mongoose
  .connect("mongodb://127.0.0.1:27017/ecoapp")
  .catch((error) => console.log(error));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", require("./routes/index"));
app.use("/comments", require("./routes/comment.route"));
app.use("/rates", require("./routes/rate.route"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

/**
 * Listen on provided port, on all network interfaces.
 */

app.listen(3000, (err) => {
    if (err) throw err
    console.log(process.env.NODE_ENV);
    console.log('> Server Started on port:' + 3000)
})
