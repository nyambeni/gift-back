const mysql = require('mysql');
const express = require('express');
const app = express();
var cors = require('cors')
const mysqlConn= require('../config/conn_db');
const bodyParser = require('body-parser');
const router = express.Router();

//adding to wish list
// ....localhost:3000/addwishlist
router.post('/addwishlist',(req,res)=>{
const {item_title,total_price,cust_id,item_description}=req.body;

const custwishlist='SELECT * FROM wishlist WHERE item_title=?';
mysqlConn.conn.query(custwishlist,[item_title],(error,rows)=>{

if(error){

console.log(error)

}
if(rows.length>0){

return res.status(401).send('item already added to wish list');

}
else{
// INSERT INTO `wishlist`(`wish_id`, `item_title`, `price`, `admin_id`
const values={item_title:item_title,total_price:total_price,cust_id:cust_id, item_description:item_description};
const query1='INSERT INTO wishlist SET ?';
mysqlConn.conn.query(query1,values,(error,results)=>{
if(error){
console.log(error)
}
else{
res.status(200).send({data:values,message:'added to wishlist'})
}
})}

})})

//removing the item from the wish list
router.delete('/deletewishlist/:title',(req,res)=>{
var sQL1 = 'DELETE FROM `wishlist` WHERE `item_title` = ?';
mysqlConn.conn.query(sQL1,[req.params.title],(err,rows,fields)=>{
if(!err)
res.send('Deleted successfully');
else
console.log(err);
})
})

//TO VIEW A CUSTOMERS WISHLIST
//localhost:3000/customer/viewWishlist/cunumber
router.get('/viewWishlist/:custId',function(req,res){
var custId = req.params.custId;
var sql1 = "SELECT * FROM `wishlist` WHERE cust_id = ?";
mysqlConn.conn.query(sql1,[custId], (err,rows,results)=>{
if(err){
console.log(err);
res.send(err);
}
else{
res.send({data:rows});
console.log({data:results});
}
})
})

//
//view wish list
app.get('/viewlist',(req,res)=>{
const view="SELECT * FROM wishlist";
//add the user table 
mysqlConn.conn.query(view,(error,results)=>{
if(error){
console.log(error);
}
else{
res.send(results)
}
})})


//Add to Order 
router.post('/order', (req,res)=>{
var cust_id = req.body.cust_id;
var item_title = req.body.item_title;
var totalPrice = req.body.totalPrice;
var citySuburb = req.body.citySuburb;
var name = req.body.name;
var phoneNumber = req.body.phoneNumber;
var postalCode = req.body.postalCode;
var province =req.body.province;
var streetAddress=req.body.streetAddress;
//var totalPrice=req.body.totalPrice;

const post=[cust_id, item_title,totalPrice, citySuburb, name, phoneNumber, postalCode, province, streetAddress]; 


const myquery2="INSERT INTO `order_tbl`(`cust_id`, `item_title`, `totalPrice`,`citySuburb`, `name`, `phoneNumber`, `postalCode`, `province`, `streetAddress`) VALUE(?,?,?,?,?,?,?,?,?)";
mysqlConn.conn.query(myquery2,post,(error,rows,fields)=>{
if(error){
console.log(error);
}
else{
console.log(rows);
res.status(200).send({data:post,message:'Order recorded in the database'});
}})
})

//Delete order
router.delete('/order/:id', (req,res)=>{
var order_id = req.params.order_id;
var myquery =  "DELETE FROM `order_tbl` WHERE order_id =?"
mysqlConn.conn.query(myquery,[order_id],(err,results)=>{
if(err){
    console.log(err);
    res.send(err);
}
else{
    res.send("Order Deleted!");
    console.log(results+"Order deleted!");
}
})})

//Add payment to database
router.post('/payment', (req, res) => {
var totalprice = req.body.totalPrice;
var cust_id = req.body.cust_id;
//var admin = "5432";
var value = [totalprice, cust_id];
//REMINDER TO LETHI to get the users cust_id we gonna use the token of the user who has login
var query = "INSERT INTO `payment`(`total_price`, `cust_id`) VALUES (?,?)";
mysqlConn.conn.query(query,value, (err,results)=>{
if(err){
res.send(err);
}
else{
res.send({
data :value,
code : 200,
message : "successfully paid"
})}
})})

module.exports = router;
