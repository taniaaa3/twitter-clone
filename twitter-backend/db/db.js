const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL;

const connectDB = async()=>{
    try {
        await mongoose.connect(MONGODB_URL)
        console.log("DB CONNECTED SUCCESSFULLY");
    } catch (error) {
        console.log("DB CONNECTION FAILED, ERRROR: ", error);
        process.exit(0);
    }
}

module.exports = connectDB;