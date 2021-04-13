var mysql = require("mysql");
var express = require("express");
//var session = require('express-session');
var mysqlConn = require('./config/conn_db');
const path = require("path");
const cors = require("cors");
const multer = require("multer");
var bodyParser = require("body-parser");
var adminApi = require("./routes/admin");
const Login = require("./routes/login");
const customer_register = require("./routes/register");
const customer_file = require("./routes/customer");
const caprofile = require("./routes/profile");
//const upload = require('./imageUpload');

var port = process.env.PORT || 3000;
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// storage engine

const storage = multer.diskStorage({
  destination :'./upload/images',
  filename : (req , file, cb)=>{
    //file.fieldname + "-" + Date.now() + path.extname(file.orginalname
      return cb(null ,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload= multer({
  storage : storage,
})

//app.use("/profile", express.static("./upload/images"));
app.use("/admin", adminApi);
app.use("/register", customer_register);
app.use("/login", Login);
app.use("/customer", customer_file);
app.use("/caprofile", caprofile); //CA customer admin profile

app.use('/picture',express.static('upload/images'));
app.post("/upload",upload.single('picture'),(req,res)=>{

    // res.json({ 
    //     success: 1,
    //     profile_url: `http://localhost:3000/profile/${req.file.filename}`=image,
    // })
  var  image = `http://localhost:3000/picture/${req.file.filename}`;
 // profile_url: image;
    var post=req.body;
   var category = post.category
   var item_price = post.item_price;
   var title =post.title;
   var size = post.size;
  // image = post.image;
   var item_descri = post.item_descri;
   var avail_item = post.avail_item;

   var sql1= 'INSERT INTO item ( `category`, `item_price`, `size`, `title`, `image`, `item_descri`,`avail_item`)'+
              ' VALUE(?,?,?,?,? , ? , ? )';
              mysqlConn.conn.query(sql1,[category,item_price, size, title, image ,item_descri,avail_item], (err,rows)=>{
                if (!err) {

                  res.send('successfully updated');
                  
                } else {

                  console.log(error);
                  
                }
              })




})
function errHandler(err, req, res, next){
    if(err instanceof MulterError)
    {
        res.json({success: 0,
        message: err,message
    })
    }
}

app.listen(port, () => console.log("Go to localhost:" + port));
