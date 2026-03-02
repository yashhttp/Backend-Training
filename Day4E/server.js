const express = require("express")
const app = express()
const path = require("path")

// CREATING SERVER AND ROUTING IN EXPRESS.JS
const dirPath = path.join(__dirname,"public")
app.get('/',(req,res)=>{
    // res.send("hiii")
    res.sendFile(`${dirPath}/index.html`)
})
app.get('/help',(req,res)=>{
    res.send("hii help")
})
app.get('/service',(req,res)=>{
    res.send("hii services")
})
app.get('/about',(req,res)=>{
    res.send("hii ABOUT")
})
app.get("/user/:id/:id1", (req,res)=>{
    const taskId = req.params.id
    const t2 = req.params.id1
    res.json({
        message:"Task Fetched",
        id:taskId,
        id1:t2
    })
})
app.get("/task", (req,res)=>{
    const task = req.query
    
    console.log(task)
})

const task =[
    {id:1,title:"task1", completed:true},
    {id:2,title:"task2", completed:true},
    {id:3,title:"task3", completed:false},
    {id:4,title:"task4", completed:true}
    
]
// let filterTask = [...task]
// if(req.query.completed){
//     const incomplete = req.query.completed === "true"
//     const filterTask = filterTask.filter((task)=>task.completed === incomplete)

// }

app.get("/task",(req,res)=>{
    const {completed} = req.query

    if(completed){
        const incomplete = completed === "true"
        const filterData = s.filter(t => t.completed === incomplete)
        return res.json(filterData)
    }
})






// DAY 6








app.listen(5000,()=>{
    console.log("server is running")
})