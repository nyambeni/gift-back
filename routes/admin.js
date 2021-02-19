var mysql = require('mysql');
var express = require('express');
var auth = require('../controllers/auth');
//var auth = require('../imageUpload');
//var session = require('express-session');
var bodyParser = require('body-parser');
var conn = require('../config/conn_db');
var router=express.Router();



module.exports = router;