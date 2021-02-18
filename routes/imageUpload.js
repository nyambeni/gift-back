/**var express = require('express');
var app = express();
const router = express.Router();
var multer = require('multer');
var conn = require('../conn/conn');
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
     if(file.mimetype =='image/jpeg' ||file.mimetype =='image/jpg' || file.mimetype == 'image/png')
     {
        cb(null,true);
       }
       else{
         cb(new Error('unsupported file type, file must be .png, .jpg, or .jpeg'), false);
 }
 
 }
var upload = multer({
    storage: styorage,
    fileFilter:imageFilter

})

app.put("/upload/:id", upload.single('image'), (req,res)=>{
    
console.log(req.file);
filename = req.file.path;
var sql = "UPDATE `item` SET `image`= [filename] WHERE item_id =?";
conn.query(sql,req.params.id, function(err, result)
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


     sql='INSERT INTO item( `category`, `item_price`, `size`, `title`) VALUE(?,?,?,?)';
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
    
})
app.listen(3000,()=>{
    console.log("server up and running")
})

module.exports = router;
**/