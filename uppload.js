var express = require('express')
  //, routes = require('./routes')
  , path = require('path'),
	fileUpload = require('express-fileupload'),
	app = express(),
	mysql = require('mysql'),
	bodyParser=require("body-parser");
	
//    const mysql = require('mysql');
    const connection = mysql.createConnection({
    host: 'localhost',
    password:'',
    user:'root', 
    database: 'giftbox_db',
    
    });

    
connection.connect((err) => {
    if(err) throw err;
    console.log('database is connected successfully');
    });
 
//connection.connect();
 
global.db = connection;
 
// all environments
app.set('port', process.env.PORT || 3000);
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
 
// development only
 
//app.get('/', routes.index);//call for main index page
//app.post('/', routes.index);//call for signup post 
//app.get('/profile/:id',routes.profile);
//Middleware
app.listen(3000)


//exports.index = function(req, res){
    app.post('/upload', (req,res,file) => {

      var post  = req.body;
      var category= post.category;
      var price= post.price;
      var size= post.size;
      var title= post.title;
      
 
	  
    

    //  var file = req.file.;
		var img_name=file.name;
 
	  	 if(file.mimetype == "image/jpeg" ||file.mimetype == "image/jpg" ||file.mimetype == "image/png" ||file.mimetype == "image/gif" ){
                                 
              file.mv('public/images/upload_images/'+file.name, function(err) {
                             
	              if (err)
 
	                return res.status(500).send(err);
                    var sql='INSERT INTO item( `category`, `item_price`, `size`, `title`, `image`) VALUE(?,?,?,?,?)';
 
    						var query = db.query(sql, function(err, result) {
                                res.send('items added to databse');    							 //res.redirect('profile/'+result.insertId);
    						});
					   });
          } else {
            message = "This format is not allowed , please upload file with '.png', .jpeg, '.gif','.jpg'";
            //res.render('index.ejs',{message: message});
            res.send(message);
          }
  
        // }
});

//exports.profile = function(req, res){
    app.get('getItems', (req,res) => {
	//var message = '';
	var id = req.params.id;
    var sql="SELECT * FROM `item` "; 
    db.query(sql, function(err, result){
      if(result.length <= 0)
      {
	  message = "item not found!";
      res.send(message);
    } 
      else{
          res.send(result);
      }
   });
});