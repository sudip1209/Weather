const express=require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res)
{
    const query=req.body.cityname;
    const apiKey="18208845e79c1b5ec5b4664856d35a87#"
    const unit="metric"
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey;
    https.get(url,function(responce)
    {
        console.log(responce.statusCode);
    
        responce.on("data",function(data){
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const disc = weatherdata.weather[0].description;
            const icon= weatherdata.weather[0].icon
    
            const imageURL="http://openweathermap.org/img/wn/"+ icon+ "@2x.png";
    
            res.write("<p> The weather is currently " + disc +"</p>");
            res.write("<h1>The temperature of " +query +" is  "+temp+ " degree centigrade </h1>");
            res.write("<img src=" +imageURL +">");
            res.send();
    
        });
    });
    });
    app.listen(3000,function(){});