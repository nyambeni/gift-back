const express=require('express');
authController=require('../controllers/auth');
const mysql = require("mysql");
const connection  = require('../config/conn');
const router=express.Router();


//router.post('/register',authController.register);
//router.post('/reg',authController.register2);


module.exports = router ;