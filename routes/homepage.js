const express=require('express');
const connection  = require('../Config/conn_db');

const router=express.Router();

router.get('/home',(req,res)=>{

    query1='SELECT * FROM items';
    connection.conn_db.query(query1,(error,rows,fields)=>
    {
        if(!error)
        {
            res.send(rows);
        }
        else
        {
            console.log(error);
        }
    })
})


router.get('/:category',(req,res)=>{

    query1='SELECT * FROM items WHERE category= ?';
    connection.conn_db.query(query1,[req.params.category],(error,rows,fields)=>
    {
        if(!error)
        {
            res.send(rows);
        }
        else
        {
            console.log(error);
        }
    })
})



/*router.get('/home',(req,res)=>{

    query1='SELECT * FROM items';
    connection.conn_db.query(query1,(error,rows,fields)=>
    {
        if(!error)
        {
            res.send(rows);
        }
        else
        {
            console.log(error);
        }
    })
})*/



module.exports=router;