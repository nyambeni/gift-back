const mysql = require('mysql');
const express = require('express');
const app = express();
var cors = require('cors')
const mysqlConn= require('../conn/conn');
const bodyParser = require('body-parser');
const router = express.Router();

//Add to wishlist
router.post('/addw',function(req,res){
  

    var post = {
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        qty:req.body.qty,
    };


    var name = req.body.name;
    var myQuery1 = "SELECT * FROM cart_det WHERE name = ?";
    mysqlConn.query(myQuery1,[name],function(err,results){
        
        if(results.length > 0){

            res.send({
                data : results,
                code : 200,
                message : "Sorry, item already exist in the wishlist !!!"

            })

        }else{
                var myQuery = "INSERT INTO cart_det SET ?";
                mysqlConn.query(myQuery, [post], function(err, results){
                    if(err){
                        
                        return res.send({
                            data : err,
                            code : 400,
                            message : "The was an error !!!"
                        });
                            
                    }else{
                        
                        return res.send({
                            data : results,
                            code : 200,
                            message : "Added Wishlist To Successfully..."
            
                        })
                    }
            })
        }
        
    })
});

//Remove cart
router.delete('/delete/:name',function(req,res){
  var sQL = 'DELETE FROM cart_det WHERE name= ?';
  mysqlConn.query(sQL,[req.params.name],(err,rows,fields)=>{
    if(!err)
        res.send('Deleted successfully');
    else
        console.log(err);
  })
});







module.exports = router;
