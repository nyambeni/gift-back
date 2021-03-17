const mysql = require("mysql");
const express = require("express");
const app = express();
var cors = require("cors");
const mysqlConn = require("../config/conn_db");
const bodyParser = require("body-parser");
const router = express.Router();

//for admin profile
router.get("/cprofile", (req, res) => {
  const cProfile = "SELECT * FROM customer";
  //const c_id=[req.params.cust_id];
  mysqlConn.conn.query(cProfile, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.send(results);
    }
  });
});
///customer profile
router.get("/profile/:id", (req, res) => {
  const cProfile = "SELECT * FROM customer WHERE cust_id= ?";
  const post = [req.params.id];
  //const c_id=[req.params.cust_id];
  mysqlConn.conn.query(cProfile, post, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      // const exp={firstname:firstname,lastname:lastname,emailAddress:emailAddress,password:hashedPassword}
      //  const semail={email:emailAddress}
      res.status(200).send({ user: results });
    }
  });
});
//update profile
router.put("/update/:id", (req, res) => {
  const post = ({ firstname, lastname, email } = req.body);
  const upd = "UPDATE customer SET ? WHERE cust_id= ? ";

  // const post={firstname:firstname,lastname:lastname,email:email};

  mysqlConn.conn.query(upd, [post, req.params.id], (error, rows) => {
    if (error) {
      throw error;
    } else {
      res.status(200).send("profile has been successfully updated");
    }
  });
});

router.delete("/delaccount/:id", (req, res) => {
  const upd = "DELETE FROM customer  WHERE cust_id= ? ";

  // const post={firstname:firstname,lastname:lastname,email:email};

  mysqlConn.conn.query(upd, [req.params.id], (error, rows) => {
    if (error) {
      throw error;
    } else {
      res.status(200).send("Account has been deleted");
    }
  });
});

module.exports = router;
