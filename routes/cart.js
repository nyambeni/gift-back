const mysql = require('mysql');
const express = require('express');
const app = express();
var cors = require('cors')
const mysqlConn= require('../conn/conn');
const bodyParser = require('body-parser');
const router = express.Router();

//Update cart qty
router.post('/update',function(req,res){
  var item_name = req.body.item_name;
  var qty = req.body.qty;

  //Udate qty
  var sql="UPDATE cart SET qty = ? WHERE item_name = ? " ;
  mysqlConn.query(sql,[qty,item_name] ,function (err, results,fields){
      if(!err){
                  
                  res.send(results)
              }else{
                  console.log(err)
              }
   });
  
})


//Add to cart
router.post('/add',function(req,res){
  

    var post = {
    
        "item_name": req.body.item_name,
        "price": req.body.price,
        "description": req.body.description,
        "qty": req.body.qty,
    };

    // validate product 
    var item_name = req.body.item_name;
    var myQuery1 = "SELECT * FROM cart WHERE item_name = ?";
    mysqlConn.query(myQuery1,[item_name],function(err,results){
        
        if(results.length > 0){

            res.send({
                data : results,
                code : 200,
                message : "Sorry, item already exist in the cart just add qty!"

            })

        }else{
                var myQuery = "INSERT INTO cart SET ?";
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
                            message : "Added Cart To Successfully..."
            
                        })
                    }
            })
        }
        
    })
});

//Remove cart
router.delete('/delete/:cart_id',function(req,res){
  var sQL = 'DELETE FROM cart WHERE cart_id = ?';
  mysqlConn.query(sQL,[req.params.cart_id],(err,rows,fields)=>{
    if(!err)
        res.send('Deleted successfully');
    else
        console.log(err);
  })
});

module.exports = router;
