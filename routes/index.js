const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const  mysqlConn= require('../conn/conn');
const bodyparser = require('body-parser')

//searching  for categories using like % vale % "working"
router.get('/search', function(req,res){

    var product_name = req.body.product_name;
    var myQuery = "SELECT * FROM product WHERE product_name LIKE '%" + product_name + "%' ORDER BY  product_name DESC LIMIT 4";

    mysqlConn.query(myQuery,product_name, function(err,results){
        if(err){
            res.send(err)
        }
        else{
            console.log(results)
             res.send({
                data: results,
                message: "Search - Successful..."
                
            }) 
        }
    })
});

//searching  for categories using like % vale % "working"
router.get('/searchc', function(req,res){

    var product_category = req.body.product_category;
    var myQuery = "SELECT * FROM product WHERE product_category LIKE '%" + product_category + "%' ORDER BY  product_category DESC LIMIT 4";

    mysqlConn.query(myQuery,product_category, function(err,results){
        if(err){
            res.send(err)
        }
        else{
            console.log(results)
             res.send({
                data: results,
                message: "Search - Successful..."
                
            }) 
        }
    })
});

//dropbox search "working"
router.get('/searchDropbox', function(req,res){

    var product_name = req.body.product_name;
    var myQuery = "SELECT * FROM product_name WHERE product_name = ?";

    mysqlConn.query(myQuery,product_name, function(err,results){
        if(err){
            res.send(err)
        }
        else{
           console.log(results)
           res.send({
                data: results,
                message: "DROPBOX successfully...selected the category"
            }) 
        }
    })
});

module.exports = router;