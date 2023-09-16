const express=require("express")
const https=require("https")
const body=require("body-parser")
const app=express()
var lists = [];//--------CHECK HERE IF ANY ERROR--------
app.set('view engine','ejs')
app.use(body.urlencoded({extended:true}))
app.use(express.static('public'))
// var lists='random name'
app.get("/",function(req,res){
res.render('index',{tasks:lists})
})
app.post("/",function(req,res){
    var task=req.body.task
    console.log(task)
    lists.push(task)
    res.redirect("/")
})
app.listen(3000,function(){
    console.log("Server is up and running")
   
})
