const mysql = require("mysql");
const express = require("express");
const app = express();
var cors = require("cors");
const mysqlConn = require("../config/conn_db");
const bodyParser = require("body-parser");
const router = express.Router();

//customer profile

router.get("/profile/:custId", function (req, res) {
  custId = req.params.custId;
  var sql1 =
    "SELECT firstname,lastname,emailAddress FROM customer WHERE cust_id = ?";
  mysqlConn.conn.query(sql1, [custId], (rows, results, error) => {
    try {
      res.send(results);
    } catch (error) {
      console.log(error);
    }
  });
});


//updating customer profile 
router.put('/profile/update/:cust_id', function (req, res) {
  var cust_id = req.body.cust_id;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var emailAddress = req.body.emailAddress;
  var password = req.body.password;


  upt = "UPDATE customer SET firstname=? ,lastname=? WHERE cust_id= ?";
  mysqlConn.conn.query(upt, [firstname, lastname, req.params.cust_id], (rows, results, error) => {
    if (!error) {
      res.status(200).send(results)
    }
    else {
      console.log(error)
    }


  })


})
//delete customer account
router.delete('/delete/:id', (req, res) => {
  var id = req.params.id;
  var del = 'DELETE FROM customer WHERE cust_id = ? ';
  mysqlConn.conn.query(del, [id], (rows, error) => {
    if (!error) {
      res.send({ message: "successfully deleted " });
    }
    else {
      console.log(error);
    }
  })

})

//API to view items by category for customer
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


//update items quantity
router.put('/avail/item', function (req, res) {

  var tem;
  var quantity;


  var item_id = req.body.item_id;
  var category = req.body.category;
  var item_price = req.body.item_price;
  var size = req.body.size;
  var title = req.body.title;
  var image = req.body.image;
  var item_descri = req.body.item_descri;
  var avail_item = req.body.avail_item;

  var s_items = 'SELECT * FROM items WHERE title= ?';
  mysqlConn.conn.query(s_items, [title], (err, rows) => {


    if (rows.length > 0 && !err) {
      var items = 'UPDATE item SET avail_item = ? WHERE title = ? ';
      mysqlConn.conn.query(items, [avail_item, title], (rows, error, result) => {

        if (!error) {
          res.send({ message: 'successfully updated' });
        } else {
          console.log(error);
        }

      })
    }

    else {

      console.log(err)
    }

  })

})



//adding to wish list
// ....localhost:3000/addwishlist
router.post("/addwishlist", (req, res) => {
  const {
    item_title,
    item_price,
    cust_id,
    item_description,
    category,
    size,
    image,
  } = req.body;

  const custwishlist = "SELECT * FROM wishlist WHERE item_title=? AND cust_id= ? ";
  mysqlConn.conn.query(custwishlist, [item_title, cust_id], (error, rows) => {
    if (error) {
      console.log(error);
    }
    if (rows.length > 0) {
      return res.json("Item already added to wish list: cannot ");
    } else {
      // INSERT INTO `wishlist`(`wish_id`, `item_title`, `price`, `admin_id`
      const values = {
        item_title: item_title,
        item_price: item_price,
        cust_id: cust_id,
        item_description: item_description,
        category: category,
        size: size,
        image: image,
      };
      const query1 = "INSERT INTO wishlist SET ? ";
      mysqlConn.conn.query(query1, [values], (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.json("added to wishlist");
        }
      });
    }
  });
});
//removing the item from the wish list
router.delete("/deletewishlist/:title", (req, res) => {
  var sQL1 = "DELETE FROM `wishlist` WHERE `wish_id` = ?"; //made changes item_title
  mysqlConn.conn.query(sQL1, [req.params.title], (err, rows, fields) => {
    if (!err) res.json("Deleted successfully");
    else console.log(err);
  });
});

//TO VIEW A CUSTOMERS WISHLIST
//localhost:3000/customer/viewWishlist/cunumber
router.get("/viewWishlist/:custId", function (req, res) {
  var custId = req.params.custId;
  var sql1 = "SELECT * FROM `wishlist` WHERE cust_id = ?";
  mysqlConn.conn.query(sql1, [custId], (err, results) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(results);
      console.log({ data: results });
    }
  });
});

//customer cart

router.post("/addcart", (req, res) => {
  const {
    title,
    price,
    cust_id,
    description,
    size,
    images,
  } = req.body;

  const cart = "SELECT * FROM cart WHERE title=? AND cust_id= ? ";
  mysqlConn.conn.query(cart, [title, cust_id], (error, rows) => {
    if (error) {
      console.log(error);
    }
    if (rows.length > 0) {
      return res.status(401).send("item already added to cart");
    } else {
      // INSERT INTO `wishlist`(`wish_id`, `item_title`, `price`, `admin_id`
      const values = {
        title: title,
        price: price,
        cust_id: cust_id,
        description: description,
        size: size,
        images: images,
      };
      const query1 = "INSERT INTO cart SET ? ";
      mysqlConn.conn.query(query1, [values], (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.status(200).send({ data: values, message: "added to cart" });
        }
      });
    }
  });
});

