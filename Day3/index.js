// Node js path Module
// work with files and directory paths 
// const fs= require('fs')
// const path = require("path")


// const dirpath = path.join(__dirname,"data", "data.json")
// console.log(dirpath)

// fs.readFile(dirpath, "utf8", (err,data)=>{
//     if(err) throw err
//     console.log("file is reading", data)
// })
// ya toString use krlo ya utf8
// fs.readFile(dirpath, (err, data) => {
//     console.log(data.toString());
// });

// console.log("Done");

// OS module
// get operating syystem information
const os = require("os")
//  // 'win32', 'linux', 'darwin'
// console.log(os.platform())
//  // CPU architecture ('x64', 'arm')
// console.log(os.arch())
// console.log("CPU cores",os.cpus())
// console.log("CPU cores",os.cpus().length)
// console.log("OS NAME", os.type())
// console.log("OS VERSION", os.release())
// console.log("TOTAL memory", os.totalmem())
// console.log("TOTAL memory", os.totalmem()/(1024*3).toFixed(2))
// console.log("free memory", os.freemem())
// console.log("total free memory in gb", os.freemem()/(1024*3).toFixed(2))



// PRACTICE
// const memeory = os.totalmem()/(1024*3).toFixed(2)
// console.log(memeory)
// if(memeory<50980823){
//     console.log("Your system is low on memory")
// }else{
//     console.log("Your system has sufficient memory")
// }



// server creating and routing in nodejs
const http = require("http")
const server = http.createServer((req,res)=>{
    // res.write("hello world")
    // res.end()
    if(req.url == '/'){
        res.write("welcome to home page")
    }
    else if(req.url == '/about'){   
        res.write("welcome to about page")
    }
    else if(req.url == '/contact'){
        res.write("welcome to contact page")
    }
    else if(req.url == '/services'){
        res.write("welcome to services page")
    }
    else if(req.url == '/api'){
        res.writeHead(200, {"Content-Type": "text/html"})
        res.end("<h1>Welcome to API page</h1>")
    }
    else if(req.url == '/json'){
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify({message: "Welcome to JSON page"}))
    }
    res.end()
})

server.listen(5000,()=>{
    console.log("server is running on port 5000")
})