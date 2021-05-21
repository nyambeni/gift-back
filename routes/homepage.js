const mysql = require("mysql");
const express = require("express");
const app = express();
var cors = require("cors");
const mysqlConn = require("../config/conn_db");
const bodyParser = require("body-parser");
const router = express.Router();

//during recess
//for homepage
router.get('/allitems',function(req,res){

    var items='SELECT *,CASE avail_item WHEN 0 THEN "Not Available"'+
                                       'ELSE "available" END availability FROM item';
    
    mysqlConn.conn.query(items,(err,rows,results)=>{
      if (!err) {
    
        res.send(rows);
        
      } else {
    
        console.log(error);
        
      }
    })
    
    })

    module.exports = router;