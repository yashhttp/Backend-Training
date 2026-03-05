// database Day 8
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
// const product = mongoose.model("Product", productSchema)
const product = mongoose.model("Product", productSchema)


// vohi day 7 ke jesa hi h aage ki kuchh properties krva rhe h bs usme hi 



// sorting in descending
// app.get("/product", async(req,res)=>{
//     const products = await product.find().sort({price:-1})
//    res.send(products)

// })

// sorting in ascending
// app.get("/product", async(req,res)=>{
//     const products = await product.find().sort({price:1})
//    res.send(products)

// })

// LOGICAL OPERATOR
// $and - All CONDITIONS MUST BE TRUE 
// CONDITION 1             CONDITION 2          CONDITION 3
// T                           T                      T
// T                           F                      F
// F                           T                      F
// F                           F                      F
// app.get("/product", async(req,res)=>{
//     const products = await product.find({$and : [
//         {category:"electronics"},
//         {price:{$gt:5}}
//     ]})
//    res.send(products)

// })
// NOW $OR - AT LEAST ONE CONDITION MUST BE TRUE
// app.get("/product", async(req,res)=>{
//     const products = await product.find({$or : [
//         {category:"electronics"},
//         {price:{$gt:446}}
//     ]})
//    res.send(products)

// })
// AND $NOT - NEGATES A  CONDITION
// app.get("/product", async(req,res)=>{
//     const products = await product.find({$nor : [
//         {category:"electronics"},
//         {price:{$gt:446}}
//     ]})
//    res.send(products)

// })
// findById() is a built in method from mongoose used to fetch a single documents by it id from mongoDB
// app.get("/product", async(req,res)=>{
//     const id = req.body.id
//     const products = await product.findById(id)
//    res.send(products)

// })

// or
// app.get("/product/:id", async(req,res)=>{
//     try{
//         // const product = mongoose.model("Product", productSchema)
//         const products = await product.findById(req.params.id)
//         if(!products){
//             return res.json({message:"Products not found"})
//         }
//         res.send(products)

//     }catch(err){
//         res.send(err)
//     }
    

// })

// findByIdAndUpdate()
//  app.put("/product/:id", async(req,res)=>{
//     try{
//         // const product = mongoose.model("Product", productSchema)
//         const products = await product.findByIdAndUpdate(req.params.id, {price:150,stock:35})
//         if(!products){
//             return res.json({message:"Products not found"})
//         }
//         res.json({message:"product update scuuessfulyly"})

//     }catch(err){
//         res.send(err)
//     }
     

// })
// findByIdAndDelete()
//  app.put("/product/:id", async(req,res)=>{
//     try{
//         // const product = mongoose.model("Product", productSchema)
//         const products = await product.findByIdAndDelete(req.params.id)
//         if(!products){
//             return res.json({message:"Products not found"})
//         }
//         res.json({message:"product Delete scuuessfulyly"})

//     }catch(err){
//         res.send(err)
//     }
    

// })


// SELECT SPECFIC  FEILD IN MONGOOSE
// IN MONGOOSE YOU CAN SELECT SPECIFIC FIELDS FROM A DOCUMENT USING THE .select() method THIS HELPS IN:
// IMPROVE PerformancE
// REDUCE UNNECESSARY DATA 
// HIDE SENSITIVE FEILD(LIKE PASSWORD)
//   app.get("/product/:id", async(req,res)=>{
//     try{
   
//         const products = await product.findById(req.params.id).select("title price")
//         if(!products){
//             return res.json({message:"Products not found"})
//         }
//         res.json(products)

//     }catch(err){
//         res.send(err)
//     }
    

// })



// Exclude feild (Use - to exclude feilds) - jo - iske bd likhe ge use chhod ke sb print hoja ga bs 
//   app.get("/product/:id", async(req,res)=>{
//     try{
   
//         const products = await product.findById(req.params.id).select("-_id")
//         if(!products){
//             return res.json({message:"Products not found"})
//         }
//         res.json(products)

//     }catch(err){
//         res.send(err)
//     }
    

// })
// Using projection Object
// instead of string, you can use object
// 1--> include
// 0--> exclude
// NOTE: you cannot mix inculde and exclude (except _id)
 app.get("/product/:id", async(req,res)=>{
    try{
   
        const products = await product.findById(req.params.id).select({category:1, title:1, _id:0})
        if(!products){
            return res.json({message:"Products not found"})
        }
        res.json(products)

    }catch(err){
        res.send(err)
    }
    

})



// limit() restrict the number of results returned
// skip method
// phle user schema model bnya hai fir data insert kiya hai fir apply kiya limit and skip method 
const userSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    age:Number

})
const user = mongoose.model("User", userSchema)

// app.post("/user",async(req,res)=>{
//    await user.insertMany([
//    {fullName:"Yash", email:"y@gmail.com", age:20},
//    {fullName:"sidh", email:"s@gmail.com", age:15},
//    {fullName:"vishal", email:"v@gmail.com", age:19},
//    {fullName:"honey", email:"h@gmail.com", age:10},
//    {fullName:"him", email:"him@gmail.com", age:33},
//    {fullName:"c", email:"c@gmail.com", age:27},
//    {fullName:"riya", email:"r@gmail.com", age:28},
//    {fullName:"shikha", email:"sh@gmail.com", age:21},
//    {fullName:"aachal", email:"aa@gmail.com", age:11},
//    {fullName:"divya", email:"d@gmail.com", age:19},
//    {fullName:"varsha", email:"v@gmail.com", age:34},
//    {fullName:"gudiya", email:"d@gmail.com", age:31},
//    {fullName:"aaditya", email:"aadi@gmail.com", age:23},
//    {fullName:"yashwant", email:"yashwant@gmail.com", age:18},
//    {fullName:"hemant", email:"h@gmail.com", age:23},
//    {fullName:"himanshu", email:"him@gmail.com", age:25},
//    {fullName:"hers", email:"hers@gmail.com", age:30},
//    {fullName:"xx", email:"x@gmail.com", age:13},
//    {fullName:"harsh", email:"har@gmail.com", age:17},
//    {fullName:"savan", email:"van@gmail.com", age:18},
    
//    ])
//    res.send("data inserted")
// })

//  app.get("/user", async(req,res)=>{
//     try{
   
//         const users = await user.find().limit(10)
//         if(!users){
//             return res.json({message:"users not found"})
//         }
//         res.json(users)

//     }catch(err){
//         res.send(err)
//     }
    

// })
// by query method skip krna
 app.get("/user", async(req,res)=>{
    try{
        const skip = parseInt(req.query.skip)
        const users = await user.find().skip(skip)
        if(!users){
            return res.json({message:"users not found"})
        }
        res.json(users)

    }catch(err){
        res.send(err)
    }
    

})

app.listen(5000,()=>{
    console.log("server is running")
})