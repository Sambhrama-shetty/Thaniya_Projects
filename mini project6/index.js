const express = require("express")
// const https=require("https")
const mongoose = require("mongoose")
const body = require("body-parser")
const app = express()

app.set('view engine', 'ejs')
app.use(body.urlencoded({ extended: true }))
app.use(express.static('public'))

mongoose.connect("mongodb://127.0.0.1:27017/tododb", { useNewUrlParser: true })

const tododbschema = new mongoose.Schema({ task: String })
const todomodel = mongoose.model("tasks", tododbschema)
const t1 = new todomodel({ task: "gaming" })
// const t2 = new todomodel({ task: "studing" })
// const t3 = new todomodel({ task: "playing" })
// t1.save()
// t2.save()
// t3.save()

// var lists = []





// var lists='random name'
app.get("/", function (req, res) {
    todomodel.find().then((result)=>{
    res.render('index', { tasks: result })
}).catch((err)=>{
    console.log(err)
})
})
app.post("/", function (req, res) {
    var todotask = req.body.task
    // console.log(task)
    // lists.push(task)
    const task=new todomodel({task:todotask})
    task.save()

    .then((result) => {
        console.log(`Added task with ID ${result._id}: ${result.task}`);
        res.redirect("/");
    })
    .catch((err) => {
        console.error(`Error adding task: ${err}`);
        res.redirect("/");
    });
    // res.redirect("/")
})

app.post("/delete",function(req,res){
    var item=req.body.checkbox
    todomodel.deleteOne({_id:item}).then((result)=>{
        // res.redirect("/")

        
        if (result.deletedCount > 0) {
            console.log(`Deleted task with ID ${item}`);
            } else {
                console.log(`Task with ID ${item} not found.`);
            }
            res.redirect("/");
        
    }).catch((err)=>{
        console.log(err)
    })
})

app.listen(3000, function () {
    console.log("Server is up and running")

})
