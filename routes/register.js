const express=require('express');
authController=require('../controllers/auth');
authController2=require('../controllers/adminauth');
const mysql = require("mysql");
const connection  = require('../config/conn_db');
const router=express.Router();


router.post('/register',authController.customer_register);
router.post('/reg',authController2.admin_register);


module.exports = router ;