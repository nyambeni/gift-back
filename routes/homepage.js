//during recess
//for homepage
router.get('/allitems',function(req,res){

    var items='SELECT *,CASE avail_item WHEN 0 THEN "Not Available"'+
                                       'ELSE "available" END availability FROM item';
    
    mysqlConn.conn.query(items,(err,rows,results)=>{
      if (!err) {
    
        res.send(rows);
        
      } else {
    
        console.log(error);
        
      }
    })
    
    })