var mysql = require('mysql');
var express = require('express');
//var session = require('express-session');
var fileapload = require('express-fileupload');
var bodyParser = require('body-parser');
var path = require('./routes/admin');
const Login=require('./routes/login');
const customer_register=require('./routes/register');
const customer_file=require('./routes/customer');
const caprofile=require('./routes/profile');
const cors = require('cors');
//const upload = require('./imageUpload');

var port = process.env.PORT || 3000;      
var app = express();
app.use(cors());
app.use('admin',path);
var bodyParser = require('body-parser');  
var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({extended : false});
app.use(bodyParser.json());
app.use(fileapload());

app.use('/register',jsonParser,customer_register);
app.use('/login',Login);
app.use('/customer',customer_file);
app.use('/profile',caprofile) //CA customer admin profile

app.listen(port,() => console.log('Go to localhost:' + port));