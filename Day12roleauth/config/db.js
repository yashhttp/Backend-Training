const mongoose = require("mongoose")

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database is connected successfully")
    }catch(err){
        console.log("Not connected",err)
        process.exit(1)
    }
}
module.exports= connectDb