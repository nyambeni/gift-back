const mysql = require('mysql');
const express = require('express');
const app = express();
var cors = require('cors')
const mysqlConn= require('../config/conn_db');
const bodyParser = require('body-parser');
const router = express.Router();


//customer profile
router.post('/cprofile/:id',(req,res)=>{

    const cProfile='SELECT * FROM customer where cust_id = ? ';
    const c_id=[req.params.cust_id];
    mysqlConn.conn.query(cProfile,c_id,(error,results)=>{
        if(error)
        {
            console.log(error);
        }else{
            res.send(results);
        }
    })


})



module.exports = router;