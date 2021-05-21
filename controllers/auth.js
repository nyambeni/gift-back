const mysql = require('mysql');
const bcrypt=require('bcryptjs');
const cookieParser=require('cookie-parser');
const jwt = require('jsonwebtoken');  
const connection  = require('../config/conn_db');





//registering a customer to the database
exports.customer_register=(req,res)=>{

    const {firstname,lastname,emailAddress,password}=req.body;
    const myquery='SELECT emailAddress FROM customer WHERE emailAddress = ?';
    connection.conn.query(myquery,[emailAddress],async(error,rows,fields)=>{

        if(error)
        {
            console.log(error);
        }
        if(rows.length>0)
        {
           return res.send('email already registered');
        }
       
        let hashedPassword= await bcrypt.hash(password,8);
       const auth={firstname:firstname,lastname:lastname,emailAddress:emailAddress,password:hashedPassword}
       
      const myquery2='INSERT INTO customer SET ?'
        connection.conn.query(myquery2,auth,(error,rows,fields)=>
        {
            if(error)
            {
                console.log(error);
            }
            else{
                //console.log(rows);
                const exp={firstname:firstname,lastname:lastname,emailAddress:emailAddress,password:hashedPassword}
              //  const semail={email:emailAddress}
                res.status(200).send({data:exp,message:'email registered in the database'});
            }
        })

    })
}

  
//customer login
module.exports.customer_login=(req, res, next) => {
  connection.conn.query('SELECT * FROM customer WHERE emailAddress = ?',[req.body.emailAddress],(err, result) => {
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