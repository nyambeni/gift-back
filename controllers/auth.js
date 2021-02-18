const mysql = require('mysql');
const bcrypt=require('bcryptjs');
const cookieParser=require('cookie-parser');
const jwt = require('jsonwebtoken');  
const connection  = require('../config/conn_db');





//registering a customer to the database
exports.customer_register=(req,res)=>{

    

    const {firstname,lastname,email,password,passwordconfirm}=req.body;
    const myquery='SELECT email FROM customer WHERE email = ?';
    connection.conn.query(myquery,[email],async(error,rows,fields)=>{

        if(error)
        {
            console.log(error);
        }
        if(rows.length>0)
        {
           return res.send('email already registered');
        }
        else if (password!==passwordconfirm)
        {
           return res.send('password entered does not match');
        }
        let hashedPassword= await bcrypt.hash(password,8);
        console.log(hashedPassword);

      const myquery2='INSERT INTO customer SET ?'
        connection.conn.query(myquery2,{firstname:firstname,lastname:lastname,email:email,password: hashedPassword},(error,rows,fields)=>
        {
            if(error)
            {
                console.log(error);
            }
            else{
                console.log(rows);
                res.status(200).send('user registered in the database');
            }
        })

    })
}


//this is for the admin login

module.exports.AdminLogin=(req, res, next) => {
  connection.conn.query('SELECT * FROM admin WHERE username = ?',[req.body.username],(err, result) => {
      // user does not exists
      if (err) {
        throw err;
        //return res.status(400).send({
        //  msg: err
       // });
      }
      if (!result.length) {
        return res.status(401).send('Username or password is incorrect!'
      );
      }
      // check password
      bcrypt.compare( req.body.password, result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            //throw bErr;
            return res.status(401).send('Username or password is incorrect!'
            );
          }
          if (bResult) {
            const token = jwt.sign({
                username: result[0].username,
                userId: result[0].id
              },
              'SECRETKEY', {
                expiresIn: '7d'
              }
            );
           
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]//user details appears including the password
            });
          }
          return res.status(401).send('Username or password is incorrect!'
          );
        }
      );
    }
  );
};



  
//customer login
module.exports.customer_login=(req, res, next) => {
  connection.conn.query('SELECT * FROM customer WHERE email = ?',[req.body.email],(err, result) => {
      // user does not exists
      if (err) {
        throw err;
        //return res.status(400).send({
        //  msg: err
       // });
      }
      if (!result.length) {
        return res.status(401).send('Username or password is incorrect!'
      );
      }
      // check password
      bcrypt.compare( req.body.password, result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            //throw bErr;
            return res.status(401).send('Username or password is incorrect!'
            );
          }
          if (bResult) {
            const token = jwt.sign({
                username: result[0].username,
                userId: result[0].id
              },
              'SECRETKEY', {
                expiresIn: '7d'
              }
            );
           
          return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]//user details appears including the password
            });


          }
          return res.status(401).send('Username or password is incorrect!'
          );
        }
      );
    }
  );
};