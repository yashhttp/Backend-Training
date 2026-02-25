
// DAY 2
// fetch('https://fakestoreapi.com/products')
//             .then(res=>res.json())            
//             .then(json=>console.log(json))


// async function func() {
    
//     try{
//         const resp = fetch('https://fakestoreapi.com/products')
//         const data = await resp.json()
//         // console.log(data)
//         return data

//     }catch(err){
//         console.log("fetched error", err)
//     }
    
// }

// const main = async()=>{
//     const data1 = await func()
//     console.log(data1)
// }
// main()


const {add, multi,sub,divi} = require("./math.js")
// // const math = require("./math.js") // ase hi kr skte h fir console.log(math.add(2,3)) ase hoga bs
// console.log(add(2,3))
// console.log(multi(2,3))
// console.log(sub(6,3))
// console.log(divi(6,3))


// core modules - built in
// these come with Node.js - No intallation needs


//File System
// work with files and directories
const fs= require('fs')

// // folder creating
// fs.mkdir("x", (errr)=>{
//     if(errr) throw errr;
//     console.log("folder is created")
// })

// fs.writeFile("x/ex.txt", "hello", (err)=>{
//     if(err) throw err;
//     console.log("file is created")

// })
// fs.readFile("x/ex.txt", "utf8", (err,data)=>{
//     if(err) throw err;
//     console.log(data)

// })
// fs.appendFile("x/ex.txt", "mango is coming", (err,data)=>{
//     if(err) throw err;
//     console.log("data id added")

// }) 
fs.unlink("x/ex.txt",  (err,data)=>{
    if(err) throw err;
    console.log("file is deleted")

}) 
