const express=require('express');
authController=require('../controllers/auth');
const mysql = require("mysql");
const connection  = require('../config/conn_db');
const router=express.Router();


router.post('/register',authController.customer_register);
//router.post('/reg',authController.register2);


module.exports = router ;