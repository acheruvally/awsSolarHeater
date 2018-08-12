var mysql = require('mysql');
var express = require('express');
fs = require('fs'),
html = fs.readFileSync('index.html');    

var connection = mysql.createConnection({
host : process.env.RDS_HOSTNAME,
user : process.env.RDS_USERNAME,
password : process.env.RDS_PASSWORD,
port : process.env.RDS_PORT
});


app = express(),
//set view engine
app.set("view engine","jade")
port = process.env.PORT || 3000;

  connection.connect(function(err) {
    if (err) {
    console.error('Database connection failed from express: ' + err.stack);
    return;
    }
    console.log('Connected to database from express');
      
  });


  app.get('/solarHeaterData', function(req, res){
    
    connection.query("SELECT * FROM `iot`.`solarheaterdata`", (err, rows, fields) => {
      if (!err)
          {
          res.send(JSON.stringify(rows));
          console.log(JSON.stringify(rows));}
          else
          console.log(err);
      endif    
  })
  
  
  
  })
  

  app.get('/solarHeaterUI', function(req, res){
  
   
    
  connection.query("SELECT * FROM `iot`.`solarheaterdata`", (err, rows, fields) => {
    if (!err)
        {
        // res.send(JSON.stringify(rows));
        res.render('solarHeaterData', { title: 'Solar Heater Data', rows: rows });
        console.log(JSON.stringify(rows));}
        else
        console.log(err);
    endif    
})


  connection.end();
  
})

app.listen(port, function(){
  console.log('Server listening on ', port);
})