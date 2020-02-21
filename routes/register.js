const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const  db = require('../conn/conn');

//register student 
router.post('/register', function(req, res){  

    var post = {
        "id": req.body.id,
        "username": req.body.username,
        "email": req.body.email,
        "contact": req.body.contact,
        "password": req.body.password
    };

    var password = req.body.password;
    var confirm = req.body.confirm;


    var email = req.body.email;
    var myQuery1 = "SELECT * FROM users WHERE email = ?";
    db.query(myQuery1,[email],function(err,results){
        
        if(results.length > 0){

            res.send({
                data : results,
                code : 200,
                message : "Sorry, user already exist!"

            })

        }else if (confirm == password){
        
            var myQuery = "INSERT INTO users SET ?";
            db.query(myQuery, [post], function(err, results){
                if(err){
                    
                    res.send({
                        data : err,
                        code : 400,
                        message : "The was an error !!!"
                    });
                        
                }else{
                
                    res.send({
                        data : results,
                        code : 200,
                        message : "Registered Successfully..."
        
                    })
                }
            })
          
        }else{
            res.send({
                data : err,
                code : 400,
                message : "Please confirm password!!!"
            });
        }
        
    })
});


module.exports = router ;
