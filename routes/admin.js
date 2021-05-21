var mysql = require('mysql');
var express = require('express');
var auth = require('../controllers/auth');
var bodyParser = require('body-parser');
var mysqlConn = require('../config/conn_db');
const { read } = require('fs');
const multer = require("multer");
var router = express.Router();
(app = express()),
(path = require('path')),
(fileUpload = require('express-fileupload')),
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());




//API to get items
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage: storage });


router.post('/uploadItem', upload.single('picture'), (req, res) => {

  var image = `http://localhost:3000/admin/uploads/${req.file.filename}`;
  // profile_url: image;
  var post = req.body;
  var category = post.category
  var item_price = post.price;
  var title = post.title;
  var size = post.size;
  // image = post.image;
  var item_descri = post.description;
  var avail_item = post.quantity;

  console.log('-------------------------');
  console.log(image);
  console.log('-------------------------');

  const sql = 'INSERT INTO item ( `category`, `item_price`, `size`, `title`, `image`, `item_descri`,`avail_item`)' +
    ' VALUE(?,?,?,?,? , ? , ? )';

  mysqlConn.conn.query(sql,[category,item_price, size, title, image ,item_descri,avail_item], (error, results, fields) => {
    console.log(results);
    console.log(error);
    if (error) {
      res.json({ 'error': error })
    } else {
      res.json({ 'msg': 'Successesful' });
    }
  });
});

//API to view all items
router.use('/uploads', express.static('uploads'));
router.get('/viewItems', (req, res) => {
  const sql = "SELECT * FROM item";

  mysqlConn.conn.query(sql, (error, results, fields) => {
    /* res.json({
         item_id: results.id,
         category: results.category,
         item_price: results. item_price,
         request: {
             type: 'GET',
             url: "http://localhost:3000/" + p.jpg
         }

     }); */
    if (error) {
      res.send(error);
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

//API to Create report
//get Customer By date for the report
//localhost:3000/admin/customer/month
router.get("/customer/:date_month", (req, res) => {
  var date_month = req.params.date_month
  sql1 = "SELECT * FROM customer WHERE MONTH(date_created) = ?";
  mysqlConn.conn.query(sql1,[date_month],(err, results, rows) => {
    console.log("You info to the api cusomter");
    if(!results) {
      res.send("Users not found for that Month");
        
    }
    else
    {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(results);
        res.send(results);
      }
    }
 });
});

//get Order By date for the report
//localhost:3000/admin/order/month
router.get("/order/:date_month", (req, res) => {
  var date_month = req.params.date_month
  sql1 = "SELECT * FROM `order_tbl` WHERE MONTH(order_date) = ?";
  
  mysqlConn.conn.query(sql1,[date_month],(err, results, rows) => {
    if(!results) {
      res.send("Users not found for that Month");
        
    }
    else
    {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(results);
        res.send(results);
      }
    }
 });
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





//getting all customer

router.get("/allcustomer", (req, res) => {
  sql1 = "SELECT cust_id ,firstname,lastname,emailAddress FROM customer";
  mysqlConn.conn.query(sql1, (rows, rma, error) => {
    try {
      res.json(rma);
    } catch (error) {
      console.log(error);
    }
  });
});




//view all payments/ orders
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

//api to update  items
router.put('/update/items/:item_id', function (req, res) {

  var item_id = req.body.item_id;

  //var item_id =req.body.item_id;
  var category = req.body.category;
  var item_price = req.body.item_price;
  var size = req.body.size;
  var title = req.body.title;
  //var image=req.body.image;
  var item_descri = req.body.item_descri;
  var avail_item = req.body.avail_item;



  var items = 'UPDATE item SET category = ?,item_price = ?,size =?,title = ?,item_descri = ?, avail_item = ? WHERE item_id = ? ';
  mysqlConn.conn.query(items, [category, item_price, size, title, item_descri,avail_item, req.params.item_id], (err, rows) => {

    if (!err) {
      console.log(rows);
      res.send({ message: 'successfully updated' })

    } else {
      console.log(error);
      console.log({ message: 'error detected' })

    }

  })

})



module.exports = router;