//delete customer cart

router.delete("/deletecart/:cart_id", (req, res) => {
  var sQL1 = "DELETE FROM `cart` WHERE `cart_id` = ?";
  mysqlConn.conn.query(sQL1, [req.params.cart_id], (err, rows, fields) => {
    if (!err) res.json("Deleted successfully");
    else console.log(err);
  });
});

//view customer cart
router.get("/viewcart/:custId", function (req, res) {
  var custId = req.params.custId;
  var sql1 = "SELECT * FROM `cart` WHERE cust_id = ?";
  mysqlConn.conn.query(sql1, [custId], (err, rows, results) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json({ data: rows });
      console.log({ data: results });
    }
  });
});


//update items number of boxes left after purchase
router.put('/update/bought_item/:title', function (req, res) {

  var item_id = req.body.item_id;
  var category = req.body.category;
  var item_price = req.body.item_price;
  var size = req.body.size;
  // var title=req.body.title;
  var image = req.body.image;
  var item_descri = req.body.item_descri;
  var avail_item = req.body.avail_item;
  var avail_box = req.body.avail_box;


  var items = 'UPDATE item SET avail_item= ?' +
    'WHERE title = ?';

  mysqlConn.conn.query(items, [avail_item, req.params.title], (err, result) => {

    if (!err) {
      res.send({ message: 'successfully updated' });
    } else {
      console.log(err);
    }

  })

})




//view order by id

router.get('/order/:id', function (req, res) {
  const _id = req.params.id;
  sqls = "SELECT * FROM order_tbl WHERE cust_id = ? ";
  mysqlConn.conn.query(sqls, [_id], (rows, error, results) => {
    if (!error) {

      res.status(200).json({ data: rows })

    } else {
      console.log(error)
    }
  })

})
//Add to Order
router.post("/order", (req, res) => {
  var cust_id = req.body.cust_id;
  var item_title = req.body.item_title;
  var quantity = req.body.quantity;
  var totalPrice = req.body.totalPrice;
  var citySuburb = req.body.citySuburb;
  var name = req.body.name;
  var phoneNumber = req.body.phoneNumber;
  var postalCode = req.body.postalCode;
  var province = req.body.province;
  var streetAddress = req.body.streetAddress;
  //var totalPrice=req.body.totalPrice;

  const post = [
    cust_id,
    item_title,
    quantity,
    totalPrice,
    citySuburb,
    name,
    phoneNumber,
    postalCode,
    province,
    streetAddress,
  ];

  const myquery2 =
    "INSERT INTO `order_tbl`(`cust_id`, `item_title`,`quantity`, `totalPrice`,`citySuburb`, `name`, `phoneNumber`, `postalCode`, `province`, `streetAddress`) VALUE(?,?,?,?,?,?,?,?,?,?)";
  mysqlConn.conn.query(myquery2, post, (error, rows, fields) => {
    if (error) {
      console.log(error);
    } else {
      console.log(rows);
      res
        .status(200)
        .send({ data: post, message: "Order recorded in the database" });
    }
  });
});




//Delete order
router.delete("/order/:id", (req, res) => {
  var order_id = req.params.order_id;


  var myquery = "DELETE FROM `order_tbl` WHERE order_id =?";
  mysqlConn.conn.query(myquery, [order_id], (err, results) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send("Order Deleted!");
      console.log(results + "Order deleted!");
    }
  });
});

//Add payment to database
router.post("/payment", (req, res) => {
  var totalprice = req.body.totalPrice;
  var cust_id = req.body.cust_id;
  //var admin = "5432";
  var value = [totalprice, cust_id];
  //REMINDER TO LETHI to get the users cust_id we gonna use the token of the user who has login
  var query = "INSERT INTO `payment`(`total_price`, `cust_id`) VALUES (?,?)";
  mysqlConn.conn.query(query, value, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send({
        data: value,
        code: 200,
        message: "successfully paid",
      });
    }
  });
});


//during recess
//update items number of boxes left after purchase
router.put('/updates/:item_id', function (req, res) {

  var avail_item = req.body.avail_item;

  var i_temchk = 'UPDATE item SET avail_item = ? WHERE item_id= ?';

  mysqlConn.conn.query(i_temchk, [avail_item, req.params.item_id], (err, results) => {

    if (!err) {
      res.send({ message: 'successfull updated' });
    } else {
      console.log(err);
    }
  });


})

module.exports = router;
