const fs = require('fs')
const path = require('path')
const http = require('http')

const dirPath = path.join(__dirname, 'user', "app.json")
console.log(dirPath)
const server = http.createServer((req,res)=>{
    if(req.url =='/'){
        fs.readFile(dirPath, "utf8", (errr,data)=>{
            if(data){
               res.write(data)
               res.end()
            }
        })
    }
})
server.listen(4000,()=>{
    console.log("sever is runnning on 4000")
})