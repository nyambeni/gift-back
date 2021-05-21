const express=require('express');
const jwt = require('jsonwebtoken');  
const verify = require ('../veriftToken');
const connection  = require('../config/conn_db');
authController=require('../controllers/auth');
authController2=require('../controllers/adminauth');
const router=express.Router();


router.post('/admin',authController2.admin_login);
router.post('/customer',authController.customer_login);


module.exports=router;