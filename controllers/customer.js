const mysql = require('mysql');
const express = require('express');
const app = express();
var cors = require('cors')
const mysqlConn= require('../config/conn_db');
const bodyParser = require('body-parser');
const router = express.Router();

//Add to wishlist
router.post('/addwishlist',function(req,res){
  

    var post = {
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        qty:req.body.qty,
    };



    var name = req.body.name;
    var myQuery1 = "SELECT * FROM wishlist WHERE name = ?";
    mysqlConn.query(myQuery1,[name],function(err,results){
        
        if(results.length > 0){

            res.send({
                data : results,
                code : 401,
                message : "Sorry, item already exist in the wishlist !!!"

            })

        }else{
                var myQuery = "INSERT INTO wishlist SET ?";
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

//Remove  from wishlist 
router.delete('/delete/:name',function(req,res){
  var sQL1 = 'DELETE FROM cart_det WHERE name= ?';
  mysqlConn.query(sQL1,[req.params.name],(err,rows,fields)=>{
    if(!err)
        res.send('Deleted successfully');
    else
        console.log(err);
  })
});


//adding to cart 
router.post('/addcart',(req,res)=>{


    const {item_name,price,description,qty,totalPrice}=req.body;
    const myQuery="SELECT * FROM cart WHERE item_name= ? ";

    connection.conn.query(myquery,[item_name],async(error,rows,fields)=>{

        if(error)
        {
            console.log(error);
        }
        if(rows.length>0)
        {
           return res.send('item already added to cart');
        }
         else{
            const myquery2='INSERT INTO cart SET ?';
            const post={item_name:item_name,price:price,description:description,qty:qty,totalPrice:totalPrice};
            connection.conn.query(myquery2,post,(error,rows,fields)=>
            {
                if(error)
                {
                    console.log(error);
                }
                else{
                    console.log(rows);
                    res.status(200).send('item added to cart');
                }
            })
         }
      

    })



})

//delete from cart
router.delete('/delete/:name',(req,res)=>{

  const del='DELETE FROM cart WHERE item_name= ?';
  connection.conn.query(del,[req.params.item_name],(error,rows)=>{
      if(!error)
      {
          res.send('cart deleted successfully')
      }
  })

})




module.exports = router;
