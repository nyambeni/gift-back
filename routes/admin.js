const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const  db = require('../conn/conn');
const bodyparser = require('body-parser');

<<<<<<< Updated upstream
router.post('/admin',function(req,res){
    res.send('admin');
});

module.exports = router ;
=======
var router = express.Router();

//getting all customer
router.get("/allcustomer", (req, res) => {
  sql1 = "SELECT firstname,lastname,emailAddress FROM customer";
  mysqlConn.conn.query(sql1, (rows, results, error) => {
    try {
      res.send({ data: results });
    } catch (error) {
      console.log(error);
    }
  });
});

//get payment details API
router.get("/payments", (req, res) => {
  payments =
    "SELECT a.firstname,a.lastname, b.* FROM order_tbl b,customer a WHERE a.cust_id=b.cust_id ";
  //+ Options
  mysqlConn.conn.query(payments, (rows, results, error) => {
    try {
      res.send({ data: results });
    } catch (error) {
      console.log(error);
    }
  });
});

//get report
router.get('/report', (req, res) => {
  console.log('i told you kg, it works');
  fs = require('fs');
  fs.writeFile(
    './report/report.txt',
    'Hello This is the MONTHLY Report...!',
    'utf8',
    function (err) {
      if (err) return console.log(err);
      console.log('Report written!!');
    }
  );
});

//API to get items
router.get('/viewItems', (req, res) => {
  var item_category = req.body.category;
  var query = 'SELECT * FROM item';
  mysqlConn.conn.query(query, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      console.log(results);
      res.send(results);
    }
  });
});

//API to view items by category
router.get('/viewItem/:category', (req, res) => {
  var item_category = req.params.category;
  var query = 'SELECT * FROM item WHERE category = ?';
  mysqlConn.conn.query(query, [item_category], (err, results) => {
    if (err) {
      res.send(err);
    } else {
      console.log(results);
      res.send(results);
    }
  });
});

//delete giftbox
router.delete('/deleteItems/:id', (req, res) => {
  var id = req.params.id;
  var sql = 'DELETE FROM `item` WHERE item_id = ?';
  mysqlConn.conn.query(sql, [id], function (err, result) {
    if (result <= 0) {
      message = 'item not found!';
      res.send(message);
    } else {
      res.json('Item Deleted!');
      console.log(result + 'Item deleted!');
    }
  });
});

//upload giftbox item pic
router.post('/uploadpic', (req, res, file) => {
  var post = req.body;
  var category = post.category;
  var price = post.price;
  var size = post.size;
  var title = post.title;

  var img_name = file.name;

  if (
    file.mimetype == 'image/jpeg' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/gif'
  ) {
    file.mv('public/images/upload_images/' + file.name, function (err) {
      if (err) return res.status(500).send(err);
      var sql =
        'INSERT INTO item( `category`, `item_price`, `size`, `title`, `image`) VALUE(?,?,?,?,?)';
      var query = mysqlConn.query(sql, function (err, result) {
        res.send('items added to databse'); //res.redirect('profile/'+result.insertId);
      });
    });
  } else {
    message =
      "This format is not allowed , please upload file with '.png', .jpeg, '.gif','.jpg'";

    res.send(message);
  }
});
//upload giftbox item details
router.post('/upload', (req, res, file) => {
  var category = req.category;
  var price = req.price;
  var size = req.size;
  var title = req.title;
  var value = [category,price,size,title];

var sql =
'INSERT INTO item( `category`, `item_price`, `size`, `title`, `image`) VALUE(?,?,?,?,?)';
var query = mysqlConn.conn.query(sql,value,function (err, result) {
res.send('items added to databse'); //res.redirect('profile/'+result.insertId);
});
})


//getting all customer

router.get("/allcustomer", (req, res) => {
  sql1 = "SELECT firstname,lastname,emailAddress FROM customer";
  mysqlConn.conn.query(sql1, (rows, rma, error) => {
    try {
      res.json(rma);
    } catch (error) {
      console.log(error);
    }
  });
});

//payment API
router.get("/payments", (req, res) => {
  payments =
    "SELECT a.firstname,a.lastname, b.* FROM order_tbl b,customer a WHERE a.cust_id=b.cust_id ";
  //+ Options
  mysqlConn.conn.query(payments, (rows, results, error) => {
    try {
      res.json(results);
    } catch (error) {
      console.log(error);
    }
  });
});

module.exports = router;


module.exports = router;
>>>>>>> Stashed changes
