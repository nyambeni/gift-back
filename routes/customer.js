const mysql = require('mysql');
const express = require('express');
const app = express();
var cors = require('cors')
const mysqlConn= require('../config/conn_db');
const bodyParser = require('body-parser');
const router = express.Router();

//adding to wish list
router.post('/addwishlist',(req,res)=>{

    const {name,price,description,qty,totalPrice}=req.body;
    const custwishlist='SELECT name FROM wishlist ';
    mysqlConn.conn.query(custwishlist,[name],(error,rows)=>{

        if(error)
        {
            console.log(error)
        }
        if(rows.length>0)
        {
            return res.status(401).send('item already added to wish list');
        }else{

            const values={name:name,price:price,description:description,qty:qty,totalPrice:totalPrice};
            const query1='INSERT INTO wishlist SET ?';
            mysqlConn.conn.query(query1,values,(error,results)=>{
                if(error)
                {
                    console.log(error)
                }else{
                    res.status(200).send({data:values,message:'added to wishlist'})
                }
            })

        }

    })


})
//removing the item from the wish list



router.delete('/delete/:name',function(req,res){
    var sQL1 = 'DELETE FROM cart WHERE name= ?';
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
    

    mysqlConn.conn.query(myQuery,[item_name],(error,rows,fields)=>{

        if(error)
        {
            console.log(error);
        }
        if(rows.length>0)
        {
           return res.status(401).send('item already added to cart');
        }
         
            const myquery2='INSERT INTO cart SET ?';
            //add where customer id =?
            const post={item_name:item_name,price:price,description:description,qty:qty,totalPrice:totalPrice};
            mysqlConn.conn.query(myquery2,post,(error,results)=>
            {
                if(error)
                {
                    console.log(error);
                    
                 }
                else{
                    

                   // console.log(rows);
                    res.send({data:post,message:' added to the database'});
                }
            })
        
      

    })



})

//delete from cart
router.delete('/delete/:name',(req,res)=>{

  const del='DELETE FROM cart WHERE item_name= ?';
  mysqlConn.conn.query(del,[req.params.item_name],(error,rows)=>{
      if(!error)
      {
          res.send('cart deleted successfully')
      }
  })

})



//view wish list
app.get('/viewlist',(req,res)=>{

    const view="SELECT * FROM wishlist";
    //add the user table 
    mysqlConn.conn.query(view,(error,results)=>{
        if(error)
        {
            console.log(error);
        }
        else{
            res.send(results)
        }
    })

})



module.exports = router;
