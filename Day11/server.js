// database Day 10
const express = require("express")
const { default: mongoose, mongo } = require("mongoose")
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

// model schema bnya phle fir kuchh  operation kiye first step78
// const userSchema = new mongoose.Schema({
//     fullName:String,
//     email:String,
//     age:Number

// })
// const users = mongoose.model("User", userSchema)

// app.post("/Users",async(req,res)=>{
//    await users.insertMany([
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


//  const postSchema = new mongoose.Schema({
//     title:String,
//     userId:mongoose.Schema.Types.ObjectId
//  })

// const postModel = mongoose.model("Post", postSchema)


// app.post("/post",async(req,res)=>{
//     await postModel.insertMany([
//         {title:"nodejs", userId:"69a929b171c4df510d8d6d9f"},
//         {title:"expressjs", userId:"69a929b171c4df510d8d6da0"}
//     ])
//     res.send("Data inserted post")
// })




// app.get("/postwithuser", async(req,res)=>{
//     const data = await postModel.aggregate([
//         {
//             $lookup:{
//                 from:"users",
//                 localField:"userId",
//                 foreignField:"_id",
//                 as:"userDetails"
//             }
//         }
//     ])
//     res.json(data)
// })




// VALIDATOR IN SCHEMA
 //  min  max minlength maxlength required
// enum validotor - allow only spefci bvalue
// unique val;idtor - create a unique index so value cannot repeat
// match validtpr - uses regular exp to validate strings
// custum validater
// you can create  your own validatipn logic example: only even numbers are allowed
        


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: [3, "Username must be at least 3 characters"],
    maxlength: [20, "Username cannot exceed 20 characters"],
    trim: true,
    unique: true
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    maxlength: [50, "Password cannot exceed 50 characters"]
  },

  age: {
    type: Number,
    min: [18, "Age must be at least 18"],
    max: [100, "Age cannot exceed 100"]
  },

  role: {
    type: String,
    enum: {
      values: ["user", "admin", "moderator"],
      message: "Role must be either user, admin, or moderator"
    },
    default: "user"
  },

  phone: {
    type: String,
    match: [/^[0-9]{10}$/, "Phone number must be 10 digits"]
  },

  gender: {
    type: String,
    enum: ["male", "female", "other"]
  }

});
const userr = mongoose.model("Userss", userSchema)



app.listen(5000,()=>{
    console.log("server is running")
})