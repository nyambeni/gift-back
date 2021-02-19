const mysql = require('mysql');
const bcrypt=require('bcryptjs');
const cookieParser=require('cookie-parser');
const jwt = require('jsonwebtoken');  
const connection  = require('../config/conn_db');


//this is for the admin login

module.exports.AdminLogin=(req, res, next) => {
    connection.conn.query('SELECT * FROM admin WHERE username = ?',[req.body.username],(err, result) => {
      const username = req.body.username;
      const password = req.body.password;
  
      if(username && password){
          connection.conn.query('SELECT * FROM admin WHERE username = ? AND password = ?',
           [username, password], (error, results, fields) => {
              
              if(results.length > 0){
                  //generate a token fr authication
                  const  the_token = jwt.sign({username: username}, ""+process.env.TOKEN_SECRET);
                  token = {"token": the_token}
                  res.json({token, results});
  
              }else{
                  res.send(401);
              }
              res.end();
           });
      }else{
          res.send('Please enter username and password!!');
          res.end();
      }   
  }
    )};
  
  