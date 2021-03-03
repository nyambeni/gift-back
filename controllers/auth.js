const mysql = require('mysql');
const bcrypt=require('bcryptjs');
const cookieParser=require('cookie-parser');
const jwt = require('jsonwebtoken');  
const connection  = require('../config/conn_db');


exports.customer_register = (req,res)=>{
const firstname = req.body.firstname;
const lastname = req.body.lastname;
const email = req.body.email;
const password = req.body.password;
const passwordconfirm = req.body.passwordconfirm;
const admin_id = "5432";
const value = [firstname,lastname,email,password];

console.log(email);
const myQuery = "SELECT email FROM customer WHERE email = ?";
connection.conn.query(myQuery,[email], function(error,rows,results){
if(error) {
res.send(error);
}

if(results>0){
res.send ("User email alreday exists!");
}
else if(password != passwordconfirm){
res.send("Password doesnt match!!");
}
})

const myquery2="INSERT INTO `customer`(`firstname`, `lastname`, `email`, `password`) VALUE (?,?,?,?)"
connection.conn.query(myquery2,value,(error,rows,results)=>
{
if(error){
console.log(error);
}
else
{
res.send(results)
}
})


}

//registering a customer to the database
/*exports.customer_register=(req,res)=>{



const {firstname,lastname,email,password,passwordconfirm}=req.body;
const admin_id = "5432";
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
var response = await promisedFunction().catch((err) => { console.error(err); });

const auth={firstname:firstname,lastname:lastname,email:email,password: hashedPassword,admin_id:admin_id}

const myquery2='INSERT INTO customer SET ?'
connection.conn.query(myquery2,auth,(error,rows,fields)=>
{
if(error)
{
console.log(error);
}
else{
//console.log(rows);
const exp={firstname:firstname,lastname:lastname,email:email}
const semail={email:email}
res.status(200).send({data:exp,message:'email registered in the database'});
}
})
})
}**/

//this is for the admin login

module.exports.AdminLogin=(req, res, next) => {
connection.conn.query('SELECT * FROM admin WHERE username = ?',[req.body.username],(err, result) => {
// user does not exists
if (err) {
throw err;
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
})}
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
)}
if (bResult) {
const token = jwt.sign({
username: result[0].username,
userId: result[0].id
},
'SECRETKEY', {
expiresIn: '7d'
});

return res.status(200).send({
msg: 'Logged in!',
token,
user: result[0]//user details appears including the password
});

}
return res.status(401).send('Username or password is incorrect!'
)});
});
};