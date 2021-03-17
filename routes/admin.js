const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const mysqlConn = require('../config/conn_db');
const bodyparser = require('body-parser');

//getting all customer
//localhost:3000/admin/allcustomer
router.get("/allcustomer", (req, res) => {
  sql1 = "SELECT firstname,lastname,emailAddress FROM customer";
  mysqlConn.conn.query(sql1, (rows, results, error) => {
    try {
      res.send({
        data: results
      });
    } catch (error) {
      console.log(error);
    }
  });
});

//get payment details API
//localhost:3000/admin/allpayments
router.get("/allpayments", (req, res) => {
  payments =
    "SELECT a.firstname,a.lastname, b.* FROM order_tbl b,customer a WHERE a.cust_id=b.cust_id ";
  mysqlConn.conn.query(payments, (rows, results, error) => {
    try {
      res.send({
        data: results
      });
    } catch (error) {
      console.log(error);
    }
  });
});

//get report
//localhost:3000/admin/report
router.get('/report', (req, res) => {
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
//localhost:3000/admin/viewItems
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
//localhost:3000/admin/viewItem/category
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
//localhost:3000/admin/deleteItems/id
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
//localhost:3000/admin/uploadpic
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
//localhost:3000/admin/upload
router.post('/upload', (req, res, file) => {
  var category = req.body.category;
  var price = req.body.price;
  var size = req.body.size;
  var title = req.body.title;
  var description = req.body.description;
  var value = [category, price, size, title,description];
  var sql =
    'INSERT INTO item( `category`, `item_price`, `size`, `title`,`item_descri`) VALUE(?,?,?,?,?)';
    mysqlConn.conn.query(sql,value,(err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          data: value,
          code: 200,
          message: "Item added successfully",
        });
      }});
  });
  
/** 
  //update item/giftboxes in database
//localhost:3000/admin/updateItem/item_id
  router.put("/updateItem/:id", (req,res) => {
    id=req.params.id
    var category = req.body.category;
    var price = req.body.price;
    var size = req.body.size;
    var title = req.body.title;
    var description = req.body.description;
    var value = [category, price, size, title,description, id];
    
    var sql = "UPDATE `item` SET  `category` = ?, `item_price`=?,`size`=?,`title`=?,`image`=?,`item_descri`=? WHERE item_id = ?";

    mysqlConn.conn.query(sql,value, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.send(result.affectedRows + " record(s) updated");
    });

  })**/
 

//getting get a specific customer
//localhost:3000/admin/allcustomer/id
router.get("/allcustomer/:id", (req, res) => {
  var cust_id = req.params.id
  sql1 = "SELECT * FROM customer WHERE cust_id = ?";
  mysqlConn.conn.query(sql1,[cust_id],(err, results, rows) => {
    if (err) {
      res.send(err);
    } else {
      console.log(results);
      res.send(results);
    }});
});

module.exports = router;
