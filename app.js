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
//const upload = require('./imageUpload');

var port = process.env.PORT || 3000;      
var app = express();
app.use('admin',path);
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(fileapload());

app.use('/register',customer_register);
app.use('/login',Login);
app.use('/customer',customer_file);
app.use('/profile',caprofile) //CA customer admin profile


app.listen(port, () => console.log('Go to localhost:' + port));