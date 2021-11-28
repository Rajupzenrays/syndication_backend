var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const multer = require("multer");

var indexRouter = require("./routes/index");
var testimonialRouter = require("./routes/testimonial");

var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/testimonial", testimonialRouter);



// =======================Upload image===========================
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

var upload = multer({ storage: storage });
// handle single file upload
app.post("/upload-file", upload.single("image"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: "Please upload a file." });
  }
  return res.send({ message: "File uploaded successfully.", file });
});
// =======================/Upload image===========================



//======================== Database connections=====================
var mongoose = require("mongoose");
var mongoConnUrl =
  "mongodb+srv://raju:123@cluster0.qhqy7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//this is the url
mongoose.connect(mongoConnUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on("error", function () {
  console.log("error came in connecting");
});

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

module.exports = app;
