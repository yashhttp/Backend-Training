// database Day 7
const express = require("express")
const { default: mongoose } = require("mongoose")
const app = express()


app.use(express.json())


// Database connection
const connect = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/t2")
        console.log("database is connected")

    }catch(err){
        console.log(err)

    }
}

connect()


// Model and Schema
const productSchema = new mongoose.Schema({
    title:String,
    category:String,
    price:Number,
    stock:Number,
    rating:Number,
    createdAt:{
        type:Date,
        default:Date.now
    }
})
// model -used to interact with collection
const product = mongoose.model("Product", productSchema)


// insert data in database
app.post("/product",async(req,res)=>{
   await product.insertMany([
    {title:"Files", category:"x", price:4444, stock:5,rating:10},
    {title:"File23s", category:"xxxx", price:94, stock:5,rating:10},
    {title:"Files", category:"x", price:54, stock:1,rating:5},
    
   ])
   res.send("data inserted")
})
// find in database
// app.get("/product", async (req,res)=>{
//     const getD = await product.find()
//     res.json(getD)
// })
// app.get("/product", async (req,res)=>{
//     const getD = await product.find({price:4444})
//     res.json(getD)
// })
// app.get("/product", async (req,res)=>{
//     const getD = await product.find({price:{$eq:54}})
//     res.json(getD)
// })
// 
// query to find cstegory electronic
// app.get("/product", async (req,res)=>{
//     const getD = await product.find({category:"electronics"})
//     res.json(getD)
// })
// query to find ratinf not equal to 4.2
// app.get("/product", async (req,res)=>{
//     const getD = await product.find({rating:{$ne:5}})
//     res.json(getD)
// })
// app.get("/product/search", async (req,res)=>{
//     const rating =req.query.rating
//     const getD = await product.find({rating:{$gte:rating}})
//     res.json(getD)
// })
app.get("/product/search", async (req,res)=>{
    const category =req.query.category
    const getD = await product.find({category:category})
    res.json(getD)
})

app.listen(5000,()=>{
    console.log("server is running")
})