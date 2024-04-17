const { log } = require("console");
const express = require ("express");
const https = require("https");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");    
});    
app.post("/",function(req,res){
    

  query =req.body.cityName;
  appid= "a73f36cc07bf4eecd8165ff6855f2b27";
  units= "metric";

const url= "https://api.openweathermap.org/data/2.5/weather?q="+query +"&appid=" +appid+"&units="+ units;

https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data) {
        const weatherData = JSON.parse(data);
        const desc=weatherData.main.temp;
        const waetherdesc= weatherData.weather[0].description
        const icons = weatherData.weather[0].icon
        const imgurl = "https://openweathermap.org/img/wn/" +icons+ "@2x.png"
        console.log(desc);
        console.log(waetherdesc);
        res.write("<h1>The temperature in "+query +" is " + desc + " degrees celcius</h1>");
        res.write("<h2>The weather condition is currently " + waetherdesc + "</h2>");
        res.write("<img src=" + imgurl + ">");
        res.send();
    });
 
});


})


app.listen(3000, function(){
    console.log("the server is running on port 3000");

});


 