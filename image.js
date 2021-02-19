var express = require('express');

var mysql = require('mysql');
//var sql = require("mssql");
var cors = require('cors')


var bodyParser = require('body-parser');
var app = express();
var user_collection = '';
app.use(express.static('app'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())

// mysql
var con = mysql.createConnection({ 
  host: "localhost", 
  user: "root", 
  password: "", 
  database: "giftbox_db",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
  });

});


var base = "/app"
app.get('/userList', function (req, res) {
  let sql = "SELECT * FROM item";
  con.query(sql, (err, rows) => {
    if (err) throw err;
    let resp = {
      status: "success",
      statusMessage: "",
      data: rows
    }
    //console.log(resp)
    res.send(resp);
  });

})


app.put('/user/:id', function (req, res) {
  let set = '';
  const where = `user_id = ${req.params.id}`;
  for(let i in req.body) {
    if(set != '') {
      set += `, ${i} = ${req.body[i]}`;
    } else {
      set += `${i} = ${req.body[i]}`;
    }
  }
  console.log(set)
  let sql = `UPDATE item SET ${set} WHERE ${where}`;
  console.log(sql)
  con.query(sql, (err, rows) => {
    if (err) throw err;
    let resp = {
      status: "success",
      statusMessage: "",
      data: rows
    }
    //console.log(resp)
    res.send(resp);
  });

})

app.delete('/delete/:id', function (req, res) {
   // First read existing users.
   user_collection.remove({_id: ObjectId(req.params.id)},{w:1}, function(err, result) {
    if(err == null) {
        user_collection.find().toArray(function(err, results){
          res.end(JSON.stringify( results ));
        });
        //res.end(JSON.stringify({'status':'success'}));
      } else {
        res.end(JSON.stringify({'status':'error','err':err}));
      }
  });
});
