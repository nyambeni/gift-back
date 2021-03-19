const mysql = require('mysql');
const express = require('express');



const mysqlConn =mysql.createConnection({

  host:'localhost',
  user:'root',
  password:'',
  database:'giftbox_db',
  multipleStatements: true

})


mysqlConn.connect((err)  =>{

if(!err)

console.log('db connection succeed');


else


console.log('db connection failed' +err);


});


module.exports =mysqlConn;
