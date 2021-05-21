var express = require('express');
var app = express();
var multer = require('multer');
var conn = require('./config/conn_db');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var styorage = multer.diskStorage({
    destination :"./uploads/images",
    filename: (req, file, cb) =>
    {
        return cb(null, `${file.fieldname}_${Date.now()}${(file.originalname)}`)

    }
})
var imageFilter = (req, file,cb) => {
     if(file.mimeType ==='image/jpeg' ||file.mimeType ==='image/jpg' || file.mimeType === 'image/png')
     {
        cb(null,true);
       }
       else{
         cb(new Error('unsupported file type'), false);
 }
 
 }
var upload = multer({
    storage: styorage,
    filterFilter:imageFilter

})

app.post("/upload", upload.single('image'), (req,res)=>{
console.log(req.file);
var sql = "UPDATE `item` SET `image`= [req.file] WHERE item_id =?";
conn.query(sql,req.params.item_id, function(err, result)
{
res.send("image uploaded to giftbox database.")
});
})

app.post('/addItem',(req,res)=>{

    //console.log(req.body.category);
    var category = req.body.category;
     var price = req.body.price;
     var size = req.body.size;
     var title = req.body.title;

     sql='INSERT INTO item VALUE(?,?,?,?)';
     var value =[category,price,size,title];
     conn.query(sql,value,(error,rows,fields)=>
       {
           if(error)
           {
               console.log(error);
           }
           else{
               console.log(fields);
               res.send('items added to the database');
           }
       })
    
    //  var sql = "INSERT INTO `item`( `category`,`item_price`,`size`,`title`) VALUES (?,?,?,?,?)";
    //  var itemValue = [categoryy, item_price, size,title];
    //  conn.query(sql,itemValue, function(err, result) {
    //  res.send("item uploaded to giftbox database.")
    //  });
    
})

// app.put()
// {
//     UPDATE `item` SET `item_id`=[],
//     `category`=[value-2],`item_price`=[value-3],
//     `size`=[value-4],`title`=[value-5],
//     `image`=[value-6] WHERE 1;
// }
// var img_name = req.file;
// var c = " req.body.item_category";
// var item_price = req.body.price;
// var size = req.body.size;
// var title = req.body.title;

// var sql = "INSERT INTO `item`( `category`, `item_price`, `size`, `title`, `image`) VALUES (?,?,?,?,?)";
// var itemValue = [c, item_price, size,title,img_name];
// conn.query(sql,itemValue, function(err, result) {
// res.send("item uploaded to giftbox database.")
// });


app.listen(3000,()=>{
    console.log("server up and running")
})


























// var fileUpload = require('express-fileupload');
// var app = express();
// app.use(fileUpload());
// app.post("/post", (req, res) => {
// if (!req.files) {
//  res.send("No file upload")
// } 
// else {

// var file = req.files.image;
// var img_name=files.name;
// var category = req.body.category;
// var item_price = req.body.price;
// var size = req.body.size;
// var title = req.body.title;

// if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){

// file.mv('..//uploads'+file.name, function(err) {
// if (err)
// {
//  //throw err;
//  res.render("error is "+err);
// } 
//   else
//   {
// //return res.status(500).send(err);
// var sql = "INSERT INTO `item`( `category`, `item_price`, `size`, `title`, `image`) VALUES (?,?,?,?,?)";
// var itemValue = [category, item_price, size,title,img_name];
// var query = db.query(sql,itemValue, function(err, result) {
// res.send("item uploaded to giftbox database.")
// });
//   }
// });

// } 
// else
//  {
// res.send ("This format is not allowed , please upload file with '.png','.gif','.jpg'");

// }

 



// exports.uploaadImage=(req,res)=>{

    

//     const {firstname,lastname,email,password,passwordconfirm}=req.body;
//     myquery='SELECT email FROM customers WHERE email = ?';
//     connection.conn.query(myquery,[email],async(error,rows,fields)=>{

//         if(error)
//         {
//             console.log(error);
//         }
//         if(rows.length>0)
//         {
//            return res.send('email already registered');
//         }
//         else if (password!==passwordconfirm)
//         {
//            return res.send('password entered does not match');
//         }
//         let hashedPassword= await bcrypt.hash(password,8);
//         console.log(hashedPassword);

//         myquery2='INSERT INTO customers SET ?'
//         connection.conn.query(myquery2,{firstname:firstname,lastname:lastname,email:email,password: hashedPassword},(error,rows,fields)=>
//         {
//             if(error)
//             {
//                 console.log(error);
//             }
//             else{
//                 console.log(rows);
//                 res.send('user registered in the database');
//             }
//         })

//     })
// }

