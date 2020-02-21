const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const  db = require('../conn/conn');
const bodyparser = require('body-parser');

router.post('/admin',function(req,res){
    res.send('admin');
});

module.exports = router ;
