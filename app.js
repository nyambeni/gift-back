<<<<<<< Updated upstream
const mysql = require('mysql');
const express = require('express');
const app = express(); 
var cors = require('cors');
const mysqlConn= require('./conn/conn');
const bodyParser = require('body-parser');

=======
var mysql = require('mysql');
var express = require('express');
//var session = require('express-session');
var fileapload = require('express-fileupload');
var bodyParser = require('body-parser');
var homepage=require('./routes/homepage')
var path = require('./routes/admin');
const Login=require('./routes/login');
//const upload = require('./imageUpload');
>>>>>>> Stashed changes

var port = process.env.PORT || 3000;      
var app = express();

app.use('/homepage',homepage)
app.use('admin',path);
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(fileapload());

<<<<<<< Updated upstream
  // api routes
 app.use('/auth', require('./routes/register'));
 app.use('/login', require('./routes/login'));
 app.use('/admin', require('./routes/admin'));
 app.use('/', require('./routes/index'));
 app.use('/addcart', require('./routes/cart'));
 app.use('/addwishlist', require('./routes/wishlist'));
 app.use('/addordes', require('./routes/orders'));




 
 // start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 7777) : 5000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
=======
app.use('/login',Login);


app.listen(port, () => console.log('Go to localhost:' + port));
>>>>>>> Stashed changes
