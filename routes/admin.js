var mysql = require("mysql");
var express = require("express");
var auth = require("../controllers/auth");
//var auth = require('../imageUpload');
//var session = require('express-session');
var bodyParser = require("body-parser");
var mysqlConn = require("../config/conn_db");

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

module.exports = router;
