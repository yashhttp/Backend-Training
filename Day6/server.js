// CRUD OPERATION DAY 6
const express = require("express")
const app = express()
const path = require("path")

// CREATING SERVER AND ROUTING IN EXPRESS.JS
const dirPath = path.join(__dirname,"public")
app.get('/', (req,res)=>{
    res.send("Hello Yash, API Working")

})




app.listen(5000,()=>{
    console.log("server is running")
})