const mongoose = require("mongoose")
const logger = require("./utils/logger")
const connectDB = async () =>{
    try{
        // console.log("MONGO_URI:", process.env.MONGO_URI);

        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo Db connected")
        logger.debug("Mongo DB connected!")
    } catch(error){
        logger.error("MongoDB connecton failed", error)
    }
} 
 
module.exports = connectDB;