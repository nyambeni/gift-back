
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const sqlconn=require('../conn/conn');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// Insert into order
router.post ('/insert', function(req,res){

 var name = { order_id:req.body.order_id,
              full_name:req.body.full_name,
              email:req.body.email,
              phone:req.body.phone,
              address:req.body.address,
              city:req.body.city,
              province:req.body.province,
              code:req.body.code}
      
        sqlconn.query("INSERT INTO orders set ?",name, function(error, results) {
        if (error) throw error;
 
        else
                    
        res.send( {message:'user sucessfully  place an order'})
      
  });
})



 router.get ('/allOrders', function(req,res){
       
         sqlconn.query("select * from orders", function(error, results) {
         if (error) throw error; 
         else                     
         res.send( {data:results})      
       });  
  })

//Delete an seller
router.delete('/t/:order_id',(req,res)=>{
  sqlconn.query('DELETE FROM orders WHERE order_id = ?',[req.params.order_id],(err,rows,fields)=>{
      if(!err)
          res.send('Deleted successfully');
      else
          console.log(err);
  })
  
});

  
module.exports=router;
