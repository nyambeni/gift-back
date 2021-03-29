var mysql = require("mysql");
var express = require("express");
//var session = require('express-session');
const path = require("path");
const cors = require("cors");
const multer = require("multer");
var bodyParser = require("body-parser");
var adminApi = require("./routes/admin");
const Login = require("./routes/login");
const customer_register = require("./routes/register");
const customer_file = require("./routes/customer");
const caprofile = require("./routes/profile");
//const upload = require('./imageUpload');

var port = process.env.PORT || 3000;
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.orginalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3000000,
  },
});

app.use("/profile", express.static("./upload/images"));
app.use("/admin", adminApi);
app.use("/register", customer_register);
app.use("/login", Login);
app.use("/customer", customer_file);
app.use("/caprofile", caprofile); //CA customer admin profile

app.post("/upload", upload.single("profile"), function (req, res) {
  res.json({
    success: 1,
    profile_url: "http://localhost:3000/items/" + req.file.filename,
  });
});

app.listen(port, () => console.log("Go to localhost:" + port));
