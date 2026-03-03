// CRUD OPERATION DAY 6
const express = require("express")
const app = express()
const path = require("path")

// CREATING SERVER AND ROUTING IN EXPRESS.JS
const dirPath = path.join(__dirname,"public")
app.get('/', (req,res)=>{
    res.send("Hello Yash, API Working")

})

app.use(express.json())
// create in express js
let products =[]
app.post("/products",(req,res)=>{
    const newProduct = {
        id:products.length+1,
        title:req.body.title,
        price:req.body.price

    }
    products.push(newProduct)
    res.json(products)
})
// read
app.get("/products", (req,res)=>{
    res.json(products)

})
//read by id
app.get("/products/:id", (req,res)=>{
    const id=parseInt(req.params.id)
     const product = products.find(p=> p.id === id)
     if(product){
        res.json(product)


     }else{
        res.status(404).json({message:"invalid resp"})
     }

})
//update
app.put("/products/:id", (req,res)=>{
    const id=parseInt(req.params.id)
     const product = products.find(p=> p.id === id)
     if(!product){
        res.status(404,"invlaid not foun")
     }
     product.title=req.body.title
     product.price=req.body.price
     res.json(product)
    
})
app.delete("/products/:id", (req,res)=>{
    const id=parseInt(req.params.id)
    const productList = products.filter(p=>p.id!=!id)
    res.json(productList)
    
    
})


app.listen(5000,()=>{
    console.log("server is running")
})