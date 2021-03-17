const mysql = require('mysql');
const express = require('express');
const app = express(); 
var cors = require('cors');
const mysqlConn= require('./conn/conn');
const bodyParser = require('body-parser');
const router = express.Router();

app.use(bodyParser.json());
app.use(cors());

<<<<<<< Updated upstream
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  // api routes
 app.use('/auth', require('./routes/register'));
 app.use('/login', require('./routes/login'));
 app.use('/admin', require('./routes/admin'));
 app.use('/', require('./routes/index'));
 app.use('/addcart', require('./routes/cart'));
 app.use('/addwishlist', require('./routes/wishlist'));
 app.use('/addordes', require('./routes/orders'));
 //app.use('/upload', require('../gift-back/routes/imageUpload'));

 // start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 7777) : 5000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

module.exports = router;
=======
app.use("/items", express.static("./upload/images"));
app.use("/admin", adminApi);
app.use("/register", customer_register);
app.use("/login", Login);
app.use("/customer", customer_file);
app.use("/caprofile", caprofile); //CA customer admin profile

app.listen(port, () => console.log("Go to localhost:" + port));
>>>>>>> Stashed changes
