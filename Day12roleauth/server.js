require("dotenv").config()

const express = require("express")
const connectDb = require("./config/db.js")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const userroute = require("./routes/userRoutes.js")
const mongoStore = require("connect-mongo").default

const app =express()
connectDb()

app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret:process.env.JWT_SECRET,
    resave:false,
    saveUninitialized:false,
    store: mongoStore.create({
    mongoUrl: process.env.MONGO_URI   // ✅ correct
}),
    cookie:{
        maxAge:60*60*100, //1 hour
        httpOnly:true
    }
}))

app.use("/api/auth", userroute)
const PORT = process.env.PORT || 6000
app.listen(PORT, (req,res)=>{
    console.log("SERver is running on port 3000")
})