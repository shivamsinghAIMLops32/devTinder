const mongoose = require("mongoose");

const connectDB = async ()=>{
    
    await mongoose.connect("mongodb+srv://shivamsinghcse19:pYtZBB6tqjjcEyqo@cluster0.g5pyj.mongodb.net/devTinder");
} 

module.exports = {connectDB};
