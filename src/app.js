const express = require("express");
const path = require("path");
const hbs = require("hbs");
const {geocode}= require("./utils/geocode.js")
const {forecast}= require("./utils/weather.js")

const app = express();

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partial");

//handle bar to render dynamic content and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//Express to render data from static page
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Anuj shukla",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Anuj shukla",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Anuj Shukla",
  });
});

app.get("/help", (req, res) => {
  res.send("Help Page");
});

app.get("/about", (req, res) => {
  res.send("<h1>This is about Page</h1>");
});

app.get("/weather", (req, res) => {
  if(!req?.query?.address){
    return res.send({
        success:false,
        code:500,
        msg:"Please Provide address"
    })
  }
  const address =  req?.query?.address; 
  geocode(address,(err,{latitude,longitude,location}={})=>{
   if(err){
    return res.send({
        success:false,
        code:404,
        msg:err
        })
    }
    else{
     forecast(latitude,longitude,(error,response)=>{
        if(error){
            return res.send({
                success:false,
                code:404,
                msg:error
                })
            }  
        else{
            return res.send({
                success:true,
                code:200,
                forecast:response,
                location:address
                })
        }
     })
    }
   })
});

app.get("/products",(req,res)=>{
    console.log(req.query);
    if(!req?.query?.search){
        res.send({
            error:"You Must Provide a Search Term"
         })
    }
    else{
        res.send({
            produtcs:[] 
         })
    }

    
})
app.get('/help/*',(req,res)=>{
res.render('404',{
    title:'404',
    message:" Help Article Not Found!",
    name:"Anuj Shukla"
})
})

app.get('*',(req,res)=>{
 res.render("404",{
    title:'404',
    message:"Page Not Found!",
    name:"Anuj Shukla"
 })
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is up on port 3000");
});
