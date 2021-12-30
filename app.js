const express = require('express');

const bodyParser = require('body-parser');


const app = express();

app.get("/", function(req, res){
    var currentDay = today.getDay();


    if(currentDay == 6 ||currentDay == 0){
      res.write("<h1>Yay its a weekend</h1>")
    }else{
      res.sendFile(__dirname + "/index.html");
    }
})

//app listen 
app.listen(3000, function(){
    console.log("Server is running on port 3000");
});