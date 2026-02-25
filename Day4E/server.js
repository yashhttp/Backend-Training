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
app.listen(5000,()=>{
    console.log("server is running")
})